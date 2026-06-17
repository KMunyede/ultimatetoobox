/**
 * Shared Calculator Logic
 */

export function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export function formatResult(num: number): string {
  if (isNaN(num)) return "Error";
  if (!isFinite(num)) return "Infinity";

  // Handle precision issues
  const s = parseFloat(num.toFixed(12)).toString();
  if (s.length > 12 && s.includes('.')) {
      return parseFloat(num.toFixed(8)).toString();
  }
  return s;
}

/**
 * Parses and evaluates scientific expressions
 * Supports implicit multiplication, constants, and math functions
 */
export function evaluateScientific(expression: string, mode: "DEG" | "RAD"): number {
  try {
    let safeExp = expression
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E")
      // Handle implicit multiplication (e.g. 2π, (1+2)(3+4))
      .replace(/(\d)(\()/g, "$1*(")
      .replace(/(\))(\()/g, "$1*(")
      .replace(/(\))(\d)/g, "$1*$2")
      .replace(/(\d)(π|e|sin|cos|tan|sqrt|log|ln)/g, "$1*$2")
      .replace(/(π|e)(\d)/g, "$1*$2")

      .replace(/sin\(/g, mode === "DEG" ? "Math.sin(Math.PI/180*" : "Math.sin(")
      .replace(/cos\(/g, mode === "DEG" ? "Math.cos(Math.PI/180*" : "Math.cos(")
      .replace(/tan\(/g, mode === "DEG" ? "Math.tan(Math.PI/180*" : "Math.tan(")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/\^/g, "**");

    // Handle Factorials: word! -> factorial(word)
    // Simple regex for integers followed by !
    safeExp = safeExp.replace(/(\d+)!/g, (_, n) => `factorial(${n})`);

    // Using a safer evaluation context
    const fn = new Function("factorial", `return ${safeExp}`);
    return fn(factorial);
  } catch (e) {
    return NaN;
  }
}
