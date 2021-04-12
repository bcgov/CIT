#############################
## Deployment Variables    ##
#############################

variable "environment" {
  type        = string
  description = "Environment being deployed"
  default     = "shared"
}

variable "app_name" {
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
variable "azure_resource_group" {
  type        = string
  description = "Resource group for configuration"
}

variable "azure_subscription_id" {
  type        = string
  description = "The Azure 'subscription id'"
}

variable "azure_tenant_id" {
  type        = string
  description = "The Azure 'tenant id'"
}
variable "azure_location" {
  type        = string
  description = "Azure resource group"
  default     = "canadacentral"
}
variable "github_token" {
  type        = string
  description = "Github PAT with repo write access"
}

variable "github_owner" {
  type        = string
  description = "Owner (group) of the Github repository'"
}

variable "github_repository" {
  type        = string
  description = "Github repository for the project'"
}



