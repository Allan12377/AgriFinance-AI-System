from fastapi import APIRouter

from app.schemas import FinanceAdviceRequest, FinanceAdviceResponse

router = APIRouter()


@router.post("/finance", response_model=FinanceAdviceResponse)
def finance_advice(payload: FinanceAdviceRequest) -> FinanceAdviceResponse:
    profit = payload.income - payload.expenses
    profit_margin = (profit / payload.income * 100) if payload.income > 0 else 0
    savings_ratio = (payload.savings / payload.income * 100) if payload.income > 0 else 0
    loan_pressure = (
        payload.active_loan_balance / payload.income * 100
        if payload.income > 0
        else 100
    )

    score = 50
    advice: list[str] = []

    if profit > 0:
        score += 20
        advice.append("The farmer has positive profit for the selected period.")
    else:
        score -= 25
        advice.append("Expenses are higher than income. Review spending before borrowing.")

    if profit_margin >= 25:
        score += 15
        advice.append("Profit margin is strong enough to support future planning.")
    elif profit_margin < 10:
        score -= 10
        advice.append("Profit margin is low. Reduce costs or improve selling price.")

    if savings_ratio >= 10:
        score += 10
        advice.append("Savings are healthy compared with income.")
    else:
        advice.append("Try to save at least 10% of income for farm inputs and emergencies.")

    if loan_pressure > 60:
        score -= 20
        advice.append("Existing loan pressure is high compared with income.")
    elif payload.active_loan_balance == 0:
        score += 5
        advice.append("No active loan balance is recorded.")

    score = max(0, min(100, score))
    risk_level = "low" if score >= 75 else "medium" if score >= 50 else "high"

    return FinanceAdviceResponse(
        profit=profit,
        profit_margin=round(profit_margin, 1),
        loan_readiness_score=score,
        risk_level=risk_level,
        advice=advice,
    )
