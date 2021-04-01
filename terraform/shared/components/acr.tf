##############################
## Azure Container Registry ##
##############################

resource "azurerm_container_registry" "default" {
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