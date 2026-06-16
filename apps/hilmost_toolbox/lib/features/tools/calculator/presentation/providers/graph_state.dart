import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../domain/graph_engine.dart';

part 'graph_state.freezed.dart';

@freezed
sealed class GraphState with _$GraphState {
  const factory GraphState({
    @Default('') String eq1,
    @Default('') String eq2,
    @Default('') String eq3,
    @Default('') String paramY1,
    @Default('') String paramY2,
    @Default('') String paramY3,
    @Default(PlotMode.standard) PlotMode mode1,
    @Default(PlotMode.standard) PlotMode mode2,
    @Default(PlotMode.standard) PlotMode mode3,
    @Default('=') String relation1,
    @Default('=') String relation2,
    @Default('=') String relation3,
    @Default(-10.0) double minX,
    @Default(10.0) double maxX,
    @Default(-10.0) double minY,
    @Default(10.0) double maxY,
    @Default({}) Map<String, double> parameters,
    @Default(true) bool isRadians,
    @Default(false) bool showDerivative1,
    @Default(false) bool showDerivative2,
    @Default(false) bool showDerivative3,
    @Default(false) bool isLoading,
    @Default(false) bool hasError1,
    @Default(false) bool hasError2,
    @Default(false) bool hasError3,
    @Default(1) int visibleEquations,
    GraphResult? result,
  }) = _GraphState;
}
