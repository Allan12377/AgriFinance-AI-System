enum FinanceRecordType { income, expense }

class FinanceRecord {
  const FinanceRecord({
    required this.id,
    required this.type,
    required this.date,
    required this.cropName,
    required this.category,
    required this.amount,
    this.note = '',
  });

  final String id;
  final FinanceRecordType type;
  final DateTime date;
  final String cropName;
  final String category;
  final double amount;
  final String note;

  bool get isIncome => type == FinanceRecordType.income;
}
