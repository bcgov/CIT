<#
.SYNOPSIS
  <Overview of script>
.DESCRIPTION
  <Brief description of script>
.PARAMETER <Parameter_Name>
    <Brief description of parameter input required. Repeat this attribute if required>
.INPUTS
  <Inputs if any, otherwise state None>
.OUTPUTS
  <Outputs if any, otherwise state None - example: Log file stored in C:\Windows\Temp\<name>.log>
.NOTES
  Version:        1.0
  Author:         <Name>
  Creation Date:  <Date>
  Purpose/Change: Initial script development
  
.EXAMPLE
  <Example goes here. Repeat this attribute for more than one example>
#>

[CmdletBinding()]

# PARAM ( 
#     [string]$namespace = 'empr-mds-test'
# )

# Consider adding some comment based help for the script here.

#-------------------------------------------------------------[Setup]------------------=-------------------------------------------
#Set Error Action to Silently Continue
$ErrorActionPreference = "SilentlyContinue"

#-----------------------------------------------------------[Execution]------------------------------------------------------------

az container show --name cit-data-pipeline-prod --resource-group CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01
#az container attach --name cit-data-pipeline --resource-group CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01