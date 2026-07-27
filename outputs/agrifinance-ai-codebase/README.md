# AgriFinance AI Codebase

AgriFinance AI is a Flutter-first financial decision support system for smallholder farmers.

This codebase is arranged as a monorepo so we can build the system step by step without mixing concerns.

## Stack

- Mobile/frontend: Flutter with Dart
- Main API: Node.js with Express
- AI service: Python with FastAPI
- Database: PostgreSQL
- API style: REST
- Deployment later: Docker

## Current implementation

Step 1 is implemented:

- Add farm income and expense records in the Flutter app
- View total income, total expenses, net profit, and profit margin
- See simple rule-based financial advice
- Backend API routes for creating, listing, and deleting finance records
- Initial PostgreSQL schema for the full system
- AI service endpoint for a first loan readiness and advice response

## Folder structure

```text
apps/mobile       Flutter app
backend           Node.js Express REST API
ai-service        Python FastAPI prediction/advice service
database          PostgreSQL migrations
docs              Architecture and step-by-step roadmap
```

## Important note about Flutter

Flutter is not installed on this machine right now, so the platform folders such as `android`, `ios`, `windows`, and `web` have not been generated.

After installing Flutter, open `apps/mobile` and run:

```bash
flutter create . --project-name agrifinance_ai
flutter run
```

The source code we wrote is already in `apps/mobile/lib`.

## Next feature

The next requirement I recommend building is farmer profile and farm registration. That will let each farmer create one or more farms before we connect records to a specific farm.
