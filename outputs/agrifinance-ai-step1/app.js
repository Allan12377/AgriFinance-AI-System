// Local Storage keys
const STORAGE_PREFIX = "agrifinance-v2-";
const KEYS = {
  records: STORAGE_PREFIX + "records",
  profile: STORAGE_PREFIX + "profile",
  farms: STORAGE_PREFIX + "farms",
  loans: STORAGE_PREFIX + "loans",
  savings: STORAGE_PREFIX + "savings",
  chatHistory: STORAGE_PREFIX + "chatHistory"
};

// Default static lists
const categoryOptions = {
  income: ["Crop sales", "Livestock sales", "Grant", "Loan received", "Other income"],
  expense: ["Seeds", "Fertilizer", "Labour", "Transport", "Pesticides", "Loan payment", "Other expense"],
};

// Demo mock data
const demoRecords = [
  { id: "demo-1", type: "income", date: "2026-07-02", crop: "Beans", category: "Crop sales", amount: 820000, note: "July harvest", farm: "Hillside Farm" },
  { id: "demo-2", type: "expense", date: "2026-07-04", crop: "Beans", category: "Transport", amount: 120000, note: "Market delivery", farm: "Hillside Farm" },
  { id: "demo-3", type: "expense", date: "2026-07-06", crop: "Beans", category: "Fertilizer", amount: 180000, note: "Top dressing", farm: "Hillside Farm" },
  { id: "demo-4", type: "income", date: "2026-07-10", crop: "Maize", category: "Crop sales", amount: 640000, note: "Cooperative buyer", farm: "Valley Maize Land" },
  { id: "demo-5", type: "expense", date: "2026-07-12", crop: "Maize", category: "Labour", amount: 90000, note: "Weeding", farm: "Valley Maize Land" },
];

const demoProfile = {
  name: "Allan Ainebyona",
  phone: "+256 701 234567",
  coop: "Kabale Growers Coop",
  district: "Kabale",
  village: "Kitumba"
};

const demoFarms = [
  { id: "farm-1", name: "Hillside Farm", acreage: 2.5, crop: "Beans", district: "Kabale" },
  { id: "farm-2", name: "Valley Maize Land", acreage: 4.0, crop: "Maize", district: "Kabale" }
];

const demoLoans = [
  { id: "loan-1", lender: "Centenary Bank", principal: 1500000, rate: 12, issued: "2026-05-10", due: "2027-05-10", repaid: 450000, status: "active" }
];

const demoSavings = [
  { id: "save-1", amount: 200000, date: "2026-07-01", purpose: "Fertilizer purchase buffer" }
];

// District Mock Data (Weather & Crop Prices)
const districtMockData = {
  Kabale: {
    weather: [
      { day: "Today", temp: 21, condition: "Partly Cloudy", icon: "⛅", rain: "10% chance of rain" },
      { day: "Tomorrow", temp: 22, condition: "Moderate Rain", icon: "🌧️", rain: "60% chance of rain" },
      { day: "Saturday", temp: 20, condition: "Heavy Rain", icon: "⛈️", rain: "85% chance of rain" },
      { day: "Sunday", temp: 23, condition: "Sunny Spell", icon: "🌤️", rain: "5% chance of rain" }
    ],
    prices: [
      { crop: "Irish Potatoes", market: "Kabale Central Market", unit: "100kg Sack", price: 160000, trend: "📈 +5%", updated: "Today" },
      { crop: "Beans", market: "Kabale Central Market", unit: "1kg", price: 3200, trend: "📉 -2%", updated: "Today" },
      { crop: "Maize", market: "Kabale Central Market", unit: "1kg", price: 1800, trend: "➡️ 0%", updated: "Yesterday" }
    ]
  },
  Mbarara: {
    weather: [
      { day: "Today", temp: 26, condition: "Sunny", icon: "☀️", rain: "0% chance of rain" },
      { day: "Tomorrow", temp: 27, condition: "Sunny", icon: "☀️", rain: "0% chance of rain" },
      { day: "Saturday", temp: 25, condition: "Partly Cloudy", icon: "⛅", rain: "15% chance of rain" },
      { day: "Sunday", temp: 24, condition: "Light Shower", icon: "🌦️", rain: "40% chance of rain" }
    ],
    prices: [
      { crop: "Bananas (Matooke)", market: "Mbarara Main Market", unit: "Large Bunch", price: 25000, trend: "📈 +10%", updated: "Today" },
      { crop: "Beans", market: "Mbarara Main Market", unit: "1kg", price: 3000, trend: "➡️ 0%", updated: "Today" },
      { crop: "Maize", market: "Mbarara Main Market", unit: "1kg", price: 1700, trend: "📈 +2%", updated: "Yesterday" }
    ]
  },
  Kasese: {
    weather: [
      { day: "Today", temp: 28, condition: "Hot & Sunny", icon: "☀️", rain: "0% chance of rain" },
      { day: "Tomorrow", temp: 29, condition: "Partly Cloudy", icon: "⛅", rain: "10% chance of rain" },
      { day: "Saturday", temp: 26, condition: "Light Thunderstorm", icon: "⛈️", rain: "55% chance of rain" },
      { day: "Sunday", temp: 27, condition: "Sunny Spell", icon: "🌤️", rain: "5% chance of rain" }
    ],
    prices: [
      { crop: "Maize", market: "Kasese Municipal Market", unit: "1kg", price: 1650, trend: "📈 +3%", updated: "Today" },
      { crop: "Beans", market: "Kasese Municipal Market", unit: "1kg", price: 3100, trend: "📉 -1%", updated: "Today" },
      { crop: "Coffee (Robusta)", market: "Cooperative Depot", unit: "1kg Green", price: 7500, trend: "📈 +8%", updated: "Yesterday" }
    ]
  },
  Masaka: {
    weather: [
      { day: "Today", temp: 25, condition: "Partly Cloudy", icon: "⛅", rain: "15% chance of rain" },
      { day: "Tomorrow", temp: 25, condition: "Heavy Showers", icon: "🌧️", rain: "75% chance of rain" },
      { day: "Saturday", temp: 24, condition: "Overcast", icon: "☁️", rain: "30% chance of rain" },
      { day: "Sunday", temp: 26, condition: "Sunny", icon: "☀️", rain: "5% chance of rain" }
    ],
    prices: [
      { crop: "Bananas (Matooke)", market: "Masaka Central Market", unit: "Large Bunch", price: 23000, trend: "➡️ 0%", updated: "Today" },
      { crop: "Coffee (Robusta)", market: "Masaka Growers Union", unit: "1kg Green", price: 7700, trend: "📈 +4%", updated: "Today" },
      { crop: "Beans", market: "Masaka Central Market", unit: "1kg", price: 3300, trend: "📈 +2%", updated: "Yesterday" }
    ]
  },
  Mbale: {
    weather: [
      { day: "Today", temp: 23, condition: "Light Showers", icon: "🌦️", rain: "45% chance of rain" },
      { day: "Tomorrow", temp: 22, condition: "Moderate Rain", icon: "🌧️", rain: "70% chance of rain" },
      { day: "Saturday", temp: 24, condition: "Partly Cloudy", icon: "⛅", rain: "20% chance of rain" },
      { day: "Sunday", temp: 25, condition: "Sunny", icon: "☀️", rain: "0% chance of rain" }
    ],
    prices: [
      { crop: "Coffee (Arabica)", market: "Mbale Bugisu Coop", unit: "1kg Parchment", price: 9200, trend: "📈 +6%", updated: "Today" },
      { crop: "Maize", market: "Mbale Main Market", unit: "1kg", price: 1900, trend: "📉 -4%", updated: "Today" },
      { crop: "Beans", market: "Mbale Main Market", unit: "1kg", price: 3500, trend: "📈 +3%", updated: "Yesterday" }
    ]
  },
  Gulu: {
    weather: [
      { day: "Today", temp: 30, condition: "Hot & Clear", icon: "☀️", rain: "0% chance of rain" },
      { day: "Tomorrow", temp: 31, condition: "Hot & Sunny", icon: "☀️", rain: "0% chance of rain" },
      { day: "Saturday", temp: 29, condition: "Overcast", icon: "☁️", rain: "20% chance of rain" },
      { day: "Sunday", temp: 27, condition: "Heavy Rain", icon: "🌧️", rain: "70% chance of rain" }
    ],
    prices: [
      { crop: "Maize", market: "Gulu Ceres Market", unit: "1kg", price: 1500, trend: "📉 -5%", updated: "Today" },
      { crop: "Groundnuts", market: "Gulu Ceres Market", unit: "1kg Shell", price: 4200, trend: "📈 +12%", updated: "Today" },
      { crop: "Beans", market: "Gulu Ceres Market", unit: "1kg", price: 2900, trend: "➡️ 0%", updated: "Yesterday" }
    ]
  }
};

