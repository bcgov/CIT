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
    github = {
      source = "hashicorp/github"
      version = ">= 4.1"
    }
  }
  backend "azurerm" {
    storage_account_name = "tfstatecit"
    container_name       = "tfstate"
    key                  = "prod.tfstate"
    # resource_group_name  = set in init command
    # access_key           = set in init command
  }
}

provider "azurerm" {
  subscription_id = var.azure_subscription_id
  tenant_id       = var.azure_tenant_id
  skip_provider_registration = true

  features {
  }
}
