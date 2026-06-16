import { Metadata } from "next";
import { Base64PageUI } from "./Base64PageUI";

export const metadata: Metadata = {
  title: "Base64 Text Encoder & Decoder | Developer-Grade Encoding",
  description: "Free online Base64 text encoder and decoder. Developer-grade data encoding to safely transform your text strings, instantly.",
};

export default function Base64Page() {
  return <Base64PageUI />;
}
