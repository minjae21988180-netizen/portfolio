export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  tools: string[];
  year: string;
  highlights: string[];
  accent: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "atlas",
    title: "Atlas — A wayfinding app for the curious",
    category: "Product Design",
    summary:
      "A mobile companion that turns city walks into self-guided audio tours. Designed the end-to-end flow from onboarding to offline maps.",
    role: "Lead Designer",
    tools: ["Figma", "Lottie", "SwiftUI"],
    year: "2025",
    highlights: [
      "Grew daily active sessions 3.4× in the first quarter after launch",
      "Designed a route-builder that ships with one tap and no decisions",
      "Crafted the audio-card system used across 12 cities",
    ],
    accent: "#0066cc",
  },
  {
    slug: "ember",
    title: "Ember — Banking that breathes",
    category: "Fintech",
    summary:
      "A calm consumer banking app. Reduced friction at every step so money decisions feel smaller, not bigger.",
    role: "Product Designer",
    tools: ["Figma", "Origami", "React Native"],
    year: "2024",
    highlights: [
      "Cut transfer abandon-rate by 28%",
      "Designed the first interaction patterns for the Ember credit card",
      "Built a token system that survived three rebrands",
    ],
    accent: "#0066cc",
  },
  {
    slug: "sundial",
    title: "Sundial — A focus timer that doesn't shame you",
    category: "Indie / Side project",
    summary:
      "A pocket Pomodoro that resets gently. Shipped solo from idea to App Store in six weeks.",
    role: "Designer + Developer",
    tools: ["SwiftUI", "Figma", "TestFlight"],
    year: "2024",
    highlights: [
      "Featured by Apple in 'Apps We Love' (Sep 2024)",
      "Reached 40k downloads in 90 days without paid acquisition",
      "Designed and animated every glyph by hand",
    ],
    accent: "#0066cc",
  },
  {
    slug: "north",
    title: "North — Onboarding for enterprise security",
    category: "Enterprise SaaS",
    summary:
      "An admin console that taught CISOs to trust automation. Stripped 18 steps to 4.",
    role: "Senior Designer",
    tools: ["Figma", "Storybook", "TypeScript"],
    year: "2023",
    highlights: [
      "Time-to-first-policy fell from 23 minutes to under 4",
      "Designed a permissions model the legal team approved on first review",
      "Co-authored the company's first design principles doc",
    ],
    accent: "#0066cc",
  },
  {
    slug: "verse",
    title: "Verse — Voice notes for songwriters",
    category: "Creative tools",
    summary:
      "A capture-first iOS app for melodies that wake you at 3am. Sounds in, no setup, no friction.",
    role: "Lead Designer",
    tools: ["SwiftUI", "Figma", "AudioKit"],
    year: "2023",
    highlights: [
      "Average session length: 11 seconds — exactly the point",
      "Designed the waveform that became the brand",
      "Beta tested with 40 working musicians",
    ],
    accent: "#0066cc",
  },
  {
    slug: "loop",
    title: "Loop — A loyalty program for indie cafés",
    category: "Brand + Product",
    summary:
      "A QR-card system that small shops could set up in 5 minutes. Designed brand, app, and the printed kit.",
    role: "Designer",
    tools: ["Figma", "Adobe Illustrator", "Stripe"],
    year: "2022",
    highlights: [
      "Onboarded 220 cafés in 6 months",
      "Designed the physical card stock that became collectable",
      "Shipped the brand system and the merchant app in parallel",
    ],
    accent: "#0066cc",
  },
  {
    slug: "echo",
    title: "Echo — A reading app for the way you actually read",
    category: "Consumer / Reading",
    summary:
      "Bookshelves are messy. Echo gave readers a way to pick up where they left off across five books at once.",
    role: "Product Designer",
    tools: ["Figma", "React", "Realm"],
    year: "2022",
    highlights: [
      "Designed the 'momentum bar' shipped on every shelf",
      "Drove a 19% lift in weekly active reading",
      "Built the first dark mode that actually adapts to eink",
    ],
    accent: "#0066cc",
  },
];
