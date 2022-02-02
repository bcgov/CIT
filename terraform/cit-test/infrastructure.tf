##############################
## Azure Container Registry ##
##############################
resource "azurerm_container_registry" "citacrtest" {
  name                = "citacrtest"
  resource_group_name = var.azure_resource_group
  location            = var.azure_location
  sku                 = "Standard"
  admin_enabled       = true

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}


##############################
## Data Pipeline Storage    ##
##############################
resource "azurerm_storage_account" "citdatapipelinetest" {
  name                     = "citdatapipelinetest"
  resource_group_name      = var.azure_resource_group
  location                 = var.azure_location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }
}
resource "azurerm_storage_container" "citdatatest" {
  name                  = "datapipelinetest"
  storage_account_name  = azurerm_storage_account.citdatapipelinetest.name
  container_access_type = "private"
}
