class ChatAssistant {
  static String explain(String question) {
    final normalized = question.trim().toLowerCase();

    if (normalized.contains('profit')) {
      return 'Profit means income minus expenses. If your farm earned 800,000 UGX and spent 500,000 UGX, your profit is 300,000 UGX.';
    }

    if (normalized.contains('margin')) {
      return 'Profit margin is the percentage of income that remains after costs. Use this formula: profit / income × 100.';
    }

    if (normalized.contains('saving') || normalized.contains('savings')) {
      return 'Savings are the money you keep aside after income and expenses. Keeping at least 10% of income aside can help with seeds, fertilizer, or emergencies.';
    }

    if (normalized.contains('expense') || normalized.contains('cost')) {
      return 'Expenses are the money you spend on the farm, such as fertilizer, labour, seeds, transport, and pesticides.';
    }

    if (normalized.contains('income')) {
      return 'Income is all the money your farm receives, such as crop sales, livestock sales, grants, or loans received.';
    }

    if (normalized.contains('loan') || normalized.contains('borrow')) {
      return 'Loan readiness checks whether the farm can manage debt responsibly. It usually looks at profit, savings, and loan pressure compared with income.';
    }

    if (normalized.contains('record')) {
      return 'A finance record is a simple entry that tracks income or expense. Recording each transaction makes it easier to see what is working on the farm.';
    }

    return 'I can help explain profit, margin, income, expenses, savings, or loan readiness. Ask me in simple words and I will break it down for you.';
  }
}