// State Variables
let records = [];
let profile = {};
let farms = [];
let loans = [];
let savings = [];
let chatHistory = [];

// Element references
const elements = {
  navBar: document.querySelector("#navBar"),
  tabViews: document.querySelectorAll(".tab-view"),
  pageTitle: document.querySelector("#pageTitle"),
  workspaceEyebrow: document.querySelector("#workspaceEyebrow"),
  topbarActions: document.querySelector("#topbarActions"),
  periodFilter: document.querySelector("#periodFilter"),
  exportButton: document.querySelector("#exportButton"),
  resetButton: document.querySelector("#resetButton"),

  // Transaction form & fields
  form: document.querySelector("#recordForm"),
  type: document.querySelector("#recordType"),
  date: document.querySelector("#recordDate"),
  farmSelect: document.querySelector("#recordFarm"),
  category: document.querySelector("#recordCategory"),
  amount: document.querySelector("#recordAmount"),
  note: document.querySelector("#recordNote"),
  error: document.querySelector("#formError"),
  recordsBody: document.querySelector("#recordsBody"),
  emptyState: document.querySelector("#emptyState"),

  // Summary Metrics Dashboard
  incomeTotal: document.querySelector("#incomeTotal"),
  expenseTotal: document.querySelector("#expenseTotal"),
  profitTotal: document.querySelector("#profitTotal"),
  profitMargin: document.querySelector("#profitMargin"),
  incomeCount: document.querySelector("#incomeCount"),
  expenseCount: document.querySelector("#expenseCount"),
  profitStatus: document.querySelector("#profitStatus"),
  adviceList: document.querySelector("#adviceList"),
  expenseBars: document.querySelector("#expenseBars"),
  largestExpenseLabel: document.querySelector("#largestExpenseLabel"),

  // Profile Form & elements
  profileForm: document.querySelector("#profileForm"),
  profName: document.querySelector("#profName"),
  profPhone: document.querySelector("#profPhone"),
  profCoop: document.querySelector("#profCoop"),
  profDistrict: document.querySelector("#profDistrict"),
  profVillage: document.querySelector("#profVillage"),
  sidebarName: document.querySelector("#sidebarName"),
  sidebarDistrict: document.querySelector("#sidebarDistrict"),

  // Farm Form & elements
  farmForm: document.querySelector("#farmForm"),
  farmName: document.querySelector("#farmName"),
  farmAcreage: document.querySelector("#farmAcreage"),
  farmCrop: document.querySelector("#farmCrop"),
  farmDistrict: document.querySelector("#farmDistrict"),
  farmsGrid: document.querySelector("#farmsGrid"),

  // Loans & Savings Form & elements
  loansTotal: document.querySelector("#loansTotal"),
  loansCount: document.querySelector("#loansCount"),
  loanRepaidTotal: document.querySelector("#loanRepaidTotal"),
  savingsTotal: document.querySelector("#savingsTotal"),
  savingsCount: document.querySelector("#savingsCount"),
  debtSavingsRatio: document.querySelector("#debtSavingsRatio"),
  ratioStatus: document.querySelector("#ratioStatus"),
  loanForm: document.querySelector("#loanForm"),
  loanLender: document.querySelector("#loanLender"),
  loanPrincipal: document.querySelector("#loanPrincipal"),
  loanRate: document.querySelector("#loanRate"),
  loanIssued: document.querySelector("#loanIssued"),
  loanDue: document.querySelector("#loanDue"),
  savingsForm: document.querySelector("#savingsForm"),
  saveAmount: document.querySelector("#saveAmount"),
  saveDate: document.querySelector("#saveDate"),
  savePurpose: document.querySelector("#savePurpose"),
  loansBody: document.querySelector("#loansBody"),
  savingsBody: document.querySelector("#savingsBody"),

  // Payment Modal
  paymentModal: document.querySelector("#paymentModal"),
  paymentForm: document.querySelector("#paymentForm"),
  payLoanId: document.querySelector("#payLoanId"),
  payLenderName: document.querySelector("#payLenderName"),
  payAmount: document.querySelector("#payAmount"),
  payDate: document.querySelector("#payDate"),
  closePaymentModal: document.querySelector("#closePaymentModal"),

  // Market & Weather elements
  marketDistrictSelect: document.querySelector("#marketDistrictSelect"),
  weatherGrid: document.querySelector("#weatherGrid"),
  marketBody: document.querySelector("#marketBody"),
  weatherDistrictHeader: document.querySelector("#weatherDistrictHeader"),
  marketDistrictHeader: document.querySelector("#marketDistrictHeader"),

  // AI elements
  runDiagnosticBtn: document.querySelector("#runDiagnosticBtn"),
  scoreCircle: document.querySelector("#scoreCircle"),
  scoreText: document.querySelector("#scoreText"),
  scoreLabel: document.querySelector("#scoreLabel"),
  checksList: document.querySelector("#checksList"),
  aiRecommendations: document.querySelector("#aiRecommendations"),
  cropInsights: document.querySelector("#cropInsights"),
  chatbotFab: document.querySelector("#chatbotFab"),
  chatbotPopup: document.querySelector("#chatbotPopup"),
  chatbotCloseBtn: document.querySelector("#chatbotCloseBtn"),
  chatInput: document.querySelector("#chatInput"),
  chatSendBtn: document.querySelector("#chatSendBtn"),
  chatMessages: document.querySelector("#chatMessages"),

  // Reports elements
  printReportBtn: document.querySelector("#printReportBtn"),
  statementContainer: document.querySelector("#statementContainer"),
  rptDate: document.querySelector("#rptDate"),
  rptName: document.querySelector("#rptName"),
  rptPhone: document.querySelector("#rptPhone"),
  rptLocation: document.querySelector("#rptLocation"),
  rptCoop: document.querySelector("#rptCoop"),
  rptFarmsCount: document.querySelector("#rptFarmsCount"),
  rptAcreage: document.querySelector("#rptAcreage"),
  rptMainCrop: document.querySelector("#rptMainCrop"),
  rptIncomeTotal: document.querySelector("#rptIncomeTotal"),
  rptExpenseTotal: document.querySelector("#rptExpenseTotal"),
  rptNetProfit: document.querySelector("#rptNetProfit"),
  rptMargin: document.querySelector("#rptMargin"),
  rptDebt: document.querySelector("#rptDebt"),
  rptRepayments: document.querySelector("#rptRepayments"),
  rptSavings: document.querySelector("#rptSavings"),
  rptScore: document.querySelector("#rptScore"),
  rptLedgerBody: document.querySelector("#rptLedgerBody"),
};

