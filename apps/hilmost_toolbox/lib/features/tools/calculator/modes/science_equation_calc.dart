import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'package:math_expressions/math_expressions.dart' hide Stack;
import '../../../../shared/utils/number_formatter.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/providers/global_settings_provider.dart';

class ScienceEquationCalc extends ConsumerStatefulWidget {
  const ScienceEquationCalc({super.key});

  @override
  ConsumerState<ScienceEquationCalc> createState() => _ScienceEquationCalcState();
}

class _ScienceEquationCalcState extends ConsumerState<ScienceEquationCalc> {
  String _selectedCategory = 'Physics';
  String _selectedEquation = 'Force (F = ma)';

  int _sigFigs = 4;
  double _ans = 0.0;
  double _memory = 0.0;
  List<String> _history = [];
  String? _autoCalculatedVar;
  int _targetVarIndex = 0;

  final Map<String, List<String>> _equations = {
    'Physics': [
      'Force (F = ma)',
      'Kinematics (v = u + at)',
      'Kinetic Energy (KE = 0.5mv²)',
      'Universal Gravitation (F = G·m₁·m₂/r²)',
      'Photon Energy (E = hf)',
      "Ohm's Law (V = IR)",
      'Energy Mass Equivalence (E = mc²)',
      'Wave Speed (v = fλ)',
      'Power (P = VI)',
    ],
    'Chemistry': [
      'Ideal Gas Law (PV = nRT)',
      'Molarity (c = n/V)',
      'pH Calculator',
      'Specific Heat (Q = mcΔT)',
    ],
    'Biology': [
      'BMI (kg/m²)',
      'Population Growth (P = P₀e^(rt))',
      'Hardy-Weinberg (p + q = 1)',
    ],
    'Geography': ['Population Density (P/A)'],
    'Astronomy': ['Escape Velocity (v = √(2GM/r))', "Hubble's Law (v = H₀D)"],
    'Earth Science': [
      "Darcy's Law (Q = KiA)",
      'Geothermal Gradient (G = ΔT/ΔZ)',
    ],
    'Statistics': ['Z-Score (z = (x-μ)/σ)'],
  };

  final Map<String, String> _constants = {
    'c (Speed of light m/s)': '299792458',
    'G (Gravitational)': '6.6743e-11',
    'g (Earth gravity m/s²)': '9.80665',
    'h (Planck J·s)': '6.626e-34',
    'k (Boltzmann J/K)': '1.3806e-23',
    'R (Gas constant J/(mol·K))': '8.314',
    'NA (Avogadro mol⁻¹)': '6.022e23',
    'e (Elementary charge C)': '1.602e-19',
    'm_e (Electron mass kg)': '9.109e-31',
    'm_p (Proton mass kg)': '1.672e-27',
    'm_n (Neutron mass kg)': '1.6749e-27',
    'Planck mass (kg)': '2.1764e-8',
    'atm (Standard atm Pa)': '101325',
    '1 Light Year (m)': '9.461e15',
    '1 AU (m)': '1.496e11',
    '1 Parsec (m)': '3.086e16',
    '1 Solar Mass (kg)': '1.989e30',
    '1 Earth Mass (kg)': '5.972e24',
    '1 Jupiter Mass (kg)': '1.898e27',
    'c (Light Speed m/s)': '299792458',
    'G (Gravitational)': '6.6743e-11',
    'h (Planck J·s)': '6.62607e-34',
    'N_A (Avogadro)': '6.02214e23',
    'R (Gas Constant)': '8.31446',
    'k_B (Boltzmann)': '1.38065e-23',
    'e (Elem Charge)': '1.60218e-19',
  };

  final Map<String, TextEditingController> _controllers = {
    'var1': TextEditingController(),
    'var2': TextEditingController(),
    'var3': TextEditingController(),
    'var4': TextEditingController(),
  };

  final Map<String, FocusNode> _focusNodes = {
    'var1': FocusNode(),
    'var2': FocusNode(),
    'var3': FocusNode(),
    'var4': FocusNode(),
  };

  String _activeFocusId = '';
  String _result = '';
  double _resultValue = double.nan;

