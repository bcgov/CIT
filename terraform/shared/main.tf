##############################
## Azure Container Registry ##
##############################

resource "azurerm_container_registry" "default" {
  name                = "acraf6z1jmd"
  resource_group_name = var.azure_resource_group
  location            = var.azure_location
  sku                 = "Basic"
  admin_enabled       = true

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}

##############################
## Github Repo Secrets      ##
##############################

resource "github_actions_secret" "registry_username" {
  repository      = var.github_repository
  secret_name     = "REGISTRY_USERNAME"
  plaintext_value = azurerm_container_registry.default.admin_username
}

resource "github_actions_secret" "registry_password" {
  repository      = var.github_repository
  secret_name     = "REGISTRY_PASSWORD"
  plaintext_value = azurerm_container_registry.default.admin_password
}

resource "github_actions_secret" "registry_login_server" {
  repository      = var.github_repository
  secret_name     = "REGISTRY_LOGIN_SERVER"
  plaintext_value = azurerm_container_registry.default.login_server
}
