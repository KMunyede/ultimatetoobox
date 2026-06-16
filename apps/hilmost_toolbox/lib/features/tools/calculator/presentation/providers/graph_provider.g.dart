// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'graph_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(GraphNotifier)
final graphProvider = GraphNotifierProvider._();

final class GraphNotifierProvider
    extends $NotifierProvider<GraphNotifier, GraphState> {
  GraphNotifierProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'graphProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$graphNotifierHash();

  @$internal
  @override
  GraphNotifier create() => GraphNotifier();

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(GraphState value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<GraphState>(value),
    );
  }
}

String _$graphNotifierHash() => r'3e9c724c2dcd655bb8a9800dbb9cddefe5b0b48d';

abstract class _$GraphNotifier extends $Notifier<GraphState> {
  GraphState build();
  @$mustCallSuper
  @override
  void runBuild() {
    final ref = this.ref as $Ref<GraphState, GraphState>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<GraphState, GraphState>,
              GraphState,
              Object?,
              Object?
            >;
    element.handleCreate(ref, build);
  }
}
