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