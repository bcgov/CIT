output "rg_name" {
  value       = azurerm_resource_group.cit.name
  description = "The Resource Group Name"
}
output "acr_url" {
  value       = azurerm_container_registry.acr.login_server
  description = "The url of the Azure Container Registry"
}
output "acr_admin" {
  value       = azurerm_container_registry.acr.admin_username
  description = "The name of the Azure Container Registry"
}
output "acr_password" {
  value       = azurerm_container_registry.acr.admin_password
  description = "The name of the Azure Container Registry"
}
