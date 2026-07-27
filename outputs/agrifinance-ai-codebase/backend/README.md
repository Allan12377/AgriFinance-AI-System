# AgriFinance API

This is the main backend API for AgriFinance AI.

## Current endpoints

- `GET /api/health`
- `GET /api/records`
- `POST /api/records`
- `DELETE /api/records/:id`
- `GET /api/records/summary`

The Step 1 implementation uses temporary in-memory records so we can build and test the API shape first. In Step 3, the service will be connected to PostgreSQL.

## Run later

```bash
npm install
npm run dev
```
