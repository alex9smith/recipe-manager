from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing import LambdaContext

from backend.models.recipe import Recipe
from backend.services.logger import get_logger

logger = get_logger("create-recipe")


@logger.inject_lambda_context
def handler(event: APIGatewayProxyEventV2, context: LambdaContext) -> dict:
    return {"status": 200}
