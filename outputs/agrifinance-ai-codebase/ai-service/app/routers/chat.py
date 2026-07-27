import json
import os
from typing import Any
from urllib import error, request

from fastapi import APIRouter

from app.schemas import ChatAskRequest, ChatAskResponse

router = APIRouter()


def _rule_based_answer(payload: ChatAskRequest) -> str:
    question = payload.question.strip().lower()
    profit = payload.income - payload.expenses
    profit_margin = (profit / payload.income * 100) if payload.income > 0 else 0
    savings_ratio = (payload.savings / payload.income * 100) if payload.income > 0 else 0
    loan_pressure = (
        payload.active_loan_balance / payload.income * 100
        if payload.income > 0
        else 100
    )

    if any(word in question for word in ["what should", "how can", "improve", "next step", "next"]):
        if profit < 0:
            return (
                "Your current numbers show a cash gap. The most useful next step is to cut overhead costs first, "
                "then save a little from each sale so the business stays resilient through the next season."
            )
        if savings_ratio < 15:
            return (
                "Your profit is positive, but your savings buffer is still thin. Try setting aside a small share of each income record "
                "for farm emergencies and input purchases before spending on non-essential items."
            )
        if loan_pressure > 60:
            return (
                "Your debt pressure looks high compared with income. Focus on repaying the most expensive loan first, "
                "and avoid taking on new borrowing until your savings cushion is stronger."
            )
        return (
            "Your farm looks stable overall. Keep tracking income and expenses carefully, protect your savings reserve, "
            "and use the next harvest cycle to improve your profit margin gradually."
        )

    if "profit" in question:
        return (
            f"Profit is the money left after your farm costs. Based on the numbers you have in the system, "
            f"your profit is {profit:.0f} UGX, which means {('you are making money' if profit >= 0 else 'your costs are still higher than income')}."
        )
    if "margin" in question:
        return (
            f"Profit margin shows how much of your income stays after costs. Right now it is {profit_margin:.1f}%, "
            "so the stronger your margin stays, the more room you have to save and reinvest."
        )
    if "saving" in question:
        return (
            f"Savings are the cash you keep aside for emergencies or future farming needs. Your savings ratio is "
            f"{savings_ratio:.1f}% of income, so there is still room to strengthen your reserve."
        )
    if "expense" in question or "cost" in question:
        return (
            "Expenses are the money spent on the farm, such as fertilizer, seeds, labor, transport, and pesticides. "
            "Keeping these costs under control is one of the easiest ways to protect your profit."
        )
    if "income" in question:
        return (
            "Income is all the money your farm receives from crop sales, livestock sales, grants, or loan receipts. "
            "The more consistently you record income, the clearer your farm cash flow becomes."
        )
    if "loan" in question or "borrow" in question:
        return (
            f"Loan readiness compares your farm's profit, savings, and debt pressure. Your loan pressure is {loan_pressure:.1f}% of income, "
            "so your borrowing position should be reviewed carefully if you plan to take a new loan."
        )
    if "record" in question:
        return (
            f"A finance record is a simple entry that tracks income and expenses. You currently have {payload.record_count} stored records, "
            "which gives you enough information to follow your farm's cash flow more clearly."
        )

    return (
        "You can ask me about profit, margin, costs, savings, income, records, or loan readiness. "
        "I can also help you understand what to do next based on the numbers already recorded in the app."
    )


def _ai_answer(payload: ChatAskRequest) -> str | None:
    google_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    model = os.getenv("GOOGLE_MODEL") or os.getenv("OPENAI_MODEL", "gemini-2.0-flash")

    if google_key:
        api_key = google_key
        provider = "google"
    elif openai_key:
        api_key = openai_key
        provider = "openai"
    else:
        return None

    history_text = ""
    if payload.history:
        history_lines = []
        for item in payload.history[-6:]:
            role = (item.role or "user").strip().lower()
            text = (item.text or "").strip()
            if text:
                history_lines.append(f"{role}: {text}")
        if history_lines:
            history_text = "Previous conversation:\n" + "\n".join(history_lines) + "\n"

    prompt = (
        "You are AgriCoach, a helpful agribusiness assistant for a Ugandan farmer. "
        "Answer in a warm, farmer-friendly tone. Keep replies short, practical, and easy to understand. "
        "Use the supplied farm numbers only. When possible, explain what the numbers mean and give one clear next step. "
        "If the farmer asks a follow-up, connect it to the earlier conversation context. "
        f"{history_text}"
        "Farmer summary: "
        f"income={payload.income}, expenses={payload.expenses}, "
        f"savings={payload.savings}, active_loan_balance={payload.active_loan_balance}, "
        f"record_count={payload.record_count}. "
        f"Question: {payload.question}"
    )

    if provider == "google":
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        body: dict[str, Any] = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": (
                                "You are a farmer-friendly financial advisor for AgriFinance AI. "
                                "Keep answers short, practical, and based only on the provided numbers.\n\n"
                                f"{prompt}"
                            )
                        }
                    ]
                }
            ]
        }
        headers = {"Content-Type": "application/json"}
        req = request.Request(url, data=json.dumps(body).encode("utf-8"), headers=headers, method="POST")

        try:
            with request.urlopen(req, timeout=20) as response:
                payload_json = json.loads(response.read().decode("utf-8"))
                text = payload_json["candidates"][0]["content"]["parts"][0]["text"]
                return str(text).strip()
        except Exception:
            return None

    body: dict[str, Any] = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": "You are a farmer-friendly financial advisor for AgriFinance AI. Keep answers short, practical, and based only on the provided numbers.",
            },
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.4,
    }

    data = json.dumps(body).encode("utf-8")
    base_url = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
    url = f"{base_url.rstrip('/')}/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }
    req = request.Request(url, data=data, headers=headers, method="POST")

    try:
        with request.urlopen(req, timeout=20) as response:
            payload_json = json.loads(response.read().decode("utf-8"))
            message_text = payload_json["choices"][0]["message"]["content"]
            return str(message_text).strip()
    except Exception:
        return None


@router.post("/ask", response_model=ChatAskResponse)
def ask_chat(payload: ChatAskRequest) -> ChatAskResponse:
    answer = _ai_answer(payload)
    if not answer:
        answer = _rule_based_answer(payload)

    return ChatAskResponse(answer=answer)
