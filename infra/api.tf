resource "aws_apigatewayv2_api" "recipe_manager_api" {
  name          = "${var.application_name}_api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.recipe_manager_api.id
  name        = "$default"
  auto_deploy = "true"
}

resource "aws_apigatewayv2_integration" "options" {
  api_id                 = aws_apigatewayv2_api.recipe_manager_api.id
  integration_type       = "AWS_PROXY"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.options.invoke_arn
}

resource "aws_apigatewayv2_route" "options" {
  api_id    = aws_apigatewayv2_api.recipe_manager_api.id
  route_key = "OPTIONS /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.options.id}"
}

resource "aws_apigatewayv2_integration" "recipes_get_all" {
  api_id                 = aws_apigatewayv2_api.recipe_manager_api.id
  integration_type       = "AWS_PROXY"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.recipes_get_all.invoke_arn
}

resource "aws_apigatewayv2_route" "recipes_get_all" {
  api_id    = aws_apigatewayv2_api.recipe_manager_api.id
  route_key = "GET /api/v1/recipes"
  target    = "integrations/${aws_apigatewayv2_integration.recipes_get_all.id}"
}

resource "aws_apigatewayv2_integration" "recipes_post" {
  api_id                 = aws_apigatewayv2_api.recipe_manager_api.id
  integration_type       = "AWS_PROXY"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.recipes_post.invoke_arn
}

resource "aws_apigatewayv2_route" "recipes_post" {
  api_id    = aws_apigatewayv2_api.recipe_manager_api.id
  route_key = "POST /api/v1/recipes"
  target    = "integrations/${aws_apigatewayv2_integration.recipes_post.id}"
}

resource "aws_apigatewayv2_integration" "recipes_get_one" {
  api_id                 = aws_apigatewayv2_api.recipe_manager_api.id
  integration_type       = "AWS_PROXY"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.recipes_get_one.invoke_arn
}

resource "aws_apigatewayv2_route" "recipes_get_one" {
  api_id    = aws_apigatewayv2_api.recipe_manager_api.id
  route_key = "GET /api/v1/recipes/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.recipes_get_one.id}"
}

resource "aws_apigatewayv2_integration" "recipes_delete" {
  api_id                 = aws_apigatewayv2_api.recipe_manager_api.id
  integration_type       = "AWS_PROXY"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.recipes_delete.invoke_arn
}

resource "aws_apigatewayv2_route" "recipes_delete" {
  api_id    = aws_apigatewayv2_api.recipe_manager_api.id
  route_key = "DELETE /api/v1/recipes/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.recipes_delete.id}"
}

resource "aws_apigatewayv2_integration" "plan_get" {
  api_id                 = aws_apigatewayv2_api.recipe_manager_api.id
  integration_type       = "AWS_PROXY"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.plan_get.invoke_arn
}

resource "aws_apigatewayv2_route" "plan_get" {
  api_id    = aws_apigatewayv2_api.recipe_manager_api.id
  route_key = "GET /api/v1/plan"
  target    = "integrations/${aws_apigatewayv2_integration.plan_get.id}"
}

resource "aws_apigatewayv2_integration" "plan_post" {
  api_id                 = aws_apigatewayv2_api.recipe_manager_api.id
  integration_type       = "AWS_PROXY"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.plan_post.invoke_arn
}

resource "aws_apigatewayv2_route" "plan_post" {
  api_id    = aws_apigatewayv2_api.recipe_manager_api.id
  route_key = "POST /api/v1/plan"
  target    = "integrations/${aws_apigatewayv2_integration.plan_post.id}"
}