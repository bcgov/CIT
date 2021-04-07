#############################
## Deployment Variables    ##
#############################

variable "environment" {
  type        = string
  description = "Environment being deployed"
  default     = "test"
}

variable "app_name" {
  type        = string
  description = "Environment being deployed"
  default     = "test"
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
## Shared Variables        ##
#############################
        
variable "acr_url" {
  type        = string
  description = "The url of the Azure Container Registry"
}
variable "acr_admin" {
  type        = string
  description = "ACR user for pulling images"
}
variable "acr_password" {
  type        = string
  description = "The password of the ACR user"
}


#############################
## Application Variables   ##
#############################
variable "geocoder_key" {
  type        = string
  description = "The geocoder API key"
}