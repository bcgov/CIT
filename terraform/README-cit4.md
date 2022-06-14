
# What we have done:
 We have created a new set of instructions to gain access to the tfstate file and ensure that everyone is able to havea access to this from start up. 
 Following these steps, much of the infrastructure will be provisioned. However there are still a few to-do's.
 The configuration expects a certain DNS that is being used in the existing resource group where the test and prod resources live.
 A new DNS will need to be assigned and added to the "accept list". The test keycloak instance we are using will also need to accept
 this new DNS. The connection to PowerBI also needs to be made - whether a new PowerBi resource is created or its added to the existing
 one in the other resource group. Many parts of the existing infrastructure seem to be manually created. It would be ideal at some point to 
 add the creation of all resources to terraform. 


===============
# NEW DOCUMENTATION 

Updated Documentation to start from scratch creating the TF state info and using AZ:
# Assumption: AzureCLI is installed 
az login
# get the list of accounts to obtain the "id" of the required account.  This is the subscription id.
az account list
# use that subscription id to set it as the default for convince.
az account set -s "<subscription id>"
# same with setting the default resource group for ease.
az config set defaults.group=<resource group>

# Only do this section if this is the first time provisioning this infrastructure
    # this is creating the data store that will hold the TF-State file
    az storage account create --name tfstatecittest  --sku Standard_LRS --encryption-services blob

    # Now get the keys we need to access the store:
    az storage account keys list --account-name tfstatecittest

    # create a container in the newly created datastore. The account-name is the name from the account create above, and the account-key is from the account key list from above.
    az storage container create --name tfstate --account-name tfstatecittest --account-key <SECRET-FROM-ACCOUNT-KEY-LIST>

# Create a file that holds the account key (above) in a file for the TF backend to use during init:
cp secrets.backend.template secrets.backend
# edit the file above

Copy the `variables.auto.tfvars.template` file and rename it `variables.auto.tfvars`, then
populate the following variables:

* **subscription_id**={Your Azure subscription ID}
* **tenant_id**={tenant}

## Configure Github Repository
Terraform includes a provider which allows us to automatically provision Github Action build secrets
as part of the provisioning process. In order to do this we need a PAT token with repository access.

For a user that has full admin permissions on your Github repository, create a PAT token with the
following permissions.

![Github PAT Permissions](images/github-pat-permissions.png)

Then populate the `variables.auto.tfvars` with the PAT:
* **github_token**= PAT token
* **github_repository**= Github project repository name
* **github_owner**= Github repository owner (group)


terraform init -backend-config=secrets.backend

# Windows
terraform init -backend-config="secrets.backend"

# NOTE: we've obsoleted the "shared" TF function as we're keeping -Test and -Prod resource groups seperate and not going to use the same resources at all.
# TODO: we need to decide how to promote between test and prod.