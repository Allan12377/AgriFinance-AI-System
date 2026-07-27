const STORAGE_KEY = "agrifinance-records-v1";

const categoryOptions = {
  income: ["Crop sales", "Livestock sales", "Grant", "Loan received", "Other income"],
  expense: ["Seeds", "Fertilizer", "Labour", "Transport", "Pesticides", "Loan payment", "Other expense"],
};

const demoRecords = [
  {
    id: "demo-1",
    type: "income",
    date: "2026-07-02",
    crop: "Beans",
    category: "Crop sales",
    amount: 820000,
    note: "July harvest",
  },
  {
    id: "demo-2",
    type: "expense",
    date: "2026-07-04",
    crop: "Beans",
    category: "Transport",
    amount: 120000,
    note: "Market delivery",
  },
  {
    id: "demo-3",
    type: "expense",
    date: "2026-07-06",
    crop: "Beans",
    category: "Fertilizer",
    amount: 180000,
    note: "Top dressing",
  },
  {
    id: "demo-4",
    type: "income",
    date: "2026-07-10",
    crop: "Maize",
    category: "Crop sales",
    amount: 640000,
    note: "Cooperative buyer",
  },
  {
    id: "demo-5",
    type: "expense",
    date: "2026-07-12",
    crop: "Maize",
    category: "Labour",
    amount: 90000,
    note: "Weeding",
  },
];

const elements = {
  form: document.querySelector("#recordForm"),
  type: document.querySelector("#recordType"),
  date: document.querySelector("#recordDate"),
  crop: document.querySelector("#recordCrop"),
  category: document.querySelector("#recordCategory"),
  amount: document.querySelector("#recordAmount"),
  note: document.querySelector("#recordNote"),
  error: document.querySelector("#formError"),
  period: document.querySelector("#periodFilter"),
  incomeTotal: document.querySelector("#incomeTotal"),
  expenseTotal: document.querySelector("#expenseTotal"),
  profitTotal: document.querySelector("#profitTotal"),
  profitMargin: document.querySelector("#profitMargin"),
  incomeCount: document.querySelector("#incomeCount"),
  expenseCount: document.querySelector("#expenseCount"),
  profitStatus: document.querySelector("#profitStatus"),
  recordsBody: document.querySelector("#recordsBody"),
  emptyState: document.querySelector("#emptyState"),
  adviceList: document.querySelector("#adviceList"),
  expenseBars: document.querySelector("#expenseBars"),
  largestExpenseLabel: document.querySelector("#largestExpenseLabel"),
  exportButton: document.querySelector("#exportButton"),
  resetButton: document.querySelector("#resetButton"),
};

let records = loadRecords();

function loadRecords() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [...demoRecords];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [...demoRecords];
  } catch {
    return [...demoRecords];
  }
}

function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(value);
}

function setDefaultDate() {
  const today = new Date().toISOString().slice(0, 10);
  elements.date.value = today;
}

function refreshCategories() {
  const selectedType = elements.type.value;
  elements.category.innerHTML = categoryOptions[selectedType]
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
}

function getVisibleRecords() {
  if (elements.period.value !== "month") {
    return [...records];
  }

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return records.filter((record) => {
    const recordDate = new Date(`${record.date}T00:00:00`);
    return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
  });
}

function calculateSummary(visibleRecords) {
  return visibleRecords.reduce(
    (summary, record) => {
      if (record.type === "income") {
        summary.income += record.amount;
        summary.incomeCount += 1;
      } else {
        summary.expenses += record.amount;
        summary.expenseCount += 1;
      }
      return summary;
    },
    { income: 0, expenses: 0, incomeCount: 0, expenseCount: 0 }
  );
}

function renderSummary(summary) {
  const profit = summary.income - summary.expenses;
  const margin = summary.income > 0 ? Math.round((profit / summary.income) * 100) : 0;

  elements.incomeTotal.textContent = formatMoney(summary.income);
  elements.expenseTotal.textContent = formatMoney(summary.expenses);
  elements.profitTotal.textContent = formatMoney(profit);
  elements.profitMargin.textContent = `${margin}%`;
  elements.incomeCount.textContent = `${summary.incomeCount} income ${summary.incomeCount === 1 ? "record" : "records"}`;
  elements.expenseCount.textContent = `${summary.expenseCount} expense ${summary.expenseCount === 1 ? "record" : "records"}`;
  elements.profitStatus.textContent = profit >= 0 ? "Positive farm balance" : "Costs are above income";
  elements.profitTotal.style.color = profit >= 0 ? "var(--green-dark)" : "var(--red)";
}

function renderRecords(visibleRecords) {
  const sorted = [...visibleRecords].sort((a, b) => b.date.localeCompare(a.date));

  elements.recordsBody.innerHTML = sorted
    .map(
      (record) => `
        <tr>
          <td>${record.date}</td>
          <td><span class="pill ${record.type}">${capitalize(record.type)}</span></td>
          <td>${escapeHtml(record.crop)}</td>
          <td>${escapeHtml(record.category)}</td>
          <td class="amount ${record.type}">${record.type === "expense" ? "-" : ""}${formatMoney(record.amount)}</td>
          <td>${escapeHtml(record.note || "")}</td>
          <td><button class="delete-button" type="button" data-id="${record.id}">Delete</button></td>
        </tr>
      `
    )
    .join("");

  elements.emptyState.classList.toggle("visible", sorted.length === 0);
}

