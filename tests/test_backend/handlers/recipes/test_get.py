from sys import path
from unittest.mock import patch, MagicMock
from tests.test_backend.fixtures import (
    API_GATEWAY_PROXY_EVENT_V2,
    LAMBDA_CONTEXT,
    RECIPE_DICT,
)

path.append("../../../../backend")
from backend.handlers.recipes.get import handler
from backend.models.recipe import Recipe


class TestRecipesGetHandler:

    @patch("backend.handlers.recipes.get.Recipe")
    def test_handler_returns_a_dict_with_status(self, recipe_mock: MagicMock):
        recipe_mock.find_all.return_value = []
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)
        assert response["status"] == 200

    @patch("backend.handlers.recipes.get.Recipe")
    def test_handler_returns_a_dict_with_recipes(self, recipe_mock: MagicMock):
        recipe_mock.find_all.return_value = [Recipe.from_dict(RECIPE_DICT)]
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)
        body = response["body"]
        assert body["count"] == 1
        assert body["recipes"][0] == RECIPE_DICT
