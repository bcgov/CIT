output "rg_name" {
  value       = azurerm_resource_group.cit.name
  description = "The Resource Group Name"
}

output "as_id" {
  value       = azurerm_app_service_plan.webapp.id
  description = "The ID of the Azure AppService"
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

output "psql_name" {
  value       = azurerm_postgresql_server.postgres.name
  description = "The name of the Azure PSQL Database Service"
}

# TODO: Pull this out after testing - these credentials are directly stored in AKV and should be pulled from AKV
output "psql_admin" {
  value       = azurerm_postgresql_server.postgres.administrator_login
  description = "This is the admin user id for the PSQL database"
  #sensitive = true
}

output "psql_password" {
  value       = azurerm_postgresql_server.postgres.administrator_login_password
  description = "This is the temp admin password for the init of the PSQL database"
  #sensitive = true
}

output "psql_host" {
  value       = azurerm_postgresql_server.postgres.fqdn
  description = "The hostname of the PSQL server."
}

# output "akv_name" {
#   value       = azurerm_key_vault.akv.name
#   description = "The Azure Key Vault Name"
# }


