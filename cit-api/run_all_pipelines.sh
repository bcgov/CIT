#!/bin/bash

# Script to run all Django management commands from the provided list

# Ensure the script exits on any error
set -e

# Log file to capture output and errors
LOG_FILE="django_commands_log.txt"
echo "Starting execution of Django management commands at $(date)" > "$LOG_FILE"

# Function to run a command and log its output
run_command() {
    local cmd="$1"
    echo "Running: $cmd" | tee -a "$LOG_FILE"
    if $cmd >> "$LOG_FILE" 2>&1; then
        echo "Success: $cmd" | tee -a "$LOG_FILE"
    else
        echo "Error: $cmd failed. Check $LOG_FILE for details." | tee -a "$LOG_FILE"
    fi
    echo "----------------------------------------" >> "$LOG_FILE"
}

# List of Django management commands with underscores
commands=(
    "python3 manage.py import_community_descriptions"
    # "python3 manage.py import_csv"
    "python3 manage.py import_data_sources"
    # "python3 manage.py import_databc"
    # "python3 manage.py import_shp"
    "python3 manage.py bucket_1_census_divisions"
    "python3 manage.py bucket_1_census_subdivisions_2016"
    "python3 manage.py bucket_1_census_subdivisions"
    "python3 manage.py bucket_2_connectivity_projects"
    "python3 manage.py bucket_2_core_housing_need"
    "python3 manage.py bucket_2_csd_centroid"
    "python3 manage.py bucket_2_housing"
    "python3 manage.py bucket_2_municipal_land_title_transfers"
    "python3 manage.py bucket_2_municipal_tax_rates"
    "python3 manage.py bucket_2_municipalities"
    "python3 manage.py bucket_2_naics_codes"
    "python3 manage.py bucket_2_nbd_phh_speeds"
    "python3 manage.py bucket_2_phdemographic"
    "python3 manage.py bucket_2_regional_districts"
    "python3 manage.py bucket_2_school_districts"
    "python3 manage.py bucket_2_small_businesses"
    "python3 manage.py bucket_2_tourism_region"
    "python3 manage.py bucket_2_tsunami_zones"
    "python3 manage.py bucket_2_wildfire_zones"
    "python3 manage.py bucket_3"
    "python3 manage.py bucket_4_monthly"
    "python3 manage.py bucket_4_semiannually"
    "python3 manage.py bucket_5_airports"
    "python3 manage.py bucket_5_civic_facilities"
    "python3 manage.py bucket_5_clinics"
    "python3 manage.py bucket_5_customs_ports_of_entry"
    "python3 manage.py bucket_5_diagnostic_facilities"
    "python3 manage.py bucket_5_emergency_social_service_facilities"
    "python3 manage.py bucket_5_hospitals"
    "python3 manage.py bucket_5_laboratory_service"
    "python3 manage.py bucket_5_local_govt_offices"
    "python3 manage.py bucket_5_monthly"
    "python3 manage.py bucket_5_pharmacies"
    "python3 manage.py bucket_5_port_and_terminal"
    "python3 manage.py bucket_5_public_library"
    "python3 manage.py bucket_5_schools"
    # below runs all bucket_5 commands
    # "python3 manage.py bucket_5_semiannually"
    "python3 manage.py bucket_5_servicebc_locations"
    "python3 manage.py bucket_5_timber_facilities"
    "python3 manage.py bucket_7_bc_network_connectivity"
    "python3 manage.py bucket_7_bc_wildfire_zones"
    "python3 manage.py bucket_7"
)

# Check if manage.py exists in the current directory
if [ ! -f "manage.py" ]; then
    echo "Error: manage.py not found in the current directory. Please run this script from the Django project root."
    exit 1
fi

# Check if python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: python3 is not installed or not found in PATH."
    exit 1
fi

# Run each command
for cmd in "${commands[@]}"; do
    run_command "$cmd"
done

echo "All commands executed. Check $LOG_FILE for details." | tee -a "$LOG_FILE"
echo "Execution completed at $(date)" >> "$LOG_FILE"