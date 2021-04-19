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
  default     = "CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01"
}

variable "azure_location" {
  type        = string
  description = "Azure resource group"
  default     = "canadacentral"
}

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