// Initial Load Functions
function initializeData() {
  records = loadLocal(KEYS.records, demoRecords);
  profile = loadLocal(KEYS.profile, demoProfile);
  farms = loadLocal(KEYS.farms, demoFarms);
  loans = loadLocal(KEYS.loans, demoLoans);
  savings = loadLocal(KEYS.savings, demoSavings);
  chatHistory = loadLocal(KEYS.chatHistory, []);

  // Sync profile fields
  elements.profName.value = profile.name;
  elements.profPhone.value = profile.phone;
  elements.profCoop.value = profile.coop;
  elements.profDistrict.value = profile.district;
  elements.profVillage.value = profile.village;

  updateProfileDisplays();
  updateFarmsDropdowns();
  setDefaultDateFields();
}

function loadLocal(key, defaults) {
  const saved = localStorage.getItem(key);
  if (!saved) return defaults;
  try {
    return JSON.parse(saved);
  } catch {
    return defaults;
  }
}

function saveLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getChatSummaryPayload() {
  const visible = getFilteredRecords();
  const income = visible.filter(r => r.type === "income").reduce((sum, r) => sum + r.amount, 0);
  const expenses = visible.filter(r => r.type === "expense").reduce((sum, r) => sum + r.amount, 0);
  const totalSavings = Array.isArray(savings) ? savings.reduce((sum, s) => sum + s.amount, 0) : 0;
  const activeLoans = Array.isArray(loans) ? loans.filter(l => l.status === "active") : [];
  const activeLoanBalance = activeLoans.reduce((sum, l) => sum + Number(l.principal || 0), 0);

  return {
    income,
    expenses,
    savings: totalSavings,
    active_loan_balance: activeLoanBalance,
    record_count: visible.length
  };
}

function appendChatBubble(role, text, persist = true) {
  if (!elements.chatMessages) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${role}`;
  bubble.textContent = text;
  elements.chatMessages.appendChild(bubble);
  elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;

  if (persist) {
    chatHistory.push({ role, text });
    if (chatHistory.length > 12) {
      chatHistory = chatHistory.slice(chatHistory.length - 12);
    }
    saveLocal(KEYS.chatHistory, chatHistory);
  }
}

function renderSavedChatHistory() {
  if (!elements.chatMessages) return;

  elements.chatMessages.innerHTML = "";
  const history = Array.isArray(chatHistory) && chatHistory.length > 0 ? chatHistory : [{ role: "bot", text: "Ask me about profit, profit margin, income, expenses, savings, or loan readiness." }];

  history.forEach(message => appendChatBubble(message.role, message.text, false));
}

function setDefaultDateFields() {
  const today = new Date().toISOString().slice(0, 10);
  if (elements.date) elements.date.value = today;
  if (elements.loanIssued) elements.loanIssued.value = today;
  if (elements.saveDate) elements.saveDate.value = today;
  if (elements.payDate) elements.payDate.value = today;
}

function updateProfileDisplays() {
  elements.sidebarName.textContent = profile.name;
  elements.sidebarDistrict.textContent = `${profile.village}, ${profile.district} District`;
  
  // Update report header
  elements.rptName.textContent = profile.name;
  elements.rptPhone.textContent = profile.phone;
  elements.rptLocation.textContent = `${profile.village}, ${profile.district} District`;
  elements.rptCoop.textContent = profile.coop || "N/A";
  elements.rptDate.textContent = new Date().toLocaleDateString("en-UG", { year: 'numeric', month: 'long', day: 'numeric' });
}

function updateFarmsDropdowns() {
  elements.farmSelect.innerHTML = `<option value="General">General / No Farm</option>` +
    farms.map(f => `<option value="${f.name}">${f.name} (${f.crop})</option>`).join("");
}

// Formatting helpers
function formatMoney(value) {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0
  }).format(value);
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

// -------------------------------------------------------------
// TAB SYSTEM NAVIGATION
// -------------------------------------------------------------
function handleRouting() {
  const hash = window.location.hash || "#dashboard";
  
  // Update active navigation item in sidebar
  const navItems = elements.navBar.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.classList.toggle("active", item.getAttribute("href") === hash);
  });

  // Switch tab display
  elements.tabViews.forEach(view => {
    view.classList.toggle("active", `#${view.id.replace("View", "")}` === hash);
  });

  // Dynamically configure headers & filters based on the selected tab
  let title = "Dashboard";
  let eyebrow = "WORKSPACE";
  let showPeriod = false;

  switch (hash) {
    case "#dashboard":
      title = "Farm Finance Dashboard";
      eyebrow = "FINANCIAL SUMMARY";
      showPeriod = true;
      break;
    case "#farms":
      title = "Farms & Profile";
      eyebrow = "PROPERTY REGISTRATION";
      break;
    case "#loans":
      title = "Loans & Savings Ledger";
      eyebrow = "FINANCIAL SOLVENCY";
      break;
    case "#market":
      title = "Market Prices & Weather";
      eyebrow = "LOCAL ENVIRONMENT DATA";
      // Update weather & prices based on current district selection
      updateMarketAndWeather();
      break;
    case "#ai":
      title = "AI Decision Support Engine";
      eyebrow = "AI DIAGNOSTICS & RECOMMENDATIONS";
      break;
    case "#reports":
      title = "Financial Report & Statement";
      eyebrow = "CREDIT PORTFOLIO EXPORT";
      break;
  }

  elements.pageTitle.textContent = title;
  elements.workspaceEyebrow.textContent = eyebrow;

  // Toggle controls in the header
  elements.periodFilter.style.display = showPeriod ? "inline-block" : "none";
  const filterLabel = document.querySelector("#periodFilterLabel");
  if (filterLabel) filterLabel.style.display = showPeriod ? "grid" : "none";
  elements.exportButton.style.display = hash === "#dashboard" ? "inline-block" : "none";
  
  // Render views
  renderAll();
}

