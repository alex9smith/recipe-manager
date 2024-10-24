from sys import path
import json

path.append("../../../backend")
from backend.models.response import APIGatewayResponse, DEFAULT_HEADERS


class TestAPIGatewayResponse:
    def test_build_returns_all_keys(self):
        body = {"body_key": "body_value"}
        status_code = 301
        cookies = ["a cookie"]
        headers = {"header_key": "header_value"}

        output = APIGatewayResponse.build(
            body=body, status_code=status_code, cookies=cookies, headers=headers
        )

        assert output["body"] == json.dumps(body)
        assert output["cookies"] == cookies
        assert output["statusCode"] == status_code
        assert output["headers"] == DEFAULT_HEADERS | headers

    def test_build_returns_optional_fields_as_defaults(self):
        body = {"body_key": "body_value"}

        output = APIGatewayResponse.build(body=body)

        assert output["cookies"] == []
        assert output["statusCode"] == 200
        assert output["headers"] == DEFAULT_HEADERS

    def test_build_returns_base64_key_as_false(self):
        body = {"body_key": "body_value"}

        output = APIGatewayResponse.build(body=body)

        assert output["isBase64Encoded"] == False
