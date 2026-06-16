import 'dart:math';
import 'package:flutter/material.dart';

class BmiGauge extends StatelessWidget {
  final double bmi;
  const BmiGauge({super.key, required this.bmi});

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween<double>(begin: 0, end: bmi),
      duration: const Duration(milliseconds: 800),
      curve: Curves.easeOutCubic,
      builder: (context, value, child) {
        return CustomPaint(
          size: const Size(250, 125),
          painter: _BmiGaugePainter(value),
        );
      },
    );
  }
}

class _BmiGaugePainter extends CustomPainter {
  final double bmi;

  _BmiGaugePainter(this.bmi);

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height);
    final radius = size.width / 2;
    final rect = Rect.fromCircle(center: center, radius: radius);

    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 20
      ..strokeCap = StrokeCap.butt;

    const minBmi = 15.0;
    const maxBmi = 40.0;
    const range = maxBmi - minBmi;

    void drawSegment(double startBmi, double endBmi, Color color) {
      paint.color = color;
      final startAngle = pi + ((startBmi - minBmi) / range) * pi;
      final sweepAngle = ((endBmi - startBmi) / range) * pi;
      canvas.drawArc(rect, startAngle, sweepAngle, false, paint);
    }

    drawSegment(15, 18.5, Colors.blue);
    drawSegment(18.5, 25, Colors.green);
    drawSegment(25, 30, Colors.orange);
    drawSegment(30, 40, Colors.red);

    final needlePaint = Paint()
      ..color = const Color(0xFF00C9A7)
      ..style = PaintingStyle.fill;

    final clampedBmi = bmi.clamp(minBmi, maxBmi);
    final angle = pi + ((clampedBmi - minBmi) / range) * pi;

    canvas.save();
    canvas.translate(center.dx, center.dy);
    canvas.rotate(angle);

    final path = Path()
      ..moveTo(0, 5)
      ..lineTo(radius - 10, 0)
      ..lineTo(0, -5)
      ..close();
    canvas.drawPath(path, needlePaint);

    canvas.drawCircle(const Offset(0, 0), 10, needlePaint);
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _BmiGaugePainter oldDelegate) {
    return oldDelegate.bmi != bmi;
  }
}
