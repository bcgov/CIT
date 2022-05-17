#############################
## Deployment Variables    ##
#############################

variable "environment" {
  type        = string
  description = "Environment being deployed"
  default     = "test"
}

variable "app_suffix" {
  type        = string
  description = "Environment being deployed"
  default     = "cit"
}

variable "owner" {
  type        = string
  description = "Specify the owner of the resource"
}

variable "description" {
  type        = string
  description = "Provide a description of the resource"
}

#############################
## Azure Variables         ##
#############################
variable "azure_subscription_id" {
  type        = string
  description = "The Azure 'subscription id'"
}
variable "azure_tenant_id" {
  type        = string
  description = "The Azure 'tenant id'"
}

variable "azure_resource_group" {
  type        = string
  description = "Azure resource group"
  default     = "CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01-Test"
}

variable "azure_location" {
  type        = string
  description = "Azure resource group"
  default     = "canadacentral"
}

variable "psql_username" {
  type        = string
  description = "The psql username"
  default     = "cit_user"
}

variable "psql_password" {
  type        = string
  description = "The psql password"
}



# variable "github_token" {
#   type        = string
#   description = "Github PAT with repo write access"
# }

# variable "github_owner" {
#   type        = string
#   description = "Owner (group) of the Github repository'"
# }

# variable "github_repository" {
#   type        = string
#   description = "Github repository for the project'"
# }

#############################
## Application Variables   ##
#############################
variable "geocoder_key" {
  type        = string
  description = "The geocoder API key"
}
variable "router_key" {
  type        = string
  description = "The BC RouterAPI key"
}

variable "email_client_secret" {
  type        = string
  description = "CHES client secret"
}

variable "pbi_secret" {
  type        = string
  description = "PowerBI client secret"
}
