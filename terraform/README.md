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

Basically do this: `az login` `az account list` If there's several subscriptions then you may need
to specify which subscription you wish to use. `az account set --subscription="SUBSCRIPTION_ID"`

We need to create a custom role for the service principal to be able to provision read access to the
container registry. You can do this by running this command:

```
az role definition create --role-definition '{
  "Name": "Provisioner",
  "IsCustom": true,
  "Description": "Custom role to provision Azure resources", "IsCustom": true,
  "Actions": [
    "Microsoft.Authorization/roleAssignments/read",
    "Microsoft.Authorization/roleAssignments/write",
    "Microsoft.Authorization/roleAssignments/delete"
  ],
  "AssignableScopes": [
    "/subscriptions/SUBSCRIPTION_ID"
  ]
}'
```

Let's now create the service principal `az ad sp create-for-rbac --rol="Contributor"
--scopes="/subscriptions/SUBSCRIPTION_ID"`

This will output the following cable

```{
  "appId": "00000000-0000-0000-0000-000000000000",
  "displayName": "azure-cli-2017-06-05-10-41-15",
  "name": "http://azure-cli-2017-06-05-10-41-15",
  "password": "0000-0000-0000-0000-000000000000",
  "tenant": "00000000-0000-0000-0000-000000000000"
}
```

which maps to:
* appId is the client_id defined above.
* password is the client_secret defined above.
* tenant is the tenant_id defined above.

Now we need to assign the service principal the custom role we created above
```
az role assignment create --role "Provisioner" --assignee CLIENT_ID
```

Confirm the creation of the service principal: `az login --service-principal -u CLIENT_ID -p
CLIENT_SECRET --tenant TENANT_ID`

see what you can see: `az vm list-sizes --location westus`

then log out of the service principal `az logout`

Finally, copy the `variables.auto.tfvars.template` file and rename it `variables.auto.tfvars`, then
populate the following variables:

* **subscription_id**={Your Azure subscription ID} 
* **tenant_id**={tenant}
* **client_id**={appId}
* **client_secret**={password} - displayed when the service account was created **ensure the
  client_secret is set to "sensitive"**
  }


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

## Configure Github Actions

Enable the github action for publishing the API and webapp to Azure Container Registry (ACR) by
renaming the `acr-publish.yml.disabled` file in `.github/workflows` folder to `acr-publish.yml`.

NOTE: This action will fail until you have provisioned the ACR as part of the Terraform provisioning
process.


# How to Deploy to Azure

Once you have configured your Azure CLI and populated the `varaibles.auto.tfvars` file with your
Azure and Github credentials, you can perform the following steps to provision the infrastrcutre
necessary for deploying the app.

First, change into the `terraform` directory of this repository and then perform these commands.

1. `terraform init`
2. `terraform plan`
3. `terraform apply`

Once this has been completed, when you push a change to the 'main' branch it will automatically
build and push your frontend and backend images to the provisioned Azure Container Registry.

**NOTE**: You will need to manually enable continuous delivery on the AppServices through the Azure
portal in order to automatically deploy new changes (including initial deploy).

# How to delete all resources

Once you're finished, you may remove all resources provisioned with the following command.

`terraform destroy`

NOTE: This requires a maintained `.tfstate` file that was created in provisioning the resources in
the first place. Still looking at how to maintain this either via VCS or Terraform Cloud.
