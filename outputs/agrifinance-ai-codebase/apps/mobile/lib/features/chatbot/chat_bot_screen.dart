import 'package:flutter/material.dart';

import '../finance/finance_repository.dart';
import '../finance/finance_summary.dart';
import 'chat_assistant.dart';
import 'chat_service.dart';

class ChatBotScreen extends StatefulWidget {
  const ChatBotScreen({super.key});

  @override
  State<ChatBotScreen> createState() => _ChatBotScreenState();
}

class _ChatBotScreenState extends State<ChatBotScreen> {
  final TextEditingController _questionController = TextEditingController();
  final FinanceRepository _repository = FinanceRepository();
  final ChatService _chatService = ChatService();
  final List<String> _messages = [
    'Ask me about profit, margin, income, expenses, savings, or loan readiness.',
  ];
  bool _isLoading = false;

  @override
  void dispose() {
    _questionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ask AgriCoach'),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Expanded(
                child: ListView.separated(
                  padding: const EdgeInsets.only(bottom: 12),
                  itemCount: _messages.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final message = _messages[index];
                    final isAssistant = index % 2 == 0;

                    return Align(
                      alignment: isAssistant ? Alignment.centerLeft : Alignment.centerRight,
                      child: Container(
                        constraints: BoxConstraints(
                          maxWidth: MediaQuery.of(context).size.width * 0.78,
                        ),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isAssistant
                              ? Theme.of(context).colorScheme.primaryContainer
                              : Theme.of(context).colorScheme.secondaryContainer,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(message),
                      ),
                    );
                  },
                ),
              ),
              if (_isLoading)
                const Padding(
                  padding: EdgeInsets.only(bottom: 12),
                  child: CircularProgressIndicator(),
                ),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _questionController,
                          decoration: const InputDecoration(
                            hintText: 'Ask a question like “what is profit margin?”',
                            border: OutlineInputBorder(),
                          ),
                          minLines: 1,
                          maxLines: 3,
                        ),
                      ),
                      const SizedBox(width: 12),
                      FilledButton.icon(
                        onPressed: _isLoading ? null : _askAssistant,
                        icon: const Icon(Icons.send_outlined),
                        label: const Text('Ask'),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _askAssistant() async {
    final question = _questionController.text.trim();
    if (question.isEmpty || _isLoading) {
      return;
    }

    final records = _repository.listRecords();
    final summary = FinanceSummary.fromRecords(records);

    setState(() {
      _isLoading = true;
      _messages.add('You: $question');
      _questionController.clear();
    });

    try {
      final answer = await _chatService.askQuestion(
        question: question,
        income: summary.income,
        expenses: summary.expenses,
        savings: 0,
        activeLoanBalance: 0,
        recordCount: summary.recordCount,
      );

      if (!mounted) {
        return;
      }

      setState(() {
        _messages.add(answer);
        _isLoading = false;
      });
    } catch (_) {
      if (!mounted) {
        return;
      }

      setState(() {
        _messages.add(ChatAssistant.explain(question));
        _isLoading = false;
      });
    }
  }
}
