resource "aws_lambda_function" "recipes_get_all" {
  function_name    = "${var.application_name}_recipes_get_all"
  filename         = "../dist/lambda_function_payload.zip"
  role             = aws_iam_role.api_lambda_base_role.arn
  handler          = "backend.handlers.recipes.get_all.handler"
  layers           = [aws_lambda_layer_version.requirements_layer.arn]
  source_code_hash = data.archive_file.lambda.output_base64sha256
  runtime          = "python3.12"
  architectures    = ["arm64"]
  timeout          = 5

  environment {
    variables = {
      DYNAMODB_TABLE_NAME = var.dynamodb_table_name
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.recipe_manager_lambda_logs,
    aws_cloudwatch_log_group.recipe_get_lambda_logs,
  ]
}

resource "aws_cloudwatch_log_group" "recipe_get_lambda_logs" {
  name              = "/aws/lambda/${var.application_name}_recipes_get_all"
  retention_in_days = 7
}

resource "aws_lambda_function" "recipes_post" {
  function_name    = "${var.application_name}_recipes_post"
  filename         = "../dist/lambda_function_payload.zip"
  role             = aws_iam_role.api_lambda_base_role.arn
  handler          = "backend.handlers.recipes.post.handler"
  layers           = [aws_lambda_layer_version.requirements_layer.arn]
  source_code_hash = data.archive_file.lambda.output_base64sha256
  runtime          = "python3.12"
  architectures    = ["arm64"]
  timeout          = 5

  environment {
    variables = {
      DYNAMODB_TABLE_NAME = var.dynamodb_table_name
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.recipe_manager_lambda_logs,
    aws_cloudwatch_log_group.recipe_get_lambda_logs,
  ]
}

resource "aws_cloudwatch_log_group" "recipe_post_lambda_logs" {
  name              = "/aws/lambda/${var.application_name}_recipes_post"
  retention_in_days = 7
}
