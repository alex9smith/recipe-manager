from enum import Enum


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class Length(Enum):
    UNDER_30 = "under_30"
    UNDER_60 = "under_60"
    OVER_60 = "over_60"
