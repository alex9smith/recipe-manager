resource "null_resource" "copy_lambda_code" {
  triggers = {
    dir_hash = sha1(join("", [for f in fileset("../backend", "**") : filesha1("../backend/${f}")]))
  }

  provisioner "local-exec" {
    command = "rm -rf ../dist/backend && mkdir ../dist/backend && cp -r ../backend ../dist/backend/backend && cp ../service-account-google-credentials.json ../dist/backend/service-account-google-credentials.json"
  }
}

data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "../dist/backend"
  output_path = "../dist/lambda_function_payload.zip"
  excludes    = ["../dist/backend/backend/tests"]
  depends_on  = [null_resource.copy_lambda_code]
}

resource "null_resource" "pip_install" {
  triggers = {
    shell_hash = "${sha256(file("../requirements.txt"))}"
  }

  provisioner "local-exec" {
    command = "python3 -m pip install -r ../requirements.txt -t ../dist/layer/python"
  }
}

data "archive_file" "requirements_layer" {
  type        = "zip"
  source_dir  = "../dist/layer"
  output_path = "../dist/layer.zip"
  depends_on  = [null_resource.pip_install]
}

resource "aws_lambda_layer_version" "requirements_layer" {
  layer_name          = "${var.application_name}_requirements_layer"
  filename            = data.archive_file.requirements_layer.output_path
  source_code_hash    = data.archive_file.requirements_layer.output_base64sha256
  compatible_runtimes = ["python3.12"]
}


data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "api_lambda_base_role" {
  name               = "api_lambda_base_role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

data "aws_iam_policy_document" "recipe_manager_lambda_logging" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    resources = ["arn:aws:logs:*:*:*"]
  }
}

resource "aws_iam_policy" "lambda_logging" {
  name        = "recipe_manager_lambda_logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"
  policy      = data.aws_iam_policy_document.recipe_manager_lambda_logging.json
}

resource "aws_iam_role_policy_attachment" "recipe_manager_lambda_logs" {
  role       = aws_iam_role.api_lambda_base_role.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

data "aws_iam_policy_document" "dynamodb_table_access" {
  statement {
    effect = "Allow"

    actions = [
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Query",
      "dynamodb:UpdateItem"
    ]

    resources = [aws_dynamodb_table.table.arn]
  }
}

resource "aws_iam_policy" "dynamodb_table_access" {
  name        = "dynamodb_table_access"
  path        = "/"
  description = "IAM policy to allow API lambdas to read from and write to DynamoDB"
  policy      = data.aws_iam_policy_document.dynamodb_table_access.json
}

resource "aws_iam_role_policy_attachment" "dynamodb_table_access" {
  role       = aws_iam_role.api_lambda_base_role.name
  policy_arn = aws_iam_policy.dynamodb_table_access.arn
}

resource "aws_lambda_permission" "apigw_receipes_get_all" {
  action        = "lambda:InvokeFunction"
  function_name = "${var.application_name}_recipes_get_all"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.recipe_manager_api.execution_arn}/*/*"

  depends_on = [
    aws_lambda_function.recipes_get_all,
  ]
}

resource "aws_lambda_permission" "apigw_receipes_post" {
  action        = "lambda:InvokeFunction"
  function_name = "${var.application_name}_recipes_post"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.recipe_manager_api.execution_arn}/*/*"

  depends_on = [
    aws_lambda_function.recipes_post,
  ]
}

resource "aws_lambda_permission" "apigw_receipes_get_one" {
  action        = "lambda:InvokeFunction"
  function_name = "${var.application_name}_recipes_get_one"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.recipe_manager_api.execution_arn}/*/*"

  depends_on = [
    aws_lambda_function.recipes_get_one,
  ]
}

resource "aws_lambda_permission" "apigw_options" {
  action        = "lambda:InvokeFunction"
  function_name = "${var.application_name}_options"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.recipe_manager_api.execution_arn}/*/*"

  depends_on = [
    aws_lambda_function.options,
  ]
}

resource "aws_lambda_permission" "apigw_plan_get" {
  action        = "lambda:InvokeFunction"
  function_name = "${var.application_name}_plan_get"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.recipe_manager_api.execution_arn}/*/*"

  depends_on = [
    aws_lambda_function.plan_get,
  ]
}

resource "aws_lambda_permission" "apigw_plan_post" {
  action        = "lambda:InvokeFunction"
  function_name = "${var.application_name}_plan_post"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.recipe_manager_api.execution_arn}/*/*"

  depends_on = [
    aws_lambda_function.plan_post,
  ]
}

resource "aws_lambda_permission" "apigw_recipes_delete" {
  action        = "lambda:InvokeFunction"
  function_name = "${var.application_name}_recipes_delete"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.recipe_manager_api.execution_arn}/*/*"

  depends_on = [
    aws_lambda_function.recipes_delete,
  ]
}