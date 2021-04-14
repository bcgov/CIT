##############################
## Main                     ##
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

data "terraform_remote_state" "shared" {
  backend = "azurerm"
  config = {
    storage_account_name = "tfstatecit"
    container_name       = "tfstate"
    key                  = "shared.tfstate"
    resource_group_name  = "CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01"
    }
  }
