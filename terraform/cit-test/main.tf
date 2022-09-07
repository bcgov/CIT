##############################
## Main                     ##
##############################

data "azurerm_subscription" "primary" {}
data "azurerm_client_config" "current" {}

resource "azurerm_service_plan" "webapp" {
  name                = "cit-${var.app_suffix}-${var.environment}"
  location            = var.azure_location
  resource_group_name = var.azure_resource_group
  os_type             = "Linux"
  sku_name            = "P1v2"

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}
