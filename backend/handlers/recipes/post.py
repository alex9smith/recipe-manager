from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing import LambdaContext
import json

from backend.models.recipe import Recipe
from backend.services.logger import get_logger

logger = get_logger("recipes-post")


@logger.inject_lambda_context
def handler(event: APIGatewayProxyEventV2, context: LambdaContext) -> dict:
    body = json.loads(event.body)
    recipe = Recipe.from_dict(body)
    recipe.save()

    return {
        "status": 200,
    }
