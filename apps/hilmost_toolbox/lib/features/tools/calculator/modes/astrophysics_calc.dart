import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:math' as math;
import 'package:math_expressions/math_expressions.dart' hide Stack;
import '../../../../shared/utils/number_formatter.dart';

enum AstroCategory {
  observational,
  theoretical,
}

class AstroVariable {
  final String id;
  final String name;
  final String hint;
  final List<String> units;
  final String defaultUnit;

  const AstroVariable({
    required this.id,
    required this.name,
    required this.hint,
    required this.units,
    required this.defaultUnit,
  });
}

class AstroInputData {
  final double rawValue;
  final String unit;
  const AstroInputData(this.rawValue, this.unit);
}

class AstroResult {
  final String label;
  final String value;
  final bool isError;
  const AstroResult(this.label, this.value, {this.isError = false});
}

class AstroEquation {
  final String name;
  final AstroCategory category;
  final List<AstroVariable> inputs;
  final List<String> outputUnits;
  final String defaultOutputUnit;
  final AstroResult Function(Map<String, AstroInputData> inputs, String outputUnit) calculate;

  const AstroEquation({
    required this.name,
    required this.category,
    required this.inputs,
    required this.outputUnits,
    required this.defaultOutputUnit,
    required this.calculate,
  });
}

const double G = 6.67430e-11; // Gravitational constant
const double c = 299792458; // Speed of light
const double sigma = 5.670374419e-8; // Stefan-Boltzmann constant
const double wienB = 2.897771955e-3; // Wien's displacement constant

double normalizeMass(double value, String unit) {
  switch (unit) {
    case 'Grams': return value / 1000;
    case 'Tons': return value * 1000;
    case 'Earth Mass': return value * 5.972e24;
    case 'Jupiter Mass': return value * 1.898e27;
    case 'Solar Mass': return value * 1.989e30;
    case 'kg':
    default: return value;
  }
}

double normalizeDistance(double value, String unit) {
  switch (unit) {
    case 'mm': return value / 1000;
    case 'cm': return value / 100;
    case 'km': return value * 1000;
    case 'Miles': return value * 1609.34;
    case 'Inches': return value * 0.0254;
    case 'AU': return value * 1.496e11;
    case 'Light Years': return value * 9.461e15;
    case 'Parsecs': return value * 3.086e16;
    case 'm':
    default: return value;
  }
}

double normalizeVelocity(double value, String unit) {
  switch (unit) {
    case 'km/s': return value * 1000;
    case 'km/h': return value / 3.6;
    case 'mph': return value * 0.44704;
    case 'c': return value * c;
    case 'm/s':
    default: return value;
  }
}

double normalizeTemp(double value, String unit) {
  switch (unit) {
    case 'Celsius': return value + 273.15;
    case 'Kelvin':
    default: return value;
  }
}

double convertToTargetDistance(double baseVal, String targetUnit) {
  switch (targetUnit) {
    case 'mm': return baseVal * 1000;
    case 'cm': return baseVal * 100;
    case 'km': return baseVal / 1000;
    case 'Miles': return baseVal / 1609.34;
    case 'Inches': return baseVal / 0.0254;
    case 'AU': return baseVal / 1.496e11;
    case 'Light Years': return baseVal / 9.461e15;
    case 'Parsecs': return baseVal / 3.086e16;
    case 'm':
    default: return baseVal;
  }
}

double convertToTargetVelocity(double baseVal, String targetUnit) {
  switch (targetUnit) {
    case 'km/s': return baseVal / 1000;
    case 'km/h': return baseVal * 3.6;
    case 'mph': return baseVal / 0.44704;
    case 'c': return baseVal / c;
    case 'm/s':
    default: return baseVal;
  }
}

double normalizeWavelength(double value, String unit) {
  switch (unit) {
    case 'nm': return value / 1e9;
    case 'µm': return value / 1e6;
    case 'mm': return value / 1000;
    case 'm':
    default: return value;
  }
}

double convertToTargetWavelength(double baseVal, String targetUnit) { 
  switch (targetUnit) {
    case 'nm': return baseVal * 1e9;
    case 'µm': return baseVal * 1e6;
    case 'mm': return baseVal * 1000;
    case 'm':
    default: return baseVal;
  }
}

double convertToTargetTime(double baseVal, String targetUnit) { 
  switch (targetUnit) {
    case 'Years': return baseVal / (365.25 * 24 * 3600);
    case 'Days': return baseVal / (24 * 3600);
    case 'Seconds':
    default: return baseVal;
  }
}

double convertToTargetLuminosity(double baseVal, String targetUnit) { 
  switch (targetUnit) {
    case 'L_solar': return baseVal / 3.828e26;
    case 'Watts':
    default: return baseVal;
  }
}

final List<String> massUnits = ['kg', 'Grams', 'Tons', 'Earth Mass', 'Jupiter Mass', 'Solar Mass'];
final List<String> distanceUnits = ['m', 'km', 'mm', 'Miles', 'AU', 'Light Years', 'Parsecs'];
final List<String> velocityUnits = ['m/s', 'km/s', 'km/h', 'mph', 'c'];
final List<String> redshiftUnits = ['z'];
final List<String> lumUnits = ['Watts', 'L_solar'];
final List<String> magUnits = ['Magnitude'];
final List<String> timeUnits = ['Seconds', 'Days', 'Years'];
final List<String> tempUnits = ['Kelvin', 'Celsius'];
final List<String> forceUnits = ['Newtons'];
final List<String> accelUnits = ['m/s²'];
final List<String> lengthMmUnits = ['mm', 'cm', 'm', 'Inches'];
final List<String> resolutionUnits = ['arcsec'];
final List<String> wavelengthUnits = ['nm', 'µm', 'mm', 'm'];
final List<String> hubbleUnits = ['km/s/Mpc'];

