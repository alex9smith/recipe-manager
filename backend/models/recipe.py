from dataclasses import dataclass
from enum import Enum
from uuid import uuid4
from backend.services.dynamodb import DynamoDBClient

from typing import Any, Dict, List, Optional


class SourceType(Enum):
    BOOK = 1
    WEBSITE = 2


@dataclass
class Source:
    def to_dict(self) -> Dict[str, str]:
        raise NotImplementedError


@dataclass
class Website(Source):
    address: str
    type: SourceType = SourceType.WEBSITE

    def to_dict(self) -> Dict[str, str]:
        return {"type": "website", "address": self.address}


@dataclass
class Book(Source):
    title: str
    page: int
    type: SourceType = SourceType.BOOK

    def to_dict(self) -> Dict[str, str]:
        return {"type": "book", "title": self.title, "page": self.page}


class Recipe:
    def __init__(
        self,
        name: str,
        source: Source,
        ingredients: List[str],
        tags: List[str],
        id: Optional[str] = None,
    ) -> None:
        self.id = id
        self.name = name
        self.ingredients = ingredients
        self.tags = tags
        self.source = source

        if self.id is None:
            self.id = uuid4()

        self.client = None

    @classmethod
    def _init_client(cls) -> DynamoDBClient:
        return DynamoDBClient()

    def to_dict(self) -> Dict[str, str | Dict[str, str] | List[str]]:
        return {
            "id": self.id,
            "name": self.name,
            "source": self.source.to_dict(),
            "ingredients": self.ingredients,
            "tags": self.tags,
        }

    @classmethod
    def _source_from_dict(cls, input: Dict[str, Any]) -> Source:
        try:
            if not input["type"]:
                raise ValueError("Provided dict is missing a type")
            elif input["type"] == "website":
                return Website(address=input["address"])
            elif input["type"] == "book":
                return Book(title=input["title"], page=input["page"])
            else:
                raise ValueError("Provided type is not recognised")

        except:
            raise ValueError("Provided dict cannot be parsed to a Source")

    @classmethod
    def from_dict(cls, input: Dict[str, Any]) -> "Recipe":
        try:
            if "id" in input.keys():
                id = input["id"]
            else:
                id = None

            return Recipe(
                name=input["name"],
                source=Recipe._source_from_dict(input["source"]),
                tags=input["tags"],
                ingredients=input["ingredients"],
                id=id,
            )
        except:
            raise ValueError("Provided dict cannot be parsed to a Recipe")

    @classmethod
    def find_all(self) -> List["Recipe"]:
        results = Recipe._init_client().find_all("recipe")
        return [Recipe.from_dict(item) for item in results["Items"]]

    def save(self) -> None:
        if self.client is None:
            self.client = Recipe._init_client()

        self.client.put_item("recipe", self.to_dict())
