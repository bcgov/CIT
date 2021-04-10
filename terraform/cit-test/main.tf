
data "terraform_remote_state" "shared" {
  backend = "azurerm"
  config = {
    storage_account_name = "tfstatecit"
    container_name       = "tfstate"
    key                  = "shared.tfstate"
    resource_group_name  = "CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01"
    }
  }
