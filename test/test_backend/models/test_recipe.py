from sys import path

path.append("../../../backend")
from backend.models.recipe import Recipe


class TestRecipe:
    def test_recipe(self):
        recipe: Recipe = {"name": "A recipe"}
        assert recipe["name"] == "A recipe"
