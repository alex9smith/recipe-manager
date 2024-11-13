import json
from unittest.mock import patch, MagicMock
from backend.tests.fixtures import (
    API_GATEWAY_PROXY_EVENT_V2,
    LAMBDA_CONTEXT,
    PLAN_DICT,
)
from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from backend.models.plan import Plan
from backend.handlers.plan.post import handler


class TestPlanPostHandler:

    @patch("backend.handlers.plan.post.Plan")
    def test_handler_returns_a_dict_with_correct_fields(self, plan_mock: MagicMock):
        plan_mock.return_value = Plan(PLAN_DICT)
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)
        for response_key in [
            "body",
            "statusCode",
            "cookies",
            "headers",
            "isBase64Encoded",
        ]:
            assert response_key in response.keys()

    @patch("backend.handlers.plan.post.Plan.save")
    def test_handler_saves_the_recipe(self, save_mock: MagicMock):
        handler(APIGatewayProxyEventV2({"body": json.dumps(PLAN_DICT)}), LAMBDA_CONTEXT)

        assert save_mock.assert_called_once

    @patch("backend.handlers.plan.post.Plan.save")
    def test_handler_includes_the_saved_recipe_in_the_response(
        self, save_mock: MagicMock
    ):
        response = handler(
            APIGatewayProxyEventV2({"body": json.dumps(PLAN_DICT)}), LAMBDA_CONTEXT
        )
        assert json.loads(response["body"])["plan"] == PLAN_DICT
