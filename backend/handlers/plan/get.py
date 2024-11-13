from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing import LambdaContext


from backend.models.plan import Plan
from backend.services.logger import get_logger
from backend.models.response import APIGatewayResponse

logger = get_logger("plan-get")


@logger.inject_lambda_context
def handler(
    event: APIGatewayProxyEventV2, context: LambdaContext
) -> APIGatewayResponse:

    plan = Plan.find()
    if plan is not None:
        plan.remove_expired_items()
        plan.save()

    return APIGatewayResponse.build(
        body={"plan": plan.plan if plan is not None else {}}
    )
