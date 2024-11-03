from unittest.mock import patch, MagicMock
from backend.tests.fixtures import (
    API_GATEWAY_PROXY_EVENT_V2,
    LAMBDA_CONTEXT,
)

from backend.handlers.options import handler


class TestOptionsHandler:

    def test_handler_returns_cors_headers(self):
        response = handler(API_GATEWAY_PROXY_EVENT_V2, LAMBDA_CONTEXT)
        headers = response["headers"]
        for name, value in [
            ("Access-Control-Allow-Origin", "http://localhost:3000"),
            ("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE"),
            ("Access-Control-Allow-Headers", "X-Requested-With"),
        ]:
            assert headers[name] == value
