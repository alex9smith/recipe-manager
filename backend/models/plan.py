from typing import Dict
from backend.models.recipe import Recipe
from backend.services.dynamodb import DynamoDBClient

EXPIRED_ITEM_AGE = 60

type PlanDict = Dict[str, str | Dict[str, str | Dict[str, str]]]


class Plan:
    def __init__(self, plan: PlanDict):
        self.plan = plan
        self.removed_expired = False

    def remove_expired_items(self):
        # Remove any items in the plan that are older than EXPIRED_ITEM_AGE days
        raise NotImplementedError

    @classmethod
    def find(cls) -> "Plan":
        client = DynamoDBClient()
        return client.get_item(partition_key="plan", sort_key="current")

    def save(self) -> None:
        client = DynamoDBClient()
        client.put_item(type="plan", item=self.plan | {"id": "current"})
