from os import environ
import json
from unittest.mock import patch, MagicMock
from pytest import fixture
from backend.tests.fixtures import (
    API_GATEWAY_PROXY_EVENT_V2,
    LAMBDA_CONTEXT,
    PLAN_DICT,
)
from backend.handlers.plan.get import handler
from backend.models.plan import Plan


@fixture(autouse=True)
def set_up_and_teardown():
    environ["DYNAMODB_TABLE_NAME"] = "TEST"
    yield
    del environ["DYNAMODB_TABLE_NAME"]


class TestPlanGetHandler:

    @patch("backend.handlers.plan.get.Plan")
    def test_handler_returns_a_dict_with_correct_fields(self, plan_mock: MagicMock):
        plan_mock.find.return_value = None
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)
        for response_key in [
            "body",
            "statusCode",
            "cookies",
            "headers",
            "isBase64Encoded",
        ]:
            assert response_key in response.keys()

    @patch("backend.handlers.plan.get.Plan")
    def test_handler_returns_a_dict_with_plan(self, plan_mock: MagicMock):
        plan_mock.find.return_value.plan = PLAN_DICT
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)
        body = json.loads(response["body"])
        assert body["plan"] == PLAN_DICT

    @patch("backend.handlers.plan.get.Plan")
    def test_handler_deletes_expired_items_then_saves(self, plan_mock: MagicMock):
        plan_mock.find.return_value.plan = PLAN_DICT
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)

        plan_mock.remove_expired_item.assert_called_once
        plan_mock.save.assert_called_once
