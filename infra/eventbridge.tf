data "aws_iam_policy_document" "recipe_manager_scheduler_assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["scheduler.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "recipe_manager_scheduler_role" {
  name               = "recipe_manager_eventbridge_scheduler_role"
  assume_role_policy = data.aws_iam_policy_document.recipe_manager_scheduler_assume_role.json
}

data "aws_iam_policy_document" "recipe_manager_eventbridge_invoke_policy" {
  statement {
    effect = "Allow"
    actions = [
      "lambda:InvokeFunction"
    ]
    resources = [aws_lambda_function.calendar_update.arn]
  }
}

resource "aws_iam_role_policy" "recipe_manager_eventbridge_invoke_policy" {
  name   = "recipe_manager_eventbridge_invoke_lambda_policy"
  role   = aws_iam_role.recipe_manager_scheduler_role.id
  policy = data.aws_iam_policy_document.recipe_manager_eventbridge_invoke_policy.json
}

resource "aws_scheduler_schedule" "recipe_manager_calendar_update_schedule" {
  name = "recipe_manager_calendar_update_schedule"

  flexible_time_window {
    mode = "OFF"
  }

  # Every day at 2AM
  schedule_expression = "cron(0 2 * * ? *)"

  target {
    arn      = aws_lambda_function.calendar_update.arn
    role_arn = aws_iam_role.recipe_manager_scheduler_role.arn
  }
}
