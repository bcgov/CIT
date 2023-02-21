# Terraform

This project uses Terraform in order to provision the necessary cloud infrastructure for deploying
the application. The current chosen infrastructure provider is Microsoft Azure. In order to deploy
the application you will need to have an available Azure subscription in which to deploy to.

## Prerequisites
* Terraform CLI
* Azure CLI installed

# Configure Azure CLI
We first need to setup a Azure service principal (account) to allow Terraform Cloud to manage the
Azure resources and the Terraform .tfstate file.

Detailed instructions
[here](https://www.terraform.io/docs/providers/azurerm/guides/service_principal_client_secret.html#configuring-the-service-principal-in-terraform):

## Setting up remote backend

```
az storage account create --resource-group CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01 --name tfstatecit  --sku Standard_LRS --encryption-services blob
az storage account keys list --resource-group CLNPD1-ZCACN-RGP-CITZ-ICT-Cit01 --account-name tfstatecit
az storage container create --name tfstate --account-name tfstatecit --account-key $ACCOUNT_KEY
```

Assumption: AzureCLI is installed

```az login```

get the list of accounts to obtain the "id" of the required account.  This is the subscription id.

```az account list```

use that subscription id to set it as the default for convince.

```az account set -s "be5{redacted}}61283"```
same with setting the default resource group for ease.

az config set defaults.group=CLNPD1-{redacted}-Cit01-Test

Only do this section if this is the first time provisioning this infrastructure

```
# this is creating the data store that will hold the TF-State file
az storage account create --name tfstatecittest  --sku Standard_LRS --encryption-services blob

# Now get the keys we need to access the store:
az storage account keys list --account-name tfstatecittest

# create a container in the newly created datastore. The account-name is the name from the account create above, and the account-key is from the account key list from above.
az storage container create --name tfstate --account-name tfstatecittest --account-key <SECRET-FROM-ACCOUNT-KEY-LIST>

# Create a file that holds the account key (above) in a file for the TF backend to use during init:
cp secrets.backend.template secrets.backend
# edit the file above to Make sure that you have populated the variables.auto.tfvars file with the appropriate secrets

terraform init -backend-config=secrets.backend
```

# Windows
```terraform init -backend-config="secrets.backend"```
