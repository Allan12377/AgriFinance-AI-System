# Test Notes

Formal automated tests will be added after dependencies are installed.

For now, the expected behavior is:

- `GET /api/records` returns demo records.
- `GET /api/records/summary` returns income, expenses, profit, profit margin, and advice.
- `POST /api/records` validates type, date, crop name, category, and amount.
- `DELETE /api/records/:id` removes a record or returns 404.
