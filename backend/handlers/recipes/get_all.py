from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing import LambdaContext


from backend.models.recipe import Recipe
from backend.services.logger import get_logger
from backend.models.response import APIGatewayResponse

logger = get_logger("recipes-get")


@logger.inject_lambda_context
def handler(
    event: APIGatewayProxyEventV2, context: LambdaContext
) -> APIGatewayResponse:
    recipes = Recipe.find_all()
    return APIGatewayResponse.build(
        body={
            "count": len(recipes),
            "recipes": [recipe.to_dict() for recipe in recipes],
        }
    )
