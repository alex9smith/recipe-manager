from unittest.mock import MagicMock

from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2


LAMBDA_CONTEXT: LambdaContext = MagicMock()
API_GATEWAY_PROXY_EVENT_V2 = APIGatewayProxyEventV2({})