// -------------------------------------------------------------
// MAIN RENDERING CONTROL
// -------------------------------------------------------------
function renderAll() {
  const hash = window.location.hash || "#dashboard";
  
  if (hash === "#dashboard") {
    renderDashboard();
  } else if (hash === "#farms") {
    renderFarms();
  } else if (hash === "#loans") {
    renderLoansAndSavings();
  } else if (hash === "#market") {
    updateMarketAndWeather();
  } else if (hash === "#ai") {
    // Keep current screen state, diagnostic must be run manually
  } else if (hash === "#reports") {
    renderReports();
  }
}

// -------------------------------------------------------------
// VIEW 1: DASHBOARD
// -------------------------------------------------------------
function renderDashboard() {
  const visible = getFilteredRecords();
  
  // Metrics Calculation
  const summary = visible.reduce(
    (acc, r) => {
      if (r.type === "income") {
        acc.income += r.amount;
        acc.incomeCount += 1;
      } else {
        acc.expenses += r.amount;
        acc.expenseCount += 1;
      }
      return acc;
    },
    { income: 0, expenses: 0, incomeCount: 0, expenseCount: 0 }
  );

  const profit = summary.income - summary.expenses;
  const margin = summary.income > 0 ? Math.round((profit / summary.income) * 100) : 0;

  // Render metrics
  elements.incomeTotal.textContent = formatMoney(summary.income);
  elements.expenseTotal.textContent = formatMoney(summary.expenses);
  elements.profitTotal.textContent = formatMoney(profit);
  elements.profitMargin.textContent = `${margin}%`;
  elements.incomeCount.textContent = `${summary.incomeCount} income record${summary.incomeCount === 1 ? "" : "s"}`;
  elements.expenseCount.textContent = `${summary.expenseCount} expense record${summary.expenseCount === 1 ? "" : "s"}`;
  elements.profitStatus.textContent = profit >= 0 ? "Positive cash surplus" : "Operating loss";
  elements.profitTotal.style.color = profit >= 0 ? "var(--green)" : "var(--red)";

  // Ledger Table
  const sorted = [...visible].sort((a, b) => b.date.localeCompare(a.date));
  elements.recordsBody.innerHTML = sorted.map(r => `
    <tr>
      <td>${r.date}</td>
      <td><span class="pill ${r.type}">${capitalize(r.type)}</span></td>
      <td>${escapeHtml(r.farm || "General")}</td>
      <td>${escapeHtml(r.category)}</td>
      <td class="amount ${r.type}">${r.type === "expense" ? "-" : ""}${formatMoney(r.amount)}</td>
      <td>${escapeHtml(r.note || "")}</td>
      <td><button class="delete-button text-button" type="button" onclick="deleteRecord('${r.id}')">Delete</button></td>
    </tr>
  `).join("");

  elements.emptyState.classList.toggle("visible", sorted.length === 0);

  // Render Signals/Advice
  const advice = [];
  const largest = getLargestExpense(visible);

  if (summary.income === 0 && summary.expenses === 0) {
    advice.push({ title: "No transactions registered", body: "Record your sales or operating farm costs to see recommendations.", tone: "warning" });
  } else {
    if (profit < 0) {
      advice.push({ title: "Cash deficit risk", body: `Operating costs are higher than income by ${formatMoney(Math.abs(profit))}. Review your category breakdown below.`, tone: "danger" });
    } else if (margin < 20) {
      advice.push({ title: "Narrow profit margins", body: `Your profit margin is ${margin}%. High crop production costs could threaten farm stability.`, tone: "warning" });
    } else {
      advice.push({ title: "Strong operational surplus", body: `Keeping ${margin}% of crop sales as net farm profit. Excelent yield margins!`, tone: "good" });
    }

    if (largest) {
      const isHighRatio = largest.amount > summary.income * 0.35;
      advice.push({
        title: `High cost category: ${largest.category}`,
        body: `Spent ${formatMoney(largest.amount)} on ${largest.category}, representing ${Math.round((largest.amount/summary.income)*100 || 0)}% of income.`,
        tone: isHighRatio ? "warning" : "good"
      });
    }
  }

  elements.adviceList.innerHTML = advice.map(item => `
    <article class="advice-item ${item.tone === "danger" ? "danger" : item.tone === "warning" ? "warning" : ""}">
      <strong>${item.title}</strong>
      <p>${item.body}</p>
    </article>
  `).join("");

  // Render Expense Breakdown Chart Bars
  const expensesGroup = visible.filter(r => r.type === "expense").reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + r.amount;
    return acc;
  }, {});

  const chartRows = Object.entries(expensesGroup)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const maxVal = chartRows.length > 0 ? chartRows[0].amount : 0;
  elements.largestExpenseLabel.textContent = chartRows.length > 0 ? chartRows[0].category : "No expenses recorded";

  elements.expenseBars.innerHTML = chartRows.length === 0
    ? `<p style="padding: 10px 0; color: var(--muted); font-size:13px;">No expense chart data available.</p>`
    : chartRows.map(row => {
        const pct = maxVal > 0 ? Math.round((row.amount / maxVal) * 100) : 0;
        return `
          <div class="bar-row">
            <span class="bar-name">${row.category}</span>
            <span class="bar-track"><span class="bar-fill" style="width: ${pct}%"></span></span>
            <span class="bar-value">${formatMoney(row.amount)}</span>
          </div>
        `;
      }).join("");
}

function getFilteredRecords() {
  if (elements.periodFilter.value !== "month") return [...records];
  const current = new Date();
  return records.filter(r => {
    const d = new Date(r.date);
    return d.getMonth() === current.getMonth() && d.getFullYear() === current.getFullYear();
  });
}

function getLargestExpense(visible) {
  const expenses = visible.filter(r => r.type === "expense");
  if (expenses.length === 0) return null;
  const groups = expenses.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + r.amount;
    return acc;
  }, {});
  return Object.entries(groups)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)[0];
}

window.deleteRecord = function(id) {
  records = records.filter(r => r.id !== id);
  saveLocal(KEYS.records, records);
  renderDashboard();
};

function refreshCategories() {
  const type = elements.type.value;
  elements.category.innerHTML = categoryOptions[type].map(c => `<option value="${c}">${c}</option>`).join("");
}

