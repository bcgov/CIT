

data "azurerm_client_config" "current" {}

##############################
## Common                   ##
##############################

# Create a Resource Group
resource "azurerm_resource_group" "cit" {
  name     = "CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01"
  location = "canadacentral"

  tags = {
    "Classification" = "None"
    "Cost-Center"    = "None"
    "Environment"    = "NPD"
    "Expiry-Date"    = "None"
    "GL-Code"        = "None"
    "Solution-Name"  = "Network BC-ICT Community Information Tool(CIT)"
  }
}

##############################
## Azure App Service        ##
##############################

# Create the App Service Plan
resource "azurerm_app_service_plan" "webapp" {
  name                = "cit-${var.location}-${var.environment}-${var.app_name}"
  location            = azurerm_resource_group.cit.location
  resource_group_name = azurerm_resource_group.cit.name
  kind                = "Linux"
  reserved            = true
  sku {
    capacity = 1
    size     = "P1v2"
    tier     = "PremiumV2"
  }

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}

# Create the Front-end App Service
resource "azurerm_app_service" "frontend" {
  name                = "communityinformationtool-test"
  location            = azurerm_resource_group.cit.location
  resource_group_name = azurerm_resource_group.cit.name
  app_service_plan_id = azurerm_app_service_plan.webapp.id
  https_only          = true

  site_config {
    linux_fx_version = "DOCKER|${var.acr_name}.azurecr.io/cit-frontend:latest"
    always_on = true
    # http2_enabled = true
  }

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL      = "https://${var.acr_name}.azurecr.io"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.acr.admin_password
    REACT_APP_API_BASE_URL          = "https://${azurerm_app_service.backend.default_site_hostname}"
    KC_AUTH_URL                     = "https://test.oidc.gov.bc.ca/auth/"
    KC_CLIENT_ID                    = "cit-test"
    KC_REALM                        = "fyof530u"
    DOCKER_ENABLE_CI                = true
    REACT_APP_PROD_KEY              = var.geocoder_key
    REACT_APP_SNOWPLOW_COLLECTOR    = "spt.apps.gov.bc.ca"
  }

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}

# Create the Backend App Service
resource "azurerm_app_service" "backend" {
  name                = "cit-${var.location}-${var.environment}-${var.app_name}-backend"
  location            = azurerm_resource_group.cit.location
  resource_group_name = azurerm_resource_group.cit.name
  app_service_plan_id = azurerm_app_service_plan.webapp.id

  site_config {
    linux_fx_version = "DOCKER|${var.acr_name}.azurecr.io/cit-webapi:latest"
    always_on = true
    cors {
      allowed_origins = ["https://communityinformationtool-test.azurewebsites.net"]
    }
  }

  # TODO: Get connection secrets from AKV
  app_settings = {
    WEBSITES_PORT                   = 8000
    DOCKER_REGISTRY_SERVER_URL      = "https://${var.acr_name}.azurecr.io"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.acr.admin_password
    POSTGRES_DB                     = azurerm_postgresql_database.postgres.name
    POSTGRES_DJANGO_USER            = "${azurerm_postgresql_server.postgres.administrator_login}@${azurerm_postgresql_server.postgres.fqdn}"
    POSTGRES_DJANGO_PASSWORD        = azurerm_postgresql_server.postgres.administrator_login_password
    POSTGRES_HOST                   = azurerm_postgresql_server.postgres.fqdn
    AUTHORITY                       = "https://login.microsoftonline.com/"
    SCOPE                           = "https://analysis.windows.net/powerbi/api/.default"
    KEY_CLOAK_URL                   = "https://test.oidc.gov.bc.ca/auth/"
    KEY_CLOAK_REALM                 = "fyof530u"
    KEY_CLOAK_CLIENT                = "cit-test"
    DOCKER_ENABLE_CI                = true
  }

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}

##############################
## PostgreSQL Database      ##
##############################

resource "random_string" "db_admin" {
  length  = 8
  special = false
  lower   = true
  upper   = false
  number  = false
}

resource "random_password" "db_password" {
  length  = 16
  special = true
  #override_special = "_%@"
}

resource "azurerm_postgresql_server" "postgres" {
  name                = var.psql_name
  location            = azurerm_resource_group.cit.location
  resource_group_name = azurerm_resource_group.cit.name

  sku_name = "B_Gen5_2"

  storage_mb                   = 5120
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false
  auto_grow_enabled            = true

  administrator_login          = random_string.db_admin.result
  administrator_login_password = random_password.db_password.result

  version                 = "11"
  ssl_enforcement_enabled = true

  # depends_on = [
  #   azurerm_key_vault.akv,
  # ]
}

resource "azurerm_postgresql_database" "postgres" {
  name                = "cit" #TODO: set as variable
  resource_group_name = azurerm_resource_group.cit.name
  server_name         = azurerm_postgresql_server.postgres.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}

# TODO: This is wide open - not optimial.  Better to restrict access to just the AKS.  But not sure how that's done.  Does it use public IP?  If so then
# TODO: will have to assign a Elastic IP then setup an ingress with routes?  The default AKS lo adbalancer doesn't seem to init without a deployment.
# resource "azurerm_postgresql_firewall_rule" "postgres" {
#   name                = "AllowAll"
#   resource_group_name = azurerm_resource_group.cit.name
#   server_name         = azurerm_postgresql_server.postgres.name
#   start_ip_address    = "0.0.0.0"
#   end_ip_address      = "255.255.255.255"
# }

##############################
## Azure Container Registry ##
##############################

# TODO:
# Request Github account authorization
# inject ACR secrets into Github actions - or find a way to have Github pull AKV secrets to authorize image push from github actions pipeline to ACR
# Current method is to save ACR secrets as a Github secrets and update yaml configs.

resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.cit.name
  location            = azurerm_resource_group.cit.location
  sku                 = "Basic"
  admin_enabled       = true

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}

# resource "azurerm_container_registry_webhook" "webhook" {
#   name                = "mywebhook"
#   resource_group_name = azurerm_resource_group.cit.name
#   registry_name       = azurerm_container_registry.acr.name
#   location            = azurerm_resource_group.cit.location

#   service_uri = "https://mywebhookreceiver.example/mytag"
#   status      = "enabled"
#   scope       = "mytag:*"
#   actions     = ["push"]
#   custom_headers = {
#     "Content-Type" = "application/json"
#   }
# }

data "azurerm_subscription" "primary" {}

##############################
## Github Repo Secrets      ##
##############################

resource "github_actions_secret" "registry_username" {
  repository      = var.github_repository
  secret_name     = "REGISTRY_USERNAME"
  plaintext_value = azurerm_container_registry.acr.admin_username
}

resource "github_actions_secret" "registry_password" {
  repository      = var.github_repository
  secret_name     = "REGISTRY_PASSWORD"
  plaintext_value = azurerm_container_registry.acr.admin_password
}

resource "github_actions_secret" "registry_login_server" {
  repository      = var.github_repository
  secret_name     = "REGISTRY_LOGIN_SERVER"
  plaintext_value = azurerm_container_registry.acr.login_server
}
