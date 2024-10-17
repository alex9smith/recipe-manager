from dataclasses import dataclass
from enum import Enum

from typing import List


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


@dataclass
class Recipe:
    name: str
    source: Source
    ingredients: List[str]
    tags: List[str]
