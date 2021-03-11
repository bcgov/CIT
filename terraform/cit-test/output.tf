# TODO: maybe we can just inject the secrets directly into AKV since we have all the info here now.
output "rg_name" {
  value       = module.webapp.rg_name
  description = "The Resource Group Name"
}

output "acr_url" {
  value       = module.webapp.acr_url
  description = "The url of the registry"
}

output "acr_admin" {
  value       = module.webapp.acr_admin
  description = "The username of the registry"
}
output "acr_password" {
  value       = module.webapp.acr_password
  description = "The password of the registry"
}

# TODO: Remove this once AKV is fully working
output "db_admin" {
  value       = module.webapp.psql_admin
  description = "The admin PSQL admin user"
}

# TODO: Remove this once AKV is fully working
output "db_password" {
  value       = module.webapp.psql_password
  description = "The admin PSQL admin user password"
}