// -------------------------------------------------------------
// VIEW 2: FARMS & PROFILE
// -------------------------------------------------------------
function renderFarms() {
  elements.farmsGrid.innerHTML = farms.length === 0
    ? `<p style="grid-column: 1/-1; text-align: center; color: var(--muted); padding:20px;">No farms registered yet. Fill the registration form above.</p>`
    : farms.map(f => `
        <div class="farm-card">
          <div class="farm-card-hdr">
            <h3>${escapeHtml(f.name)}</h3>
            <span class="farm-badge">${escapeHtml(f.crop)}</span>
          </div>
          <div class="farm-card-body">
            <p>📐 <strong>Size:</strong> ${f.acreage} Acres</p>
            <p>📍 <strong>District Location:</strong> ${escapeHtml(f.district)}</p>
          </div>
          <div style="text-align: right; margin-top: 12px;">
            <button class="delete-button text-button" type="button" onclick="deleteFarm('${f.id}')" style="min-height: 28px; padding: 4px 8px;">Deregister</button>
          </div>
        </div>
      `).join("");
}

window.deleteFarm = function(id) {
  farms = farms.filter(f => f.id !== id);
  saveLocal(KEYS.farms, farms);
  updateFarmsDropdowns();
  renderFarms();
};

// -------------------------------------------------------------
// VIEW 3: LOANS & SAVINGS
// -------------------------------------------------------------
function renderLoansAndSavings() {
  // 1. Calculations
  const activeLoans = loans.filter(l => l.status === "active");
  const totalPrincipal = activeLoans.reduce((sum, l) => sum + l.principal, 0);
  const totalRepaid = activeLoans.reduce((sum, l) => sum + l.repaid, 0);
  const totalSaved = savings.reduce((sum, s) => sum + s.amount, 0);
  const ratio = totalSaved > 0 ? Math.round((totalPrincipal / totalSaved) * 100) : 100;

  // Render summaries
  elements.loansTotal.textContent = formatMoney(totalPrincipal);
  elements.loansCount.textContent = `${activeLoans.length} active credit line${activeLoans.length === 1 ? "" : "s"}`;
  elements.loanRepaidTotal.textContent = formatMoney(totalRepaid);
  elements.savingsTotal.textContent = formatMoney(totalSaved);
  elements.savingsCount.textContent = `${savings.length} deposits`;
  elements.debtSavingsRatio.textContent = `${ratio}%`;
  
  if (ratio > 150) {
    elements.ratioStatus.textContent = "High debt leverage";
    elements.ratioStatus.style.color = "var(--red)";
  } else {
    elements.ratioStatus.textContent = "Stable leverage";
    elements.ratioStatus.style.color = "var(--green)";
  }

  // 2. Active Loans Table
  elements.loansBody.innerHTML = loans.length === 0
    ? `<tr><td colspan="8" style="text-align:center; color: var(--muted);">No loan agreements logged.</td></tr>`
    : loans.map(l => {
        const pct = Math.round((l.repaid / l.principal) * 100) || 0;
        const progressClass = l.status === "paid" ? "green" : "blue";
        return `
          <tr>
            <td><strong>${escapeHtml(l.lender)}</strong></td>
            <td>${formatMoney(l.principal)}</td>
            <td>${l.rate}%</td>
            <td>${l.issued}</td>
            <td>${l.due || "N/A"}</td>
            <td>
              <div class="repayment-progress-bar">
                <div class="repayment-text">
                  <span>${pct}% Repaid</span>
                  <span>${formatMoney(l.repaid)} / ${formatMoney(l.principal)}</span>
                </div>
                <div class="repayment-bar-track">
                  <div class="repayment-bar-fill" style="width: ${pct}%; background-color: var(--${progressClass});"></div>
                </div>
              </div>
            </td>
            <td><span class="pill ${l.status === 'paid' ? 'income' : 'expense'}">${l.status}</span></td>
            <td>
              ${l.status === 'active' 
                ? `<button class="primary-button" onclick="openPaymentDialog('${l.id}', '${escapeHtml(l.lender)}')" style="min-height:30px; padding: 4px 8px; font-size:12px;">Pay</button>` 
                : `<button class="delete-button text-button" onclick="deleteLoan('${l.id}')" style="min-height:30px; padding: 4px 8px; font-size:12px;">Delete</button>`
              }
            </td>
          </tr>
        `;
      }).join("");

  // 3. Savings Table
  elements.savingsBody.innerHTML = savings.length === 0
    ? `<tr><td colspan="4" style="text-align:center; color: var(--muted);">No savings reserves registered.</td></tr>`
    : savings.map(s => `
        <tr>
          <td>${s.date}</td>
          <td>${escapeHtml(s.purpose)}</td>
          <td class="amount income">${formatMoney(s.amount)}</td>
          <td><button class="delete-button text-button" onclick="deleteSavings('${s.id}')" style="min-height:30px; padding:4px 8px; font-size:12px;">Delete</button></td>
        </tr>
      `).join("");
}

window.openPaymentDialog = function(id, lender) {
  elements.payLoanId.value = id;
  elements.payLenderName.value = lender;
  elements.payAmount.value = "";
  elements.payAmount.max = loans.find(l => l.id === id).principal - loans.find(l => l.id === id).repaid;
  elements.paymentModal.classList.add("active");
};

window.closePaymentDialog = function() {
  elements.paymentModal.classList.remove("active");
};

window.deleteLoan = function(id) {
  loans = loans.filter(l => l.id !== id);
  saveLocal(KEYS.loans, loans);
  renderLoansAndSavings();
};

window.deleteSavings = function(id) {
  savings = savings.filter(s => s.id !== id);
  saveLocal(KEYS.savings, savings);
  renderLoansAndSavings();
};

// -------------------------------------------------------------
// VIEW 4: MARKET & WEATHER
// -------------------------------------------------------------
function updateMarketAndWeather() {
  const district = elements.marketDistrictSelect.value;
  const data = districtMockData[district] || { weather: [], prices: [] };

  elements.weatherDistrictHeader.textContent = `Weather Forecast for ${district} District`;
  elements.marketDistrictHeader.textContent = `Real-Time Crop Prices in ${district} Markets`;

  // Render weather
  elements.weatherGrid.innerHTML = data.weather.map((w, idx) => `
    <div class="weather-card ${idx === 0 ? "active-day" : ""}">
      <h4>${w.day}</h4>
      <div class="weather-icon">${w.icon}</div>
      <div class="weather-temp">${w.temp}°C</div>
      <div class="weather-desc">${w.condition}</div>
      <div class="weather-rain">☔ ${w.rain}</div>
    </div>
  `).join("");

  // Render market prices
  elements.marketBody.innerHTML = data.prices.map(p => `
    <tr>
      <td><strong>${escapeHtml(p.crop)}</strong></td>
      <td>${escapeHtml(p.market)}</td>
      <td>${p.unit}</td>
      <td class="amount">${formatMoney(p.price)}</td>
      <td style="color: ${p.trend.includes('+') ? 'var(--green)' : p.trend.includes('-') ? 'var(--red)' : 'var(--ink)'}; font-weight:600;">${p.trend}</td>
      <td>${p.updated}</td>
    </tr>
  `).join("");
}

