##############################
## PostgreSQL Database      ##
##############################

resource "azurerm_postgresql_server" "postgres" {
  name                = "psql-${var.app_suffix}-${var.environment}"
  location            = var.azure_location
  resource_group_name = var.azure_resource_group

  sku_name = "B_Gen5_2"

  storage_mb                   = 5120
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false
  auto_grow_enabled            = true

  administrator_login          = var.psql_username
  administrator_login_password = var.psql_password

  version                 = "11"
  ssl_enforcement_enabled = true

  tags = {
    description = var.description
    environment = var.environment
    owner       = var.owner
  }

}

resource "azurerm_postgresql_firewall_rule" "api-psql-webapp-firewall" {
  name                = "api-webapp"
  resource_group_name = var.azure_resource_group
  server_name         = azurerm_postgresql_server.postgres.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "255.255.255.255"
}

resource "azurerm_postgresql_firewall_rule" "jessica-psql-firewall" {
  name                = "jessica-home"
  resource_group_name = var.azure_resource_group
  server_name         = azurerm_postgresql_server.postgres.name
  start_ip_address    = "165.225.209.47"
  end_ip_address      = "165.225.209.47"
}

resource "azurerm_postgresql_database" "postgres" {
  name                = "cit"
  resource_group_name = var.azure_resource_group
  server_name         = azurerm_postgresql_server.postgres.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}