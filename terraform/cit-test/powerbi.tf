resource "azurerm_powerbi_embedded" "powerbi" {
  name                = "powerbicit${var.environment}"
  location            = var.azure_location
  resource_group_name = var.azure_resource_group
  sku_name            = "A1"
  administrators      = ["Susan.Mordy@gov.bc.ca"]
  mode                = "Gen2"

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }

}