// -------------------------------------------------------------
// VIEW 5: AI INSIGHTS
// -------------------------------------------------------------
function runAIDiagnostics() {
  const visible = getFilteredRecords();
  const summary = visible.reduce(
    (acc, r) => {
      if (r.type === "income") acc.income += r.amount;
      else acc.expenses += r.amount;
      return acc;
    },
    { income: 0, expenses: 0 }
  );
  
  const profit = summary.income - summary.expenses;
  const totalSaved = savings.reduce((sum, s) => sum + s.amount, 0);
  const totalAcres = farms.reduce((sum, f) => sum + parseFloat(f.acreage || 0), 0);
  
  const unpaidLoans = loans.filter(l => l.status === "active" && new Date(l.due) < new Date());
  
  // Scorecard Criteria Checks
  const checks = [
    { name: "Net Profit Margin", passed: profit > 0, text: profit > 0 ? "Positive Operational Margin" : "Net Deficit Cashflow", desc: "Farm cash revenues exceed operational inputs." },
    { name: "Savings Cushion Buffer", passed: totalSaved >= totalPrincipal() * 0.15 || totalSaved > 100000, text: totalSaved > 0 ? `${formatMoney(totalSaved)} Reserve Buffer` : "No reserves registered", desc: "Sufficient capital buffer logged for emergency seed/labor costs." },
    { name: "Active Land Registered", passed: farms.length > 0 && totalAcres > 0, text: farms.length > 0 ? `${totalAcres} Acres Registered` : "No farms configured", desc: "Acreage verify checks pass, establishing commercial farming capacity." },
    { name: "Credit Standing Check", passed: unpaidLoans.length === 0, text: unpaidLoans.length === 0 ? "Solvent Repayment Schedule" : `${unpaidLoans.length} Loans Overdue`, desc: "No default records exist on active lender portfolio profiles." }
  ];

  // Calculate final score
  const passedCount = checks.filter(c => c.passed).length;
  const score = passedCount * 25;

  // Render scorecard checks
  elements.checksList.innerHTML = checks.map(c => `
    <div class="check-row ${c.passed ? "pass" : "fail"}">
      <span><strong>${c.passed ? "✓" : "✗"} ${c.name}</strong></span>
      <span>${c.text}</span>
    </div>
  `).join("");

  // Score display animation
  elements.scoreText.textContent = score;
  let offset = 251.2 - (251.2 * score) / 100;
  elements.scoreCircle.style.strokeDashoffset = offset;

  // Rating labels
  let ratingLabel = "Poor credit rating. Review farm records and debt structures.";
  if (score === 50) ratingLabel = "Fair credit risk. Strengthen cash balances and savings.";
  else if (score === 75) ratingLabel = "Good credit score! Ready for micro-credit loans.";
  else if (score === 100) ratingLabel = "Excellent credit risk! Highly eligible for commercial financing.";
  elements.scoreLabel.textContent = ratingLabel;

  // Custom AI Recommendations cards
  const recommendations = [];
  if (profit <= 0) {
    recommendations.push({
      title: "Cost Rationalization Audit",
      body: "Analyze your high expense segments. Reduce labor costs where cooperative mutual labor can substitute, and purchase seeds in bulk through associations.",
      source: "Financial Optimization Advisor"
    });
  }
  if (totalSaved < 200000) {
    recommendations.push({
      title: "Automate Savings Reserve",
      body: "Dedicate at least 12% of every crop sale record directly into your cooperative savings pool before planning any expansion expenses.",
      source: "Capital Resilience Expert"
    });
  }
  if (farms.length === 0) {
    recommendations.push({
      title: "Register Specific Farm Boundaries",
      body: "Create your farm profile listings. Lenders require localized property details before verifying microfinance lending programs.",
      source: "Land Compliance Officer"
    });
  }
  if (unpaidLoans.length > 0) {
    recommendations.push({
      title: "Prioritize Debt Liquidation",
      body: "Contact credit unions immediately to establish restructure plans for overdue loans. Late fees will erode operational yields.",
      source: "Risk Management Analyst"
    });
  }
  if (score >= 75) {
    recommendations.push({
      title: "Credit Expansion Opportunity",
      body: "Your profile exhibits highly favorable solvency. Eligible for seasonal input financing for high-value seed products.",
      source: "Lending Facilitator Bot"
    });
  }

  elements.aiRecommendations.innerHTML = recommendations.map(r => `
    <article class="rec-card">
      <h4>${r.title}</h4>
      <p>${r.body}</p>
      <small style="color:var(--muted); font-size:11px; margin-top:8px; display:block;">🤖 Generated by: ${r.source}</small>
    </article>
  `).join("");

  // Crop Planner Forecasting table
  const cropList = [
    { name: "Irish Potatoes", price: "160,000 / Sack", outlook: "Highly Lucrative", action: "Focus irrigation on potato tubers for early market harvesting." },
    { name: "Beans", price: "3,200 / Kg", outlook: "Stable Yield", action: "Maintain beans crop as vital soil nitrogen replenisher." },
    { name: "Coffee", price: "7,500 / Kg", outlook: "High-Margin Export", action: "Dry pulp beans meticulously to secure premium export prices." }
  ];

  elements.cropInsights.innerHTML = cropList.map(c => `
    <div class="rec-card" style="border-left-color: var(--amber);">
      <h4>${c.name} (UGX ${c.price})</h4>
      <p>🔮 <strong>Outlook:</strong> ${c.outlook}</p>
      <p>${c.action}</p>
    </div>
  `).join("");
}

function totalPrincipal() {
  return loans.filter(l => l.status === 'active').reduce((sum, l) => sum + l.principal, 0);
}

