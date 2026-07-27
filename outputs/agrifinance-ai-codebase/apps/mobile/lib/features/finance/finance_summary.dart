import 'finance_record.dart';

class FinanceSummary {
  const FinanceSummary({
    required this.income,
    required this.expenses,
    required this.profit,
    required this.profitMargin,
    required this.recordCount,
    required this.advice,
  });

  final double income;
  final double expenses;
  final double profit;
  final double profitMargin;
  final int recordCount;
  final String advice;

  factory FinanceSummary.fromRecords(List<FinanceRecord> records) {
    final income = records
        .where((record) => record.type == FinanceRecordType.income)
        .fold<double>(0, (sum, record) => sum + record.amount);
    final expenses = records
        .where((record) => record.type == FinanceRecordType.expense)
        .fold<double>(0, (sum, record) => sum + record.amount);
    final profit = income - expenses;
    final margin = income > 0 ? (profit / income) * 100 : 0.0;

    return FinanceSummary(
      income: income,
      expenses: expenses,
      profit: profit,
      profitMargin: margin,
      recordCount: records.length,
      advice: _buildAdvice(records.length, profit, margin),
    );
  }

  static String _buildAdvice(int recordCount, double profit, double margin) {
    if (recordCount == 0) {
      return 'Add income and expense records to start receiving useful advice.';
    }

    if (profit < 0) {
      return 'Expenses are higher than income. Review the biggest cost areas before making new farm investments.';
    }

    if (margin < 20) {
      return 'Profit is positive, but the margin is low. Try to reduce recurring costs and protect cash for the next season.';
    }

    return 'The farm has a healthy positive balance. Consider saving part of the profit for inputs or emergencies.';
  }
}
