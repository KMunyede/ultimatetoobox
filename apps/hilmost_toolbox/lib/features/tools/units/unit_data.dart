class UnitDef {
  final double scale;
  final double offset;
  const UnitDef(this.scale, [this.offset = 0.0]);
}

class UnitCategory {
  final String name;
  final Map<String, UnitDef> units;
  const UnitCategory(this.name, this.units);
}

// All base units have a scale of 1.0.
// To convert VALUE from A to B:
// baseValue = (VALUE * A.scale) + A.offset
// newValue = (baseValue - B.offset) / B.scale

const List<UnitCategory> unitCategories = [
  UnitCategory('Length', {
    'm': UnitDef(1.0),
    'km': UnitDef(1000.0),
    'cm': UnitDef(0.01),
    'mm': UnitDef(0.001),
    'in': UnitDef(0.0254),
    'ft': UnitDef(0.3048),
    'yd': UnitDef(0.9144),
    'mi': UnitDef(1609.344),
    'nautical mile': UnitDef(1852.0),
  }),
  UnitCategory('Weight / Mass', {
    'kg': UnitDef(1.0),
    'g': UnitDef(0.001),
    'mg': UnitDef(0.000001),
    'tonne': UnitDef(1000.0),
    'lb': UnitDef(0.45359237),
    'oz': UnitDef(0.028349523),
    'stone': UnitDef(6.35029318),
    'US ton': UnitDef(907.18474),
  }),
  UnitCategory('Temperature', {
    '°C': UnitDef(1.0, 0.0),
    '°F': UnitDef(5/9, -17.77777777777778),
    'K': UnitDef(1.0, -273.15),
    '°R': UnitDef(5/9, -273.15),
  }),
  UnitCategory('Data Storage', {
    'B': UnitDef(1.0),
    'KB': UnitDef(1000.0),
    'MB': UnitDef(1000000.0),
    'GB': UnitDef(1000000000.0),
    'TB': UnitDef(1000000000000.0),
    'KiB': UnitDef(1024.0),
    'MiB': UnitDef(1048576.0),
    'GiB': UnitDef(1073741824.0),
  }),
  UnitCategory('Time', {
    's': UnitDef(1.0),
    'ms': UnitDef(0.001),
    'min': UnitDef(60.0),
    'hr': UnitDef(3600.0),
    'day': UnitDef(86400.0),
    'week': UnitDef(604800.0),
    'year': UnitDef(31536000.0),
  }),
];
