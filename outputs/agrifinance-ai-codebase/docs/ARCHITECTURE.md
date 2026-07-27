# Architecture

AgriFinance AI uses a service-based structure.

```mermaid
flowchart LR
  Farmer["Farmer using Flutter app"] --> API["Node.js Express API"]
  Admin["Admin dashboard later"] --> API
  API --> DB["PostgreSQL database"]
  API --> AI["Python FastAPI AI service"]
  API --> Weather["Weather API later"]
  API --> Market["Market price source later"]
```

## Main parts

- Flutter app: farmer-facing interface
- Express API: business logic and REST endpoints
- PostgreSQL: persistent data storage
- FastAPI service: AI predictions and financial advice

## First implemented feature

Step 1 focuses on finance records.

```mermaid
sequenceDiagram
  participant Farmer
  participant Flutter
  participant API
  participant DB
  Farmer->>Flutter: Add income or expense
  Flutter->>Flutter: Show local summary
  Flutter->>API: Later: POST /api/records
  API->>DB: Later: save finance record
  API-->>Flutter: Saved record
```

For now, the Flutter app and backend both contain starter local data. In the database connection step, the API will become the single source of truth.
