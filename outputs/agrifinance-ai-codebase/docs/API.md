# API Plan

Base URL during development:

```text
http://localhost:4000/api
```

## Implemented in Step 1

### Health

```text
GET /health
```

### List finance records

```text
GET /records
```

### Create finance record

```text
POST /records
```

Request body:

```json
{
  "type": "income",
  "date": "2026-07-16",
  "cropName": "Beans",
  "category": "Crop sales",
  "amount": 150000,
  "note": "Market sale"
}
```

### Delete finance record

```text
DELETE /records/:id
```

### Finance summary

```text
GET /records/summary
```

Returns income, expenses, profit, profit margin, record count, and basic advice.
