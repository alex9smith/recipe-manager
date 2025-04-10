from unittest.mock import MagicMock
import json

from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2


LAMBDA_CONTEXT: LambdaContext = MagicMock()
API_GATEWAY_PROXY_EVENT_V2 = APIGatewayProxyEventV2({"body": json.dumps({})})

SOURCE_WEBSITE_DICT = {"type": "website", "address": "address"}
SOURCE_BOOK_DICT = {"type": "book", "page": "1", "title": "title"}

RECIPE_DICT = {
    "id": "id",
    "name": "name",
    "ingredients": ["ingredient"],
    "tags": ["tag"],
    "source": SOURCE_WEBSITE_DICT,
    "difficulty": "easy",
    "length": "under_30",
    "category": "vegetarian",
}

PLAN_DICT = {
    "2024-11-07": {
        "recipe": RECIPE_DICT,
        "notes": "",
    },
    "2024-11-08": {
        "recipe": RECIPE_DICT | {"id": "id2"},
        "notes": "A note",
    },
    "2020-01-01": {
        "recipe": RECIPE_DICT | {"id": "id3"},
        "notes": "",
    },
}
