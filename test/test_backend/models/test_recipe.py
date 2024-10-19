from sys import path
from unittest.mock import patch, Mock

path.append("../../../backend")
from backend.models.recipe import Recipe, Book

book = Book(title="title", page=1)


class TestRecipe:
    def test_recipe_saves_id(self):
        recipe = Recipe(id="id", name="A recipe", source=book, ingredients=[], tags=[])
        assert recipe.id == "id"

    @patch("backend.models.recipe.uuid4")
    def test_recipe_generates_id_if_none(self, uuid_mock: Mock):
        uuid_mock.return_value = "id"
        recipe = Recipe(name="A recipe", source=book, ingredients=[], tags=[])
        assert recipe.id == "id"
