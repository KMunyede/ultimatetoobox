export interface EquationVariable {
  symbol: string;
  name: string;
  unit: string;
  description: string;
}

export interface WorkedExample {
  title: string;
  scenario: string;
  given: string[];
  steps: string[];
  result: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EquationDetail {
  slug: string;
  cat: string;
  id: string;
  title: string;
  desc: string;
  intro: string;
  formula: {
    expression: string;
    variables: EquationVariable[];
  };
  howToUse: string[];
  workedExample: WorkedExample;
  faqs: FAQItem[];
}

export const EQUATION_CONTENT: Record<string, EquationDetail> = {
  "newtons-second-law": {
    slug: "newtons-second-law",
    cat: "Mechanics",
    id: "fma",
    title: "Newton's Second Law Solver",
    desc: "Solve for Force, Mass, or Acceleration (F=ma) instantly. High-precision physics calculator.",
    intro: "Newton's Second Law of Motion establishes the fundamental vector relationship between the net force applied to a physical object, its inertial mass, and its resulting acceleration vector. The directional vector of acceleration always aligns precisely with the net force vector. This principle forms the absolute foundation of classical Newtonian mechanics and is essential across civil engineering, automotive safety design, ballistics, aerospace trajectory modeling, and introductory physics curricula.",
    formula: {
      expression: "F = m × a",
      variables: [
        { symbol: "F", name: "Net Force", unit: "Newtons (N, or kg·m/s²)", description: "Vector sum of all external forces acting on the object" },
        { symbol: "m", name: "Mass", unit: "Kilograms (kg)", description: "Quantity of matter and inherent measure of inertial resistance to change in motion" },
        { symbol: "a", name: "Acceleration", unit: "Meters per second squared (m/s²)", description: "Rate at which velocity changes over time in the direction of the net force" }
      ]
    },
    howToUse: [
      "Step 1: Confirm Newton's Second Law (F = ma) is selected in the Mechanics category.",
      "Step 2: Choose the unknown parameter you wish to compute (Force, Mass, or Acceleration) from the Target menu.",
      "Step 3: Input the two known numerical parameters and select your desired measurement units.",
      "Step 4: Click Solve to calculate the unknown target parameter with high arithmetic accuracy."
    ],
    workedExample: {
      title: "Calculating Net Force on an Accelerating Cart",
      scenario: "A cart with an inertial mass of 5 kg accelerates along a smooth, frictionless horizontal track at a constant rate of 3 m/s². Calculate the total net horizontal force required to produce this exact acceleration.",
      given: ["Mass (m) = 5 kg", "Acceleration (a) = 3 m/s²"],
      steps: [
        "Identify the target variable: Net Force (F).",
        "State the governing equation: F = m × a.",
        "Substitute the given values into the equation: F = 5 kg × 3 m/s².",
        "Perform multiplication: 5 × 3 = 15 kg·m/s².",
        "Verify SI unit equivalence: 1 kg·m/s² equals 1 Newton (N)."
      ],
      result: "The required net horizontal force is 15 N (Newtons)."
    },
    faqs: [
      {
        question: "What are common mistakes when applying Newton's Second Law?",
        answer: "A frequent mistake is confusing a single applied force with the net force (F). In real-world problems with friction, air resistance, or opposing forces, a free-body diagram must be drawn to sum all vector components first. Another common mistake is entering mass in grams or acceleration in kilometers per hour squared without converting to standard SI base units."
      },
      {
        question: "What unit conversions are required for F = ma?",
        answer: "In standard SI units, mass must be expressed in kilograms (kg) and acceleration in meters per second squared (m/s²). Multiplying kilograms by m/s² directly yields force in Newtons (N). If mass is measured in grams, pounds, or metric tons, or acceleration in feet/s², convert all values to kg and m/s² before executing the calculation."
      },
      {
        question: "When does Newton's Second Law fail or require physical modification?",
        answer: "Newton's Second Law assumes a constant mass and velocities far below the speed of light. It does not apply directly at relativistic speeds where mass increases with velocity, at subatomic quantum scales, or in variable-mass systems such as launching rockets without accounting for rate of momentum change over time (F = dp/dt)."
      }
    ]
  },
  "kinetic-energy": {
    slug: "kinetic-energy",
    cat: "Mechanics",
    id: "ke",
    title: "Kinetic Energy Calculator",
    desc: "Calculate kinetic energy, mass, or velocity using the KE = ½mv² formula. Perfect for physics students.",
    intro: "Kinetic energy represents the scalar mechanical energy an object possesses purely as a result of its motion. According to the work-energy theorem, the kinetic energy stored in a moving body equals the total mechanical work performed to accelerate it from a state of rest to its current velocity. This concept is fundamental to crash safety engineering, impact dynamics, sports biomechanics, and planetary orbital physics.",
    formula: {
      expression: "KE = ½ × m × v²",
      variables: [
        { symbol: "KE", name: "Kinetic Energy", unit: "Joules (J, or kg·m²/s²)", description: "Total mechanical work required to accelerate the body from rest to speed v" },
        { symbol: "m", name: "Mass", unit: "Kilograms (kg)", description: "Total quantity of matter contained within the moving body" },
        { symbol: "v", name: "Velocity", unit: "Meters per second (m/s)", description: "Magnitude of speed in a specified direction" }
      ]
    },
    howToUse: [
      "Step 1: Ensure Kinetic Energy (KE = ½mv²) is selected under the Mechanics category.",
      "Step 2: Choose your desired calculation target (Kinetic Energy, Mass, or Velocity) in the dropdown menu.",
      "Step 3: Enter the numerical values for the two known variables along with their respective measurement units.",
      "Step 4: Press Solve to generate the exact computed result instantly."
    ],
    workedExample: {
      title: "Calculating Translational Kinetic Energy of a Moving Body",
      scenario: "A solid object with a mass of 2 kg travels along a straight path at a constant velocity of 4 m/s. Determine the total translational kinetic energy stored within the moving object.",
      given: ["Mass (m) = 2 kg", "Velocity (v) = 4 m/s"],
      steps: [
        "Identify the target variable: Kinetic Energy (KE).",
        "State the governing formula: KE = ½ × m × v².",
        "Substitute the given values into the formula: KE = 0.5 × 2 kg × (4 m/s)².",
        "Square the velocity magnitude: (4 m/s)² = 16 m²/s².",
        "Multiply all terms: 0.5 × 2 × 16 = 16 kg·m²/s².",
        "Apply the work-energy theorem: Exactly 16 Joules of work was performed to reach this speed."
      ],
      result: "The kinetic energy of the object is 16 J (Joules)."
    },
    faqs: [
      {
        question: "Why does doubling speed quadruple total kinetic energy?",
        answer: "Because velocity is squared in the formula (v²), kinetic energy scales quadratically with speed. Doubling velocity from 4 m/s to 8 m/s increases kinetic energy by a factor of 2² (4 times). This quadratic scaling explains why high-speed motor vehicle collisions transfer dramatically higher kinetic energy, leading to exponential increases in structural damage."
      },
      {
        question: "Can kinetic energy ever take a negative value?",
        answer: "No. Mass is strictly positive in classical physics, and squaring any real-number velocity (v²) always produces a non-negative value. As a result, kinetic energy is always greater than or equal to zero. Changing the direction of motion alters the vector sign of velocity, but squaring completely removes negative signs."
      },
      {
        question: "What are the physical limits of the KE = ½mv² formula?",
        answer: "This classic equation applies strictly to non-relativistic speeds (much slower than the speed of light) and non-rotating rigid objects undergoing translational motion. At near-light velocities, Einsteinian relativistic kinetic energy equations must be used; for spinning objects, rotational kinetic energy (½Iω²) must also be calculated."
      }
    ]
  },
  "ideal-gas-law": {
    slug: "ideal-gas-law",
    cat: "Thermodynamics",
    id: "gas",
    title: "Ideal Gas Law Solver",
    desc: "Solve for Pressure, Volume, Moles, or Temperature (PV=nRT) with our free thermodynamics tool.",
    intro: "The Ideal Gas Law models the physical state of a hypothetical ideal gas by relating its absolute pressure, volume, chemical amount in moles, and absolute temperature. It is widely applied across chemistry, chemical process engineering, meteorology, and HVAC engineering to predict gas behavior under varying pressure and thermal conditions.",
    formula: {
      expression: "P × V = n × R × T",
      variables: [
        { symbol: "P", name: "Absolute Pressure", unit: "Pascals (Pa)", description: "Normal force exerted by gas particles per unit surface area of the container" },
        { symbol: "V", name: "Volume", unit: "Cubic meters (m³)", description: "Three-dimensional geometric space occupied by the gas" },
        { symbol: "n", name: "Amount of Substance", unit: "Moles (mol)", description: "Quantity of gas expressed in molar units (Avogadro's number of particles)" },
        { symbol: "R", name: "Ideal Gas Constant", unit: "8.314 J/(mol·K)", description: "Universal molar gas constant relating energy to temperature and molar amount" },
        { symbol: "T", name: "Absolute Temperature", unit: "Kelvin (K)", description: "Thermodynamic temperature measured on the absolute Kelvin scale" }
      ]
    },
    howToUse: [
      "Step 1: Select the Ideal Gas Law (PV = nRT) in the Thermodynamics section.",
      "Step 2: Choose the unknown variable (Pressure, Volume, Moles, or Temperature) from the Target menu.",
      "Step 3: Enter the remaining three known parameters along with their unit selections.",
      "Step 4: Click Solve to calculate the unknown gas property instantly."
    ],
    workedExample: {
      title: "Determining Gas Molar Volume at Standard Temperature and Pressure",
      scenario: "Calculate the volume occupied by 1 mol of an ideal gas at an absolute pressure of 101325 Pa and a thermodynamic temperature of 273.15 K, using the universal gas constant R = 8.314 J/(mol·K).",
      given: ["Amount (n) = 1 mol", "Temperature (T) = 273.15 K", "Pressure (P) = 101325 Pa", "Gas Constant (R) = 8.314 J/(mol·K)"],
      steps: [
        "Identify the target variable: Volume (V).",
        "Rearrange the formula to solve for V: V = (n × R × T) / P.",
        "Substitute the values: V = (1 mol × 8.314 J/(mol·K) × 273.15 K) / 101325 Pa.",
        "Calculate the numerator: 1 × 8.314 × 273.15 = 2270.9691 J.",
        "Divide by the absolute pressure: 2270.9691 / 101325 ≈ 0.022414 m³."
      ],
      result: "The volume is approximately 0.0224 m³ (equivalent to 22.4 liters)."
    },
    faqs: [
      {
        question: "Why must temperature always be entered in Kelvin?",
        answer: "Gas volume and pressure are directly proportional to average thermal kinetic energy, which reaches absolute zero only at 0 Kelvin. Entering Celsius or Fahrenheit introduces negative or zero numbers into multiplication and division, producing mathematically invalid and physically impossible gas volume predictions."
      },
      {
        question: "When do real gases deviate from the Ideal Gas Law?",
        answer: "Real gases deviate significantly under high pressures (where individual gas particle volume becomes significant relative to container volume) and low temperatures (where intermolecular attractive forces reduce wall impacts). Under extreme conditions, equations like the Van der Waals equation provide superior predictive accuracy."
      },
      {
        question: "How do unit choices affect the gas constant R?",
        answer: "The numerical value of the universal gas constant R depends entirely on the units chosen for pressure and volume. When using SI units (Pascals and cubic meters), R equals 8.314 J/(mol·K). When pressure is in atmospheres and volume in liters, R equals 0.08206 L·atm/(mol·K)."
      }
    ]
  },
  "ohms-law": {
    slug: "ohms-law",
    cat: "Electromagnetism",
    id: "ohms",
    title: "Ohm's Law Calculator",
    desc: "Instantly calculate Voltage, Current, or Resistance (V=IR) for any electrical circuit.",
    intro: "Ohm's Law expresses the fundamental linear relationship between potential difference (voltage), electric current, and electrical resistance across a conducting element. Voltage acts as the electromotive force driving electric charge (1 Ampere = 1 Coulomb per second) against the circuit's inherent resistance. It serves as the foundational principle for electronic circuit design, power dissipation calculations, component selection, and electrical safety analysis.",
    formula: {
      expression: "V = I × R",
      variables: [
        { symbol: "V", name: "Voltage", unit: "Volts (V, or Joules per Coulomb)", description: "Electrical potential difference or electromotive force across the component" },
        { symbol: "I", name: "Electric Current", unit: "Amperes (A, or Coulombs per second)", description: "Flow rate of electric charge moving through the conductor per unit time" },
        { symbol: "R", name: "Resistance", unit: "Ohms (Ω, or Volts per Ampere)", description: "Opposition to the flow of electric current within the material" }
      ]
    },
    howToUse: [
      "Step 1: Select Ohm's Law (V = IR) from the Electromagnetism category.",
      "Step 2: Choose your target parameter (Voltage, Current, or Resistance) from the dropdown menu.",
      "Step 3: Enter the numerical values for the remaining two variables along with their units.",
      "Step 4: Press Solve to compute the missing electrical circuit value instantly."
    ],
    workedExample: {
      title: "Calculating Electric Current in a Simple Resistor Circuit",
      scenario: "A circuit contains a 12 V power source connected directly across a fixed resistor with a resistance of 4 Ω. Calculate the electric current flowing through the circuit.",
      given: ["Voltage (V) = 12 V", "Resistance (R) = 4 Ω"],
      steps: [
        "Identify the target variable: Electric Current (I).",
        "Rearrange the formula to solve for current: I = V / R.",
        "Substitute the given circuit values into the equation: I = 12 V / 4 Ω.",
        "Perform division: 12 / 4 = 3 A.",
        "Power dissipation check: P = V × I = 12 V × 3 A = 36 Watts dissipated as heat."
      ],
      result: "The electric current flowing through the circuit is 3 A (Amperes)."
    },
    faqs: [
      {
        question: "Does Ohm's Law apply to all electrical components?",
        answer: "No. Ohm's Law applies strictly to ohmic conductors (such as metallic wire resistors) where resistance remains constant regardless of applied voltage. Non-ohmic devices, including semiconductor diodes, transistors, LEDs, solar cells, and gas discharge lamps, exhibit non-linear current-voltage characteristics that do not conform to constant V = IR."
      },
      {
        question: "How do temperature changes impact electrical resistance?",
        answer: "In most metallic conductors, electrical resistance increases as temperature rises because thermal lattice vibrations scatter flowing electrons. Conversely, in semiconductor materials, resistance decreases with rising temperature because thermal energy liberates additional free charge carriers into the conduction band."
      },
      {
        question: "What happens when circuit resistance approaches zero?",
        answer: "If circuit resistance approaches zero while voltage remains non-zero, current mathematically approaches infinity, causing a short circuit. In practical circuits, excessive current generates rapid Joule heating, blowing protective fuses, tripping circuit breakers, or causing catastrophic component failure."
      }
    ]
  }
};
