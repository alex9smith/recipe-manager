from typing import Any, Dict, List, Optional, TypedDict


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
        headers: Optional[Dict[str, str]] = None,
    ) -> "APIGatewayResponse":
        return {
            "body": body,
            "statusCode": status_code if status_code is not None else 200,
            "cookies": cookies if cookies is not None else [],
            "headers": headers if headers is not None else {},
            "isBase64Encoded": False,
        }
