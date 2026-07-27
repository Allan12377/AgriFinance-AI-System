import 'package:flutter/material.dart';

import '../../shared/money_formatter.dart';
import 'finance_record.dart';
import 'finance_repository.dart';
import 'finance_summary.dart';

class FinanceDashboardScreen extends StatefulWidget {
  const FinanceDashboardScreen({super.key});

  @override
  State<FinanceDashboardScreen> createState() => _FinanceDashboardScreenState();
}

class _FinanceDashboardScreenState extends State<FinanceDashboardScreen> {
  final FinanceRepository _repository = FinanceRepository();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _cropController = TextEditingController();
  final TextEditingController _amountController = TextEditingController();
  final TextEditingController _noteController = TextEditingController();

  FinanceRecordType _selectedType = FinanceRecordType.income;
  DateTime _selectedDate = DateTime.now();
  String _selectedCategory = 'Crop sales';
  late List<FinanceRecord> _records;

  static const List<String> incomeCategories = [
    'Crop sales',
    'Livestock sales',
    'Grant',
    'Loan received',
    'Other income',
  ];

  static const List<String> expenseCategories = [
    'Seeds',
    'Fertilizer',
    'Labour',
    'Transport',
    'Pesticides',
    'Loan payment',
    'Other expense',
  ];

  @override
  void initState() {
    super.initState();
    _records = _repository.listRecords();
  }

  @override
  void dispose() {
    _cropController.dispose();
    _amountController.dispose();
    _noteController.dispose();
    super.dispose();
  }

  List<String> get _categories {
    return _selectedType == FinanceRecordType.income
        ? incomeCategories
        : expenseCategories;
  }

  @override
  Widget build(BuildContext context) {
    final summary = FinanceSummary.fromRecords(_records);

    return Scaffold(
      appBar: AppBar(
        title: const Text('AgriFinance AI'),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: Chip(
              label: const Text('Step 1'),
              backgroundColor: Theme.of(context).colorScheme.primaryContainer,
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Text(
              'Farm finance dashboard',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
            ),
            const SizedBox(height: 4),
            Text(
              'Record farm income and expenses, then monitor profit.',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.grey.shade700,
                  ),
            ),
            const SizedBox(height: 16),
            _SummaryGrid(summary: summary),
            const SizedBox(height: 16),
            _AdviceCard(summary: summary),
            const SizedBox(height: 16),
            _RecordForm(
              formKey: _formKey,
              cropController: _cropController,
              amountController: _amountController,
              noteController: _noteController,
              selectedType: _selectedType,
              selectedDate: _selectedDate,
              selectedCategory: _selectedCategory,
              categories: _categories,
              onTypeChanged: _handleTypeChanged,
              onCategoryChanged: (value) {
                setState(() => _selectedCategory = value);
              },
              onPickDate: _pickDate,
              onSubmit: _submitRecord,
            ),
            const SizedBox(height: 16),
            _RecordsList(
              records: _records,
              onDelete: _deleteRecord,
            ),
          ],
        ),
      ),
    );
  }

  void _handleTypeChanged(FinanceRecordType type) {
    setState(() {
      _selectedType = type;
      _selectedCategory = type == FinanceRecordType.income
          ? incomeCategories.first
          : expenseCategories.first;
    });
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime(2020),
      lastDate: DateTime(2035),
    );

    if (picked != null) {
      setState(() => _selectedDate = picked);
    }
  }

  void _submitRecord() {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    final record = FinanceRecord(
      id: DateTime.now().microsecondsSinceEpoch.toString(),
      type: _selectedType,
      date: _selectedDate,
      cropName: _cropController.text.trim(),
      category: _selectedCategory,
      amount: double.parse(_amountController.text),
      note: _noteController.text.trim(),
    );

    _repository.addRecord(record);
    _cropController.clear();
    _amountController.clear();
    _noteController.clear();

    setState(() {
      _records = _repository.listRecords();
    });
  }

  void _deleteRecord(String id) {
    _repository.deleteRecord(id);
    setState(() {
      _records = _repository.listRecords();
    });
  }
}

class _SummaryGrid extends StatelessWidget {
  const _SummaryGrid({required this.summary});

  final FinanceSummary summary;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isWide = constraints.maxWidth > 640;
        return GridView.count(
          crossAxisCount: isWide ? 4 : 2,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          childAspectRatio: isWide ? 1.45 : 1.25,
          children: [
            _SummaryCard(
              title: 'Income',
              value: MoneyFormatter.ugx(summary.income),
              subtitle: 'Total received',
              color: Colors.green.shade700,
            ),
            _SummaryCard(
              title: 'Expenses',
              value: MoneyFormatter.ugx(summary.expenses),
              subtitle: 'Total spent',
              color: Colors.red.shade700,
            ),
            _SummaryCard(
              title: 'Profit',
              value: MoneyFormatter.ugx(summary.profit),
              subtitle: summary.profit >= 0 ? 'Positive balance' : 'Loss warning',
              color: summary.profit >= 0 ? Colors.green.shade800 : Colors.red.shade800,
            ),
            _SummaryCard(
              title: 'Margin',
              value: '${summary.profitMargin.toStringAsFixed(1)}%',
              subtitle: 'Income kept',
              color: Colors.blue.shade700,
            ),
          ],
        );
      },
    );
  }
}

class _SummaryCard extends StatelessWidget {
  const _SummaryCard({
    required this.title,
    required this.value,
    required this.subtitle,
    required this.color,
  });

