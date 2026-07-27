class MoneyFormatter {
  static String ugx(num value) {
    final rounded = value.round();
    final text = rounded.toString().replaceAllMapped(
      RegExp(r'\B(?=(\d{3})+(?!\d))'),
      (match) => ',',
    );
    return 'UGX $text';
  }
}
