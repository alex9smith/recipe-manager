# Recipe manager

An application for a household to manage a list of recipes and help with meal planning.

The backend is an AWS serverless application and designed to run at minimal ongoing cost.
The frontend is a React / Vite single page application that's deployed with Cloudflare pages.

## Set up

1. Create a new Google Cloud project and enable access to the Calendar API. This application uses no paid resources in Google Cloud.
2. Set up an new OAuth consent screen in your Google project, using the domain you'll deploy the frontend to.
3. Create a new service account for the application and save the generated JSON key to the root of this folder as `service-account-google-credentials.json`.
4. Create a new Google Calendar using your main Google account, and share edit permissions with the service account email. Make a note of the calendar ID (listed on the settings page).
5. Install terraform and make sure your AWS credentials are available to it.
6. Deploy the backend:
   1. Navigate to the infrastructure folder `cd infra`.
   2. Copy `example.tfvars` to `production.auto.tfvars` and fill in your calendar ID.
   3. Run `terraform init` to set up the providers
   4. Run `terraform apply` to deploy the backend
   5. Copy the API endpoint URL output - we'll need this to deploy the frontend
7. Deploy the frontend:
   1. Copy `frontend/.env.example` to `frontend/.env` and fill in the variables with the API URL output, OAuth client ID from the Google consent screen and the email addresses of users you want to allow sign in.
   2. Configure the build in Cloudflare Pages, using the Git repository as the source. Make sure to supply the same environment variables.

## Development

### Backend

Create and activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate
```
