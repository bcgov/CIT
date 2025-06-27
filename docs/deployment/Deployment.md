# Deployment Steps for CIT

The intention of this document is to provide steps for deployment of the CIT.

## Good to Know

- The CIT Dev environment is not currently working, the test environment has been configured to use the image 
  tagged with `develop`.
- The CIT workflow is named **"Frontend Build and Push (Test)"**, but it tags and builds the image as `develop`. 
  Nevertheless, with the change above, it is actually pushing to test.
- The build process for the CIT will not succeed if there are any linting errors.
- **CIT actions:** [CIT Actions Workflow](https://github.com/bcgov/CIT/actions/workflows/deploy-dev-web.yml)
- The apps are deployed with NGINX and have no health checks, so they might require a hard refresh for you to see 
  the changes.
- Nevertheless, the NGINX headers have been changed on the `banner` branch. Feel free to use it as a reference 
  and change it in your own branch for users to be able to see the changes immediately.

## Instructions

The following outlines the instructions to deploy to the CIT:

1. Create a branch for the change that you need to do, and commit and push your changes.
2. Depending on the application, visit the action page as per the links above.
3. Trigger the workflow with your branch as the source.
4. Once the build is complete, it should automatically be deployed to dev or test.
5. To promote the image, tag it to the environment:
   - **For the CIT:**
     ```shell
     oc -n [CIT-NAMESPACE]-tools tag cit-frontend:develop cit-frontend:[ENV] (prod)
     ```
6. Wait for the deployment to complete.

### Note:

If the deployment did not automatically trigger, you can manually start a rollout from the deployment in OpenShift.
