from sys import path
from os import environ
from unittest.mock import Mock
from pytest import raises

from backend.tests.fixtures import RECIPE_DICT
from backend.services.dynamodb import DynamoDBClient


class TestDynamoDBClient:

    def test_client_reads_table_name_from_env(self):
        environ["DYNAMODB_TABLE_NAME"] = "TEST"
        client = DynamoDBClient()
        assert client.table_name == environ["DYNAMODB_TABLE_NAME"]
        del environ["DYNAMODB_TABLE_NAME"]

    def test_find_all_passes_partition_key(self):
        environ["DYNAMODB_TABLE_NAME"] = "TEST"
        table_mock = Mock()
        table_mock.query.return_value = {"Items": []}

        client = DynamoDBClient(table=table_mock)
        client.find_all(partition_key="test")

        table_mock.query.assert_called_once
        del environ["DYNAMODB_TABLE_NAME"]

    def test_put_item_raises_when_id_missing(self):
        environ["DYNAMODB_TABLE_NAME"] = "TEST"
        table_mock = Mock()

        client = DynamoDBClient(table=table_mock)
        with raises(ValueError):
            client.put_item(type="test", item={})

        del environ["DYNAMODB_TABLE_NAME"]

    def test_put_item_passes_to_dynamo_resource(self):
        environ["DYNAMODB_TABLE_NAME"] = "TEST"
        table_mock = Mock()
        table_mock.put_item.return_value = {}

        client = DynamoDBClient(table=table_mock)
        client.put_item(type="test", item=RECIPE_DICT)

        table_mock.put_item.assert_called_once

        del environ["DYNAMODB_TABLE_NAME"]

    def test_get_item_returns_none_if_no_match(self):
        environ["DYNAMODB_TABLE_NAME"] = "TEST"
        table_mock = Mock()
        table_mock.get_item.return_value = {}

        client = DynamoDBClient(table=table_mock)
        item = client.get_item(partition_key="partition_key", sort_key="sort_key")

        table_mock.get_item.assert_called_once
        assert item is None

        del environ["DYNAMODB_TABLE_NAME"]

    def test_get_item_returns_one_item(self):
        environ["DYNAMODB_TABLE_NAME"] = "TEST"
        mock_item = {"item_key": "item_value"}
        table_mock = Mock()
        table_mock.get_item.return_value = {"Item": mock_item}

        client = DynamoDBClient(table=table_mock)
        item = client.get_item(partition_key="partition_key", sort_key="sort_key")

        table_mock.get_item.assert_called_once
        assert item == mock_item

        del environ["DYNAMODB_TABLE_NAME"]
