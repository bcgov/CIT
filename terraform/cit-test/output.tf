# # TODO: maybe we can just inject the secrets directly into AKV since we have all the info here now.
# output "db_admin" {
#   value       = azurerm_postgresql_server.postgres.administrator_login
#   description = "The admin PSQL admin user"
# }

# # TODO: Remove this once AKV is fully working
# output "db_password" {
#   value       = azurerm_postgresql_server.postgres.administrator_login_password
#   description = "The admin PSQL admin user password"
#   sensitive   = true
# }
