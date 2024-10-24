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
    def test_handler_returns_a_dict_with_status(self, recipe_mock: MagicMock):
        recipe_mock.find_all.return_value = []
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)
        assert response["status"] == 200

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
        assert response["body"]["recipe"] == RECIPE_DICT