final AstroVariable vMass1 = AstroVariable(id: 'm1', name: 'Mass', hint: 'e.g. 5.97e24', units: massUnits, defaultUnit: 'kg');
final AstroVariable vMass2 = AstroVariable(id: 'm2', name: 'Mass 2', hint: 'e.g. 7.34e22', units: massUnits, defaultUnit: 'kg');
final AstroVariable vRadius = AstroVariable(id: 'r', name: 'Radius / Distance', hint: 'e.g. 6.37e6', units: distanceUnits, defaultUnit: 'm');
final AstroVariable vVelocity = AstroVariable(id: 'v', name: 'Velocity', hint: 'e.g. 299792', units: velocityUnits, defaultUnit: 'm/s');
final AstroVariable vTemp = AstroVariable(id: 't', name: 'Temperature', hint: 'e.g. 5778', units: tempUnits, defaultUnit: 'Kelvin');
final AstroVariable vLum = AstroVariable(id: 'l', name: 'Luminosity', hint: 'e.g. 1.0', units: lumUnits, defaultUnit: 'L_solar');
final AstroVariable vAperture = AstroVariable(id: 'ap', name: 'Aperture', hint: 'e.g. 200', units: lengthMmUnits, defaultUnit: 'mm');
final AstroVariable vFocalScope = AstroVariable(id: 'fs', name: 'Telescope Focal Length', hint: 'e.g. 1000', units: lengthMmUnits, defaultUnit: 'mm');
final AstroVariable vFocalEye = AstroVariable(id: 'fe', name: 'Eyepiece Focal Length', hint: 'e.g. 10', units: lengthMmUnits, defaultUnit: 'mm');
final AstroVariable vApparentFov = AstroVariable(id: 'afov', name: 'Apparent FOV', hint: 'e.g. 50', units: ['degrees'], defaultUnit: 'degrees');
final AstroVariable vRedshift = AstroVariable(id: 'z', name: 'Redshift (z)', hint: 'e.g. 0.1', units: redshiftUnits, defaultUnit: 'z');
final AstroVariable vHubble = AstroVariable(id: 'h0', name: 'Hubble Constant (H₀)', hint: 'e.g. 70', units: hubbleUnits, defaultUnit: 'km/s/Mpc');
final AstroVariable vSemiMajor = AstroVariable(id: 'a', name: 'Semi-major Axis', hint: 'e.g. 1.0', units: distanceUnits, defaultUnit: 'AU');
final AstroVariable vOmegaM = AstroVariable(id: 'om', name: 'Matter Density (Ωm)', hint: 'e.g. 0.3', units: ['None'], defaultUnit: 'None');
final AstroVariable vOmegaL = AstroVariable(id: 'ol', name: 'Dark Energy (ΩΛ)', hint: 'e.g. 0.7', units: ['None'], defaultUnit: 'None');
final AstroVariable vWavelength = AstroVariable(id: 'wl', name: 'Wavelength (λ)', hint: 'e.g. 550', units: wavelengthUnits, defaultUnit: 'nm');
final AstroVariable vApparentMag = AstroVariable(id: 'm_app', name: 'Apparent Mag (m)', hint: 'e.g. 1.5', units: magUnits, defaultUnit: 'Magnitude');
final AstroVariable vAbsMag = AstroVariable(id: 'M_abs', name: 'Absolute Mag (M)', hint: 'e.g. -4.8', units: magUnits, defaultUnit: 'Magnitude');

