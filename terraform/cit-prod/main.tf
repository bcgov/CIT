# Used for the names for resources that are required to be unique
resource "random_string" "prefix" {
  length  = 8
  special = false
  lower   = true
  upper   = false
  number  = true
}



module "webapp" {

  # Going to use local modules for this demo, but if deploying to dev/test/prod environments may be better to deploy into a modules repo
  # and pull from different tags depending. eg:
  #source = "git::https://github.com/bashbang/demo-tfmodues.git?ref=dev-0.0.54"

  # Azure Specific Configuration
  source = "../modules/azure/webapp"

  tenant_id       = var.tenant_id
  subscription_id = var.subscription_id

  github_repository  = var.github_repository
  github_token    = var.github_token
  github_owner    = var.github_owner

  geocoder_key    = var.geocoder_key

  app_name        = "CIT3"
  owner           = "CITZ"
  description     = "Community Information Toolkit"
  environment     = "test"

  rg_name = "cit"
  acr_name = "acr${random_string.prefix.id}"
  psql_name = "cit-test-psql-${random_string.prefix.id}"
  akv_name = "akv-${random_string.prefix.id}"


  # AWS Specific configuration
  
  # TODO: AWS module definitions
  # source = "./modules/aws/webapp"

}

data "terraform_remote_state" "shared" {
  backend = "azurerm"
  config = {
    storage_account_name = "tfstatecit"
    container_name       = "tfstate"
    key                  = "shared.tfstate"
    resource_group_name  = "CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01"
    }
  }
