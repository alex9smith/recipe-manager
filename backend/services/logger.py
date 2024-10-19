from aws_lambda_powertools.logging import Logger


def get_logger(lambda_name: str) -> Logger:
    service_name = f"recipe_manager_{lambda_name}"
    return Logger(service=service_name)