final List<AstroEquation> astroEquations = [
  // THEORETICAL / COSMOLOGY
  AstroEquation(
    name: 'Escape Velocity',
    category: AstroCategory.theoretical,
    inputs: [vMass1, vRadius],
    outputUnits: velocityUnits,
    defaultOutputUnit: 'm/s',
    calculate: (inputs, outUnit) {
      final m = normalizeMass(inputs['m1']!.rawValue, inputs['m1']!.unit);
      final r = normalizeDistance(inputs['r']!.rawValue, inputs['r']!.unit);
      if (r == 0) return const AstroResult('Error', 'Radius cannot be zero', isError: true);
      final v = math.sqrt(2 * G * m / r);
      return AstroResult('Escape Velocity (v)', '${NumberFormatter.format(convertToTargetVelocity(v, outUnit))} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Orbital Velocity',
    category: AstroCategory.theoretical,
    inputs: [vMass1, vRadius],
    outputUnits: velocityUnits,
    defaultOutputUnit: 'm/s',
    calculate: (inputs, outUnit) {
      final m = normalizeMass(inputs['m1']!.rawValue, inputs['m1']!.unit);
      final r = normalizeDistance(inputs['r']!.rawValue, inputs['r']!.unit);
      if (r == 0) return const AstroResult('Error', 'Radius cannot be zero', isError: true);
      final v = math.sqrt(G * m / r);
      return AstroResult('Orbital Velocity (v)', '${NumberFormatter.format(convertToTargetVelocity(v, outUnit))} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Schwarzschild Radius',
    category: AstroCategory.theoretical,
    inputs: [vMass1],
    outputUnits: distanceUnits,
    defaultOutputUnit: 'm',
    calculate: (inputs, outUnit) {
      final m = normalizeMass(inputs['m1']!.rawValue, inputs['m1']!.unit);
      final r = (2 * G * m) / (c * c);
      return AstroResult('Schwarzschild Radius (rs)', '${NumberFormatter.format(convertToTargetDistance(r, outUnit))} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Time Dilation',
    category: AstroCategory.theoretical,
    inputs: [vVelocity],
    outputUnits: ['Lorentz Factor'],
    defaultOutputUnit: 'Lorentz Factor',
    calculate: (inputs, outUnit) {
      final v = normalizeVelocity(inputs['v']!.rawValue, inputs['v']!.unit);
      if (v >= c) return const AstroResult('Error', 'Velocity >= c', isError: true);
      final gamma = 1 / math.sqrt(1 - (v * v) / (c * c));
      return AstroResult('Lorentz Factor (γ)', NumberFormatter.format(gamma));
    },
  ),
  AstroEquation(
    name: 'Kepler\'s Third Law',
    category: AstroCategory.theoretical,
    inputs: [vMass1, vMass2, vSemiMajor],
    outputUnits: timeUnits,
    defaultOutputUnit: 'Years',
    calculate: (inputs, outUnit) {
      final m1 = normalizeMass(inputs['m1']!.rawValue, inputs['m1']!.unit);
      final m2 = inputs.containsKey('m2') ? normalizeMass(inputs['m2']!.rawValue, inputs['m2']!.unit) : 0.0;
      final a = normalizeDistance(inputs['a']!.rawValue, inputs['a']!.unit);
      final m = m1 + m2;
      if (m == 0) return const AstroResult('Error', 'Total Mass cannot be zero', isError: true);
      final tSeconds = math.sqrt((4 * math.pow(math.pi, 2) * math.pow(a, 3)) / (G * m));
      return AstroResult('Orbital Period (T)', '${NumberFormatter.format(convertToTargetTime(tSeconds, outUnit))} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Newton\'s Gravity',
    category: AstroCategory.theoretical,
    inputs: [vMass1, vMass2, vRadius],
    outputUnits: forceUnits,
    defaultOutputUnit: 'Newtons',
    calculate: (inputs, outUnit) {
      final m1 = normalizeMass(inputs['m1']!.rawValue, inputs['m1']!.unit);
      final m2 = normalizeMass(inputs['m2']!.rawValue, inputs['m2']!.unit);
      final r = normalizeDistance(inputs['r']!.rawValue, inputs['r']!.unit);
      if (r == 0) return const AstroResult('Error', 'Distance cannot be zero', isError: true);
      final f = G * m1 * m2 / (r * r);
      return AstroResult('Gravitational Force (F)', '${NumberFormatter.format(f)} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Surface Gravity',
    category: AstroCategory.theoretical,
    inputs: [vMass1, vRadius],
    outputUnits: accelUnits,
    defaultOutputUnit: 'm/s²',
    calculate: (inputs, outUnit) {
      final m = normalizeMass(inputs['m1']!.rawValue, inputs['m1']!.unit);
      final r = normalizeDistance(inputs['r']!.rawValue, inputs['r']!.unit);
      if (r == 0) return const AstroResult('Error', 'Radius cannot be zero', isError: true);
      final g = G * m / (r * r);
      return AstroResult('Surface Gravity (g)', '${NumberFormatter.format(g)} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Black Hole ISCO',
    category: AstroCategory.theoretical,
    inputs: [vMass1],
    outputUnits: distanceUnits,
    defaultOutputUnit: 'm',
    calculate: (inputs, outUnit) {
      final m = normalizeMass(inputs['m1']!.rawValue, inputs['m1']!.unit);
      final rs = (2 * G * m) / (c * c);
      final isco = 3 * rs; // For non-rotating Schwarzschild
      return AstroResult('ISCO Radius', '${NumberFormatter.format(convertToTargetDistance(isco, outUnit))} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Hawking Temp',
    category: AstroCategory.theoretical,
    inputs: [vMass1],
    outputUnits: tempUnits,
    defaultOutputUnit: 'Kelvin',
    calculate: (inputs, outUnit) {
      final m = normalizeMass(inputs['m1']!.rawValue, inputs['m1']!.unit);
      if (m == 0) return const AstroResult('Error', 'Mass cannot be zero', isError: true);
      final tK = 1.227e23 / m; 
      final temp = outUnit == 'Celsius' ? tK - 273.15 : tK;
      return AstroResult('Hawking Temperature (T_H)', '${NumberFormatter.format(temp)} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Stefan-Boltzmann Law',
    category: AstroCategory.theoretical,
    inputs: [vRadius, vTemp],
    outputUnits: lumUnits,
    defaultOutputUnit: 'Watts',
    calculate: (inputs, outUnit) {
      final r = normalizeDistance(inputs['r']!.rawValue, inputs['r']!.unit);
      final t = normalizeTemp(inputs['t']!.rawValue, inputs['t']!.unit);
      final lWatts = 4 * math.pi * math.pow(r, 2) * sigma * math.pow(t, 4);
      return AstroResult('Luminosity (L)', '${NumberFormatter.format(convertToTargetLuminosity(lWatts, outUnit))} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Wien\'s Displacement',
    category: AstroCategory.theoretical,
    inputs: [vTemp],
    outputUnits: wavelengthUnits,
    defaultOutputUnit: 'nm',
    calculate: (inputs, outUnit) {
      final t = normalizeTemp(inputs['t']!.rawValue, inputs['t']!.unit);
      if (t == 0) return const AstroResult('Error', 'Temp cannot be zero', isError: true);
      final wMeters = wienB / t;
      return AstroResult('Peak Wavelength (λ_max)', '${NumberFormatter.format(convertToTargetWavelength(wMeters, outUnit))} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Cosmological Dist (FLRW)',
    category: AstroCategory.theoretical,
    inputs: [vRedshift, vHubble, vOmegaM, vOmegaL],
    outputUnits: distanceUnits,
    defaultOutputUnit: 'Light Years',
    calculate: (inputs, outUnit) {
      final z = inputs['z']!.rawValue;
      final h0 = inputs['h0']!.rawValue;
      final om = inputs.containsKey('om') && inputs['om']!.rawValue > 0 ? inputs['om']!.rawValue : 0.3;
      final ol = inputs.containsKey('ol') && inputs['ol']!.rawValue > 0 ? inputs['ol']!.rawValue : 0.7;
      if (h0 == 0) return const AstroResult('Error', 'H0 cannot be zero', isError: true);
      
      // Numerical integration for Comoving Distance (Simpson's Rule)
      int steps = 1000;
      double dz = z / steps;
      double integral = 0.0;
      for (int i = 0; i < steps; i++) {
        double z1 = i * dz;
        double z2 = (i + 1) * dz;
        double zMid = (z1 + z2) / 2;
        
        double f(double zt) {
           return 1.0 / math.sqrt(om * math.pow(1 + zt, 3) + ol + (1 - om - ol) * math.pow(1 + zt, 2));
        }
        integral += (dz / 6.0) * (f(z1) + 4 * f(zMid) + f(z2));
      }
      
      double dHubbleMpc = (c / 1000) / h0; 
      double dComovingMpc = dHubbleMpc * integral;
      double dLuminosityMpc = dComovingMpc * (1 + z);
      
      double dMetersComoving = dComovingMpc * 3.086e22; 
      double dMetersLum = dLuminosityMpc * 3.086e22; 
      
      String cDist = NumberFormatter.format(convertToTargetDistance(dMetersComoving, outUnit));
      String lDist = NumberFormatter.format(convertToTargetDistance(dMetersLum, outUnit));
      return AstroResult('Comoving | Luminosity', '$cDist $outUnit | $lDist $outUnit');
    },
  ),
  AstroEquation(
    name: 'Luminosity to Abs Mag',
    category: AstroCategory.theoretical,
    inputs: [vLum],
    outputUnits: magUnits,
    defaultOutputUnit: 'Magnitude',
    calculate: (inputs, outUnit) {
      double l = inputs['l']!.rawValue;
      if (inputs['l']!.unit == 'Watts') {
         l = l / 3.828e26; 
      }
      if (l <= 0) return const AstroResult('Error', 'Luminosity > 0', isError: true);
      final mag = 4.83 - 2.5 * (math.log(l) / math.ln10);
      return AstroResult('Absolute Magnitude (M)', '${NumberFormatter.format(mag)} $outUnit');
    },
  ),

  // OBSERVATIONAL
  AstroEquation(
    name: 'Telescope Magnification',
    category: AstroCategory.observational,
    inputs: [vFocalScope, vFocalEye],
    outputUnits: ['x'],
    defaultOutputUnit: 'x',
    calculate: (inputs, outUnit) {
      final fs = normalizeDistance(inputs['fs']!.rawValue, inputs['fs']!.unit);
      final fe = normalizeDistance(inputs['fe']!.rawValue, inputs['fe']!.unit);
      if (fe == 0) return const AstroResult('Error', 'Eyepiece FL cannot be zero', isError: true);
      final mag = fs / fe;
      return AstroResult('Magnification', '${NumberFormatter.format(mag)}x');
    },
  ),
  AstroEquation(
    name: 'Dawes\' Limit',
    category: AstroCategory.observational,
    inputs: [vAperture],
    outputUnits: resolutionUnits,
    defaultOutputUnit: 'arcsec',
    calculate: (inputs, outUnit) {
      final d = normalizeDistance(inputs['ap']!.rawValue, inputs['ap']!.unit) * 1000; 
      if (d == 0) return const AstroResult('Error', 'Aperture cannot be zero', isError: true);
      final r = 116 / d;
      return AstroResult('Resolving Power', '${NumberFormatter.format(r)} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Rayleigh Criterion',
    category: AstroCategory.observational,
    inputs: [vAperture, vWavelength],
    outputUnits: resolutionUnits,
    defaultOutputUnit: 'arcsec',
    calculate: (inputs, outUnit) {
      final d = normalizeDistance(inputs['ap']!.rawValue, inputs['ap']!.unit);
      final wl = normalizeWavelength(inputs['wl']!.rawValue, inputs['wl']!.unit);
      if (d == 0) return const AstroResult('Error', 'Aperture cannot be zero', isError: true);
      final thetaRad = 1.22 * wl / d;
      final thetaArcsec = thetaRad * (180 / math.pi) * 3600;
      return AstroResult('Resolving Power', '${NumberFormatter.format(thetaArcsec)} $outUnit');
    },
  ),
  AstroEquation(
    name: 'Distance Modulus',
    category: AstroCategory.observational,
    inputs: [vAbsMag, vRadius],
    outputUnits: magUnits,
    defaultOutputUnit: 'Magnitude',
    calculate: (inputs, outUnit) {
      final absM = inputs['M_abs']!.rawValue;
      final dMeters = normalizeDistance(inputs['r']!.rawValue, inputs['r']!.unit);
      final dParsecs = dMeters / 3.086e16;
      if (dParsecs <= 0) return const AstroResult('Error', 'Distance > 0 required', isError: true);
      final appMag = absM + 5 * math.log(dParsecs) / math.ln10 - 5;
      return AstroResult('Apparent Magnitude (m)', '${NumberFormatter.format(appMag)} $outUnit');
    },
  ),
  AstroEquation(
    name: 'True Field of View',
    category: AstroCategory.observational,
    inputs: [vApparentFov, vFocalScope, vFocalEye],
    outputUnits: ['degrees'],
    defaultOutputUnit: 'degrees',
    calculate: (inputs, outUnit) {
      final afov = inputs['afov']!.rawValue;
      final fs = normalizeDistance(inputs['fs']!.rawValue, inputs['fs']!.unit);
      final fe = normalizeDistance(inputs['fe']!.rawValue, inputs['fe']!.unit);
      if (fe == 0 || fs == 0) return const AstroResult('Error', 'Focal Lengths > 0', isError: true);
      final mag = fs / fe;
      final tfov = afov / mag;
      return AstroResult('True FOV', '${NumberFormatter.format(tfov)} $outUnit');
    },
  ),
];

class AstroPhysicsCalc extends StatefulWidget {
  const AstroPhysicsCalc({super.key});

  @override
  State<AstroPhysicsCalc> createState() => _AstroPhysicsCalcState();
}

class _AstroPhysicsCalcState extends State<AstroPhysicsCalc> {
  AstroCategory _selectedCategory = AstroCategory.theoretical;
  late AstroEquation _selectedEquation;
  
  final Map<String, TextEditingController> _controllers = {};
  final Map<String, String> _selectedUnits = {};
  final Map<String, FocusNode> _focusNodes = {};
  
  String _outputUnit = '';
  AstroResult? _result;
  String? _autoCalculatedVar;
  String _activeFocusId = '';

  @override
  void initState() {
    super.initState();
    _setCategory(_selectedCategory);
  }

  @override
  void dispose() {
    for (var c in _controllers.values) {
      c.removeListener(_calculate);
      c.dispose();
    }
    for (var f in _focusNodes.values) {
      f.dispose();
    }
    super.dispose();
  }

  void _setCategory(AstroCategory cat) {
    setState(() {
      _selectedCategory = cat;
      final eqs = astroEquations.where((e) => e.category == cat).toList();
      _setEquation(eqs.first);
    });
  }

  void _setEquation(AstroEquation eq) {
    _selectedEquation = eq;
    _outputUnit = eq.defaultOutputUnit;
    _result = null;

    for (var c in _controllers.values) { c.dispose(); }
    for (var f in _focusNodes.values) { f.dispose(); }
    _controllers.clear();
    _focusNodes.clear();
    _selectedUnits.clear();

    for (var input in eq.inputs) {
      final ctrl = TextEditingController();
      ctrl.addListener(_calculate);
      _controllers[input.id] = ctrl;
      
      final focus = FocusNode();
      focus.addListener(() {
        setState(() {
          if (focus.hasFocus) {
            _activeFocusId = input.id;
          }
        });
        if (!focus.hasFocus) {
          _tryAutoCalculate();
        }
      });
      _focusNodes[input.id] = focus;
      
      _selectedUnits[input.id] = input.defaultUnit;
    }
    
    if (eq.inputs.isNotEmpty) {
      _activeFocusId = eq.inputs.first.id;
    }
  }

  double _eval(String input) {
    if (input.isEmpty) return 0.0;
    try {
      String cleanInput = input.replaceAll('×', '*').replaceAll('÷', '/').replaceAll('−', '-');
      cleanInput = cleanInput.replaceAllMapped(RegExp(r'(\d+(?:\.\d+)?)e([+-]?\d+)', caseSensitive: false), (match) {
        return '${match.group(1)}*10^${match.group(2)}';
      });
      Parser p = Parser(); 
      Expression exp = p.parse(cleanInput);
      ContextModel cm = ContextModel();
      return exp.evaluate(EvaluationType.REAL, cm);
    } catch (e) {
      return double.nan; 
    }
  }

  void _tryAutoCalculate() {
    bool allFilled = true;
    Map<String, AstroInputData> inputData = {};

    for (var input in _selectedEquation.inputs) {
      final text = _controllers[input.id]!.text;
      if (text.isEmpty) {
        allFilled = false;
        break;
      }
      final val = _eval(text);
      if (val.isNaN) {
        setState(() => _result = null);
        return;
      }
      inputData[input.id] = AstroInputData(val, _selectedUnits[input.id]!);
    }

    if (allFilled) {
      try {
        final res = _selectedEquation.calculate(inputData, _outputUnit);
        setState(() {
          if (res.value == 'NaN' || res.value == 'Infinity' || res.value.contains('NaN') || res.value.contains('Infinity')) {
             _result = AstroResult(res.label, 'Math Error: Division by zero or invalid input', isError: true);
          } else {
             _result = res;
          }
        });
      } catch (e) {
        setState(() => _result = null);
      }
    } else {
      setState(() => _result = null);
    }
  }

  void _calculate({bool isAuto = false}) {
    bool hasAnyValue = false;
    Map<String, AstroInputData> inputData = {};

    for (var input in _selectedEquation.inputs) {
      final text = _controllers[input.id]!.text;
      if (text.isNotEmpty) hasAnyValue = true;
      final val = _eval(text);
      if (val.isNaN) {
        if (!isAuto) {
          setState(() {
            _result = const AstroResult('Error', 'Invalid expression', isError: true);
          });
        }
        return;
      }
      inputData[input.id] = AstroInputData(val, _selectedUnits[input.id]!);
    }

    if (!hasAnyValue) {
      setState(() {
        _result = null;
      });
      return;
    }

    try {
      final res = _selectedEquation.calculate(inputData, _outputUnit);
      setState(() {
        _result = res;
      });
    } catch (e) {
      if (!isAuto) {
        setState(() {
          _result = const AstroResult('Error', '...', isError: true);
        });
      }
    }
  }

  TextEditingController? _getActiveController() {
    if (_activeFocusId.isEmpty) return null;
    return _controllers[_activeFocusId];
  }

  void _insertConstant(String key) {
    final ctrl = _getActiveController();
    if (ctrl != null) {
      final val = _constants[key] ?? key;
      ctrl.text = val;
      _tryAutoCalculate();
    }
  }

  String _getUnitType(String text) {
    final lower = text.toLowerCase();
    if (lower.contains('mass') || lower.contains('weight') || lower.contains('(kg)')) return 'mass';
    if (lower.contains('speed') || lower.contains('vel') || (lower.contains('(m/s)') && !lower.contains('m/s²'))) return 'velocity';
    if (lower.contains('accel') || lower.contains('(m/s²)')) return 'acceleration';
    if (lower.contains('dist') || lower.contains('height') || lower.contains('radius') || lower.contains('year') || lower.contains('parsec') || lower.contains('au') || lower.contains('axis') || lower.contains('focal') || lower.contains('aperture') || lower.contains('wavelength') || (lower.contains('(m)') && !lower.contains('m/s') && !lower.contains('m²') && !lower.contains('m³') && !lower.contains('mol') && !lower.contains('Ωm') && !lower.contains('mag '))) return 'distance';
    if (lower.contains('time') || (lower.contains('(s)') && !lower.contains('m/s') && !lower.contains('j·s')) || lower.contains('yr')) return 'time';
    if (lower.contains('force') || lower.contains('(n)')) return 'force';
    if (lower.contains('planck') || lower.contains('j·s')) return 'action';
    if (lower.contains('energy') || lower.contains('work') || lower.contains('(j)')) return 'energy';
    if (lower.contains('temp') || lower.contains('(k)')) return 'temperature';
    if (lower.contains('press') || lower.contains('(pa)')) return 'pressure';
    if (lower.contains('vol') || lower.contains('(m³)') || lower.contains('(l)')) return 'volume';
    if (lower.contains('moles') || lower.contains('(mol)')) return 'amount';
    if (lower.contains('density')) return 'density';
    if (lower.contains('hubble')) return 'hubble';
    return 'other';
  }

  void _onKeypadPressed(String btn) {
    final ctrl = _getActiveController();
    if (ctrl == null) return;

    if (btn == 'C') {
      for (var c in _controllers.values) {
        c.clear();
      }
      setState(() {
        _result = null;
      });
    } else if (btn == 'CE') {
      ctrl.clear();
    } else if (btn == '⌫') {
      if (ctrl != null) {
        final sel = ctrl.selection;
        if (sel.isValid) {
          if (sel.start != sel.end) {
            ctrl.text = ctrl.text.replaceRange(sel.start, sel.end, '');
            ctrl.selection = TextSelection.collapsed(offset: sel.start);
          } else if (sel.start > 0) {
            ctrl.text = ctrl.text.replaceRange(sel.start - 1, sel.start, '');
            ctrl.selection = TextSelection.collapsed(offset: sel.start - 1);
          }
        } else if (ctrl.text.isNotEmpty) {
          ctrl.text = ctrl.text.substring(0, ctrl.text.length - 1);
        }
      }
    } else if (btn == '=') {
      _calculate();
    } else if (btn == '±') {
      ctrl.text += '-';
    } else {
      String output = btn;
      if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln'].contains(btn)) {
        output = '$btn(';
      } else if (btn == '√') {
        output = 'sqrt(';
      } else if (btn == 'π') {
        output = '3.14159265';
      } else if (btn == 'e') {
        output = '2.71828182';
      } else if (btn == 'x²') {
        output = '^2';
      } else if (btn == '1/x') {
        output = '1/';
      } else if (btn == 'x^y') {
        output = '^';
      } else if (btn == '10^x') {
        output = '10^';
      } else if (btn == 'n!') {
        output = '!';
      } else if (btn == '×') {
        output = '*';
      } else if (btn == '÷') {
        output = '/';
      } else if (btn == '−') {
        output = '-';
      }
      ctrl.text += output;
    }

    if (btn != '=') {
      _tryAutoCalculate();
    }
  }

  Widget _buildKeypad() {
    final buttons = [
      'sin', 'cos', 'tan', 'C', 'CE', '⌫',
      'x²', '1/x', '√', '(', ')', '÷',
      'x^y', '7', '8', '9', '×', 'n!',
      '10^x', '4', '5', '6', '−', '∑',
      'log', '1', '2', '3', '+', 'π',
      'ln', '±', '0', '.', '=', 'e',
    ];

    return LayoutBuilder(
      builder: (context, constraints) {
        final double width = constraints.maxWidth;
        final double height = constraints.maxHeight;
        
        final double safeHeight = height > 50 ? height : 300;
        final double itemWidth = (width - (6 - 1) * 4) / 6;
        final double itemHeight = (safeHeight - (6 - 1) * 4) / 6;
        final double ratio = (itemHeight > 0 && itemWidth > 0) ? itemWidth / itemHeight : 1.6;

        return GridView.builder(
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 6,
            crossAxisSpacing: 4,
            mainAxisSpacing: 4,
            childAspectRatio: ratio,
          ),
          itemCount: buttons.length,
          itemBuilder: (context, index) {
            final btn = buttons[index];
            final isOp = ['÷', '×', '−', '+', '='].contains(btn);
            final isAction = ['C', '⌫', '±'].contains(btn);
            final isMath = !isOp && !isAction && double.tryParse(btn) == null && btn != '.';

            Color bgColor = Theme.of(context).cardColor;
            Color fgColor = Theme.of(context).textTheme.bodyLarge!.color!;

            if (isOp) {
              bgColor = Theme.of(context).colorScheme.primary;
              fgColor = Theme.of(context).colorScheme.onPrimary;
            } else if (isAction) {
              bgColor = Theme.of(context).colorScheme.secondary.withAlpha(50);
              fgColor = Theme.of(context).colorScheme.secondary;
            } else if (isMath) {
              bgColor = Theme.of(context).colorScheme.surfaceContainerHighest;
              fgColor = Theme.of(context).colorScheme.onSurfaceVariant;
            }

            return Material(
              color: bgColor,
              borderRadius: BorderRadius.circular(8),
              child: InkWell(
                borderRadius: BorderRadius.circular(8),
                onTap: () => _onKeypadPressed(btn),
                child: Center(
                  child: Text(
                    btn,
                    style: TextStyle(
                      fontSize: isMath ? 10 : 11,
                      fontWeight: isMath ? FontWeight.w600 : FontWeight.bold,
                      color: fgColor,
                    ),
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }

  final Map<String, String> _constants = {
    '1 Solar Mass (kg)': '1.989e30',
    '1 Earth Mass (kg)': '5.972e24',
    '1 Jupiter Mass (kg)': '1.898e27',
    'Neutron mass (kg)': '1.6749e-27',
    'Planck mass (kg)': '2.1764e-8',
    '1 Light Year (m)': '9.461e15',
    '1 Parsec (m)': '3.086e16',
    '1 AU (m)': '1.496e11',
    'Earth Radius (m)': '6.371e6',
    'Solar Radius (m)': '6.957e8',
    'c (Light Speed m/s)': '299792458',
    'G (Gravitational)': '6.6743e-11',
    'H₀ (Hubble)': '70',
    'Ωm (Matter Density)': '0.3',
    'ΩΛ (Dark Energy)': '0.7',
  };

  Widget _buildConstants() {
    return Builder(
      builder: (context) {
        String? activeUnitType;
        if (_activeFocusId.isNotEmpty) {
          final activeVar = _selectedEquation.inputs.cast<AstroVariable?>().firstWhere(
            (v) => v?.id == _activeFocusId,  
            orElse: () => null
          );
          if (activeVar != null) {
            activeUnitType = _getUnitType(activeVar.name);
          }
        }

        var filteredConstants = _constants.entries.where((e) {
          if (activeUnitType == null || activeUnitType == 'other') return false;
          final cUnit = _getUnitType(e.key);
          return cUnit == activeUnitType;
        }).toList();

        return DropdownButtonFormField<String>(
          key: ValueKey('constants_dropdown_$_activeFocusId'),
          decoration: const InputDecoration(
            labelText: 'Insert Pre-defined Value / Constant',
            border: OutlineInputBorder(),
            isDense: true,
          ),
          isExpanded: true,
          items: [
            const DropdownMenuItem(value: '', child: Text('Select a value...', overflow: TextOverflow.ellipsis)),
            ...filteredConstants.map((e) => DropdownMenuItem(
              value: e.key,
              child: Text('${e.key} = ${e.value}', overflow: TextOverflow.ellipsis),
            ))
          ],
          value: '',
          onChanged: (key) {
            if (key != null && key.isNotEmpty) {
              _insertConstant(key);
            }
          },
        );
      }
    );
  }

  Widget _buildInputWithUnit(AstroVariable variable) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Row(
        children: [
          Expanded(
            flex: 5,
            child: TextField(
              controller: _controllers[variable.id],
              focusNode: _focusNodes[variable.id],
              readOnly: true, // system keyboard hidden, mapped via Focus
              showCursor: true,
              style: const TextStyle(fontSize: 14),
              onTap: () {
                setState(() {
                  _activeFocusId = variable.id;
                });
              },
              decoration: InputDecoration(
                isDense: true,
                labelText: variable.name,
                hintText: variable.hint,
                border: const OutlineInputBorder(),
                contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
              ),
            ),
          ),
          const SizedBox(width: 4),
          if (variable.units.length > 1)
            Expanded(
              flex: 4,
              child: DropdownButtonFormField<String>(
                value: _selectedUnits[variable.id],
                style: const TextStyle(fontSize: 14),
                decoration: const InputDecoration(
                  isDense: true,
                  border: OutlineInputBorder(),
                  contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                ),
                isExpanded: true,
                items: variable.units.map((u) => DropdownMenuItem(value: u, child: Text(u, overflow: TextOverflow.ellipsis))).toList(),
                onChanged: (val) {
                  setState(() { _selectedUnits[variable.id] = val!; _calculate(); });
                },
              ),
            )
          else
            Expanded(
              flex: 4,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
                decoration: BoxDecoration(
                  border: Border.all(color: Theme.of(context).dividerColor),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(variable.units.first, style: const TextStyle(fontSize: 14)),
              ),
            ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final currentEqs = astroEquations.where((e) => e.category == _selectedCategory).toList();

    Widget inputsAndDisplay = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SegmentedButton<AstroCategory>(
          segments: const [
            ButtonSegment(value: AstroCategory.theoretical, label: Text('Theory & Cosmology')),
            ButtonSegment(value: AstroCategory.observational, label: Text('Observational')),
          ],
          selected: {_selectedCategory},
          onSelectionChanged: (Set<AstroCategory> newSelection) {
            _setCategory(newSelection.first);
          },
          style: const ButtonStyle(
            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            visualDensity: VisualDensity.compact,
          ),
        ),
        const SizedBox(height: 16),
        
        DropdownButtonFormField<AstroEquation>(
          value: _selectedEquation,
          isExpanded: true,
          decoration: const InputDecoration(
            labelText: 'Select Equation',
            border: OutlineInputBorder(),
            filled: true,
          ),
          items: currentEqs.map((e) => DropdownMenuItem(value: e, child: Text(e.name, overflow: TextOverflow.ellipsis))).toList(),
          onChanged: (val) {
            if (val != null) setState(() => _setEquation(val));
          },
        ),
        const SizedBox(height: 24),
        
        ..._selectedEquation.inputs.map((v) => _buildInputWithUnit(v)),
        
        _buildConstants(),
        
        if (_selectedEquation.outputUnits.length > 1)
          Padding(
            padding: const EdgeInsets.only(top: 16.0),
            child: Row(
              children: [
                const Expanded(
                  flex: 5,
                  child: Text('Output Unit:', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500)),
                ),
                const SizedBox(width: 4),
                Expanded(
                  flex: 4,
                  child: DropdownButtonFormField<String>(
                    value: _outputUnit,
                    decoration: const InputDecoration(
                      isDense: true,
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                    ),
                    isExpanded: true,
                    items: _selectedEquation.outputUnits.map((u) => DropdownMenuItem(value: u, child: Text(u, overflow: TextOverflow.ellipsis))).toList(),
                    onChanged: (val) {
                      setState(() { _outputUnit = val!; _calculate(); });
                    },
                  ),
                ),
              ],
            ),
          ),

        const SizedBox(height: 24),
        
        Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Column(
              children: [
                Text(
                  _result?.label ?? "Status",
                  style: TextStyle(
                    fontSize: 16,
                    color: (_result?.isError ?? false)
                        ? Theme.of(context).colorScheme.error
                        : Theme.of(context).colorScheme.onPrimaryContainer.withAlpha(200),
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Flexible(
                      child: Text(
                        _result?.value ?? "Awaiting input...",
                        style: TextStyle(
                          fontSize: _result != null ? 28 : 20,
                          fontWeight: _result != null ? FontWeight.bold : FontWeight.normal,
                          color: (_result?.isError ?? false)
                              ? Theme.of(context).colorScheme.error
                              : Theme.of(context).colorScheme.onPrimaryContainer.withAlpha(_result == null ? 150 : 255),
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
      ],
    );

    return LayoutBuilder(
      builder: (context, constraints) {
        final bool isLandscape = constraints.maxWidth > constraints.maxHeight;

        Widget content;
        if (isLandscape) {
          content = Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(
                flex: 1,
                child: _buildKeypad(),
              ),
              const SizedBox(width: 24),
              Expanded(
                flex: 1,
                child: SingleChildScrollView(child: inputsAndDisplay),
              ),
            ],
          );
        } else {
          content = Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(
                flex: 1,
                child: SingleChildScrollView(child: inputsAndDisplay),
              ),
              const SizedBox(height: 16),
              Expanded(
                flex: 1,
                child: _buildKeypad(),
              ),
            ],
          );
        }

        return Focus(
          autofocus: true,
          onKeyEvent: (FocusNode node, KeyEvent event) {
            if (event is KeyDownEvent) {
              final logicalKey = event.logicalKey;
              final char = event.character;

              if (logicalKey == LogicalKeyboardKey.arrowLeft) {
                final ctrl = _getActiveController();
                if (ctrl != null) {
                  final sel = ctrl.selection;
                  if (sel.isValid && sel.start > 0) {
                    ctrl.selection = TextSelection.collapsed(offset: sel.start - 1);
                  }
                }
                return KeyEventResult.handled;
              } else if (logicalKey == LogicalKeyboardKey.arrowRight) {
                final ctrl = _getActiveController();
                if (ctrl != null) {
                  final sel = ctrl.selection;
                  if (sel.isValid && sel.start < ctrl.text.length) {
                    ctrl.selection = TextSelection.collapsed(offset: sel.start + 1);
                  }
                }
                return KeyEventResult.handled;
              }

              if (logicalKey == LogicalKeyboardKey.escape) {
                _onKeypadPressed('C');
                return KeyEventResult.handled;
              } else if (logicalKey == LogicalKeyboardKey.backspace || logicalKey == LogicalKeyboardKey.delete) {
                _onKeypadPressed('⌫');
                return KeyEventResult.handled;
              } else if (logicalKey == LogicalKeyboardKey.enter || logicalKey == LogicalKeyboardKey.numpadEnter || logicalKey == LogicalKeyboardKey.equal) {
                _onKeypadPressed('=');
                return KeyEventResult.handled;
              }

              if (char != null) {
                if ('0123456789.()e^'.contains(char)) {
                  _onKeypadPressed(char == '^' ? 'x^y' : char);
                  return KeyEventResult.handled;
                } else if (char == '*' || char == 'x') {
                  _onKeypadPressed('×');
                  return KeyEventResult.handled;
                } else if (char == '/') {
                  _onKeypadPressed('÷');
                  return KeyEventResult.handled;
                } else if (char == '+' || char == '-') {
                  _onKeypadPressed(char == '-' ? '−' : '+');
                  return KeyEventResult.handled;
                } else if (char.toLowerCase() == 'c') {
                  _onKeypadPressed('C');
                  return KeyEventResult.handled;
                }
              }
            }
            return KeyEventResult.ignored;
          },
          child: content,
        );
      },
    );
  }
}
