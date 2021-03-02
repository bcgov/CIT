

data "azurerm_client_config" "current" {}

##############################
## Common                   ##
##############################

# Create a Resource Group
resource "azurerm_resource_group" "webapp" {
  name     = "cit-${var.location}-${var.environment}-${var.app_name}-app-service-rg2"
  location = var.location

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}

##############################
## Azure App Service        ##
##############################

# Create the App Service Plan
resource "azurerm_app_service_plan" "webapp" {
  name                = "cit-${var.location}-${var.environment}-${var.app_name}"
  location            = azurerm_resource_group.webapp.location
  resource_group_name = azurerm_resource_group.webapp.name
  kind                = "Linux"
  reserved            = true
  sku {
    capacity = 1
    size = "P1v2"
    tier = "PremiumV2"
    }

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}

# Create the Front-end App Service
resource "azurerm_app_service" "frontend" {
  name                = "cit-${var.location}-${var.environment}-${var.app_name}-frontend"
  location            = azurerm_resource_group.webapp.location
  resource_group_name = azurerm_resource_group.webapp.name
  app_service_plan_id = azurerm_app_service_plan.webapp.id
  https_only = true

  site_config {
    linux_fx_version = "DOCKER|${var.acr_name}.azurecr.io/cit-frontend:latest"
    # http2_enabled = true
  }

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL = "https://${var.acr_name}.azurecr.io"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.acr.admin_password
    REACT_APP_API_BASE_URL = "https://${azurerm_app_service.backend.default_site_hostname}"
    DOCKER_ENABLE_CI = true
  }

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}

# Create the Backend App Service
resource "azurerm_app_service" "backend" {
  name                = "cit-${var.location}-${var.environment}-${var.app_name}-backend2"
  location            = azurerm_resource_group.webapp.location
  resource_group_name = azurerm_resource_group.webapp.name
  app_service_plan_id = azurerm_app_service_plan.webapp.id

  site_config {
    linux_fx_version = "DOCKER|${var.acr_name}.azurecr.io/cit-webapi:latest"
    cors {
      allowed_origins = ["https://cit-${var.location}-${var.environment}-${var.app_name}-frontend"] 
    }
  }

  # TODO: Get connection secrets from AKV
  app_settings = {
    DOCKER_REGISTRY_SERVER_URL = "https://${var.acr_name}.azurecr.io"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.acr.admin_password
    POSTGRES_DB = azurerm_postgresql_database.postgres.name
    POSTGRES_DJANGO_USER = "${azurerm_postgresql_server.postgres.administrator_login}@${azurerm_postgresql_server.postgres.fqdn}"
    POSTGRES_DJANGO_PASSWORD = azurerm_postgresql_server.postgres.administrator_login_password
    POSTGRES_HOST = azurerm_postgresql_server.postgres.fqdn
    DOCKER_ENABLE_CI = true
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
  location            = azurerm_resource_group.webapp.location
  resource_group_name = azurerm_resource_group.webapp.name

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
  name                = "mydb"    #TODO: set as variable
  resource_group_name = azurerm_resource_group.webapp.name
  server_name         = azurerm_postgresql_server.postgres.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}

# TODO: This is wide open - not optimial.  Better to restrict access to just the AKS.  But not sure how that's done.  Does it use public IP?  If so then
# TODO: will have to assign a Elastic IP then setup an ingress with routes?  The default AKS loadbalancer doesn't seem to init without a deployment.
# resource "azurerm_postgresql_firewall_rule" "postgres" {
#   name                = "AllowAll"
#   resource_group_name = azurerm_resource_group.webapp.name
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
  resource_group_name = azurerm_resource_group.webapp.name
  location            = azurerm_resource_group.webapp.location
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
#   resource_group_name = azurerm_resource_group.webapp.name
#   registry_name       = azurerm_container_registry.acr.name
#   location            = azurerm_resource_group.webapp.location

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
  repository       = var.github_repository
  secret_name      = "REGISTRY_USERNAME"
  plaintext_value  = azurerm_container_registry.acr.admin_username
}

resource "github_actions_secret" "registry_password" {
  repository       = var.github_repository
  secret_name      = "REGISTRY_PASSWORD"
  plaintext_value  = azurerm_container_registry.acr.admin_password
}

resource "github_actions_secret" "registry_login_server" {
  repository       = var.github_repository
  secret_name      = "REGISTRY_LOGIN_SERVER"
  plaintext_value  = azurerm_container_registry.acr.login_server
}
