from sys import path
from os import environ
from unittest.mock import Mock

path.append("../../../backend")
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
