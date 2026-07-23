import {
  FileText,
  Code2,
  Bot,
  LayoutTemplate,
  Gamepad2,
  BrainCircuit,
  Briefcase,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  FileText,
  Code2,
  Bot,
  LayoutTemplate,
  Gamepad2,
  BrainCircuit,
  Briefcase,
  MapPin,
};

// Cycled per card so eight stacked cards don't all read as one identical
// gradient repeated — still built entirely from the existing avenger palette.
export const GRADIENTS = [
  "from-avenger-purple via-[#7a1f4f] to-avenger-red",
  "from-avenger-blue via-[#3d2f6b] to-avenger-purple",
  "from-avenger-red via-[#8a1f3f] to-avenger-gold",
  "from-avenger-blue via-[#1f4f6b] to-avenger-red",
];
