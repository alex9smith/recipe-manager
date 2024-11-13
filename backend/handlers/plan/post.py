from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing import LambdaContext
import json

from backend.models.plan import Plan
from backend.services.logger import get_logger
from backend.models.response import APIGatewayResponse

logger = get_logger("plan-post")


@logger.inject_lambda_context
def handler(
    event: APIGatewayProxyEventV2, context: LambdaContext
) -> APIGatewayResponse:
    body = json.loads(event["body"])
    plan = Plan(body)
    plan.save()

    return APIGatewayResponse.build(body={"plan": plan.plan})