function answerFarmerQuestion(question) {
  const text = String(question || "").trim().toLowerCase();
  const filtered = getFilteredRecords();
  const income = filtered.filter(r => r.type === "income").reduce((sum, r) => sum + r.amount, 0);
  const expenses = filtered.filter(r => r.type === "expense").reduce((sum, r) => sum + r.amount, 0);
  const profit = income - expenses;
  const margin = income > 0 ? Math.round((profit / income) * 100) : 0;
  const totalSavings = Array.isArray(savings) ? savings.reduce((sum, s) => sum + s.amount, 0) : 0;
  const activeLoans = Array.isArray(loans) ? loans.filter(l => l.status === "active") : [];
  const totalDebt = activeLoans.reduce((sum, l) => sum + l.principal, 0);
  const totalRepaid = activeLoans.reduce((sum, l) => sum + (l.repaid || 0), 0);
  const totalAcreage = farms.reduce((sum, farm) => sum + parseFloat(farm.acreage || 0), 0);
  const mainCrop = farms.length > 0 ? farms[0].crop : "General agriculture";
  const farmerName = profile.name || "Farmer";
  const district = profile.district || "your district";
  const village = profile.village || "your village";

  if (!text) return "Please ask me something about your farm records.";

  if (/(who am i|my name|farmer name|who is this)/.test(text)) {
    return `${farmerName} is the current farmer profile in the system. You are registered in ${village}, ${district}.`;
  }

  if (/(farm|farms|acre|acreage|registered)/.test(text)) {
    return `You currently have ${farms.length} farm${farms.length === 1 ? "" : "s"} registered in the system, covering ${totalAcreage} acres. Your main crop is ${mainCrop}.`;
  }

  if (/(saving|reserve|cash buffer)/.test(text)) {
    return `Your saved reserve in the system is ${formatMoney(totalSavings)}. This can help you manage seasonal costs and keep a safety buffer.`;
  }

  if (/(loan|credit|readiness|borrow)/.test(text)) {
    const loanHealth = profit > 0 && totalSavings > 0 && totalDebt <= totalSavings ? "strong" : profit > 0 ? "moderate" : "low";
    return `Based on your current data, your loan readiness looks ${loanHealth}. Your active debt is ${formatMoney(totalDebt)}, you have repaid ${formatMoney(totalRepaid)}, and your current profit is ${formatMoney(profit)}.`;
  }

  if (/(profit)/.test(text)) {
    return `Profit is the money left after your costs. Based on your current filtered records, profit is ${formatMoney(profit)}.`;
  }

  if (/(margin)/.test(text)) {
    return `Profit margin tells you how much of your income stays after expenses. Current margin is ${margin}%.`;
  }

  if (/(expense|cost)/.test(text)) {
    return `Expenses in the system total ${formatMoney(expenses)}. This includes operating costs like fertilizer, transport, labour, and pesticides.`;
  }

  if (/(income)/.test(text)) {
    return `Income currently recorded in the system totals ${formatMoney(income)} across your visible records.`;
  }

  if (/(record|entry|transaction)/.test(text)) {
    return `You currently have ${filtered.length} visible finance record${filtered.length === 1 ? "" : "s"} in the active period filter.`;
  }

  if (/(district|village|cooperative|coop)/.test(text)) {
    return `${farmerName} is registered in ${village}, ${district}. Cooperative: ${profile.coop || "Not supplied"}.`;
  }

  return `I can answer based on the system data you already entered: your current profit is ${formatMoney(profit)}, margin is ${margin}%, savings are ${formatMoney(totalSavings)}, and you have ${farms.length} registered farm${farms.length === 1 ? "" : "s"}.`;
}

function openChatbotPopup() {
  if (!elements.chatbotPopup) return;
  elements.chatbotPopup.classList.add("open");
  elements.chatbotPopup.setAttribute("aria-hidden", "false");
  if (elements.chatbotFab) {
    elements.chatbotFab.setAttribute("aria-expanded", "true");
  }
  if (elements.chatInput) {
    setTimeout(() => elements.chatInput.focus(), 50);
  }
}

function closeChatbotPopup() {
  if (!elements.chatbotPopup) return;
  elements.chatbotPopup.classList.remove("open");
  elements.chatbotPopup.setAttribute("aria-hidden", "true");
  if (elements.chatbotFab) {
    elements.chatbotFab.setAttribute("aria-expanded", "false");
  }
}

async function getChatServiceAnswer(question) {
  const summary = getChatSummaryPayload();
  const history = Array.isArray(chatHistory)
    ? chatHistory.slice(-8).map(message => ({ role: message.role, text: message.text }))
    : [];

  const response = await fetch("http://127.0.0.1:8123/chat/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question,
      history,
      ...summary
    })
  });

  if (!response.ok) {
    throw new Error(`AI service returned ${response.status}`);
  }

  const data = await response.json();
  return data.answer || answerFarmerQuestion(question);
}

async function handleChatQuestion() {
  const question = elements.chatInput.value.trim();
  if (!question) return;

  appendChatBubble("user", question, true);
  elements.chatInput.value = "";

  const sendButton = elements.chatSendBtn;
  const oldText = sendButton ? sendButton.textContent : "";
  if (sendButton) {
    sendButton.disabled = true;
    sendButton.textContent = "Thinking...";
  }

  try {
    const answer = await getChatServiceAnswer(question);
    appendChatBubble("bot", answer, true);
  } catch (error) {
    const fallbackAnswer = answerFarmerQuestion(question);
    appendChatBubble("bot", fallbackAnswer, true);
  } finally {
    if (sendButton) {
      sendButton.disabled = false;
      sendButton.textContent = oldText || "Send";
    }
  }
}

// -------------------------------------------------------------
// VIEW 6: REPORTS & EXPORTS
// -------------------------------------------------------------
function renderReports() {
  const visible = getFilteredRecords();
  const activeLoans = loans.filter(l => l.status === 'active');

  const totalInc = visible.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  const totalExp = visible.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
  const net = totalInc - totalExp;
  const margin = totalInc > 0 ? Math.round((net / totalInc) * 100) : 0;
  
  const totalDebtVal = activeLoans.reduce((sum, l) => sum + l.principal, 0);
  const totalRepayVal = activeLoans.reduce((sum, l) => sum + l.repaid, 0);
  const totalSaveVal = savings.reduce((sum, s) => sum + s.amount, 0);

  // Sync profile metadata
  elements.rptFarmsCount.textContent = `${farms.length} farm${farms.length === 1 ? "" : "s"}`;
  const totalAcres = farms.reduce((sum, f) => sum + parseFloat(f.acreage || 0), 0);
  elements.rptAcreage.textContent = `${totalAcres} Acres`;
  elements.rptMainCrop.textContent = farms.length > 0 ? farms[0].crop : "General Agriculture";

  // Balance Metrics
  elements.rptIncomeTotal.textContent = formatMoney(totalInc);
  elements.rptExpenseTotal.textContent = formatMoney(totalExp);
  elements.rptNetProfit.textContent = formatMoney(net);
  elements.rptMargin.textContent = `${margin}%`;

  // Solvency Metrics
  elements.rptDebt.textContent = formatMoney(totalDebtVal);
  elements.rptRepayments.textContent = formatMoney(totalRepayVal);
  elements.rptSavings.textContent = formatMoney(totalSaveVal);
  
  // Credit score sync if calculated
  const currentScore = elements.scoreText.textContent;
  elements.rptScore.textContent = currentScore !== "0" ? `${currentScore} / 100` : "Not Run";

  // Ledger table rows
  elements.rptLedgerBody.innerHTML = visible.length === 0
    ? `<tr><td colspan="5" style="text-align: center;">No financial transactions registered.</td></tr>`
    : visible.map(r => `
        <tr>
          <td>${r.date}</td>
          <td><span class="pill ${r.type}">${r.type}</span></td>
          <td>${escapeHtml(r.category)}</td>
          <td>${escapeHtml(r.farm || "General")}</td>
          <td class="amount ${r.type} text-right">${r.type === 'expense' ? '-' : ''}${formatMoney(r.amount)}</td>
        </tr>
      `).join("");
}

