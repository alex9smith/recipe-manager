from sys import path
from copy import deepcopy
from unittest.mock import patch, MagicMock, Mock
from pytest import raises
from tests.test_backend.fixtures import (
    RECIPE_DICT,
    SOURCE_BOOK_DICT,
    SOURCE_WEBSITE_DICT,
)

path.append("../../../backend")
from backend.models.recipe import Recipe, Book, SourceType, Website

book = Book(title="title", page=1)


class TestSource:
    def test_website_to_dict(self):
        source = Recipe._source_from_dict(SOURCE_WEBSITE_DICT)
        assert SOURCE_WEBSITE_DICT == source.to_dict()

    def test_book_to_dict(self):
        source = Recipe._source_from_dict(SOURCE_BOOK_DICT)
        assert SOURCE_BOOK_DICT == source.to_dict()


class TestRecipe:

    @patch("backend.models.recipe.DynamoDBClient")
    def test_recipe_saves_id(self, dynamodb_mock: Mock):
        recipe = Recipe(
            id="id",
            name="A recipe",
            source=book,
            ingredients=[],
            tags=[],
            difficulty="easy",
            length="under_30",
        )
        assert recipe.id == "id"

    @patch("backend.models.recipe.DynamoDBClient")
    @patch("backend.models.recipe.uuid4")
    def test_recipe_generates_id_if_none(self, uuid_mock: Mock, dynamodb_mock: Mock):
        uuid_mock.return_value = "generated_id"
        recipe = Recipe(
            name="A recipe",
            source=book,
            ingredients=[],
            tags=[],
            difficulty="easy",
            length="under_30",
        )
        assert recipe.id == "generated_id"

    def test_website_source_from_dict(self):
        source = Recipe._source_from_dict(SOURCE_WEBSITE_DICT)

        assert isinstance(source, Website)
        assert source.type == SourceType.WEBSITE
        assert source.address == SOURCE_WEBSITE_DICT["address"]

    def test_book_source_from_dict(self):
        source = Recipe._source_from_dict(SOURCE_BOOK_DICT)

        assert isinstance(source, Book)
        assert source.type == SourceType.BOOK
        assert source.title == SOURCE_BOOK_DICT["title"]
        assert source.page == SOURCE_BOOK_DICT["page"]

    def test_source_from_dict_raises_when_type_missing(self):
        bad_source = deepcopy(SOURCE_WEBSITE_DICT)
        del bad_source["type"]

        with raises(ValueError):
            Recipe._source_from_dict(bad_source)

    def test_source_from_dict_raises_when_type_unrecognised(self):
        bad_source = deepcopy(SOURCE_WEBSITE_DICT)
        bad_source["type"] = "bad_type"

        with raises(ValueError):
            Recipe._source_from_dict(bad_source)

    def test_source_from_dict_raises_when_bad_data(self):
        bad_source = deepcopy(SOURCE_WEBSITE_DICT)
        del bad_source["address"]

        with raises(ValueError):
            Recipe._source_from_dict(bad_source)

    @patch("backend.models.recipe.DynamoDBClient")
    def test_from_dict_parses(self, dynamodb_mock: Mock):
        recipe = Recipe.from_dict(RECIPE_DICT)

        assert recipe.name == RECIPE_DICT["name"]
        assert recipe.id == RECIPE_DICT["id"]
        assert recipe.ingredients == RECIPE_DICT["ingredients"]
        assert recipe.tags == RECIPE_DICT["tags"]

        assert recipe.source.address == RECIPE_DICT["source"]["address"]

    @patch("backend.models.recipe.DynamoDBClient")
    def test_from_dict_parses_book_source(self, dynamodb_mock: Mock):
        input = deepcopy(RECIPE_DICT)
        input["source"] = SOURCE_BOOK_DICT
        recipe = Recipe.from_dict(input=input)

        assert isinstance(recipe.source, Book)

    @patch("backend.models.recipe.DynamoDBClient")
    def test_from_dict_raises_when_empty_dict(self, dynamodb_mock: Mock):
        with raises(ValueError):
            Recipe.from_dict({})

    @patch("backend.models.recipe.DynamoDBClient")
    def test_from_dict_raises_when_missing_data(self, dynamodb_mock: Mock):
        with raises(ValueError):
            input = deepcopy(RECIPE_DICT)
            del input["name"]
            Recipe.from_dict(input=input)

    @patch("backend.models.recipe.DynamoDBClient")
    @patch("backend.models.recipe.uuid4")
    def test_from_dict_parses_when_missing_id(
        self, uuid_mock: Mock, dynamodb_mock: Mock
    ):
        uuid_mock.return_value = "mock_id"
        input = deepcopy(RECIPE_DICT)
        del input["id"]

        recipe = Recipe.from_dict(input=input)
        assert recipe.id == "mock_id"

    @patch("backend.models.recipe.DynamoDBClient")
    def test_to_dict(self, dynamodb_mock: Mock):
        website_recipe = Recipe.from_dict(RECIPE_DICT)

        book_recipe_dict = deepcopy(RECIPE_DICT)
        book_recipe_dict["source"] = SOURCE_BOOK_DICT
        book_recipe = Recipe.from_dict(book_recipe_dict)

        assert RECIPE_DICT == website_recipe.to_dict()
        assert book_recipe_dict == book_recipe.to_dict()

    @patch("backend.models.recipe.DynamoDBClient")
    def test_find_all_parses_results(self, dynamodb_mock: MagicMock):
        dynamodb_mock.return_value.find_all.return_value = [RECIPE_DICT, RECIPE_DICT]
        recipes = Recipe.find_all()

        assert len(recipes) == 2
        assert isinstance(recipes[0], Recipe)

    @patch("backend.models.recipe.DynamoDBClient")
    def test_save_calls_dyanmodb_client(self, dynamodb_mock: MagicMock):
        recipe = Recipe.from_dict(RECIPE_DICT)
        recipe.save()

        dynamodb_mock.put_item.assert_called_once
