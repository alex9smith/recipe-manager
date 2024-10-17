from sys import path

path.append("../../../backend")
from backend.models.recipe import Recipe, Book

book = Book(title="title", page=1)


class TestRecipe:
    def test_recipe(self):
        recipe = Recipe(name="A recipe", source=book, ingredients=[], tags=[])
        assert recipe.name == "A recipe"
