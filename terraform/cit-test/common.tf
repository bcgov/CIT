##############################
## Shared                   ##
##############################

data "azurerm_subscription" "primary" {}
data "azurerm_client_config" "current" {}

##############################
## Azure App Service Plan   ##
##############################

resource "azurerm_app_service_plan" "webapp" {
  name                = "cit-${var.azure_location}-${var.environment}-${var.app_name}"
  location            = var.azure_location
  resource_group_name = var.azure_resource_group
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

##############################
## Remote tf state          ##
##############################