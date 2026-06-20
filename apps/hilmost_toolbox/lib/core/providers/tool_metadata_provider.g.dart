// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'tool_metadata_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(ToolMetadataNotifier)
final toolMetadataProvider = ToolMetadataNotifierProvider._();

final class ToolMetadataNotifierProvider
    extends $NotifierProvider<ToolMetadataNotifier, Map<String, ToolMetadata>> {
  ToolMetadataNotifierProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'toolMetadataProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$toolMetadataNotifierHash();

  @$internal
  @override
  ToolMetadataNotifier create() => ToolMetadataNotifier();

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(Map<String, ToolMetadata> value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<Map<String, ToolMetadata>>(value),
    );
  }
}

String _$toolMetadataNotifierHash() =>
    r'c0d0c4eb20ea5fc02d13f0372feb03520dbe4523';

abstract class _$ToolMetadataNotifier
    extends $Notifier<Map<String, ToolMetadata>> {
  Map<String, ToolMetadata> build();
  @$mustCallSuper
  @override
  void runBuild() {
    final ref =
        this.ref as $Ref<Map<String, ToolMetadata>, Map<String, ToolMetadata>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<Map<String, ToolMetadata>, Map<String, ToolMetadata>>,
              Map<String, ToolMetadata>,
              Object?,
              Object?
            >;
    element.handleCreate(ref, build);
  }
}
