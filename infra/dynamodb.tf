resource "aws_dynamodb_table" "table" {
  name         = var.dynamodb_table_name
  billing_mode = "PAY_PER_REQUEST"
  table_class  = "STANDARD"
  hash_key     = "item_type"
  range_key    = "id"

  attribute {
    name = "item_type"
    type = "S"
  }

  attribute {
    name = "id"
    type = "S"
  }

}