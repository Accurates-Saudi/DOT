import type { CareerJobDetail } from "@/types";

export const careerJobs: CareerJobDetail[] = [
  {
    id: "cnc-machinist",
    slug: "cnc-machinist",
    title: "CNC Machinist",
    department: "Manufacturing",
    location: "Dammam, Saudi Arabia",
    employmentType: "Full-Time",
    experience: "3–5 Years",
    overview:
      "We are seeking a skilled CNC Machinist to operate and program CNC machines for precision manufacturing of oil & gas equipment. You will work with advanced machining centers to produce high-quality components that meet strict industry standards.",
    responsibilities: [
      "Set up, operate, and maintain CNC turning and milling machines",
      "Read and interpret technical drawings and engineering specifications",
      "Program and edit G-code for complex machining operations",
      "Perform in-process quality checks using precision measuring instruments",
      "Maintain machine tools and ensure optimal performance",
      "Collaborate with engineering and quality teams on process improvements",
      "Follow safety protocols and maintain a clean work environment",
      "Document production activities and report any issues promptly",
    ],
    requirements: [
      "Diploma or technical certification in machining or related field",
      "3–5 years of experience operating CNC machines in a manufacturing environment",
      "Proficiency in G-code programming and CNC machine setup",
      "Ability to read and interpret engineering drawings and GD&T",
      "Experience with precision measuring tools (micrometers, calipers, CMM)",
      "Strong attention to detail and commitment to quality standards",
      "Ability to work independently and as part of a team",
      "Basic English communication skills",
      "Willingness to work in a fast-paced manufacturing environment",
    ],
    preferredSkills: [
      "CNC Turning & Milling",
      "G-code Programming",
      "Quality Mindset",
      "Teamwork & Reliability",
    ],
    listingOrder: 1,
    meta: {
      title: "CNC Machinist",
      description:
        "Join Dynamic Oil Tools as a CNC Machinist in Dammam. Operate precision CNC machines for oil & gas equipment manufacturing.",
    },
  },
  {
    id: "mechanical-engineer",
    slug: "mechanical-engineer",
    title: "Mechanical Engineer",
    department: "Engineering",
    location: "Dammam, Saudi Arabia",
    employmentType: "Full-Time",
    experience: "2–4 Years",
    overview:
      "We are looking for a Mechanical Engineer to support product design, development, and manufacturing processes for oil & gas equipment. You will collaborate with cross-functional teams to deliver innovative engineering solutions.",
    responsibilities: [
      "Design and develop mechanical components and assemblies",
      "Create and review technical drawings using CAD software",
      "Support manufacturing with design for manufacturability reviews",
      "Conduct engineering calculations and feasibility studies",
      "Collaborate with production and quality teams on product improvements",
      "Prepare technical documentation and specifications",
    ],
    requirements: [
      "Bachelor's degree in Mechanical Engineering or related field",
      "2–4 years of experience in mechanical design or manufacturing",
      "Proficiency in SolidWorks or similar CAD software",
      "Understanding of manufacturing processes and materials",
      "Strong analytical and problem-solving skills",
      "Excellent communication skills in English",
    ],
    preferredSkills: [
      "CAD Design",
      "Manufacturing Processes",
      "Technical Documentation",
      "Cross-functional Collaboration",
    ],
    listingOrder: 2,
    meta: {
      title: "Mechanical Engineer",
      description:
        "Mechanical Engineer opportunity at Dynamic Oil Tools in Dammam. Design and develop oil & gas equipment.",
    },
  },
  {
    id: "quality-inspector",
    slug: "quality-inspector",
    title: "Quality Inspector",
    department: "Quality",
    location: "Dammam, Saudi Arabia",
    employmentType: "Full-Time",
    experience: "2–3 Years",
    overview:
      "We are seeking a Quality Inspector to ensure our products meet the highest quality standards. You will perform inspections, document results, and work closely with production teams to maintain compliance.",
    responsibilities: [
      "Perform incoming, in-process, and final product inspections",
      "Use precision measuring instruments to verify dimensions and tolerances",
      "Document inspection results and maintain quality records",
      "Identify non-conformances and support corrective actions",
      "Collaborate with production teams on quality improvements",
    ],
    requirements: [
      "Diploma or certification in quality control or related field",
      "2–3 years of experience in quality inspection in manufacturing",
      "Knowledge of measuring instruments and inspection techniques",
      "Familiarity with ISO quality standards",
      "Attention to detail and strong documentation skills",
    ],
    preferredSkills: [
      "Dimensional Inspection",
      "Quality Standards",
      "Documentation",
      "Problem Solving",
    ],
    listingOrder: 3,
    meta: {
      title: "Quality Inspector",
      description:
        "Quality Inspector role at Dynamic Oil Tools. Ensure precision and compliance in oil & gas equipment manufacturing.",
    },
  },
  {
    id: "production-technician",
    slug: "production-technician",
    title: "Production Technician",
    department: "Production",
    location: "Dammam, Saudi Arabia",
    employmentType: "Full-Time",
    experience: "1–3 Years",
    overview:
      "Join our production team as a Production Technician. You will support manufacturing operations, assemble components, and ensure efficient production workflows.",
    responsibilities: [
      "Assemble and fabricate components according to work instructions",
      "Operate production equipment and tools safely",
      "Perform basic quality checks during production",
      "Maintain workstations and follow 5S practices",
      "Support continuous improvement initiatives",
    ],
    requirements: [
      "High school diploma or technical certification",
      "1–3 years of experience in manufacturing or production",
      "Ability to read work instructions and technical drawings",
      "Physical ability to perform manual tasks",
      "Team-oriented with a safety-first mindset",
    ],
    preferredSkills: [
      "Assembly",
      "Production Operations",
      "Safety Compliance",
      "Teamwork",
    ],
    listingOrder: 4,
    meta: {
      title: "Production Technician",
      description:
        "Production Technician position at Dynamic Oil Tools in Dammam. Support manufacturing of oil & gas equipment.",
    },
  },
];

export const careerJobsBySlug = Object.fromEntries(
  careerJobs.map((job) => [job.slug, job]),
) as Record<string, CareerJobDetail>;
