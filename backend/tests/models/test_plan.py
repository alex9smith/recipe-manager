from pytest import fixture
from unittest.mock import patch, MagicMock
from os import environ
from freezegun import freeze_time
from backend.tests.fixtures import PLAN_DICT
from backend.models.plan import Plan


@fixture(autouse=True)
def set_up_and_teardown():
    environ["DYNAMODB_TABLE_NAME"] = "TEST"
    yield
    del environ["DYNAMODB_TABLE_NAME"]


class TestPlan:
    def test_plan_keeps_passed_plan(self):
        plan = Plan(PLAN_DICT)
        assert plan.plan == PLAN_DICT

    @patch("backend.models.plan.DynamoDBClient")
    def test_save_inserts_item_id(self, dynamo_mock: MagicMock):
        plan = Plan(PLAN_DICT)
        plan.save()

        dynamo_mock.return_value.put_item.assert_called_once_with(
            type="plan", item=PLAN_DICT | {"id": "current"}
        )

    @patch("backend.models.plan.DynamoDBClient")
    def test_find_calls_dynamo_client_with_correct_ids(self, dynamo_mock: MagicMock):
        plan = Plan.find()

        dynamo_mock.return_value.get_item.assert_called_once_with(
            partition_key="plan", sort_key="current"
        )

    @freeze_time("2024-12-01")
    def test_remove_expired_drops_old_items(self):
        plan = Plan(PLAN_DICT)
        assert len(plan.plan) == 3

        plan.remove_expired_items()
        assert len(plan.plan) == 2

    @freeze_time("2020-01-01")
    def test_remove_expired_doesnt_remove_items_when_none_are_expired(self):
        plan = Plan(PLAN_DICT)
        assert len(plan.plan) == 3

        plan.remove_expired_items()
        assert len(plan.plan) == 3
