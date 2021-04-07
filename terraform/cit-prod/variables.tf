#############################
## Deployment Variables    ##
#############################

variable "az_resource_group" {
  type        = string
  description = "Resource group for configuration"
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

variable "subscription_id" {
  type        = string
  description = "The Azure 'subscription id'"
}

variable "tenant_id" {
  type        = string
  description = "The Azure 'tenant id'"
}

variable "geocoder_key" {
  type        = string
  description = "The geocoder API key"
}

#############################
## Shared                  ##
#############################

variable "acr_url" {
  type        = string
  description = "ACR url of repository with app images"
}
variable "acr_username" {
  type        = string
  description = "Username for ACR authentication"
}
variable "acr_password" {
  type        = string
  description = "Password for ACR authentication"
}