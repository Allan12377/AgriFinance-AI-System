from pydantic import BaseModel, Field


class FinanceAdviceRequest(BaseModel):
    income: float = Field(ge=0)
    expenses: float = Field(ge=0)
    savings: float = Field(default=0, ge=0)
    active_loan_balance: float = Field(default=0, ge=0)


class FinanceAdviceResponse(BaseModel):
    profit: float
    profit_margin: float
    loan_readiness_score: int
    risk_level: str
    advice: list[str]


class ChatHistoryTurn(BaseModel):
    role: str = Field(default="user")
    text: str = Field(default="")


class ChatAskRequest(BaseModel):
    question: str = Field(min_length=1)
    income: float = Field(default=0, ge=0)
    expenses: float = Field(default=0, ge=0)
    savings: float = Field(default=0, ge=0)
    active_loan_balance: float = Field(default=0, ge=0)
    record_count: int = Field(default=0, ge=0)
    history: list[ChatHistoryTurn] = Field(default_factory=list)


class ChatAskResponse(BaseModel):
    answer: str
