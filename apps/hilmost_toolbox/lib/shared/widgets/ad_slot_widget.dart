import 'package:flutter/material.dart';

class AdSlotWidget extends StatelessWidget {
  final String slotId;
  final String adUnitPath;
  final double width;
  final double height;

  const AdSlotWidget({
    super.key,
    required this.slotId,
    required this.adUnitPath,
    required this.width,
    required this.height,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      height: height,
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: const Color(0xFFF0F0EE), // Soft background color
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.black26, style: BorderStyle.solid),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.ad_units_outlined, color: Colors.black26, size: 32),
            const SizedBox(height: 8),
            const Text(
              'ADVERTISEMENT',
              style: TextStyle(fontSize: 10, color: Colors.black38, fontWeight: FontWeight.bold, letterSpacing: 1.5),
            ),
            const SizedBox(height: 4),
            Text(
              '${width.toInt()} × ${height.toInt()}',
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 12, color: Colors.black54, fontWeight: FontWeight.w500),
            ),
          ],
        ),
      ),
    );
  }
}
