# Setting up REST OAuth tokens for Azure and Power BI

We are currently using the **Service Principal** method to deploy PowerBI onto the website. A Service Principal is the `local representation` of a global application object. In other words, Service Principal is a concrete instance from the application object and inherits certain properties from that application object. This means that we first need an **Application Object** to use a Service Principal.

## App Registration (Application Object) & Security Groups

We first need an **App Registration**, which acts as a blueprint to create `Service Principal` objects. We can perform the follwing steps to achieve this.

1. Log in to the [Azure portal](https://portal.azure.com/).
2. Go to `App Registrations`
3. Click `New Registration`
4. Fill out the form. (Single Tenant recommended)

Once this is done, we should be given details such as `Application ID`, `Tenant ID` and etc. Since we have a application object now, we need to configure this application object to contain the permissions and settings that we intend to use it for, so the instances of our Service Principal will be valid for whatever we want to perform. For the **CIT** we want one main purpose. To use the **PowerBI Rest API**. In order to do this, we need to let this App Registration know about it.

1. Click `API Permissions` on from the left menu inside the App
2. Click `Add Permissions`
3. Click `Power Bi Service`
4. Click `Delegated Permissions`
5. Select everything besides **Tenant**, **UserState**, **Group** and **Metadata**
6. Click `Add Permissions`

We also need something called a **Client Secret**. This will be the proof that an owner has access to this App registration.

1. Click `Certificates & Secrets` from the left menu inside the App
2. Under Client Secrets, click `New Client Secret`
3. Fill out the form, we recommend `Never` as expiry date.
4. Click `Add`
5. You will be shown the **Client Secret Value** one time here, **make sure you save this value**

We have now defined the capabilities this application has, and we need now to give service principal **access** to it.
We believe this can be done in either two ways.

1. Create an [Azure AD Security Group](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-groups-create-azure-portal), and add the service principal to that security group (More on the next section)
2. Or, in your application, click `Api Permissions` and click `Grant admin consent ******` button.

**TODO: This detail needs to confirmed, we may need to perform both actions**

## Adding service principal to the security group

1. Go to `Power BI Embedded` through the Azure Portal
2. Select `Add` and create an instance depending on the processing requirements (A1 low, A2 medium... etc)

**This service is pay per use and will begin billing once started. It can be paused to save cost.**

1. Log in to the [Power BI portal](powerbi.microsoft.com)
2. Click the cog at the top right and select `Admin Portal`
3. Click `Tenant Settings` then scroll to `Developer Settings`
4. Expand `Allow service principals to use Power BI APIs`
5. Make sure `Enabled` is selected. Then click `Apply to Specific Security Groups`.
6. Add the security group created above.
7. Click `apply`
9. Go back to the `Admin Portal` then select `Workspaces`
10. Select a workspace, then click the `3 dots` then click `access`
11. Enter the Service Principal (App Display Name) in the box. Select `Admin` then click `Add`.

## Assigning Capacity

1. Log in to the [Power BI portal](powerbi.microsoft.com)
2. Click the cog at the top right and select `Admin Portal`
3. Click `Capacity Settings`
4. Click `Power BI Embedded`

If the instance is already made in Azure, there should be a capacity shown here, if it is greyed out, it is probably Paused. Go to back to Azure Portal and Start it. Once its started you can hit the name on the far left, just under `Capacity Name`

At the bottom of the page on the right you can click `Assign workspaces`, You can select `Specific workspace` and type the one you like. Or you can go to the far left, in the main powerbi menu, select the workspace tab, and under the workspace you want you can select the 4 dots in the side menu and select worskpace settings, you should be able to set the capacity in the `Advanced` drop down, you can select the Azure capacity in a list.

*Note, if you want to pause the Azure Power BI Instance, it will prevent the page from loading. In a Dev environment, it is useful to run everything on the free service so you can leave it up 24/7 without paying. In order to unassign the workspace from the capacity, either go into the capacity settings (the capacity MUST be active for you to access this page), or in the workspace tab on the left, under the 4 dot menu, you can uncheck [Dedicated capacity] in the advanced tab.*

We should now be configured deploy the application. This is an extensive setup, however it should be a one-time setup.
The following environment variables should be updated in `.env`
```
TENANT_ID=
CLIENT_ID=
CLIENT_SECRET=
```

`TENANT_ID`, `CLIENT_ID`, `CLIENT_SECRET` are all available in `App Registrations -> Application created above`.


## PowerBI REST API OAuth tokens
---

We use the [msal](https://github.com/AzureAD/microsoft-authentication-library-for-python) library for Python to generate OAuth access tokens. To generate a token, send a GET request to `/api/token/`, which will return a JSON object in the following format:

```
{
    "access_token": "[OAUTH ACCESS TOKEN]"
}
```

These access tokens have an expiry time of one hour and are cached in the session. If a token that expires in 30 minutes or later exists, calling the API again will return the existing token.
This token is used in the Authorization header when using the PowerBI REST API:

`Authorization: Bearer [OAUTH ACCESS TOKEN]`

This token is now consumed in the frontend and is added whenever we make a PowerBI Rest API Call.

