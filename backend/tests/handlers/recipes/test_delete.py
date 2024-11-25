from sys import path
import json
from unittest.mock import patch, MagicMock
from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from backend.tests.fixtures import LAMBDA_CONTEXT
from backend.handlers.recipes.delete import handler

API_GATEWAY_EVENT_WITH_RECIPE_ID = APIGatewayProxyEventV2(
    {"body": "", "pathParameters": {"id": "recipe_id"}}
)


class TestRecipesDeleteHandler:

    @patch("backend.handlers.recipes.delete.Recipe")
    def test_handler_returns_a_dict_with_correct_fields(self, recipe_mock: MagicMock):
        response = handler(API_GATEWAY_EVENT_WITH_RECIPE_ID, LAMBDA_CONTEXT)
        for response_key in [
            "body",
            "statusCode",
            "cookies",
            "headers",
            "isBase64Encoded",
        ]:
            assert response_key in response.keys()

    @patch("backend.handlers.recipes.delete.Recipe")
    def test_handler_calls_delete_on_the_recipe(self, recipe_mock: MagicMock):
        found_recipe_mock = MagicMock()
        recipe_mock.find_one.return_value = found_recipe_mock
        handler(API_GATEWAY_EVENT_WITH_RECIPE_ID, LAMBDA_CONTEXT)

        found_recipe_mock.delete.assert_called_once
