resource "azurerm_app_service" "backend" {
  name                = "api-${var.app_suffix}-${var.environment}"
  location            = var.azure_location
  resource_group_name = var.azure_resource_group
  app_service_plan_id = azurerm_app_service_plan.webapp.id

  site_config {
    linux_fx_version = "DOCKER|${data.terraform_remote_state.shared.outputs.acr_name}.azurecr.io/cit-webapi:latest"
    always_on = true
    cors {
      allowed_origins = ["https://test.communityinformationtool.gov.bc.ca"]
    }
  }

  # TODO: Get connection secrets from AKV
  app_settings = {
    WEBSITES_PORT                   = 8000
    DOCKER_REGISTRY_SERVER_URL      = "https://${data.terraform_remote_state.shared.outputs.acr_name}.azurecr.io"
    DOCKER_REGISTRY_SERVER_USERNAME = data.terraform_remote_state.shared.outputs.acr_admin
    DOCKER_REGISTRY_SERVER_PASSWORD = data.terraform_remote_state.shared.outputs.acr_password
    DOCKER_ENABLE_CI                = true
    POSTGRES_DB                     = azurerm_postgresql_database.postgres.name
    POSTGRES_DJANGO_USER            = "${azurerm_postgresql_server.postgres.administrator_login}@${azurerm_postgresql_server.postgres.fqdn}"
    POSTGRES_DJANGO_PASSWORD        = azurerm_postgresql_server.postgres.administrator_login_password
    POSTGRES_HOST                   = azurerm_postgresql_server.postgres.fqdn
    KEY_CLOAK_URL                   = "https://test.oidc.gov.bc.ca/auth/"
    KEY_CLOAK_REALM                 = "fyof530u"
    KEY_CLOAK_CLIENT                = "cit-test"
    AUTHORITY                       = "https://login.microsoftonline.com/"
    SCOPE                           = "https://analysis.windows.net/powerbi/api/.default"
    TENANT_ID                       = "6fdb5200-3d0d-4a8a-b036-d3685e359adc"
    CLIENT_ID                       = "f6450e1d-a85b-46b7-8180-c72f9ecad653"
    CLIENT_SECRET                   = var.pbi_secret
    EMAIL_NOTIFICATIONS_ENABLED     = true
    EMAIL_AUTH_HOST                 = "https://test.oidc.gov.bc.ca"
    EMAIL_SERVICE_HOST              = "https://ches-test.apps.silver.devops.gov.bc.ca"
    EMAIL_CLIENT_ID                 = "CIT_SERVICE_CLIENT"
    EMAIL_CLIENT_SECRET             = var.email_client_secret
    EMAIL_SENDING_ADDRESS           = "noreply@gov.bc.ca"
    EMAIL_OPPORTUNITY_LINK_HOST     = "https://test.communityinformationtool.gov.bc.ca"
  }

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}