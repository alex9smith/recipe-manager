from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing import LambdaContext


from backend.models.recipe import Recipe
from backend.services.logger import get_logger
from backend.models.response import APIGatewayResponse

logger = get_logger("recipes-get-one")


@logger.inject_lambda_context
def handler(
    event: APIGatewayProxyEventV2, context: LambdaContext
) -> APIGatewayResponse:
    id = event["pathParameters"]["id"]
    recipe = Recipe.find_one(id=id)
    return APIGatewayResponse.build(body={"recipe": recipe.to_dict()})
