from aws_lambda_powertools.utilities.data_classes import APIGatewayProxyEventV2
from aws_lambda_powertools.utilities.typing import LambdaContext

from backend.models.plan import Plan
from backend.services.calendar import CalendarService
from backend.services.logger import get_logger

logger = get_logger("calendar-update")


@logger.inject_lambda_context
def handler(event: APIGatewayProxyEventV2, context: LambdaContext):
    calendar = CalendarService()
    plan = Plan.find()
    if plan:
        calendar.update_with_plan(plan=plan)