function renderAdvice(summary, visibleRecords) {
  const profit = summary.income - summary.expenses;
  const margin = summary.income > 0 ? (profit / summary.income) * 100 : 0;
  const largestExpense = getLargestExpenseCategory(visibleRecords);
  const advice = [];

  if (summary.income === 0 && summary.expenses === 0) {
    advice.push({
      title: "No financial signal yet",
      body: "Add farm income and expense records to start seeing the dashboard.",
      tone: "warning",
    });
  } else if (profit < 0) {
    advice.push({
      title: "Profit risk",
      body: `Expenses are higher than income by ${formatMoney(Math.abs(profit))}. Review the biggest cost category first.`,
      tone: "danger",
    });
  } else if (margin < 20) {
    advice.push({
      title: "Thin margin",
      body: `The current profit margin is ${Math.round(margin)}%. Keep a close watch on inputs, labour, and transport costs.`,
      tone: "warning",
    });
  } else {
    advice.push({
      title: "Healthy balance",
      body: `The farm is keeping about ${Math.round(margin)}% of income after costs for the selected period.`,
      tone: "good",
    });
  }

  if (largestExpense) {
    advice.push({
      title: "Largest expense area",
      body: `${largestExpense.category} is currently the biggest expense at ${formatMoney(largestExpense.amount)}.`,
      tone: largestExpense.amount > summary.income * 0.3 ? "warning" : "good",
    });
  }

  if (summary.income > 0) {
    const savingsTarget = Math.round(summary.income * 0.1);
    advice.push({
      title: "Savings target",
      body: `A 10% reserve for this period would be ${formatMoney(savingsTarget)}.`,
      tone: "good",
    });
  }

  elements.adviceList.innerHTML = advice
    .map(
      (item) => `
        <article class="advice-item ${item.tone === "danger" ? "danger" : item.tone === "warning" ? "warning" : ""}">
          <strong>${item.title}</strong>
          <p>${item.body}</p>
        </article>
      `
    )
    .join("");
}

function renderExpenseBars(visibleRecords) {
  const expensesByCategory = visibleRecords
    .filter((record) => record.type === "expense")
    .reduce((groups, record) => {
      groups[record.category] = (groups[record.category] || 0) + record.amount;
      return groups;
    }, {});

  const rows = Object.entries(expensesByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const max = rows.length > 0 ? rows[0].amount : 0;
  elements.largestExpenseLabel.textContent = rows.length > 0 ? rows[0].category : "No expenses";

  elements.expenseBars.innerHTML =
    rows.length === 0
      ? `<p class="empty-state visible">No expenses for the selected period.</p>`
      : rows
          .map((row) => {
            const width = max > 0 ? Math.max(8, Math.round((row.amount / max) * 100)) : 0;
            return `
              <div class="bar-row">
                <span class="bar-name">${escapeHtml(row.category)}</span>
                <span class="bar-track"><span class="bar-fill" style="width: ${width}%"></span></span>
                <span class="bar-value">${formatMoney(row.amount)}</span>
              </div>
            `;
          })
          .join("");
}

function getLargestExpenseCategory(visibleRecords) {
  const expenses = visibleRecords.filter((record) => record.type === "expense");
  if (expenses.length === 0) {
    return null;
  }

  const grouped = expenses.reduce((groups, record) => {
    groups[record.category] = (groups[record.category] || 0) + record.amount;
    return groups;
  }, {});

  return Object.entries(grouped)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)[0];
}

function render() {
  const visibleRecords = getVisibleRecords();
  const summary = calculateSummary(visibleRecords);

  renderSummary(summary);
  renderRecords(visibleRecords);
  renderAdvice(summary, visibleRecords);
  renderExpenseBars(visibleRecords);
}

function handleSubmit(event) {
  event.preventDefault();
  elements.error.textContent = "";

  const amount = Number(elements.amount.value);
  if (!Number.isFinite(amount) || amount <= 0) {
    elements.error.textContent = "Enter an amount greater than zero.";
    return;
  }

  records.push({
    id: crypto.randomUUID(),
    type: elements.type.value,
    date: elements.date.value,
    crop: elements.crop.value.trim(),
    category: elements.category.value,
    amount,
    note: elements.note.value.trim(),
  });

  saveRecords();
  elements.form.reset();
  setDefaultDate();
  refreshCategories();
  render();
}

function deleteRecord(id) {
  records = records.filter((record) => record.id !== id);
  saveRecords();
  render();
}

function resetDemo() {
  records = [...demoRecords];
  saveRecords();
  elements.period.value = "all";
  render();
}

function exportCsv() {
  const visibleRecords = getVisibleRecords();
  const rows = [
    ["Date", "Type", "Crop or Farm", "Category", "Amount UGX", "Note"],
    ...visibleRecords.map((record) => [
      record.date,
      record.type,
      record.crop,
      record.category,
      record.amount,
      record.note || "",
    ]),
  ];

  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "agrifinance-records.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

elements.type.addEventListener("change", refreshCategories);
elements.form.addEventListener("submit", handleSubmit);
elements.period.addEventListener("change", render);
elements.exportButton.addEventListener("click", exportCsv);
elements.resetButton.addEventListener("click", resetDemo);
elements.recordsBody.addEventListener("click", (event) => {
  if (event.target.matches(".delete-button")) {
    deleteRecord(event.target.dataset.id);
  }
});

setDefaultDate();
refreshCategories();
render();
