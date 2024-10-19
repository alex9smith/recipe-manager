from sys import path
from tests.test_backend.fixtures import API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT

path.append("../../../../backend")
from backend.handlers.recipes.get import handler


class TestRecipesGetHandler:

    def test_handler_returns_a_dict_with_status(self):
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)
        assert response["status"] == 200
