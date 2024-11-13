from typing import Dict
from datetime import date, timedelta
from backend.services.dynamodb import DynamoDBClient

EXPIRED_ITEM_AGE = 60

type PlanDict = Dict[str, str | Dict[str, str | Dict[str, str]]]


class Plan:
    def __init__(self, plan: PlanDict):
        self.plan = plan
        self.removed_expired = False

    def remove_expired_items(self):
        # Remove any items in the plan that are older than EXPIRED_ITEM_AGE days
        new_plan = {}
        expiry_date = date.today() - timedelta(days=EXPIRED_ITEM_AGE)
        for plan_date, planned in self.plan.items():
            if date.fromisoformat(plan_date) >= expiry_date:
                new_plan[plan_date] = planned
            else:
                self.removed_expired = True

        self.plan = new_plan

    @classmethod
    def find(cls) -> "Plan":
        client = DynamoDBClient()
        return client.get_item(partition_key="plan", sort_key="current")

    def save(self) -> None:
        if self.removed_expired:
            client = DynamoDBClient()
            client.put_item(type="plan", item=self.plan | {"id": "current"})
