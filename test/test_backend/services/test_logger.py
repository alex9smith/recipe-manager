from sys import path
from aws_lambda_powertools.logging import Logger

path.append("../../../backend")
from backend.services.logger import get_logger


logger = get_logger("test")


class TestLogger:

    def test_get_logger_returns_a_logger(self):
        assert isinstance(logger, Logger)

    def test_get_logger_preserves_service_name(self):
        assert logger.name == "recipe_manager_test"
