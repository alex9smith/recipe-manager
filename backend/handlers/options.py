from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing import LambdaContext


from backend.services.logger import get_logger
from backend.models.response import APIGatewayResponse

logger = get_logger("options")


@logger.inject_lambda_context
def handler(
    event: APIGatewayProxyEventV2, context: LambdaContext
) -> APIGatewayResponse:
    return APIGatewayResponse.build(
        body={"message": "options response"},
    )