// -------------------------------------------------------------
// EVENT HANDLERS & REGISTRATION
// -------------------------------------------------------------
function handleTransactionSubmit(event) {
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
    farm: elements.farmSelect.value,
    category: elements.category.value,
    amount,
    note: elements.note.value.trim()
  });

  saveLocal(KEYS.records, records);
  elements.form.reset();
  setDefaultDateFields();
  refreshCategories();
  renderDashboard();
}

function handleProfileSubmit(event) {
  event.preventDefault();
  profile = {
    name: elements.profName.value.trim(),
    phone: elements.profPhone.value.trim(),
    coop: elements.profCoop.value.trim(),
    district: elements.profDistrict.value,
    village: elements.profVillage.value.trim()
  };
  saveLocal(KEYS.profile, profile);
  updateProfileDisplays();
  showToast("Farmer profile saved successfully!");
}

function handleFarmSubmit(event) {
  event.preventDefault();
  const f = {
    id: crypto.randomUUID(),
    name: elements.farmName.value.trim(),
    acreage: parseFloat(elements.farmAcreage.value),
    crop: elements.farmCrop.value,
    district: elements.farmDistrict.value
  };

  farms.push(f);
  saveLocal(KEYS.farms, farms);
  updateFarmsDropdowns();
  elements.farmForm.reset();
  showToast(`Farm "${f.name}" registered successfully!`);
  renderFarms();
}

function handleLoanSubmit(event) {
  event.preventDefault();
  const l = {
    id: crypto.randomUUID(),
    lender: elements.loanLender.value.trim(),
    principal: parseFloat(elements.loanPrincipal.value),
    rate: parseFloat(elements.loanRate.value),
    issued: elements.loanIssued.value,
    due: elements.loanDue.value,
    repaid: 0,
    status: "active"
  };

  loans.push(l);
  saveLocal(KEYS.loans, loans);
  elements.loanForm.reset();
  setDefaultDateFields();
  showToast(`Loan from ${l.lender} recorded.`);
  renderLoansAndSavings();
}

function handleSavingsSubmit(event) {
  event.preventDefault();
  const s = {
    id: crypto.randomUUID(),
    amount: parseFloat(elements.saveAmount.value),
    date: elements.saveDate.value,
    purpose: elements.savePurpose.value.trim()
  };

  savings.push(s);
  saveLocal(KEYS.savings, savings);
  elements.savingsForm.reset();
  setDefaultDateFields();
  showToast(`Savings deposit of ${formatMoney(s.amount)} logged.`);
  renderLoansAndSavings();
}

function handlePaymentSubmit(event) {
  event.preventDefault();
  const loanId = elements.payLoanId.value;
  const payAmt = parseFloat(elements.payAmount.value);
  const payDate = elements.payDate.value;

  const loan = loans.find(l => l.id === loanId);
  if (loan) {
    loan.repaid += payAmt;
    if (loan.repaid >= loan.principal) {
      loan.status = "paid";
    }

    // Add corresponding payment expense record to dashboard ledger automatically
    records.push({
      id: crypto.randomUUID(),
      type: "expense",
      date: payDate,
      farm: "General",
      category: "Loan payment",
      amount: payAmt,
      note: `Repayment to ${loan.lender}`
    });

    saveLocal(KEYS.loans, loans);
    saveLocal(KEYS.records, records);
    closePaymentDialog();
    renderLoansAndSavings();
  }
}

function resetDemo() {
  if (confirm("Reset application workspace data? This clears custom records.")) {
    localStorage.clear();
    initializeData();
    renderAll();
    // Reset AI screen state too
    elements.scoreText.textContent = "0";
    elements.scoreCircle.style.strokeDashoffset = "251.2";
    elements.scoreLabel.textContent = "Calculate score to see creditworthiness standing.";
    elements.checksList.innerHTML = `
      <div class="check-row pending"><span>⌛ Net profit balance</span><span>Pending</span></div>
      <div class="check-row pending"><span>⌛ Savings cushion size</span><span>Pending</span></div>
      <div class="check-row pending"><span>⌛ Active land size registered</span><span>Pending</span></div>
      <div class="check-row pending"><span>⌛ Active loan repayment history</span><span>Pending</span></div>
    `;
    elements.aiRecommendations.innerHTML = `<p class="empty-state visible">Run the AI Diagnostic to analyze your data and generate recommendations.</p>`;
    elements.cropInsights.innerHTML = `<p class="empty-state visible">Run the AI Diagnostic to fetch localized agricultural forecasts.</p>`;
  }
}

function exportCsv() {
  const visible = getFilteredRecords();
  const rows = [
    ["Date", "Type", "Farm Target", "Category", "Amount UGX", "Note"],
    ...visible.map(r => [r.date, r.type, r.farm || "General", r.category, r.amount, r.note || ""])
  ];

  const csv = rows
    .map(row => row.map(cell => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `agrifinance-statement-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// Toast notification helper
function showToast(message) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// Event Listeners Registration
elements.type.addEventListener("change", refreshCategories);
elements.form.addEventListener("submit", handleTransactionSubmit);
elements.periodFilter.addEventListener("change", renderDashboard);
elements.exportButton.addEventListener("click", exportCsv);
elements.resetButton.addEventListener("click", resetDemo);

elements.profileForm.addEventListener("submit", handleProfileSubmit);
elements.farmForm.addEventListener("submit", handleFarmSubmit);
elements.loanForm.addEventListener("submit", handleLoanSubmit);
elements.savingsForm.addEventListener("submit", handleSavingsSubmit);
elements.paymentForm.addEventListener("submit", handlePaymentSubmit);

elements.closePaymentModal.addEventListener("click", closePaymentDialog);
elements.marketDistrictSelect.addEventListener("change", updateMarketAndWeather);

elements.runDiagnosticBtn.addEventListener("click", runAIDiagnostics);
elements.printReportBtn.addEventListener("click", () => window.print());

elements.chatbotFab?.addEventListener("click", () => {
  const isOpen = elements.chatbotPopup.classList.contains("open");
  if (isOpen) {
    closeChatbotPopup();
  } else {
    openChatbotPopup();
  }
});
elements.chatbotCloseBtn?.addEventListener("click", closeChatbotPopup);
elements.chatSendBtn?.addEventListener("click", handleChatQuestion);
elements.chatInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleChatQuestion();
  }
});

// Routing hash listener
window.addEventListener("hashchange", handleRouting);

// Start App
initializeData();
refreshCategories();
renderSavedChatHistory();
handleRouting();
