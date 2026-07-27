import 'finance_record.dart';

class FinanceRepository {
  final List<FinanceRecord> _records = [
    FinanceRecord(
      id: 'demo-1',
      type: FinanceRecordType.income,
      date: DateTime(2026, 7, 2),
      cropName: 'Beans',
      category: 'Crop sales',
      amount: 820000,
      note: 'July harvest',
    ),
    FinanceRecord(
      id: 'demo-2',
      type: FinanceRecordType.expense,
      date: DateTime(2026, 7, 4),
      cropName: 'Beans',
      category: 'Transport',
      amount: 120000,
      note: 'Market delivery',
    ),
    FinanceRecord(
      id: 'demo-3',
      type: FinanceRecordType.expense,
      date: DateTime(2026, 7, 6),
      cropName: 'Beans',
      category: 'Fertilizer',
      amount: 180000,
      note: 'Top dressing',
    ),
  ];

  List<FinanceRecord> listRecords() {
    final copy = [..._records];
    copy.sort((a, b) => b.date.compareTo(a.date));
    return copy;
  }

  void addRecord(FinanceRecord record) {
    _records.add(record);
  }

  void deleteRecord(String id) {
    _records.removeWhere((record) => record.id == id);
  }
}
