const { randomUUID } = require("crypto");
const { badRequest, notFound } = require("../../shared/http-error");

const records = [
  {
    id: "demo-1",
    type: "income",
    date: "2026-07-02",
    cropName: "Beans",
    category: "Crop sales",
    amount: 820000,
    note: "July harvest",
    createdAt: "2026-07-02T08:00:00.000Z",
  },
  {
    id: "demo-2",
    type: "expense",
    date: "2026-07-04",
    cropName: "Beans",
    category: "Transport",
    amount: 120000,
    note: "Market delivery",
    createdAt: "2026-07-04T09:00:00.000Z",
  },
  {
    id: "demo-3",
    type: "expense",
    date: "2026-07-06",
    cropName: "Beans",
    category: "Fertilizer",
    amount: 180000,
    note: "Top dressing",
    createdAt: "2026-07-06T10:00:00.000Z",
  },
];

function listRecords() {
  return [...records].sort((a, b) => b.date.localeCompare(a.date));
}

function createRecord(payload) {
  const cleaned = validateRecord(payload);
  const record = {
    id: randomUUID(),
    ...cleaned,
    createdAt: new Date().toISOString(),
  };

  records.push(record);
  return record;
}

function deleteRecord(id) {
  const index = records.findIndex((record) => record.id === id);
  if (index === -1) {
    throw notFound("Finance record not found");
  }

  const [deleted] = records.splice(index, 1);
  return deleted;
}

function getSummary() {
  const income = records
    .filter((record) => record.type === "income")
    .reduce((sum, record) => sum + record.amount, 0);
  const expenses = records
    .filter((record) => record.type === "expense")
    .reduce((sum, record) => sum + record.amount, 0);

  const profit = income - expenses;
  const profitMargin = income > 0 ? Number(((profit / income) * 100).toFixed(1)) : 0;

  return {
    income,
    expenses,
    profit,
    profitMargin,
    recordCount: records.length,
    advice: buildAdvice({
      income,
      expenses,
      profit,
      profitMargin,
      recordCount: records.length,
    }),
  };
}

function validateRecord(payload) {
  const errors = {};
  const type = String(payload.type || "").trim();
  const date = String(payload.date || "").trim();
  const cropName = String(payload.cropName || "").trim();
  const category = String(payload.category || "").trim();
  const note = String(payload.note || "").trim();
  const amount = Number(payload.amount);

  if (!["income", "expense"].includes(type)) {
    errors.type = "Type must be income or expense.";
  }

  if (!date || Number.isNaN(Date.parse(date))) {
    errors.date = "A valid date is required.";
  }

  if (!cropName) {
    errors.cropName = "Crop or farm name is required.";
  }

  if (!category) {
    errors.category = "Category is required.";
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    errors.amount = "Amount must be greater than zero.";
  }

  if (Object.keys(errors).length > 0) {
    throw badRequest("Invalid finance record", errors);
  }

  return { type, date, cropName, category, amount, note };
}

function buildAdvice(summary) {
  if (summary.recordCount === 0) {
    return "Add income and expense records to start receiving useful advice.";
  }

  if (summary.profit < 0) {
    return "Expenses are higher than income. Review the biggest cost areas before adding new investment.";
  }

  if (summary.profitMargin < 20) {
    return "Profit is positive, but the margin is low. Try to reduce recurring costs and protect cash for the next season.";
  }

  return "The farm has a healthy positive balance. Consider saving part of the profit for inputs or emergencies.";
}

module.exports = {
  createRecord,
  deleteRecord,
  getSummary,
  listRecords,
};
