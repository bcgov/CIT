# We are not using this right now - we are using the production version of PowerBI - Go to documentation for more info
# Turning this off as it costs $1000/month and doesn't appear to be needed - still investigating
# resource "azurerm_powerbi_embedded" "powerbi" {
#   name                = "powerbicit${var.environment}"
#   location            = var.azure_location
#   resource_group_name = var.azure_resource_group
#   sku_name            = "A1"
#   administrators      = ["Susan.Mordy@gov.bc.ca"]
#   mode                = "Gen2"

#   tags = {
#     description = var.description
#     environment = var.environment
#     owner       = var.owner
#   }

# }