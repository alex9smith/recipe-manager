from sys import path
import json
from unittest.mock import patch, MagicMock
from tests.test_backend.fixtures import (
    API_GATEWAY_PROXY_EVENT_V2,
    LAMBDA_CONTEXT,
    RECIPE_DICT,
)

path.append("../../../../backend")
from backend.handlers.recipes.get_all import handler
from backend.models.recipe import Recipe


class TestRecipesGetAllHandler:

    @patch("backend.handlers.recipes.get_all.Recipe")
    def test_handler_returns_a_dict_with_correct_fields(self, recipe_mock: MagicMock):
        recipe_mock.find_all.return_value = []
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)
        for response_key in [
            "body",
            "statusCode",
            "cookies",
            "headers",
            "isBase64Encoded",
        ]:
            assert response_key in response.keys()

    @patch("backend.handlers.recipes.get_all.Recipe")
    def test_handler_returns_a_dict_with_recipes(self, recipe_mock: MagicMock):
        recipe_mock.find_all.return_value = [Recipe.from_dict(RECIPE_DICT)]
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)
        body = json.loads(response["body"])
        assert body["count"] == 1
        assert body["recipes"][0] == RECIPE_DICT
