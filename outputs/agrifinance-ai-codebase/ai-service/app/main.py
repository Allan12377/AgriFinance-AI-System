from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.advice import router as advice_router
from app.routers.chat import router as chat_router

load_dotenv()

app = FastAPI(
    title="AgriFinance AI Service",
    version="0.1.0",
    description="Prediction and financial advice service for AgriFinance AI.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:8080", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "agrifinance-ai-service"}


app.include_router(advice_router, prefix="/advice", tags=["advice"])
app.include_router(chat_router, prefix="/chat", tags=["chat"])