  @override
  void initState() {
    super.initState();
    for (var c in _controllers.values) {
      c.addListener(_calculate);
    }
    for (var entry in _focusNodes.entries) {
      entry.value.addListener(() {
        setState(() {
          if (entry.value.hasFocus) {
            _activeFocusId = entry.key;
          }
        });
        if (!entry.value.hasFocus) {
          _tryAutoCalculate();
        }
      });
    }
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



  double _eval(String input) {
    if (input.isEmpty) throw Exception('Empty');
    try {
      String cleanInput = input
          .replaceAll('×', '*')
          .replaceAll('÷', '/')
          .replaceAll('−', '-')
          .replaceAll('Ans', _ans.toString());

      // Handle metric prefixes (k, M, G, m, µ, n, p) if they appear after a digit
      final Map<String, String> prefixes = {
        'T': '*1e12',
        'G': '*1e9',
        'M': '*1e6',
        'k': '*1e3',
        'm': '*1e-3',
        'µ': '*1e-6',
        'n': '*1e-9',
        'p': '*1e-12',
      };
      prefixes.forEach((key, val) {
        cleanInput = cleanInput.replaceAllMapped(
          RegExp(r'(\d)' + key),
          (match) => '${match.group(1)}$val',
        );
      });

      // Fix log base 10
      cleanInput = cleanInput.replaceAll('log(', '(1/2.302585092994046)*ln(');

      Parser p = Parser();
      Expression exp = p.parse(cleanInput);
      ContextModel cm = ContextModel();
      return exp.evaluate(EvaluationType.REAL, cm);
    } catch (e) {
      throw Exception('Invalid');
    }
  }

  void _tryAutoCalculate() {
    final activeLabels = _getLabelsForEquation(_selectedEquation);
    
    // Ensure target variable is empty so _calculate solves for it
    _controllers['var${_targetVarIndex + 1}']!.text = '';

    bool allFilled = true;
    for (int i = 0; i < activeLabels.length; i++) {
      if (i == _targetVarIndex) continue;
      if (_controllers['var${i + 1}']!.text.isEmpty) {
        allFilled = false;
        break;
      }
    }

    if (allFilled) {
      _calculate(isAuto: true, targetVar: 'var${_targetVarIndex + 1}');
    } else {
      setState(() => _result = '');
    }
  }

  void _calculate({bool isAuto = false, String? targetVar}) {
    // Count empty controllers for the active equation
    final activeLabels = _getLabelsForEquation(_selectedEquation);
    
    // Enforce target variable is empty just in case
    _controllers['var${_targetVarIndex + 1}']!.text = '';

    int emptyCount = 0;
    for (int i = 0; i < activeLabels.length; i++) {
      if (_controllers['var${i + 1}']!.text.isEmpty) {
        emptyCount++;
      }
    }

    if (!isAuto) {
      if (emptyCount > 1) {
        setState(() => _result = 'Awaiting Inputs...');
        return;
      }
    }

    setState(() {
      if (!isAuto) _result = '';
      _resultValue = double.nan;
    });

    try {
      String resLabel = '';
      String resUnit = '';
      double resVal = 0.0;

      final v1 = _controllers['var1']!.text;
      final v2 = _controllers['var2']!.text;
      final v3 = _controllers['var3']!.text;
      final v4 = _controllers['var4']!.text;

      if (_selectedEquation == 'Force (F = ma)') {
        // F, m, a
        if (v1.isEmpty) {
          resVal = _eval(v2) * _eval(v3);
          resLabel = 'Force (F)';
          resUnit = 'N';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) / _eval(v3);
          resLabel = 'Mass (m)';
          resUnit = 'kg';
        } else if (v3.isEmpty) {
          resVal = _eval(v1) / _eval(v2);
          resLabel = 'Acceleration (a)';
          resUnit = 'm/s²';
        }
      } else if (_selectedEquation == 'Kinetic Energy (KE = 0.5mv²)') {
        // KE, m, v
        if (v1.isEmpty) {
          resVal = 0.5 * _eval(v2) * math.pow(_eval(v3), 2);
          resLabel = 'KE';
          resUnit = 'J';
        } else if (v2.isEmpty) {
          resVal = 2 * _eval(v1) / math.pow(_eval(v3), 2);
          resLabel = 'Mass (m)';
          resUnit = 'kg';
        } else if (v3.isEmpty) {
          resVal = math.sqrt(2 * _eval(v1) / _eval(v2));
          resLabel = 'Velocity (v)';
          resUnit = 'm/s';
        }
      } else if (_selectedEquation == "Ohm's Law (V = IR)") {
        // V, I, R
        if (v1.isEmpty) {
          resVal = _eval(v2) * _eval(v3);
          resLabel = 'Voltage (V)';
          resUnit = 'V';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) / _eval(v3);
          resLabel = 'Current (I)';
          resUnit = 'A';
        } else if (v3.isEmpty) {
          resVal = _eval(v1) / _eval(v2);
          resLabel = 'Resistance (R)';
          resUnit = 'Ω';
        }
      } else if (_selectedEquation == 'Ideal Gas Law (PV = nRT)') {
        // P, V, n, T
        final R = 8.31446;
        if (v1.isEmpty) {
          resVal = (_eval(v3) * R * _eval(v4)) / _eval(v2);
          resLabel = 'Pressure (P)';
          resUnit = 'Pa';
        } else if (v2.isEmpty) {
          resVal = (_eval(v3) * R * _eval(v4)) / _eval(v1);
          resLabel = 'Volume (V)';
          resUnit = 'm³';
        } else if (v3.isEmpty) {
          resVal = (_eval(v1) * _eval(v2)) / (R * _eval(v4));
          resLabel = 'Moles (n)';
          resUnit = 'mol';
        } else if (v4.isEmpty) {
          resVal = (_eval(v1) * _eval(v2)) / (_eval(v3) * R);
          resLabel = 'Temperature (T)';
          resUnit = 'K';
        }
      } else if (_selectedEquation == 'Molarity (c = n/V)') {
        // c, n, V
        if (v1.isEmpty) {
          resVal = _eval(v2) / _eval(v3);
          resLabel = 'Molarity (c)';
          resUnit = 'mol/L';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) * _eval(v3);
          resLabel = 'Moles (n)';
          resUnit = 'mol';
        } else if (v3.isEmpty) {
          resVal = _eval(v2) / _eval(v1);
          resLabel = 'Volume (V)';
          resUnit = 'L';
        }
      } else if (_selectedEquation == 'BMI (kg/m²)') {
        // BMI, kg, m
        if (v1.isEmpty) {
          resVal = _eval(v2) / math.pow(_eval(v3), 2);
          resLabel = 'BMI';
          resUnit = '';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) * math.pow(_eval(v3), 2);
          resLabel = 'Weight';
          resUnit = 'kg';
        } else if (v3.isEmpty) {
          resVal = math.sqrt(_eval(v2) / _eval(v1));
          resLabel = 'Height';
          resUnit = 'm';
        }
      } else if (_selectedEquation == 'Population Growth (P = P₀e^(rt))') {
        // P, P0, r, t
        if (v1.isEmpty) {
          resVal = _eval(v2) * math.exp(_eval(v3) * _eval(v4));
          resLabel = 'Future Pop (P)';
          resUnit = '';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) / math.exp(_eval(v3) * _eval(v4));
          resLabel = 'Initial Pop (P₀)';
          resUnit = '';
        } else if (v3.isEmpty) {
          resVal = math.log(_eval(v1) / _eval(v2)) / _eval(v4);
          resLabel = 'Rate (r)';
          resUnit = '';
        } else if (v4.isEmpty) {
          resVal = math.log(_eval(v1) / _eval(v2)) / _eval(v3);
          resLabel = 'Time (t)';
          resUnit = '';
        }
      } else if (_selectedEquation == 'Population Density (P/A)') {
        // D, P, A
        if (v1.isEmpty) {
          resVal = _eval(v2) / _eval(v3);
          resLabel = 'Density';
          resUnit = 'pop/km²';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) * _eval(v3);
          resLabel = 'Population';
          resUnit = '';
        } else if (v3.isEmpty) {
          resVal = _eval(v2) / _eval(v1);
          resLabel = 'Area';
          resUnit = 'km²';
        }
      } else if (_selectedEquation == 'Kinematics (v = u + at)') {
        // v, u, a, t
        if (v1.isEmpty) {
          resVal = _eval(v2) + (_eval(v3) * _eval(v4));
          resLabel = 'Final Vel (v)';
          resUnit = 'm/s';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) - (_eval(v3) * _eval(v4));
          resLabel = 'Initial Vel (u)';
          resUnit = 'm/s';
        } else if (v3.isEmpty) {
          resVal = (_eval(v1) - _eval(v2)) / _eval(v4);
          resLabel = 'Acceleration (a)';
          resUnit = 'm/s²';
        } else if (v4.isEmpty) {
          resVal = (_eval(v1) - _eval(v2)) / _eval(v3);
          resLabel = 'Time (t)';
          resUnit = 's';
        }
      } else if (_selectedEquation ==
          'Universal Gravitation (F = G·m₁·m₂/r²)') {
        // F, m1, m2, r
        final G = 6.6743e-11;
        if (v1.isEmpty) {
          resVal = G * _eval(v2) * _eval(v3) / math.pow(_eval(v4), 2);
          resLabel = 'Force (F)';
          resUnit = 'N';
        } else if (v2.isEmpty) {
          resVal = (_eval(v1) * math.pow(_eval(v4), 2)) / (G * _eval(v3));
          resLabel = 'Mass 1 (m₁)';
          resUnit = 'kg';
        } else if (v3.isEmpty) {
          resVal = (_eval(v1) * math.pow(_eval(v4), 2)) / (G * _eval(v2));
          resLabel = 'Mass 2 (m₂)';
          resUnit = 'kg';
        } else if (v4.isEmpty) {
          resVal = math.sqrt(G * _eval(v2) * _eval(v3) / _eval(v1));
          resLabel = 'Radius (r)';
          resUnit = 'm';
        }
      } else if (_selectedEquation == 'Photon Energy (E = hf)') {
        // E, f
        final h = 6.62607e-34;
        if (v1.isEmpty) {
          resVal = h * _eval(v2);
          resLabel = 'Energy (E)';
          resUnit = 'J';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) / h;
          resLabel = 'Frequency (f)';
          resUnit = 'Hz';
        }
      } else if (_selectedEquation == 'pH Calculator') {
        // pH, H+
        if (v1.isEmpty) {
          resVal = -math.log(_eval(v2)) / math.ln10;
          resLabel = 'pH';
          resUnit = '';
        } else if (v2.isEmpty) {
          resVal = math.pow(10, -_eval(v1)).toDouble();
          resLabel = '[H⁺]';
          resUnit = 'mol/L';
        }
      } else if (_selectedEquation == 'Hardy-Weinberg (p + q = 1)') {
        // p, q
        if (v1.isEmpty) {
          resVal = 1.0 - _eval(v2);
          resLabel = 'Freq p';
          resUnit = '';
        } else if (v2.isEmpty) {
          resVal = 1.0 - _eval(v1);
          resLabel = 'Freq q';
          resUnit = '';
        }
      } else if (_selectedEquation == 'Specific Heat (Q = mcΔT)') {
        // Q, m, c, dT
        if (v1.isEmpty) {
          resVal = _eval(v2) * _eval(v3) * _eval(v4);
          resLabel = 'Heat (Q)';
          resUnit = 'J';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) / (_eval(v3) * _eval(v4));
          resLabel = 'Mass (m)';
          resUnit = 'kg';
        } else if (v3.isEmpty) {
          resVal = _eval(v1) / (_eval(v2) * _eval(v4));
          resLabel = 'Sp. Heat (c)';
          resUnit = 'J/kg·K';
        } else if (v4.isEmpty) {
          resVal = _eval(v1) / (_eval(v2) * _eval(v3));
          resLabel = 'ΔT';
          resUnit = 'K';
        }
      } else if (_selectedEquation == 'Energy Mass Equivalence (E = mc²)') {
        // E, m
        final c = 299792458;
        if (v1.isEmpty) {
          resVal = _eval(v2) * c * c;
          resLabel = 'Energy (E)';
          resUnit = 'J';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) / (c * c);
          resLabel = 'Mass (m)';
          resUnit = 'kg';
        }
      } else if (_selectedEquation == 'Wave Speed (v = fλ)') {
        // v, f, L
        if (v1.isEmpty) {
          resVal = _eval(v2) * _eval(v3);
          resLabel = 'Velocity (v)';
          resUnit = 'm/s';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) / _eval(v3);
          resLabel = 'Frequency (f)';
          resUnit = 'Hz';
        } else if (v3.isEmpty) {
          resVal = _eval(v1) / _eval(v2);
          resLabel = 'Wavelength (λ)';
          resUnit = 'm';
        }
      } else if (_selectedEquation == 'Power (P = VI)') {
        // P, V, I
        if (v1.isEmpty) {
          resVal = _eval(v2) * _eval(v3);
          resLabel = 'Power (P)';
          resUnit = 'W';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) / _eval(v3);
          resLabel = 'Voltage (V)';
          resUnit = 'V';
        } else if (v3.isEmpty) {
          resVal = _eval(v1) / _eval(v2);
          resLabel = 'Current (I)';
          resUnit = 'A';
        }
      } else if (_selectedEquation == 'Escape Velocity (v = √(2GM/r))') {
        // v, M, r
        final G = 6.6743e-11;
        if (v1.isEmpty) {
          resVal = math.sqrt(2 * G * _eval(v2) / _eval(v3));
          resLabel = 'Escape Vel (v)';
          resUnit = 'm/s';
        } else if (v2.isEmpty) {
          resVal = math.pow(_eval(v1), 2) * _eval(v3) / (2 * G);
          resLabel = 'Mass (M)';
          resUnit = 'kg';
        } else if (v3.isEmpty) {
          resVal = 2 * G * _eval(v2) / math.pow(_eval(v1), 2);
          resLabel = 'Radius (r)';
          resUnit = 'm';
        }
      } else if (_selectedEquation == "Hubble's Law (v = H₀D)") {
        // v, H0, D
        if (v1.isEmpty) {
          resVal = _eval(v2) * _eval(v3);
          resLabel = 'Velocity (v)';
          resUnit = 'km/s';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) / _eval(v3);
          resLabel = 'Hubble (H₀)';
          resUnit = 'km/s/Mpc';
        } else if (v3.isEmpty) {
          resVal = _eval(v1) / _eval(v2);
          resLabel = 'Distance (D)';
          resUnit = 'Mpc';
        }
      } else if (_selectedEquation == "Darcy's Law (Q = KiA)") {
        // Q, K, i, A
        if (v1.isEmpty) {
          resVal = _eval(v2) * _eval(v3) * _eval(v4);
          resLabel = 'Discharge (Q)';
          resUnit = 'm³/s';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) / (_eval(v3) * _eval(v4));
          resLabel = 'Hyd. Cond (K)';
          resUnit = 'm/s';
        } else if (v3.isEmpty) {
          resVal = _eval(v1) / (_eval(v2) * _eval(v4));
          resLabel = 'Gradient (i)';
          resUnit = '';
        } else if (v4.isEmpty) {
          resVal = _eval(v1) / (_eval(v2) * _eval(v3));
          resLabel = 'Area (A)';
          resUnit = 'm²';
        }
      } else if (_selectedEquation == 'Geothermal Gradient (G = ΔT/ΔZ)') {
        // G, dT, dZ
        if (v1.isEmpty) {
          resVal = _eval(v2) / _eval(v3);
          resLabel = 'Gradient (G)';
          resUnit = '°C/km';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) * _eval(v3);
          resLabel = 'ΔTemp (ΔT)';
          resUnit = '°C';
        } else if (v3.isEmpty) {
          resVal = _eval(v2) / _eval(v1);
          resLabel = 'ΔDepth (ΔZ)';
          resUnit = 'km';
        }
      } else if (_selectedEquation == 'Z-Score (z = (x-μ)/σ)') {
        // z, x, mu, sigma
        if (v1.isEmpty) {
          resVal = (_eval(v2) - _eval(v3)) / _eval(v4);
          resLabel = 'Z-Score (z)';
          resUnit = '';
        } else if (v2.isEmpty) {
          resVal = _eval(v1) * _eval(v4) + _eval(v3);
          resLabel = 'Value (x)';
          resUnit = '';
        } else if (v3.isEmpty) {
          resVal = _eval(v2) - (_eval(v1) * _eval(v4));
          resLabel = 'Mean (μ)';
          resUnit = '';
        } else if (v4.isEmpty) {
          resVal = (_eval(v2) - _eval(v3)) / _eval(v1);
          resLabel = 'Std Dev (σ)';
          resUnit = '';
        }
      }

      setState(() {
        if (resVal.isNaN || resVal.isInfinite) {
          _result = 'Error: Division by zero or invalid input';
          _resultValue = double.nan;
          _ans = double.nan;
        } else {
          _resultValue = resVal;
          _ans = resVal;
          _result = '$resLabel = ${NumberFormatter.format(resVal, decimalPlaces: _sigFigs)} $resUnit'.trim();
        }
      });
    } catch (e) {
      setState(() {
        if (!isAuto) _result = 'Invalid expressions in fields';
      });
    }
  }

  void _saveToHistory({bool showSnackbar = true}) {
    if (_result.isNotEmpty &&
        !_result.contains('Invalid') &&
        !_result.contains('Awaiting') &&
        !_result.contains('empty')) {
      setState(() {
        _history.insert(0, '$_selectedEquation: $_result');
        if (_history.length > 20) _history.removeLast();
      });
      if (showSnackbar) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Saved to history'),
            duration: Duration(seconds: 1),
          ),
        );
      }
    }
  }

  void _handleModeChange(VoidCallback updateState) {
    if (_result.isNotEmpty && !_result.contains('Awaiting') && !_result.contains('Error') && !_result.contains('Invalid')) {
      _saveToHistory(showSnackbar: false);
    }
    setState(() {
      updateState();
      _result = '';
      _autoCalculatedVar = null;
      for (var c in _controllers.values) {
        c.clear();
      }
    });
  }

  void _showHistory() {
    showDialog(
      context: context,
      builder: (context) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          elevation: 8,
          backgroundColor: Theme.of(context).colorScheme.surfaceContainerHigh,
          child: Container(
            width: 400,
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  'Calculation History',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const Divider(),
                if (_history.isEmpty)
                  const Padding(
                    padding: EdgeInsets.all(32.0),
                    child: Text('No history yet.'),
                  )
                else
                  Flexible(
                    child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: _history.length,
                      itemBuilder: (context, index) {
                        return ListTile(
                          title: Text(_history[index]),
                          trailing: IconButton(
                            icon: const Icon(Icons.copy, size: 20),
                            onPressed: () {
                              final parts = _history[index].split('=');
                              if (parts.length > 1) {
                                String valStr = parts[1].trim().split(' ')[0];
                                _getActiveController().text += valStr;
                                Navigator.pop(context);
                              }
                            },
                          ),
                        );
                      },
                    ),
                  ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    TextButton.icon(
                      icon: const Icon(Icons.share, size: 18),
                      label: const Text('Share'),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('History shared!')),
                        );
                      },
                    ),
                    TextButton.icon(
                      icon: const Icon(Icons.download, size: 18),
                      label: const Text('Download'),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('History downloaded as .txt!'),
                          ),
                        );
                      },
                    ),
                    TextButton(
                      child: const Text('Close'),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  List<String> _getLabelsForEquation(String eq) {
    switch (eq) {
      case 'Force (F = ma)':
        return ['Force (F, N)', 'Mass (m, kg)', 'Accel (a, m/s²)'];
      case 'Kinetic Energy (KE = 0.5mv²)':
        return ['KE (J)', 'Mass (m, kg)', 'Vel (v, m/s)'];
      case "Ohm's Law (V = IR)":
        return ['Voltage (V, V)', 'Current (I, A)', 'Resist (R, Ω)'];
      case 'Ideal Gas Law (PV = nRT)':
        return [
          'Press (P, Pa)',
          'Vol (V, m³)',
          'Moles (n, mol)',
          'Temp (T, K)',
        ];
      case 'Molarity (c = n/V)':
        return ['Molarity (c, mol/L)', 'Moles (n, mol)', 'Vol (V, L)'];
      case 'BMI (kg/m²)':
        return ['BMI (index)', 'Weight (kg)', 'Height (m)'];
      case 'Population Growth (P = P₀e^(rt))':
        return ['Future (P)', 'Initial (P₀)', 'Rate (r, %/yr)', 'Time (t, yr)'];
      case 'Population Density (P/A)':
        return ['Density (ind/km²)', 'Pop (P, ind)', 'Area (A, km²)'];
      case 'Kinematics (v = u + at)':
        return [
          'Final v (m/s)',
          'Init u (m/s)',
          'Accel a (m/s²)',
          'Time t (s)',
        ];
      case 'Universal Gravitation (F = G·m₁·m₂/r²)':
        return ['Force (F, N)', 'Mass 1 (kg)', 'Mass 2 (kg)', 'Radius (r, m)'];
      case 'Photon Energy (E = hf)':
        return ['Energy (E, J)', 'Freq (f, Hz)'];
      case 'pH Calculator':
        return ['pH', '[H⁺] (mol/L)'];
      case 'Hardy-Weinberg (p + q = 1)':
        return ['Freq p', 'Freq q'];
      case 'Specific Heat (Q = mcΔT)':
        return [
          'Heat (Q, J)',
          'Mass (m, kg)',
          'Sp. Heat (c, J/kg·K)',
          'ΔT (K)',
        ];
      case 'Energy Mass Equivalence (E = mc²)':
        return ['Energy (E, J)', 'Mass (m, kg)'];
      case 'Wave Speed (v = fλ)':
        return ['Velocity (v, m/s)', 'Freq (f, Hz)', 'Wavelength (λ, m)'];
      case 'Power (P = VI)':
        return ['Power (P, W)', 'Voltage (V, V)', 'Current (I, A)'];
      case 'Escape Velocity (v = √(2GM/r))':
        return ['Escape Vel (v, m/s)', 'Mass (M, kg)', 'Radius (r, m)'];
      case "Hubble's Law (v = H₀D)":
        return [
          'Velocity (v, km/s)',
          'Hubble (H₀, km/s/Mpc)',
          'Distance (D, Mpc)',
        ];
      case "Darcy's Law (Q = KiA)":
        return [
          'Discharge (Q, m³/s)',
          'Cond (K, m/s)',
          'Grad (i)',
          'Area (A, m²)',
        ];
      case 'Geothermal Gradient (G = ΔT/ΔZ)':
        return ['Gradient (G, °C/km)', 'ΔTemp (ΔT, °C)', 'ΔDepth (ΔZ, km)'];
      case 'Z-Score (z = (x-μ)/σ)':
        return ['Z-Score (z)', 'Value (x)', 'Mean (μ)', 'Std Dev (σ)'];
      default:
        return [];
    }
  }

  TextEditingController _getActiveController() {
    if (_focusNodes['var4']!.hasFocus) return _controllers['var4']!;
    if (_focusNodes['var3']!.hasFocus) return _controllers['var3']!;
    if (_focusNodes['var2']!.hasFocus) return _controllers['var2']!;
    if (_focusNodes['var1']!.hasFocus) return _controllers['var1']!;
    return _controllers['var1']!;
  }

  void _onKeypadPressed(String btn) {
    final ctrl = _getActiveController();
    if (btn == 'C') {
      for (var c in _controllers.values) {
        c.clear();
      }
      setState(() {
        _result = '';
        _resultValue = double.nan;
        _autoCalculatedVar = null;
      });
    } else if (btn == 'CE') {
      ctrl.clear();
      setState(() {
        _autoCalculatedVar = null;
      });
    } else if (btn == '⌫') {
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
    } else if (btn == '=') {
      _calculate();
      _saveToHistory(showSnackbar: false);
    } else if (btn == '±') {
      if (ctrl.text.startsWith('-')) {
        ctrl.text = ctrl.text.substring(1);
      } else {
        ctrl.text = '-' + ctrl.text;
      }
    } else if (btn == 'Ans') {
      ctrl.text += 'Ans';
    } else if (btn == 'MC') {
      setState(() => _memory = 0.0);
    } else if (btn == 'MR') {
      ctrl.text += NumberFormatter.format(_memory, decimalPlaces: _sigFigs);
    } else if (btn == 'M+') {
      if (!_resultValue.isNaN) setState(() => _memory += _resultValue);
    } else if (btn == 'M-') {
      if (!_resultValue.isNaN) setState(() => _memory -= _resultValue);
    } else {
      String output = btn;
      if ([
        'sin',
        'cos',
        'tan',
        'asin',
        'acos',
        'atan',
        'log',
        'ln',
      ].contains(btn)) {
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

      final selStart = ctrl.selection.start;
      if (selStart >= 0) {
        ctrl.text = ctrl.text.replaceRange(
          selStart,
          ctrl.selection.end,
          output,
        );
        ctrl.selection = TextSelection.collapsed(
          offset: selStart + output.length,
        );
      } else {
        ctrl.text += output;
      }
    }
    
    if (btn != '=') {
      _tryAutoCalculate();
    }
  }

  void _insertConstant(String key) {
    final ctrl = _getActiveController();
    if (ctrl != null) {
      final val = _constants[key] ?? key;
      ctrl.text += val;
      _tryAutoCalculate();
    }
  }

  String _getUnitType(String text) {
    final lower = text.toLowerCase();
    if (lower.contains('mass') || lower.contains('weight') || lower.contains('(kg)')) return 'mass';
    if (lower.contains('speed') || lower.contains('vel') || (lower.contains('(m/s)') && !lower.contains('m/s²'))) return 'velocity';
    if (lower.contains('accel') || lower.contains('(m/s²)')) return 'acceleration';
    if (lower.contains('dist') || lower.contains('height') || lower.contains('radius') || lower.contains('year') || lower.contains('parsec') || lower.contains('au') || (lower.contains('(m)') && !lower.contains('m/s') && !lower.contains('m²') && !lower.contains('m³') && !lower.contains('mol'))) return 'distance';
    if (lower.contains('time') || (lower.contains('(s)') && !lower.contains('m/s') && !lower.contains('j·s')) || lower.contains('yr')) return 'time';
    if (lower.contains('force') || lower.contains('(n)')) return 'force';
    if (lower.contains('planck') || lower.contains('j·s')) return 'action';
    if (lower.contains('energy') || lower.contains('work') || lower.contains('(j)')) return 'energy';
    if (lower.contains('temp') || lower.contains('(k)')) return 'temperature';
    if (lower.contains('press') || lower.contains('(pa)')) return 'pressure';
    if (lower.contains('vol') || lower.contains('(m³)') || lower.contains('(l)')) return 'volume';
    if (lower.contains('moles') || lower.contains('(mol)')) return 'amount';
    return 'other';
  }

  Widget _buildKeypad() {
    final buttons = [
      'sin', 'cos', 'tan', 'C', 'CE', '⌫',
      'x²', '1/x', '√', '(', ')', '÷',
      'x^y', '7', '8', '9', '×', 'n!',
      '10^x', '4', '5', '6', '−', 'Ans',
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
        final double ratio = (itemHeight > 0 && itemWidth > 0)
            ? itemWidth / itemHeight
            : 1.6;

        return GridView.builder(
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 6,
            childAspectRatio: ratio,
            crossAxisSpacing: 4,
            mainAxisSpacing: 4,
          ),
          itemCount: buttons.length,
          itemBuilder: (context, index) {
            final btn = buttons[index];
            final isOp = ['÷', '×', '−', '+', '='].contains(btn);
            final isAction = ['C', '⌫', '±'].contains(btn);
            final isMath =
                !isOp &&
                !isAction &&
                double.tryParse(btn) == null &&
                btn != '.';

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
              if (btn == 'Ans') {
                bgColor = Theme.of(context).colorScheme.tertiaryContainer;
                fgColor = Theme.of(context).colorScheme.onTertiaryContainer;
              }
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
                      fontSize: isMath ? 14 : 16,
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

  Widget _buildInputs() {
    List<String> labels = _getLabelsForEquation(_selectedEquation);
    List<Widget> fields = [];
    for (int i = 0; i < labels.length; i++) {
      if (i == _targetVarIndex) continue;
      fields.add(
        Padding(
          padding: const EdgeInsets.only(bottom: 8.0),
          child: TextField(
            controller: _controllers['var${i + 1}'],
            focusNode: _focusNodes['var${i + 1}'],
            showCursor: true,
            keyboardType: TextInputType.text,
            onTap: () {
              setState(() {
                _activeFocusId = 'var${i + 1}';
              });
            },
            style: const TextStyle(fontSize: 14),
            decoration: InputDecoration(
              isDense: true,
              labelText: labels[i],
              border: const OutlineInputBorder(),
              filled: true,
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 8,
                vertical: 8,
              ),
              fillColor: Theme.of(context).colorScheme.surface,
              suffixIcon: IconButton(
                icon: const Icon(Icons.clear, size: 16),
                onPressed: () {
                  _controllers['var${i + 1}']!.clear();
                },
              ),
            ),
          ),
        ),
      );
    }
    return Column(children: fields);
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(sciFiProvider, (prev, next) {
      if (prev != next) {
        _calculate();
      }
    });

    Widget inputsAndDisplay = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.history, size: 20),
                  onPressed: _showHistory,
                  tooltip: 'History',
                ),
                IconButton(
                  icon: const Icon(Icons.save_alt, size: 20),
                  onPressed: _saveToHistory,
                  tooltip: 'Save result',
                ),
              ],
            ),
          ],
        ),
        const SizedBox(height: 4),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildMemBtn('MC'),
            _buildMemBtn('MR'),
            _buildMemBtn('M+'),
            _buildMemBtn('M-'),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: DropdownButtonFormField<String>(
                value: _selectedCategory,
                style: const TextStyle(fontSize: 14, color: Colors.black),
                decoration: const InputDecoration(
                  isDense: true,
                  labelText: 'Discipline',
                  border: OutlineInputBorder(),
                  filled: true,
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 8,
                  ),
                ),
                items: _equations.keys
                    .map(
                      (e) => DropdownMenuItem(
                        value: e,
                        child: Text(
                          e,
                          style: TextStyle(
                            color: Theme.of(context).colorScheme.onSurface,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    )
                    .toList(),
                onChanged: (val) {
                  _handleModeChange(() {
                    _selectedCategory = val!;
                    _selectedEquation = _equations[val]!.first;
                    _targetVarIndex = 0;
                  });
                },
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              flex: 2,
              child: DropdownButtonFormField<String>(
                value: _selectedEquation,
                style: const TextStyle(fontSize: 14, color: Colors.black),
                decoration: const InputDecoration(
                  isDense: true,
                  labelText: 'Equation',
                  border: OutlineInputBorder(),
                  filled: true,
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 8,
                  ),
                ),
                isExpanded: true,
                items: _equations[_selectedCategory]!
                    .map(
                      (e) => DropdownMenuItem(
                        value: e,
                        child: Text(
                          e,
                          style: TextStyle(
                            color: Theme.of(context).colorScheme.onSurface,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    )
                    .toList(),
                onChanged: (val) {
                  _handleModeChange(() {
                    _selectedEquation = val!;
                    _targetVarIndex = 0;
                  });
                },
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        DropdownButtonFormField<int>(
          value: _targetVarIndex < _getLabelsForEquation(_selectedEquation).length 
              ? _targetVarIndex 
              : 0,
          style: const TextStyle(fontSize: 14, color: Colors.black),
          decoration: const InputDecoration(
            isDense: true,
            labelText: 'Solve For (Output)',
            border: OutlineInputBorder(),
            filled: true,
            contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          ),
          items: List.generate(
            _getLabelsForEquation(_selectedEquation).length,
            (index) => DropdownMenuItem(
              value: index,
              child: Text(
                _getLabelsForEquation(_selectedEquation)[index],
                style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
              ),
            ),
          ),
          onChanged: (val) {
            _handleModeChange(() {
              _targetVarIndex = val!;
            });
          },
        ),
        const SizedBox(height: 8),

        Builder(
          builder: (context) {
            String? activeUnitType;
            if (_activeFocusId.isNotEmpty) {
              final activeLabels = _getLabelsForEquation(_selectedEquation);
              int varIdx = int.tryParse(_activeFocusId.replaceAll('var', '')) ?? 1;
              if (varIdx <= activeLabels.length) {
                activeUnitType = _getUnitType(activeLabels[varIdx - 1]);
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
        ),
        const SizedBox(height: 16),
        _buildInputs(),
        if (_result.isNotEmpty)
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primaryContainer,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              _result,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.onPrimaryContainer,
              ),
              textAlign: TextAlign.center,
            ),
          ),
      ],
    );

    return SingleChildScrollView(
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 600),
          child: inputsAndDisplay,
        ),
      ),
    );
  }

  Widget _buildMemBtn(String label) {
    return InkWell(
      onTap: () => _onKeypadPressed(label),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        decoration: BoxDecoration(
          border: Border.all(
            color: Theme.of(context).colorScheme.outlineVariant,
          ),
          borderRadius: BorderRadius.circular(4),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
            color: Theme.of(context).colorScheme.primary,
          ),
        ),
      ),
    );
  }
}
