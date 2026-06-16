import 'package:flutter/material.dart';
import 'dart:html' as html;
import 'dart:ui_web' as ui_web;

class AdSlotWidget extends StatefulWidget {
  final String slotId;
  final String adUnitPath; // Kept for API compatibility with existing calls
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
  State<AdSlotWidget> createState() => _AdSlotWidgetState();
}

class _AdSlotWidgetState extends State<AdSlotWidget> {
  late String _viewId;
  bool _isRegistered = false;

  @override
  void initState() {
    super.initState();
    _viewId = 'adsense-view-${widget.slotId}';

    // Only register once per ID
    try {
      ui_web.platformViewRegistry.registerViewFactory(_viewId, (int viewId) {
        final container = html.DivElement()
          ..style.width = '100%'
          ..style.height = '100%';

        final ins = html.Element.tag('ins')
          ..className = 'adsbygoogle'
          ..style.display = 'inline-block'
          ..style.width = '${widget.width}px'
          ..style.height = '${widget.height}px'
          ..attributes['data-ad-client'] = 'ca-pub-5650522247882745';
        // ..attributes['data-ad-slot'] = widget.slotId; // Optional if you have explicit ad units configured

        container.append(ins);

        final script = html.ScriptElement()
          ..type = 'text/javascript'
          ..text = '(adsbygoogle = window.adsbygoogle || []).push({});';

        container.append(script);

        return container;
      });
      _isRegistered = true;
    } catch (e) {
      debugPrint('View factory $_viewId already registered or failed: $e');
      _isRegistered = true;
    }
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: _isRegistered
          ? Stack(
              children: [
                // Visual Placeholder / Dummy Box
                Container(
                  width: widget.width,
                  height: widget.height,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade200,
                    border: Border.all(color: Colors.grey.shade400, width: 1),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Center(
                    child: Text(
                      'Ad Slot\n${widget.width.toInt()} x ${widget.height.toInt()}',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.grey.shade500,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ),
                // Actual Ad View on top
                HtmlElementView(viewType: _viewId),
              ],
            )
          : const Center(child: CircularProgressIndicator()),
    );
  }
}
