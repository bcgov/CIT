output "acr_name" {
  value       = azurerm_container_registry.default.name
  description = "The url of the Azure Container Registry"
}
output "acr_admin" {
  value       = azurerm_container_registry.default.admin_username
  description = "The name of the Azure Container Registry"
}
output "acr_password" {
  value       = azurerm_container_registry.default.admin_password
  description = "The name of the Azure Container Registry"
}
