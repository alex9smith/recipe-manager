from dataclasses import dataclass
from enum import Enum
from uuid import uuid4

from typing import List, Optional


class SourceType(Enum):
    BOOK = 1
    WEBSITE = 2


@dataclass
class Source:
    pass


@dataclass
class Website(Source):
    address: str
    type: SourceType = SourceType.WEBSITE


@dataclass
class Book(Source):
    title: str
    page: int
    type: SourceType = SourceType.BOOK


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