  final String title;
  final String value;
  final String subtitle;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(title, style: Theme.of(context).textTheme.labelLarge),
            const SizedBox(height: 8),
            FittedBox(
              fit: BoxFit.scaleDown,
              alignment: Alignment.centerLeft,
              child: Text(
                value,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      color: color,
                      fontWeight: FontWeight.w800,
                    ),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              subtitle,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Colors.grey.shade700,
                  ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AdviceCard extends StatelessWidget {
  const _AdviceCard({required this.summary});

  final FinanceSummary summary;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              backgroundColor: Theme.of(context).colorScheme.primaryContainer,
              foregroundColor: Theme.of(context).colorScheme.onPrimaryContainer,
              child: const Icon(Icons.psychology_alt_outlined),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Financial advice',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                  ),
                  const SizedBox(height: 4),
                  Text(summary.advice),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _RecordForm extends StatelessWidget {
  const _RecordForm({
    required this.formKey,
    required this.cropController,
    required this.amountController,
    required this.noteController,
    required this.selectedType,
    required this.selectedDate,
    required this.selectedCategory,
    required this.categories,
    required this.onTypeChanged,
    required this.onCategoryChanged,
    required this.onPickDate,
    required this.onSubmit,
  });

  final GlobalKey<FormState> formKey;
  final TextEditingController cropController;
  final TextEditingController amountController;
  final TextEditingController noteController;
  final FinanceRecordType selectedType;
  final DateTime selectedDate;
  final String selectedCategory;
  final List<String> categories;
  final ValueChanged<FinanceRecordType> onTypeChanged;
  final ValueChanged<String> onCategoryChanged;
  final VoidCallback onPickDate;
  final VoidCallback onSubmit;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Add finance record',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
              ),
              const SizedBox(height: 14),
              SegmentedButton<FinanceRecordType>(
                segments: const [
                  ButtonSegment(
                    value: FinanceRecordType.income,
                    label: Text('Income'),
                    icon: Icon(Icons.trending_up),
                  ),
                  ButtonSegment(
                    value: FinanceRecordType.expense,
                    label: Text('Expense'),
                    icon: Icon(Icons.trending_down),
                  ),
                ],
                selected: {selectedType},
                onSelectionChanged: (values) => onTypeChanged(values.first),
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: cropController,
                decoration: const InputDecoration(
                  labelText: 'Crop or farm',
                  prefixIcon: Icon(Icons.agriculture_outlined),
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Enter the crop or farm name';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                value: selectedCategory,
                decoration: const InputDecoration(
                  labelText: 'Category',
                  prefixIcon: Icon(Icons.category_outlined),
                  border: OutlineInputBorder(),
                ),
                items: categories
                    .map(
                      (category) => DropdownMenuItem(
                        value: category,
                        child: Text(category),
                      ),
                    )
                    .toList(),
                onChanged: (value) {
                  if (value != null) {
                    onCategoryChanged(value);
                  }
                },
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: amountController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Amount in UGX',
                  prefixIcon: Icon(Icons.payments_outlined),
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  final amount = double.tryParse(value ?? '');
                  if (amount == null || amount <= 0) {
                    return 'Enter an amount greater than zero';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 12),
              OutlinedButton.icon(
                onPressed: onPickDate,
                icon: const Icon(Icons.calendar_month_outlined),
                label: Text(
                  'Date: ${selectedDate.year}-${selectedDate.month.toString().padLeft(2, '0')}-${selectedDate.day.toString().padLeft(2, '0')}',
                ),
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: noteController,
                decoration: const InputDecoration(
                  labelText: 'Note',
                  prefixIcon: Icon(Icons.notes_outlined),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 14),
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  onPressed: onSubmit,
                  icon: const Icon(Icons.add),
                  label: const Text('Add record'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _RecordsList extends StatelessWidget {
  const _RecordsList({
    required this.records,
    required this.onDelete,
  });

  final List<FinanceRecord> records;
  final ValueChanged<String> onDelete;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Recent records',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
            ),
            const SizedBox(height: 8),
            if (records.isEmpty)
              const Padding(
                padding: EdgeInsets.symmetric(vertical: 24),
                child: Center(child: Text('No records yet.')),
              )
            else
              ...records.map(
                (record) => _RecordTile(
                  record: record,
                  onDelete: () => onDelete(record.id),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _RecordTile extends StatelessWidget {
  const _RecordTile({
    required this.record,
    required this.onDelete,
  });

  final FinanceRecord record;
  final VoidCallback onDelete;

  @override
  Widget build(BuildContext context) {
    final color = record.isIncome ? Colors.green.shade700 : Colors.red.shade700;

    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: CircleAvatar(
        backgroundColor: color.withOpacity(0.12),
        foregroundColor: color,
        child: Icon(record.isIncome ? Icons.arrow_downward : Icons.arrow_upward),
      ),
      title: Text('${record.cropName} - ${record.category}'),
      subtitle: Text(
        '${record.date.year}-${record.date.month.toString().padLeft(2, '0')}-${record.date.day.toString().padLeft(2, '0')}${record.note.isEmpty ? '' : ' - ${record.note}'}',
      ),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            '${record.isIncome ? '+' : '-'}${MoneyFormatter.ugx(record.amount)}',
            style: TextStyle(
              color: color,
              fontWeight: FontWeight.w700,
            ),
          ),
          IconButton(
            tooltip: 'Delete',
            onPressed: onDelete,
            icon: const Icon(Icons.delete_outline),
          ),
        ],
      ),
    );
  }
}
