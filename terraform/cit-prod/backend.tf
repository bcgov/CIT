resource "azurerm_app_service" "backend" {
  name                = "api-${var.app_suffix}-${var.environment}"
  location            = var.azure_location
  resource_group_name = var.azure_resource_group
  app_service_plan_id = azurerm_app_service_plan.webapp.id

  site_config {
    linux_fx_version = "DOCKER|${data.terraform_remote_state.shared.outputs.acr_name}.azurecr.io/cit-webapi:prod"
    always_on = true
    cors {
      allowed_origins = ["https://communityinformationtool.gov.bc.ca"]
    }
  }

  # TODO: Get connection secrets from AKV
  app_settings = {
    WEBSITES_PORT                   = 8000
    DOCKER_REGISTRY_SERVER_URL      = "https://${data.terraform_remote_state.shared.outputs.acr_name}.azurecr.io"
    DOCKER_REGISTRY_SERVER_USERNAME = data.terraform_remote_state.shared.outputs.acr_admin
    DOCKER_REGISTRY_SERVER_PASSWORD = data.terraform_remote_state.shared.outputs.acr_password
    POSTGRES_DB                     = azurerm_postgresql_database.postgres.name
    POSTGRES_DJANGO_USER            = "${azurerm_postgresql_server.postgres.administrator_login}@${azurerm_postgresql_server.postgres.fqdn}"
    POSTGRES_DJANGO_PASSWORD        = azurerm_postgresql_server.postgres.administrator_login_password
    POSTGRES_HOST                   = azurerm_postgresql_server.postgres.fqdn
    AUTHORITY                       = "https://login.microsoftonline.com/"
    SCOPE                           = "https://analysis.windows.net/powerbi/api/.default"
    KEY_CLOAK_URL                   = "https://oidc.gov.bc.ca/auth/"
    KEY_CLOAK_REALM                 = "fyof530u"
    KEY_CLOAK_CLIENT                = "cit-prod"
    DOCKER_ENABLE_CI                = true
  }

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}