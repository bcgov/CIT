#############################
## Metadata                ##
#############################

# application name 
variable "app_name" {
  type        = string
  description = "This variable defines the application name used to build resources"
}

# company name 
variable "company" {
  type        = string
  default     = "NTT Data"
  description = "This variable defines thecompany name used to build resources"
}

# owner
variable "owner" {
  type        = string
  description = "Specify the owner of the resource"
}

# description
variable "description" {
  type        = string
  description = "Provide a description of the resource"
}

# environment
variable "environment" {
  type        = string
  default     = "dev"
  description = "This variable defines the environment to be built"
}

#############################
## Github Variables        ##
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

#############################
## Deployment Variables    ##
#############################

# Azure subscription ID
variable "subscription_id" {
  type        = string
  description = "The Azure subscription id"
}

# General module variables
variable "rg_name" {
  type        = string
  description = "Provide a name to give to the resource group"
}

# azure region
variable "location" {
  type        = string
  description = "Azure region where the resource group will be created"
  default     = "canadacentral"
}

variable "tenant_id" {
  type        = string
  description = "The Azure 'tenant id'"
}

#############################
## Application - Variables ##
#############################
# ACR variables
variable acr_name {
  type        = string
  description = "The name used for the Azure Container Registry (ACR)"
}

# PostgreSQL DB variables
variable psql_name {
  type        = string
  description = "The name of the Postgresql database"
}

variable akv_name {
  type        = string
  description = "The name of the Azure Key Vault"
}
