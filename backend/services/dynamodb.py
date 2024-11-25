from os import getenv
import boto3
from boto3.dynamodb.conditions import Key

from typing import Any, Dict, List, Optional


class DynamoDBClient:
    def __init__(self, table=None):
        self.table_name = getenv("DYNAMODB_TABLE_NAME")
        if self.table_name is None:
            raise ValueError("DYNAMODB_TABLE_NAME must be set")

        self.table = table
        if self.table is None:
            self.resource = boto3.resource("dynamodb")
            self.table = self.resource.Table(self.table_name)

    def find_all(self, partition_key: str) -> List[dict[str, Any]]:
        # TODO - handle multiple pages
        result = self.table.query(
            TableName=self.table_name,
            Select="ALL_ATTRIBUTES",
            KeyConditionExpression=Key("item_type").eq(partition_key),
        )

        return result["Items"]

    def put_item(self, type: str, item: Dict[str, Any]):
        if "id" not in item.keys():
            raise ValueError("Item must have an id")

        self.table.put_item(
            Item={"item_type": type} | item,
            ReturnValues="NONE",
            ReturnConsumedCapacity="NONE",
            ReturnItemCollectionMetrics="NONE",
        )

    def get_item(self, partition_key: str, sort_key: str) -> Optional[dict[str, Any]]:
        result = self.table.get_item(Key={"item_type": partition_key, "id": sort_key})

        if "Item" in result:
            return result["Item"]
        else:
            return None

    def delete_item(self, partition_key: str, sort_key: str) -> None:
        self.table.delete_item(Key={"item_type": partition_key, "id": sort_key})
