# 001 Initial architecture design

## Considerations

The most important NFR is to minimise ongoing hosting costs.
This application is designed to be used by a single household and we expect usage to be low volume and spiky.

That means any long-running container or provisioned database instance will mostly be sat at zero utilisation and 'wasting' money.

We'll use AWS for hosting so we can make use of any resources in the generous always-free Free Tier.

## Initial design

We'll split the application into a frontend and backend component.

### Frontend

The frontend will be a client side JS application served from S3 / Cloudfront.
All components will be serverless to minimise cost.

We'll need some interactivity on the frontend and possibly the ability to manage user sessions in the future.
This means we can't just serve static HTML and the cost restraint rules out running a containerised frontend with a framework like Express or Flask.
A client side JS frontend can be served simply & cheaply from static files but also provides the interactivity.

S3 isn't included in the Free Tier but the size of data we expect to be storing means it will effectively be free.

### Backend

The backend will be a HTTP REST API using API Gateway and Lambda.
We'll use DynamoDB DB to store the recipes.

Lambda and DynamoDB are both in the Free Tier and our expected usage should be covered.
API Gateway isn't included but our expected usage will cost cents per month which is acceptable.
