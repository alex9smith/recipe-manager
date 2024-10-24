from sys import path
import json
from unittest.mock import patch, MagicMock
from tests.test_backend.fixtures import (
    API_GATEWAY_PROXY_EVENT_V2,
    LAMBDA_CONTEXT,
    RECIPE_DICT,
)
from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2


path.append("../../../../backend")
from backend.handlers.recipes.post import handler


class TestRecipesPostHandler:

    @patch("backend.handlers.recipes.post.Recipe")
    def test_handler_returns_a_dict_with_correct_fields(self, recipe_mock: MagicMock):
        recipe_mock.find_all.return_value = []
        recipe_mock.from_dict.return_value.to_dict.return_value = {}
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)
        for response_key in [
            "body",
            "statusCode",
            "cookies",
            "headers",
            "isBase64Encoded",
        ]:
            assert response_key in response.keys()

    @patch("backend.handlers.recipes.post.Recipe.save")
    def test_handler_saves_the_recipe(self, save_mock: MagicMock):
        handler(
            APIGatewayProxyEventV2({"body": json.dumps(RECIPE_DICT)}), LAMBDA_CONTEXT
        )

        assert save_mock.assert_called_once

    @patch("backend.handlers.recipes.post.Recipe.save")
    def test_handler_includes_the_saved_recipe_in_the_response(
        self, save_mock: MagicMock
    ):
        response = handler(
            APIGatewayProxyEventV2({"body": json.dumps(RECIPE_DICT)}), LAMBDA_CONTEXT
        )
        assert json.loads(response["body"])["recipe"] == RECIPE_DICT
