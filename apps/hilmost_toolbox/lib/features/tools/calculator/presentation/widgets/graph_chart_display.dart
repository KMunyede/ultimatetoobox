import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../providers/graph_provider.dart';
import '../../domain/graph_engine.dart';

class GraphChartDisplay extends ConsumerWidget {
  final bool isFullscreen;
  final Widget Function()? buildEqInputs;
  final VoidCallback onResetView;
  final VoidCallback onZoomIn;
  final VoidCallback onZoomOut;
  final void Function(double dx, double dy) onPan;
  final VoidCallback onToggleFullscreen;

  const GraphChartDisplay({
    super.key,
    this.isFullscreen = false,
    this.buildEqInputs,
    required this.onResetView,
    required this.onZoomIn,
    required this.onZoomOut,
    required this.onPan,
    required this.onToggleFullscreen,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(graphProvider);
    final notifier = ref.read(graphProvider.notifier);
    final result = state.result;

    final btnStyle = FilledButton.styleFrom(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      padding: const EdgeInsets.symmetric(horizontal: 12),
      minimumSize: const Size(40, 40),
    );

    return Column(
      children: [
        if (isFullscreen && buildEqInputs != null)
          Padding(
            padding: const EdgeInsets.fromLTRB(24, 24, 24, 0),
            child: buildEqInputs!(),
          ),

        if (state.isLoading && result == null)
          const Expanded(child: Center(child: CircularProgressIndicator()))
        else
          Expanded(
            child: Stack(
              children: [
                Positioned.fill(
                  child: ClipRect(
                    child: Padding(
                      padding: EdgeInsets.all(isFullscreen ? 32.0 : 24.0),
                      child: GestureDetector(
                        // Pan and Zoom are simplified here for brevity,
                        // real interaction can be managed via FlChart built-in touch data or external controllers
                        child: LineChart(
                          LineChartData(
                            clipData: const FlClipData.all(),
                            minX: state.minX,
                            maxX: state.maxX,
                            minY: state.minY,
                            maxY: state.maxY,
                            lineBarsData: [
                              if (result != null && result.spots1.isNotEmpty)
                                LineChartBarData(
                                  spots: result.spots1,
                                  isCurved: true,
                                  color: Theme.of(context).colorScheme.primary,
                                  barWidth: 3,
                                  isStrokeCapRound: true,
                                  dotData: const FlDotData(show: false),
                                  belowBarData:
                                      (state.mode1 == PlotMode.standard &&
                                          (state.relation1 == '<' ||
                                              state.relation1 == '<='))
                                      ? BarAreaData(
                                          show: true,
                                          color: Theme.of(context)
                                              .colorScheme
                                              .primary
                                              .withValues(alpha: 0.3),
                                        )
                                      : null,
                                  aboveBarData:
                                      (state.mode1 == PlotMode.standard &&
                                          (state.relation1 == '>' ||
                                              state.relation1 == '>='))
                                      ? BarAreaData(
                                          show: true,
                                          color: Theme.of(context)
                                              .colorScheme
                                              .primary
                                              .withValues(alpha: 0.3),
                                        )
                                      : null,
                                ),
                              if (result != null && result.spots2.isNotEmpty)
                                LineChartBarData(
                                  spots: result.spots2,
                                  isCurved: true,
                                  color: Colors.orange,
                                  barWidth: 3,
                                  isStrokeCapRound: true,
                                  dotData: const FlDotData(show: false),
                                  belowBarData:
                                      (state.mode2 == PlotMode.standard &&
                                          (state.relation2 == '<' ||
                                              state.relation2 == '<='))
                                      ? BarAreaData(
                                          show: true,
                                          color: Colors.orange.withValues(
                                            alpha: 0.3,
                                          ),
                                        )
                                      : null,
                                  aboveBarData:
                                      (state.mode2 == PlotMode.standard &&
                                          (state.relation2 == '>' ||
                                              state.relation2 == '>='))
                                      ? BarAreaData(
                                          show: true,
                                          color: Colors.orange.withValues(
                                            alpha: 0.3,
                                          ),
                                        )
                                      : null,
                                ),
                              if (result != null && result.spots3.isNotEmpty)
                                LineChartBarData(
                                  spots: result.spots3,
                                  isCurved: true,
                                  color: Colors.green,
                                  barWidth: 3,
                                  isStrokeCapRound: true,
                                  dotData: const FlDotData(show: false),
                                  belowBarData:
                                      (state.mode3 == PlotMode.standard &&
                                          (state.relation3 == '<' ||
                                              state.relation3 == '<='))
                                      ? BarAreaData(
                                          show: true,
                                          color: Colors.green.withValues(
                                            alpha: 0.3,
                                          ),
                                        )
                                      : null,
                                  aboveBarData:
                                      (state.mode3 == PlotMode.standard &&
                                          (state.relation3 == '>' ||
                                              state.relation3 == '>='))
                                      ? BarAreaData(
                                          show: true,
                                          color: Colors.green.withValues(
                                            alpha: 0.3,
                                          ),
                                        )
                                      : null,
                                ),
                              if (result != null &&
                                  result.rootSpots1.isNotEmpty)
                                LineChartBarData(
                                  spots: result.rootSpots1,
                                  isCurved: false,
                                  color: Colors.transparent,
                                  barWidth: 0,
                                  dotData: FlDotData(
                                    show: true,
                                    getDotPainter:
                                        (spot, percent, barData, index) =>
                                            FlDotCirclePainter(
                                              radius: 4,
                                              color: Theme.of(
                                                context,
                                              ).colorScheme.primary,
                                              strokeWidth: 1.5,
                                              strokeColor: Colors.white,
                                            ),
                                  ),
                                ),
                              // Adding other spots (derivative, extrema, roots) follows similar structure
                            ],
                            lineTouchData: LineTouchData(
                              enabled: true,
                              touchTooltipData: LineTouchTooltipData(
                                getTooltipColor: (touchedSpot) =>
                                    Theme.of(context).cardColor,
                                getTooltipItems: (touchedSpots) {
                                  return touchedSpots.map((spot) {
                                    return LineTooltipItem(
                                      '(${spot.x.toStringAsFixed(2)}, ${spot.y.toStringAsFixed(2)})',
                                      TextStyle(
                                        color:
                                            spot.bar.color ??
                                            Theme.of(
                                              context,
                                            ).textTheme.bodyLarge?.color,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    );
                                  }).toList();
                                },
                              ),
                            ),
                            titlesData: const FlTitlesData(
                              topTitles: AxisTitles(
                                sideTitles: SideTitles(showTitles: false),
                              ),
                              rightTitles: AxisTitles(
                                sideTitles: SideTitles(showTitles: false),
                              ),
                              bottomTitles: AxisTitles(
                                sideTitles: SideTitles(
                                  showTitles: true,
                                  reservedSize: 30,
                                ),
                              ),
                              leftTitles: AxisTitles(
                                sideTitles: SideTitles(
                                  showTitles: true,
                                  reservedSize: 40,
                                ),
                              ),
                            ),
                            gridData: FlGridData(
                              show: true,
                              drawVerticalLine: true,
                              drawHorizontalLine: true,
                              getDrawingHorizontalLine: (value) {
                                if (value == 0) {
                                  return FlLine(
                                    color: Theme.of(
                                      context,
                                    ).colorScheme.onSurface,
                                    strokeWidth: 2,
                                  );
                                }
                                return FlLine(
                                  color: Theme.of(
                                    context,
                                  ).dividerColor.withValues(alpha: 0.2),
                                  strokeWidth: 1,
                                );
                              },
                              getDrawingVerticalLine: (value) {
                                if (value == 0) {
                                  return FlLine(
                                    color: Theme.of(
                                      context,
                                    ).colorScheme.onSurface,
                                    strokeWidth: 2,
                                  );
                                }
                                return FlLine(
                                  color: Theme.of(
                                    context,
                                  ).dividerColor.withValues(alpha: 0.2),
                                  strokeWidth: 1,
                                );
                              },
                            ),
                            borderData: FlBorderData(
                              show: true,
                              border: Border.all(color: Colors.black12),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                if (state.isLoading)
                  Positioned(
                    top: 16,
                    right: 16,
                    child: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Theme.of(
                          context,
                        ).colorScheme.surface.withValues(alpha: 0.8),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const SizedBox(
                            width: 16,
                            height: 16,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            'Plotting...',
                            style: TextStyle(
                              fontSize: 12,
                              color: Theme.of(context).colorScheme.onSurface,
                            ),
                          ),
                        ],
                      ),
                    ).animate().fadeIn(),
                  ),
              ],
            ),
          ),
      ],
    );
  }
}
