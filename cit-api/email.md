## Email Integration

CIT 3.0 integrates with BC Government's Common Hosted Email Service (CHES) to send email notifications to EDOs and admins. The documentation for CHES can be found [here](https://getok.nrs.gov.bc.ca/app/documentation) as part of the common services documentation. 

To configure email notifications from the application, you must configure several environment variables, which are described below. You can find example values in the [.env.template](./.env.template) file.

| Variable Name               | Description                                                                                                                                                                                                                                        |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| EMAIL_NOTIFICATIONS_ENABLED | If this is set to "True" (or "true"), all types email notifications will be enabled. If it is set to any other value, or left blank, no email services will be enabled, and all email API endpoints will return error code 503 in the application. |
| EMAIL_AUTH_HOST             | The base URL of the CHES authentication host. This is the server that the application generates the token against using EMAIL_CLIENT_ID and EMAIL_CLIENT_SECRET.                                                                                   |
| EMAIL_SERVICE_HOST          | The base URL of the CHES host. This is the server that the application POSTs to for sending emails.                                                                                                                                                |
| EMAIL_CLIENT_ID             | Client ID for authenticating with the CHES authentication server. Client ID and secret are managed here: https://getok.nrs.gov.bc.ca/app/myApps                                                                                                    |
| EMAIL_CLIENT_SECRET         | Client secret for authenticating with the CHES authentication server. Client ID and secret are managed here: https://getok.nrs.gov.bc.ca/app/myApps                                                                                                |
| EMAIL_SENDING_ADDRESS       | The email address that email notifications are shown as being sent from.                                                                                                                                                                           |
| EMAIL_OPPORTUNITY_LINK_HOST | The base URL of the server that the front end application is hosted on.                                                                                                                                                                            |

There are three types of email notifications sent out by the application using this service. The first two are an email notification sent to all admins on submission of a new opportunity, and an email notification sent to an EDO when their opportunity is published by an admin. These are both sent through calls to their corresponding API endpoints in the back end.

The third type of notification is a recurring notification sent to EDOs with opportunities that have not been modified in over 90 days. This is done through the [`send-reminders.sh`](./send-email-reminders.sh). When run, this script uses `manage.py` to run a python script that checks the last modified date for all opportunities in the database, and sends email notifications to the EDOs with submitted opportunities that have not been modified for 90 days. This script is run weekly in an Azure container that is started via an Azure Logic App to help ensure EDOs are keeping their opportunity information current.

CIT-4.0 Update

The send-reminders.sh script is now run weekly through a Github Action. The script for this action is under the .github/workflows folder and is called user-tracking-email.yml. The Azure Logic App that was previously running the script, can be decomissioned. 