##############################
## PostgreSQL Database      ##
##############################

resource "random_string" "db_admin" {
  length  = 8
  special = false
  lower   = true
  upper   = false
  number  = false
}

resource "random_password" "db_password" {
  length  = 16
  special = true
  #override_special = "_%@"
}

resource "azurerm_postgresql_server" "postgres" {
  name                = var.psql_name
  location            = var.azure_location
  resource_group_name = var.azure_resource_group

  sku_name = "B_Gen5_2"

  storage_mb                   = 5120
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false
  auto_grow_enabled            = true

  administrator_login          = random_string.db_admin.result
  administrator_login_password = random_password.db_password.result

  version                 = "11"
  ssl_enforcement_enabled = true

}

resource "azurerm_postgresql_database" "postgres" {
  name                = "cit"
  resource_group_name = var.azure_resource_group
  server_name         = azurerm_postgresql_server.postgres.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}