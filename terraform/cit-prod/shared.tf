##############################
## Shared                   ##
##############################

data "azurerm_subscription" "primary" {}
data "azurerm_client_config" "current" {}


##############################
## Resource Group           ##
##############################

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
## Azure App Service Plan   ##
##############################

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