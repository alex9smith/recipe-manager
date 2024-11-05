from sys import path
from os import getenv
import requests
from dotenv import load_dotenv

load_dotenv()

API_BASE_URL = getenv("API_BASE_URL")

response = requests.post(
    f"{API_BASE_URL}/api/v1/recipes",
    json={
        "id": "id",
        "name": "name",
        "ingredients": ["ingredient"],
        "tags": ["tag"],
        "source": {"type": "website", "address": "address"},
        "difficulty": "easy",
        "length": "under_30",
        "category": "vegetarian",
    },
)

print(response.content)
