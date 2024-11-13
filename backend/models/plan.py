from typing import Dict, Optional
from datetime import date, timedelta
from backend.services.dynamodb import DynamoDBClient

EXPIRED_ITEM_AGE = 60

type PlanDict = Dict[str, str | Dict[str, str | Dict[str, str]]]


class Plan:
    def __init__(self, plan: PlanDict):
        self.plan = plan

    def remove_expired_items(self):
        # Remove any items in the plan that are older than EXPIRED_ITEM_AGE days
        new_plan = {}
        expiry_date = date.today() - timedelta(days=EXPIRED_ITEM_AGE)
        for plan_date, planned in self.plan.items():
            if date.fromisoformat(plan_date) >= expiry_date:
                new_plan[plan_date] = planned

        self.plan = new_plan

    @classmethod
    def find(cls) -> Optional["Plan"]:
        client = DynamoDBClient()
        result = client.get_item(partition_key="plan", sort_key="current")
        return Plan(result["plan"]) if result is not None else None

    def save(self) -> None:
        client = DynamoDBClient()
        client.put_item(type="plan", item={"plan": self.plan, "id": "current"})
