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

variable "client_secret" {
  type        = string
  description = "The Azure service principle 'password' used for Terraform Cloud deployments - this is a secret and should be deployed in Terraform Cloud - see readme.md on how to obtain this info"
}

variable "client_id" {
  type        = string
  description = "The Azure 'appId' is terraforms 'client_id'"
}

variable "subscription_id" {
  type        = string
  description = "The Azure 'subscription id'"
}

variable "tenant_id" {
  type        = string
  description = "The Azure 'tenant id'"
}