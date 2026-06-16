import { Metadata } from "next";
import { EquationSolverPageUI } from "./EquationSolverPageUI";

export const metadata: Metadata = {
  title: "Science Equation Solver | Bypass the Algebra Instantly",
  description: "Free online science equation solver. Bypass the algebra. Enter what you know, and we'll instantly find what you don't for physics and chemistry.",
};

export default function EquationSolverPage() {
  return <EquationSolverPageUI />;
}
