resource "aws_apigatewayv2_api" "recipe_manager_api" {
  name          = "${var.application_name}_api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "recipes_get" {
  api_id             = aws_apigatewayv2_api.recipe_manager_api.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.recipes_get.invoke_arn
}

resource "aws_apigatewayv2_route" "recipes_get" {
  api_id    = aws_apigatewayv2_api.recipe_manager_api.id
  route_key = "GET /api/v1/recipes"
  target    = "integrations/${aws_apigatewayv2_integration.recipes_get.id}"
}

resource "aws_apigatewayv2_integration" "recipes_post" {
  api_id             = aws_apigatewayv2_api.recipe_manager_api.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.recipes_post.invoke_arn
}

resource "aws_apigatewayv2_route" "recipes_post" {
  api_id    = aws_apigatewayv2_api.recipe_manager_api.id
  route_key = "POST /api/v1/recipes"
  target    = "integrations/${aws_apigatewayv2_integration.recipes_post.id}"
}