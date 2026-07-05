import {
  BarChart3,
  Briefcase,
  CircleDollarSign,
  Cog,
  Cpu,
  Factory,
  FileText,
  GraduationCap,
  Handshake,
  Lightbulb,
  Monitor,
  Search,
  Shield,
  ShieldCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

interface IconRule {
  keywords: string[];
  icon: LucideIcon;
}

const departmentRules: IconRule[] = [
  {
    keywords: ["manufacturing", "cnc", "machinist", "machine", "production"],
    icon: Factory,
  },
  {
    keywords: ["engineering", "engineer", "mechanical", "design", "technical"],
    icon: Cog,
  },
  {
    keywords: ["quality", "inspector", "inspection", "qa", "qc"],
    icon: Shield,
  },
  {
    keywords: ["technician", "maintenance", "workshop", "assembly"],
    icon: Wrench,
  },
  {
    keywords: ["it", "software", "computer", "digital", "programming"],
    icon: Monitor,
  },
  {
    keywords: ["automation", "plc", "control"],
    icon: Cpu,
  },
];

const skillRules: IconRule[] = [
  {
    keywords: ["cnc", "turning", "milling", "machining", "lathe"],
    icon: Factory,
  },
  {
    keywords: ["g-code", "gcode", "programming", "code", "cad", "cam"],
    icon: Monitor,
  },
  {
    keywords: ["quality", "inspection", "precision", "tolerance"],
    icon: ShieldCheck,
  },
  {
    keywords: ["team", "collaboration", "communication", "reliability"],
    icon: Users,
  },
  {
    keywords: ["safety", "hse", "compliance"],
    icon: Shield,
  },
  {
    keywords: ["maintenance", "repair", "troubleshoot"],
    icon: Wrench,
  },
];

function matchIcon(text: string, rules: IconRule[], fallback: LucideIcon): LucideIcon {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return fallback;

  for (const rule of rules) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule.icon;
    }
  }

  return fallback;
}

export function resolveDepartmentIcon(department: string): LucideIcon {
  return matchIcon(department, departmentRules, Briefcase);
}

export function resolveSkillIcon(skill: string): LucideIcon {
  return matchIcon(skill, skillRules, Briefcase);
}

const benefitIcons: LucideIcon[] = [BarChart3, Users, ShieldCheck, Lightbulb];

const hiringStepIcons: LucideIcon[] = [FileText, Search, Users, Handshake];

const whyJoinIcons: LucideIcon[] = [
  CircleDollarSign,
  BarChart3,
  GraduationCap,
  Shield,
  Lightbulb,
];

export function resolveBenefitIcon(index: number): LucideIcon {
  return benefitIcons[index % benefitIcons.length] ?? Briefcase;
}

export function resolveHiringStepIcon(index: number): LucideIcon {
  return hiringStepIcons[index % hiringStepIcons.length] ?? FileText;
}

export function resolveWhyJoinIcon(index: number): LucideIcon {
  return whyJoinIcons[index % whyJoinIcons.length] ?? Lightbulb;
}
