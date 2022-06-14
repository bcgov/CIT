# #
# # This TF sets up an environment for an Azure
# #

# The basic setup of the TF environment
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 2.39"
    }
    # github = {
    #   source  = "hashicorp/github"
    #   version = ">= 4.1"
    # }
  }
  # To obtain the acces_key value:
  # 1) az login
  # 2) az storage account keys list -g CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01-Test -n tfstatecittest
  # 3) you can add the access_key here, but you may accidently commit it to the git repo.  Better would be to pass it in via CLI at init.  eg:
  #       $> terraform init --backend-config="access_key=abcyourkeyhere123"
  # NOTE: If you forget to pass in the accesskey during a terraform init you'll get an error "Error: MSI not available"... so don't forget the access_key Chris!
  backend "azurerm" {
    storage_account_name = "tfstatecittest"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
    resource_group_name  = "CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01-Test"
    # access_key           = ""
    use_azuread_auth     = true
    use_msi              = true
  }
}

provider "azurerm" {
  subscription_id            = var.azure_subscription_id
  tenant_id                  = var.azure_tenant_id
  skip_provider_registration = true

  features {
  }
}

# provider "github" {
#   token = var.github_token
#   owner = var.github_owner
# }
