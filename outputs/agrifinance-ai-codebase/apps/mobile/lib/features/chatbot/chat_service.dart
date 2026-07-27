import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class ChatService {
  static const String _baseUrl = 'http://127.0.0.1:8000/chat';

  Future<String> askQuestion({
    required String question,
    required double income,
    required double expenses,
    required double savings,
    required double activeLoanBalance,
    required int recordCount,
  }) async {
    final payload = {
      'question': question,
      'income': income,
      'expenses': expenses,
      'savings': savings,
      'active_loan_balance': activeLoanBalance,
      'record_count': recordCount,
    };

    final response = await http.post(
      Uri.parse('$_baseUrl/ask'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(payload),
    );

    if (response.statusCode != 200) {
      throw Exception('Chat service error: ${response.statusCode}');
    }

    final decoded = jsonDecode(response.body) as Map<String, dynamic>;
    return decoded['answer'] as String;
  }
}
