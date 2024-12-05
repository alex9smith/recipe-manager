variable "application_name" {
  type    = string
  default = "recipe_manager"
}

variable "dynamodb_table_name" {
  type    = string
  default = "recipe_manager"
}

variable "google_calendar_id" {
  type = string
}