# AgriFinance AI Service

This service will handle prediction and recommendation features.

## Current endpoints

- `GET /health`
- `POST /advice/finance`

For Step 1, the service uses simple rule-based logic. Later, when there is enough farmer data, this service can include trained models for:

- profit prediction
- future income prediction
- loan readiness scoring
- crop profitability recommendations
- abnormal spending detection

## Configure AI chat

Copy the example environment file and add your API key:

```bash
copy .env.example .env
```

Then set the following values in `.env`:

- `OPENAI_API_KEY` - your OpenAI-compatible API key
- `OPENAI_MODEL` - model name such as `gpt-4o-mini`
- `OPENAI_BASE_URL` - default is `https://api.openai.com/v1`

## Run later

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8123
```
