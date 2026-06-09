import 'package:flutter/material.dart';

class PopOutTile extends StatefulWidget {
  final Widget child;
  final VoidCallback onTap;
  final double borderRadius;
  final Color backgroundColor;

  const PopOutTile({
    super.key,
    required this.child,
    required this.onTap,
    this.borderRadius = 16.0,
    this.backgroundColor = Colors.white,
  });

  @override
  State<PopOutTile> createState() => _PopOutTileState();
}

class _PopOutTileState extends State<PopOutTile> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: widget.onTap,
        onHighlightChanged: (isHighlighted) {
          setState(() {
            _isPressed = isHighlighted;
          });
        },
        hoverColor: Colors.transparent,
        focusColor: Colors.black.withAlpha(10), // Highlight on focus
        borderRadius: BorderRadius.circular(widget.borderRadius),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 100),
          curve: Curves.easeOut,
          transform: Matrix4.translationValues(
            _isPressed ? 2.0 : 0.0,
            _isPressed ? 2.0 : 0.0,
            0.0,
          ),
          decoration: BoxDecoration(
            color: widget.backgroundColor,
            borderRadius: BorderRadius.circular(widget.borderRadius),
            border: Border.all(color: Colors.grey.shade300, width: 1.5),
            boxShadow: _isPressed
                ? []
                : [
                    BoxShadow(
                      color: Colors.grey.shade300,
                      offset: const Offset(4, 4),
                      blurRadius: 0,
                      spreadRadius: 0,
                    ),
                  ],
          ),
          child: widget.child,
        ),
      ),
    );
  }
}
