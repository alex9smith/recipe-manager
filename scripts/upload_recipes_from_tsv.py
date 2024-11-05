import requests
from os import getenv
import csv
from dotenv import load_dotenv

load_dotenv()

API_BASE_URL = getenv("API_BASE_URL")


def upload_recipe(recipe):
    response = requests.post(
        f"{API_BASE_URL}/api/v1/recipes",
        json=recipe,
    )
    print(response.status_code)
    print(response.text)


def parse_ingredients(ingredients: str):
    return [i.strip() for i in ingredients.split(",")]


def parse_row(row):
    match row["type"]:
        case "book":
            source = {"type": "book", "title": row["title"], "page": str(row["page"])}
        case "website":
            source = {"type": "website", "address": row["address"]}
        case _:
            raise ValueError(f"Could not parse source from row: {row}")

    return {
        "name": row["name"],
        "category": row["category"],
        "source": source,
        "difficulty": row["difficulty"],
        "length": row["length"],
        "ingredients": parse_ingredients(row["ingredients"]),
        "tags": [],
    }


if __name__ == "__main__":
    rows = []
    with open("recipes.tsv") as f:
        reader = csv.DictReader(f, delimiter="\t")
        for row in reader:
            rows.append(row)

    for row in rows:
        recipe = parse_row(row=row)
        print(recipe["name"])

        upload_recipe(recipe=recipe)
