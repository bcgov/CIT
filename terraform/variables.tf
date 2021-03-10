#############################
## Deployment Variables    ##
#############################

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
