import json
from typing import Any, Dict, List, Optional, TypedDict

DEFAULT_HEADERS = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
    "Access-Control-Allow-Headers": "X-Requested-With, Accept, Content-Type",
}


class APIGatewayResponse(TypedDict):
    statusCode: int
    body: Dict[str, Any]
    cookies: List[str]
    isBase64Encoded: bool
    headers: Dict[str, str]

    @classmethod
    def build(
        cls,
        body: Dict[str, Any],
        status_code: Optional[int] = None,
        cookies: Optional[List[str]] = None,
        headers: Dict[str, str] = {},
    ) -> "APIGatewayResponse":
        return {
            "body": json.dumps(body),
            "statusCode": status_code if status_code is not None else 200,
            "cookies": cookies if cookies is not None else [],
            "headers": DEFAULT_HEADERS | headers,
            "isBase64Encoded": False,
        }
