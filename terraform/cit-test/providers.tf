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
      source  = "hashicorp/github"
      version = ">= 4.1"
    }
  }
  backend "azurerm" {
    storage_account_name = "tfstatecittest"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
    resource_group_name  = "CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01-Test"
    access_key           = "${var.tf_state_backend_access_key}"
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

provider "github" {
  token = var.github_token
  owner = var.github_owner
}
