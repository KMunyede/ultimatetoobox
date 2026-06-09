class PhysicsFormula {
  final String name;
  final String formula;
  final List<String> variables;
  final double Function(Map<String, double> inputs) calculate;
  final String targetVariable;

  const PhysicsFormula({
    required this.name,
    required this.formula,
    required this.variables,
    required this.calculate,
    required this.targetVariable,
  });
}

final List<PhysicsFormula> physicsFormulas = [
  PhysicsFormula(
    name: 'Newton\'s Second Law',
    formula: 'F = m × a',
    variables: ['m (mass in kg)', 'a (acceleration in m/s²)'],
    targetVariable: 'F (Force in Newtons)',
    calculate: (inputs) => inputs['m (mass in kg)']! * inputs['a (acceleration in m/s²)']!,
  ),
  PhysicsFormula(
    name: 'Kinetic Energy',
    formula: 'KE = ½ × m × v²',
    variables: ['m (mass in kg)', 'v (velocity in m/s)'],
    targetVariable: 'KE (Kinetic Energy in Joules)',
    calculate: (inputs) => 0.5 * inputs['m (mass in kg)']! * (inputs['v (velocity in m/s)']! * inputs['v (velocity in m/s)']!),
  ),
  PhysicsFormula(
    name: 'Ohm\'s Law',
    formula: 'V = I × R',
    variables: ['I (current in Amps)', 'R (resistance in Ohms)'],
    targetVariable: 'V (Voltage in Volts)',
    calculate: (inputs) => inputs['I (current in Amps)']! * inputs['R (resistance in Ohms)']!,
  ),
  PhysicsFormula(
    name: 'Density',
    formula: 'ρ = m / V',
    variables: ['m (mass in kg)', 'V (volume in m³)'],
    targetVariable: 'ρ (Density in kg/m³)',
    calculate: (inputs) => inputs['m (mass in kg)']! / inputs['V (volume in m³)']!,
  ),
];
