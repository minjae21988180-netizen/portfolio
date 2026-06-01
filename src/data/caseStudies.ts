/* ------------------------------------------------------------------
   Project content — single source of truth pulled from CONTENT.md.
   Structured into typed graphic-component blocks (per the BUILD NOTE)
   so the case studies render as DESIGNED data, not walls of prose.
-------------------------------------------------------------------*/

export type Prism = "research" | "product" | "graphic" | "personal";

/** thumbnail tint key (per PROJECT_BRIEF work-card spec) */
export type Tint = "t-prod" | "t-res" | "t-web" | "t-brand";

export type Block =
  | { type: "prose"; text: string }
  | { type: "list"; items: string[] }
  | { type: "metrics"; items: { num: string; lbl: string }[] }
  | { type: "bars"; groups: { label?: string; bars: { name: string; value: number; max?: number }[] }[]; note?: string }
  | { type: "themes"; rows: { theme: string; finding: string; quote: string }[] }
  | { type: "pairs"; items: { problem: string; fix: string }[] }
  | { type: "timeline"; steps: { label: string; meta: string }[] }
  | { type: "principles"; items: { icon: string; title: string; text: string }[] }
  | { type: "gallery"; items: string[] }
  | { type: "shot"; label: string }
  | { type: "pullquote"; text: string };

export type Section = {
  id: string;
  anchor: string;
  kicker: string;
  heading: string;
  blocks: Block[];
};

export type CaseStudy = {
  slug: string;
  prism: Prism;
  category: string; // breadcrumb label
  tint: Tint;
  // card
  title: string;
  teaser: string;
  tags: string[];
  // hero
  tagline: string;
  sub: string;
  role: string;
  duration: string;
  tools: string;
  // body
  sections: Section[];
};

export const PRISMS: { key: Prism; label: string }[] = [
  { key: "research", label: "UX Research" },
  { key: "product", label: "Product Design" },
  { key: "graphic", label: "Graphic Design" },
  { key: "personal", label: "Personal Project" },
];

export const caseStudies: CaseStudy[] = [
  /* ============================ PRISM 1 — UX RESEARCH ============================ */
  {
    slug: "vibrobp",
    prism: "research",
    category: "UX Research",
    tint: "t-res",
    title: "VibroBP",
    teaser:
      "I tested a cuffless, smartphone-only blood-pressure tool with adults aged 75–87 — and found the real barrier wasn't the tech, it was trust.",
    tags: ["UX Research", "Healthcare", "Accessibility", "Older Adults"],
    tagline: "Mobile Health for Older Adults",
    sub: "A research collaboration with Billions Lab at UC San Diego, exploring how smartphone sensors can measure blood pressure without external cuffs.",
    role: "Lead UX Researcher & Designer",
    duration: "Spring 2024",
    tools: "Notion · Miro · Excel · Figma · Otter.ai",
    sections: [
      {
        id: "overview",
        anchor: "Overview",
        kicker: "Overview",
        heading: "Measuring blood pressure with a smartphone",
        blocks: [
          {
            type: "prose",
            text: "VibroBP lets users measure blood pressure using only their smartphone camera and sensor — no external cuff. The goal was to make cardiovascular monitoring accessible, effortless, and inclusive for older adults, who often struggle with traditional devices. As Lead UX Researcher and Designer, I conducted a mixed-method usability study to evaluate how older adults learn, interact with, and trust this new form of mobile health technology.",
          },
          {
            type: "prose",
            text: "Testing happened at the Belmont Village Living Lab in La Jolla — a real senior-living facility operated through UC San Diego's Stein Institute for Research on Aging — so I could capture authentic behavior and accessibility needs rather than lab-clean results. The question that mattered most wasn't whether the sensor works. It was whether a 75-to-87-year-old could learn it on the first try and believe the number it gave them.",
          },
          { type: "shot", label: "[ testing at the Belmont Village Living Lab ]" },
        ],
      },
      {
        id: "problem",
        anchor: "Problem",
        kicker: "The Challenge",
        heading: "Four objectives shaped the study",
        blocks: [
          {
            type: "list",
            items: [
              "<b>Assess learning & completion</b> — how easily older adults can learn and complete a measurement using the tutorial.",
              "<b>Identify barriers</b> — the physical, cognitive, and emotional factors that affect usability and comfort.",
              "<b>Measure trust & confidence</b> — how much users believe in app-based readings.",
              "<b>Develop recommendations</b> — design changes that improve independence and inclusivity.",
            ],
          },
        ],
      },
      {
        id: "research",
        anchor: "Research",
        kicker: "Process & Methods",
        heading: "A three-phase mixed-method framework",
        blocks: [
          {
            type: "prose",
            text: "I designed the framework specifically for older-adult usability testing, combining direct observation, moderated testing, and quantitative validation.",
          },
          {
            type: "timeline",
            steps: [
              { label: "Phase 1 — Observation", meta: "Understand each participant's context and comfort with smartphones. <b>Activities:</b> pre-study interviews, environmental setup, initial guidance. <b>Deliverables:</b> observation notes, participant profiles." },
              { label: "Phase 2 — Evaluation", meta: "Evaluate usability and comprehension. <b>Activities:</b> in-person usability sessions with think-aloud protocol. <b>Deliverables:</b> task performance logs, recorded issues, survey results." },
              { label: "Phase 3 — Synthesis", meta: "Translate findings into actionable improvements. <b>Activities:</b> affinity mapping, quantitative analysis, insight clustering. <b>Deliverables:</b> insight themes, KPI dashboard, design recommendations." },
            ],
          },
          {
            type: "list",
            items: [
              "Moderated usability testing with 7 participants (ages 75–87)",
              "Think-aloud sessions + observation notes",
              "Post-test 12-item Likert survey (1–5 scale)",
              "Follow-up interviews for emotional and cognitive feedback",
            ],
          },
          {
            type: "prose",
            text: "Seven older adults across independent living, assisted living, and memory care were deliberately selected to reflect diverse physical and cognitive abilities. Facilitated by Dr. Edward Wang and Dr. Linda Moore, the familiar, comfortable setting reduced anxiety and encouraged honest feedback.",
          },
        ],
      },
      {
        id: "findings",
        anchor: "Findings",
        kicker: "Findings",
        heading: "Five recurring themes",
        blocks: [
          {
            type: "themes",
            rows: [
              { theme: "Comprehension & Onboarding", finding: "Couldn't complete the tutorial independently on the first try.", quote: "That was hard because I didn't know what color green I was looking for." },
              { theme: "Accessibility & Comfort", finding: "Tremors, arthritis, and hand fatigue affected pressure stability.", quote: "If my body is involved, it would be easier." },
              { theme: "Emotional Response", finding: "Frustrated at first, optimistic after a success.", quote: "I liked the reading, so I trusted it." },
              { theme: "Visual Clarity", finding: "Large text and strong contrast rated highly.", quote: "The screen was clear once I knew what to look for." },
              { theme: "Confidence & Independence", finding: "Confidence grew after repeated attempts.", quote: "This is much better than that big old cuff." },
            ],
          },
          {
            type: "bars",
            note: "n = 7 participants (ages 75–87) across independent living, assisted living, and memory care. Scale: 1 = Strongly Disagree · 5 = Strongly Agree.",
            groups: [
              { label: "Comprehension", bars: [
                { name: "The instructions were easy to follow", value: 3.7, max: 5 },
                { name: "I knew what to do during the test", value: 3.4, max: 5 },
              ]},
              { label: "Independence", bars: [
                { name: "I felt comfortable using the app without help", value: 2.7, max: 5 },
                { name: "I could use this app at home by myself", value: 3.4, max: 5 },
              ]},
              { label: "Visual Clarity", bars: [
                { name: "The text on the screen was easy to read", value: 4.3, max: 5 },
                { name: "The screen was clear and not confusing", value: 4.0, max: 5 },
              ]},
              { label: "Physical Comfort", bars: [
                { name: "It was easy to place my finger on the phone", value: 3.4, max: 5 },
                { name: "Pressing with my finger felt okay", value: 3.6, max: 5 },
                { name: "I placed my finger correctly on the camera", value: 3.3, max: 5 },
                { name: "Keeping my hand steady for the test was easy", value: 3.6, max: 5 },
              ]},
              { label: "Feedback & Trust", bars: [
                { name: "The app told me when the test started and ended", value: 3.3, max: 5 },
                { name: "I trust that the app gave me a correct result", value: 4.1, max: 5 },
              ]},
            ],
          },
          {
            type: "metrics",
            items: [
              { num: "3.3", lbl: "Tutorial comprehension (lowest) — points to a need for guided onboarding" },
              { num: "4.1", lbl: "Visual clarity (highest) — confirmed effective contrast & readability" },
              { num: "3.6", lbl: "Physical comfort — steady pressure hard with arthritis or tremors" },
            ],
          },
          {
            type: "prose",
            text: "The unlock: trust grew with success — emotional validation, not technical proof. The design problem was about engineering early success, not explaining the science.",
          },
        ],
      },
      {
        id: "recs",
        anchor: "Recommendations",
        kicker: "Recommendations",
        heading: "Five changes, each tracing back to a theme",
        blocks: [
          {
            type: "list",
            items: [
              "<b>Simplify onboarding</b> — animated, step-by-step guidance explaining finger alignment and feedback.",
              "<b>Clarify measurement feedback</b> — add a countdown and haptic cue for the start and end of readings.",
              "<b>Support comfort & accessibility</b> — a \"Comfort Mode\" with slower pacing, large text, and optional audio.",
              "<b>Reinforce trust</b> — display success confirmation and plain-language results.",
              "<b>Facilitate learning</b> — include a short practice mode before the actual test.",
            ],
          },
          {
            type: "prose",
            text: "These insights informed direct updates to the app's tutorial structure, color system, and feedback mechanism — enabling more independent and accessible use.",
          },
        ],
      },
      {
        id: "reflect",
        anchor: "Reflection",
        kicker: "Reflection",
        heading: "What I learned",
        blocks: [
          {
            type: "prose",
            text: "This study reminded me that usability in health technology is both cognitive and emotional. Older adults aren't resistant to innovation — they simply need design that respects their pace, clarity, and comfort. By blending direct observation, quantitative validation, and empathetic storytelling, I learned to transform a technically complex product into a trustworthy, human-centered experience.",
          },
          { type: "pullquote", text: "Designing VibroBP wasn't just about taking a reading — it was about helping users feel capable." },
        ],
      },
    ],
  },
  {
    slug: "dyna",
    prism: "research",
    category: "UX Research",
    tint: "t-res",
    title: "Dyna",
    teaser:
      "Can a phone replace a clinical dynamometer? I ran biomechanics studies with 24 people to find out if it's accurate — and if anyone actually trusts it.",
    tags: ["UX Research", "Biomechanics", "HealthTech"],
    tagline: "Smartphone Biomechanics",
    sub: "Researching and designing smartphone-based grip-strength testing through biomechanics studies, user testing, and data analysis at Billions Lab, UC San Diego.",
    role: "UX Researcher & Product Designer",
    duration: "Jan–Jun 2024 (6 months)",
    tools: "Figma · Python · Miro · Maze · Notion · Excel · Otter.ai",
    sections: [
      {
        id: "overview",
        anchor: "Overview",
        kicker: "Overview",
        heading: "Measuring grip strength with a smartphone",
        blocks: [
          {
            type: "prose",
            text: "Grip strength is one of the strongest predictors of overall health and longevity — but measuring it requires a bulky, clinical dynamometer most people will never touch. Dyna asked whether a smartphone alone could do the job. As UX Researcher and Product Designer, I worked across biomechanics studies, usability testing, and data analysis to answer two questions at once: can a phone measure grip accurately, and will people understand and trust the result?",
          },
          { type: "shot", label: "[ grip-strength testing across three locations ]" },
        ],
      },
      {
        id: "problem",
        anchor: "Problem",
        kicker: "The Problem",
        heading: "Accuracy and trust, at the same time",
        blocks: [
          {
            type: "prose",
            text: "A dynamometer is accurate but inaccessible — expensive, single-purpose, and confined to clinics. A phone is in everyone's pocket, but turning it into a reliable measurement tool means solving two problems simultaneously: the biomechanics of how people grip a phone, and the UX of making an unfamiliar measurement feel credible. Accuracy without trust is useless; trust without accuracy is dangerous.",
          },
        ],
      },
      {
        id: "research",
        anchor: "Research",
        kicker: "Process & Methods",
        heading: "Exploration → Evaluation → Synthesis",
        blocks: [
          {
            type: "timeline",
            steps: [
              { label: "Exploration", meta: "Biomechanics observation with <b>24 participants (ages 18–50)</b> across Mesa Rim, the UCSD Climbing Center, and Billions Lab." },
              { label: "Evaluation", meta: "Moderated usability sessions documenting three grip styles — <b>parallel, diagonal, and flat</b> — that affected reading accuracy and comfort." },
              { label: "Synthesis", meta: "Quantitative data analysis; 200+ qualitative notes clustered into five recurring themes; three behavioral personas built to ground design decisions." },
            ],
          },
        ],
      },
      {
        id: "findings",
        anchor: "Findings",
        kicker: "Findings",
        heading: "The concept resonated — execution slipped",
        blocks: [
          {
            type: "metrics",
            items: [
              { num: "42%", lbl: "completed the test unaided — onboarding was the bottleneck" },
              { num: "58%", lbl: "showed finger misalignment — a biomechanics + guidance problem" },
              { num: "50%", lbl: "understood the metrics shown — meaning wasn't landing" },
              { num: "67%", lbl: "struggled to read the graphs (75% could find their history)" },
              { num: "83%", lbl: "expressed long-term interest — the concept resonated" },
            ],
          },
          {
            type: "pullquote",
            text: "Like Apple Health for grip strength — the data should feel native, trustworthy, and effortless, not clinical.",
          },
        ],
      },
      {
        id: "recs",
        anchor: "Recommendations",
        kicker: "Recommendations",
        heading: "Closing the gap between sensor and belief",
        blocks: [
          {
            type: "list",
            items: [
              "<b>Countdown + haptic</b> cue to mark when a measurement begins and ends.",
              "<b>Grip calibration & comfort</b> guidance to correct the 58% misalignment rate.",
              "<b>Inline definitions & units</b> so the metric means something at first glance.",
              "<b>Redesigned graph filters</b> to fix the 67% who struggled to read trends.",
              "<b>Validation & confirmation copy</b> to build trust in an unfamiliar reading.",
            ],
          },
        ],
      },
      {
        id: "reflect",
        anchor: "Reflection",
        kicker: "Reflection",
        heading: "Designing for belief",
        blocks: [
          {
            type: "prose",
            text: "Dyna taught me to hold two lenses at once — the rigor of biomechanics and the empathy of UX. The most accurate sensor in the world fails if a person can't grip the phone right or doesn't trust what it tells them. Designing for measurement means designing for belief.",
          },
        ],
      },
    ],
  },

  /* ============================ PRISM 2 — PRODUCT DESIGN ============================ */
  {
    slug: "cyberhaven",
    prism: "product",
    category: "Product Design",
    tint: "t-prod",
    title: "Cyberhaven",
    teaser:
      "A powerful enterprise security product buried under friction. I audited three core surfaces and turned six recurring pain points into concrete design fixes.",
    tags: ["UX Research & Design", "Cybersecurity", "Design System"],
    tagline: "Enterprise Product Audit",
    sub: "A full product audit of an enterprise data-protection platform, establishing a foundational baseline for a future design system.",
    role: "Product Designer Intern",
    duration: "Feb–May 2025",
    tools: "Figma · Browser DevTools",
    sections: [
      {
        id: "overview",
        anchor: "Overview",
        kicker: "Overview",
        heading: "Power was the problem",
        blocks: [
          {
            type: "prose",
            text: "Cyberhaven is a powerful data-protection platform — and that power was the problem. The product could do almost anything, but every capability was buried under friction, unclear language, and hard-to-follow flows. My goal was to thoroughly understand the current product experience and establish a foundational baseline for a future design system.",
          },
          {
            type: "pullquote",
            text: "A functionality-rich product, buried in friction, unclear language, and hard-to-follow flows.",
          },
        ],
      },
      {
        id: "problem",
        anchor: "Problem",
        kicker: "The Problem",
        heading: "Five issues defined the product identity",
        blocks: [
          {
            type: "list",
            items: [
              "Feature-rich but hard to navigate",
              "Unintuitive language",
              "Unclear user flows",
              "High friction for simple tasks",
              "Limited collaboration support",
            ],
          },
          {
            type: "prose",
            text: "The audit needed to move past surface-level visual inconsistencies and diagnose why the experience felt heavy.",
          },
        ],
      },
      {
        id: "process",
        anchor: "Process",
        kicker: "Process",
        heading: "From component capture to flow logic",
        blocks: [
          {
            type: "prose",
            text: "I started with an Atomic Design component capture — cataloguing UI across the product and inspecting styles through browser DevTools and the MUI codebase. But I quickly pivoted: the real problem wasn't visual inconsistency, it was the whole product's structure. So I shifted to building component-level and page-level Information Architecture to analyze flow and logic, then ran a persona-based evaluation — assigning a primary persona to each page and walking realistic, role-specific tasks across three core surfaces: Risk Overview, Insider Risk, and Incidents.",
          },
          { type: "shot", label: "[ information architecture + persona task maps ]" },
        ],
      },
      {
        id: "painpoints",
        anchor: "Pain Points",
        kicker: "Pain Points → Fixes",
        heading: "Six recurring frictions, six concrete fixes",
        blocks: [
          {
            type: "pairs",
            items: [
              { problem: "Source/dataset & destination/policy logic is unclear.", fix: "Rename buttons to \"Search Events by Source / Destination\" and change \"Convert to\" to \"Save as +\" so users feel they're creating something new." },
              { problem: "High friction reaching the Events Panel.", fix: "When a filter is focused or results are few, preview matched events inline below the selected policy — each row clickable straight into the Events Panel." },
              { problem: "No clear escalation CTA.", fix: "Add a \"See more details\" button and make blocked attempts clickable, leading directly to the related Incident." },
              { problem: "Inconsistent button behavior & naming.", fix: "Standardize interaction (modals vs. dropdowns) and align naming across dropdowns (\"Source\" vs. \"Location\")." },
              { problem: "Weak visual clarity in the Destination view.", fix: "The Source view shows a clear, color-coded event distribution; the Destination view collapses into one undifferentiated circle. Match the two." },
              { problem: "Hidden condition-builder functionality.", fix: "Surface \"add condition,\" clarify \"delete vs. delete all,\" and turn the case-sensitive toggle into a real, legible button." },
            ],
          },
        ],
      },
      {
        id: "outcome",
        anchor: "Outcome",
        kicker: "Outcome",
        heading: "A north star for the design system",
        blocks: [
          {
            type: "prose",
            text: "The audit produced a per-surface map of findings and concrete suggestions, plus a clear design north star — Designing for Clarity, Efficiency, and Continuity. The recurring fixes rolled into five principles:",
          },
          {
            type: "principles",
            items: [
              { icon: "✦", title: "Surface", text: "Surface hidden features." },
              { icon: "→", title: "Guide", text: "Guide users with clear flows." },
              { icon: "≡", title: "Standardize", text: "Standardize inconsistent interactions." },
              { icon: "◇", title: "Simplify", text: "Simplify high-friction tasks." },
              { icon: "◎", title: "Collaborate", text: "Enable team collaboration through shared context." },
            ],
          },
          {
            type: "prose",
            text: "Cyberhaven taught me that auditing a complex product isn't about cataloguing what's wrong — it's about finding the pattern behind the friction. Once I stopped chasing visual inconsistencies and started mapping flows and naming logic, the same handful of root causes explained almost every pain point.",
          },
        ],
      },
    ],
  },
  {
    slug: "geisel-kiosk",
    prism: "product",
    category: "Product Design",
    tint: "t-prod",
    title: "Geisel Library Kiosk",
    teaser:
      "Students wasted time hunting for open study rooms. I designed a real-time kiosk that cut search time 65% — and learned to remove the feature everyone expected.",
    tags: ["UX Research & Design", "Kiosk Design", "Wayfinding"],
    tagline: "Real-Time Wayfinding",
    sub: "Redesigning the wayfinding experience for UC San Diego's iconic library through an interactive kiosk that surfaces real-time room availability.",
    role: "Product Designer, UX Researcher",
    duration: "Jan–Mar 2023 (3 months)",
    tools: "Figma · Adobe Suite · PowerPoint · Slack",
    sections: [
      {
        id: "overview",
        anchor: "Overview",
        kicker: "Overview",
        heading: "Awareness and accessibility",
        blocks: [
          {
            type: "prose",
            text: "Geisel Library serves thousands of UC San Diego students daily, but its study-room systems were fragmented — students wasted time searching multiple floors with no real-time information. We designed an interactive directory kiosk that shows live room availability, identifies rooms reserved but sitting empty, and guides students to them. The key insight that shaped everything: the system needed to improve both awareness (what's open) and accessibility (how to get there).",
          },
          { type: "shot", label: "[ kiosk in the library environment ]" },
        ],
      },
      {
        id: "problem",
        anchor: "Problem",
        kicker: "The Problem",
        heading: "Fragmented, outdated, hard to navigate",
        blocks: [
          {
            type: "prose",
            text: "Students wasted time searching floors without direction, rooms sat reserved-but-unused, and information was inconsistent or outdated. The challenge spanned both a digital interface and its integration into a physical, high-traffic environment used by diverse student groups.",
          },
        ],
      },
      {
        id: "research",
        anchor: "Research",
        kicker: "Research",
        heading: "The findings reshaped our direction",
        blocks: [
          {
            type: "prose",
            text: "We combined field observation, contextual inquiry, and 8 student interviews (ages 18–25), plus task-based storyboard walkthroughs and low-fi paper prototype testing.",
          },
          {
            type: "themes",
            rows: [
              { theme: "Kiosk booking felt redundant", finding: "Students rely on mobile reservations. → Focus the kiosk on navigation, not booking.", quote: "I'd never use a kiosk to reserve a room when I can just use my phone." },
              { theme: "They wanted live availability", finding: "Especially reserved-but-empty rooms. → Integrate live occupancy + clear visual states.", quote: "It'd be great if I could see which rooms are actually being used right now." },
              { theme: "Cross-floor navigation confused", finding: "→ Add interactive maps + location-based guidance.", quote: "I waste so much time looking for rooms on the wrong floor." },
              { theme: "They wanted minimal interaction", finding: "→ Prioritize one-step interactions.", quote: "I just want to tap once and see what's open." },
            ],
          },
          {
            type: "prose",
            text: "The single most important decision came from that first quote: we removed booking from the kiosk entirely. Students already book on their phones — duplicating it would've added friction, not removed it.",
          },
        ],
      },
      {
        id: "process",
        anchor: "Process",
        kicker: "Process",
        heading: "From paper to high-fidelity",
        blocks: [
          {
            type: "prose",
            text: "We brainstormed mobile-only, map-based web, and physical kiosk approaches before validating that a kiosk best served walk-in users already in the library. Storyboards for two personas (Trisha and Aiden) mapped the frustration of arriving to all-booked-but-empty rooms and the relief of a clear visual directory with mobile handoff. We moved from low-fi paper wireframes to a high-fidelity Figma prototype with color-coded room states, floor navigation, and a \"Send to Phone\" handoff — all in a minimalist blue-and-white palette aligned to Geisel's environment.",
          },
        ],
      },
      {
        id: "outcome",
        anchor: "Outcome",
        kicker: "Testing & Outcome",
        heading: "Two rounds of usability testing",
        blocks: [
          {
            type: "metrics",
            items: [
              { num: "87%", lbl: "task success rate finding an available room" },
              { num: "65%", lbl: "reduction in search time vs. the current process" },
              { num: "100%", lbl: "preferred the kiosk over the existing web system" },
            ],
          },
          {
            type: "prose",
            text: "Refinements followed: equipment icons (whiteboard, monitor, capacity), reduced navigation steps, and enlarged touch targets for accessibility. The final system: a real-time directory of available/occupied/reserved-but-unused rooms, smart filtering by capacity/floor/amenities, an interactive in-library map, QR mobile handoff, and an accessible glance-and-go layout in a slim vertical form factor.",
          },
          {
            type: "pullquote",
            text: "The best UX decision was a subtraction — removing booking, the feature everyone assumed a kiosk needed.",
          },
        ],
      },
    ],
  },
  {
    slug: "geisel-reservation",
    prism: "product",
    category: "Product Design",
    tint: "t-web",
    title: "Geisel Reservation Redesign",
    teaser:
      "The kiosk project exposed a deeper problem: the reservation website itself. So I redesigned it — drag-to-select time, at-a-glance room info, real error prevention.",
    tags: ["UX Design", "Website Design"],
    tagline: "Reservation System Redesign",
    sub: "A comprehensive redesign of Geisel's reservation site — real-time room updates, an interactive map, and a mobile-friendly interface.",
    role: "Product Designer, UX Researcher",
    duration: "Jan–Mar 2023",
    tools: "Figma · Adobe Suite",
    sections: [
      {
        id: "overview",
        anchor: "Overview",
        kicker: "Overview",
        heading: "A deeper problem under the kiosk",
        blocks: [
          {
            type: "prose",
            text: "This project grew directly out of the Geisel kiosk work. While solving navigation, I kept running into a deeper issue: the reservation website itself was full of friction. So I initiated a comprehensive redesign, following a 4D process — Discover, Define, Develop, Deliver — to rebuild the booking experience around how students and staff actually use it.",
          },
        ],
      },
      {
        id: "problem",
        anchor: "Problem",
        kicker: "The Problem",
        heading: "Friction at every step",
        blocks: [
          {
            type: "list",
            items: [
              "A counter-intuitive time-selection method that produced frequent booking errors",
              "Room details (capacity, monitors, accessibility) lived on separate pages, raising cognitive load",
              "No error prevention or feedback when selections exceeded availability",
              "Frustration with a 240-minute daily booking cap",
              "Canceling a selected slot was so awkward people resorted to refreshing the whole page",
            ],
          },
        ],
      },
      {
        id: "process",
        anchor: "Process",
        kicker: "Process",
        heading: "Seven interviews, four drafts",
        blocks: [
          {
            type: "prose",
            text: "I conducted 7 interviews paired with task-based usability testing — three realistic reservation tasks (a monitored video booking, a recurring group session, and a 4-hour extended booking) — recording cursor movement and think-aloud reasoning over Zoom. A comparable analysis chart surfaced patterns: varied time-selection styles causing errors, difficulty finding capacity and features, overlooked room amenities, and confusion distinguishing unavailable slots. From there I iterated through four drafts of low-fidelity wireframes into a high-fidelity design.",
          },
          { type: "shot", label: "[ low-fi → high-fi reservation flow ]" },
        ],
      },
      {
        id: "solutions",
        anchor: "Solutions",
        kicker: "Solutions",
        heading: "Five changes that removed the friction",
        blocks: [
          {
            type: "list",
            items: [
              "<b>Simplified reservation overview</b> — all booking details visible at a glance, no page-hopping.",
              "<b>Drag-to-select time</b> — an intuitive dragging interaction replacing the old method, with unavailable slots removed to prevent confusion.",
              "<b>At-a-glance room info</b> — pop-up screens with seating, monitors, and accessibility next to each room, plus custom feature icons.",
              "<b>Refined filters</b> — clean sorting by availability, capacity, and equipment.",
              "<b>\"My Booking\" section</b> — intuitive access to past and upcoming reservations.",
            ],
          },
        ],
      },
      {
        id: "reflect",
        anchor: "Reflection",
        kicker: "Reflection",
        heading: "Test early, test often",
        blocks: [
          {
            type: "prose",
            text: "This redesign deepened my appreciation for user-centered, iterative design. Every user navigated the system differently, so understanding their distinct pain points — especially around time selection and feature visibility — was essential. It reinforced how critical it is to test early and often, and to balance aesthetic appeal with genuine usability and accessibility.",
          },
        ],
      },
    ],
  },

  /* ============================ PRISM 3 — GRAPHIC DESIGN ============================ */
  {
    slug: "ktown-bulgogi",
    prism: "graphic",
    category: "Graphic Design",
    tint: "t-brand",
    title: "K-Town Bulgogi",
    teaser:
      "Pop-art energy meets Korean heritage — a full brand system built to stop the scroll, with logo, motion, catalog, and original music I composed myself.",
    tags: ["Branding", "Marketing Design", "Motion", "Social Media"],
    tagline: "Pop-Art Meets Korean Heritage",
    sub: "A complete brand identity and campaign system for a Koreatown-inspired food brand — bold flavor, fast satisfaction, playful energy.",
    role: "Brand Designer, Graphic Designer, Motion Designer",
    duration: "Jun–Oct 2025",
    tools: "Adobe Suite · Figma · After Effects",
    sections: [
      {
        id: "overview",
        anchor: "Overview",
        kicker: "Overview",
        heading: "Bold flavor, playful energy",
        blocks: [
          {
            type: "prose",
            text: "K-Town Bulgogi is a Koreatown-inspired food brand built around bold flavor, fast satisfaction, and playful energy. I developed a cohesive brand direction that scales across social, motion, and sales assets while staying instantly recognizable. The core idea: a pop-art visual language anchored by Korean cultural cues — high impact and speed for modern social marketing, with heritage that keeps the brand rooted rather than generic.",
          },
          { type: "shot", label: "[ brand hero / key art ]" },
        ],
      },
      {
        id: "rationale",
        anchor: "Rationale",
        kicker: "Design Rationale",
        heading: "Heritage as structure, not decoration",
        blocks: [
          {
            type: "prose",
            text: "Pop art is built for immediacy — bold shapes, high contrast, instant comprehension at a glance, exactly what a food brand needs for shelf and feed presence. But rather than using Korean elements as decoration, I treated them as structure and meaning.",
          },
          {
            type: "principles",
            items: [
              { icon: "☯", title: "Taegeuk motif", text: "Taegeuk colors and the circular motif as a repeatable brand icon." },
              { icon: "⌂", title: "Architectural texture", text: "Traditional patterns and curved-roof silhouettes for subtle texture." },
              { icon: "💬", title: "Local voice", text: "Hangul callouts and speech-bubble copy moments — playful and local." },
            ],
          },
          {
            type: "prose",
            text: "The result reads modern and energetic but unmistakably Korean — performing in social while communicating heritage legibly and respectfully.",
          },
        ],
      },
      {
        id: "system",
        anchor: "Brand System",
        kicker: "Brand System",
        heading: "A system, not one-off graphics",
        blocks: [
          {
            type: "prose",
            text: "I approached K-Town as a system — defining repeatable cues that apply quickly and consistently across campaigns: bold typography that holds up in motion and at small sizes, comic-punch shapes and callouts for energy, a limited color set for fast recognition, and cultural motifs as structural elements. Designed to scale across posters and ads, short-form video and motion templates, catalog pages, and week-to-week social content.",
          },
          {
            type: "prose",
            text: "The existing logo grabbed attention but read mainly as a loud graphic. I explored carrying more brand meaning through the mark while keeping its punch — a heritage-forward variation leaning into Taegeuk and pattern cues, plus two character-driven concepts (a Grandpa and a Grandma mark) that give the brand a face and enable seasonal variations.",
          },
        ],
      },
      {
        id: "deliverables",
        anchor: "Deliverables",
        kicker: "Deliverables",
        heading: "Static, motion, and sound",
        blocks: [
          {
            type: "gallery",
            items: ["Campaign posters", "Motion graphics", "Original music", "Product catalog", "Social templates", "Logo system"],
          },
          {
            type: "list",
            items: [
              "<b>Campaign posters</b> — one consistent layout logic so new promotions ship fast: clear hierarchy, cohesive framing, room for Korean-language accents.",
              "<b>Motion graphics</b> — short formats with a fast first-second hook, kinetic type, sound-off-first design, optimized for vertical social.",
              "<b>Original music</b> — I composed original tracks so motion and sound feel unified and branded, adding an ownable layer.",
              "<b>Product catalog</b> — scannable, sales-clear layouts with controlled use of brand shapes.",
              "<b>Social templates</b> — consistent week-to-week posts.",
            ],
          },
        ],
      },
      {
        id: "reflect",
        anchor: "Reflection",
        kicker: "Reflection",
        heading: "Building systems that travel",
        blocks: [
          {
            type: "prose",
            text: "This work highlights my strength in building brand systems that translate across static design, motion, and content production. I focus on clarity, consistency, and speed while still designing for strong personality and culturally rooted storytelling.",
          },
        ],
      },
    ],
  },
  {
    slug: "mercuryhealth",
    prism: "graphic",
    category: "Graphic Design",
    tint: "t-brand",
    title: "MercuryHealth",
    teaser:
      "How do you make AI healthcare tech feel human? I built the brand and grew social following 275% in six months.",
    tags: ["Marketing Design", "HealthTech", "Brand Strategy", "Social Media"],
    tagline: "Humanizing Healthcare Tech",
    sub: "Creating compelling visual content and marketing for a healthcare-tech company using AI sensors to enhance safety and care for loved ones.",
    role: "Marketing Designer & Brand Strategist",
    duration: "Aug 2024–Present",
    tools: "Figma · Adobe Suite · Canva · After Effects",
    sections: [
      {
        id: "overview",
        anchor: "Overview",
        kicker: "Overview",
        heading: "Advanced tech, human heart",
        blocks: [
          {
            type: "prose",
            text: "MercuryHealth uses advanced AI sensors to enhance safety and care for elderly loved ones. The company needed a marketing presence that could communicate complex technology while staying empathetic and human-centered. As lead marketing designer, I developed the visual systems, social campaigns, and collateral that positioned MercuryHealth as both technologically advanced and deeply caring.",
          },
          {
            type: "pullquote",
            text: "How might we communicate advanced AI healthcare technology in a way that feels approachable, trustworthy, and emotionally resonant with families?",
          },
        ],
      },
      {
        id: "rationale",
        anchor: "Rationale",
        kicker: "Brand Strategy",
        heading: "Three core principles",
        blocks: [
          {
            type: "principles",
            items: [
              { icon: "♡", title: "Empathetic & Human", text: "Emotional connection and family values over cold specs — warm palettes, real family photography, compassionate messaging." },
              { icon: "✓", title: "Credible & Professional", text: "Trust and expertise in a healthcare context — clean layouts, data viz, certification badges, expert testimonials." },
              { icon: "◐", title: "Accessible & Clear", text: "Complex technology made understandable — simple iconography, clear hierarchy, plain language, visual metaphors." },
            ],
          },
          {
            type: "prose",
            text: "Healthcare meets warmth: teal primary for trust and care, warm coral accents for humanity, soft neutrals for accessibility, and gradient overlays for modernity. Typography pairs Inter for body clarity with Space Grotesk for headlines, backed by a custom icon library and photography guidelines.",
          },
        ],
      },
      {
        id: "deliverables",
        anchor: "Deliverables",
        kicker: "Deliverables",
        heading: "A comprehensive marketing system",
        blocks: [
          {
            type: "gallery",
            items: ["Social content", "Brochures & decks", "Trade-show materials", "Landing pages", "Ad creative", "Infographics", "Icon library", "Illustration set"],
          },
        ],
      },
      {
        id: "outcome",
        anchor: "Impact",
        kicker: "Impact",
        heading: "The numbers",
        blocks: [
          {
            type: "metrics",
            items: [
              { num: "275%", lbl: "social media growth in 6 months" },
              { num: "4.5%", lbl: "average engagement rate (above benchmark)" },
              { num: "85+", lbl: "marketing assets created" },
              { num: "12K+", lbl: "website visitors from campaigns" },
            ],
          },
          {
            type: "prose",
            text: "In health-tech, connecting emotionally with families' concerns matters more than technical specs alone. A cohesive visual system reinforced credibility, authentic stories outperformed polished corporate messaging, and clear communication was non-negotiable for reaching audiences across age and technical literacy.",
          },
        ],
      },
    ],
  },
  {
    slug: "sixth-avenue",
    prism: "graphic",
    category: "Graphic Design",
    tint: "t-brand",
    title: "Sixth Avenue / rok",
    teaser:
      "Sole creative lead (1 of 2) for six Korean F&B brands — including rok, ranked LA's #1 matcha café.",
    tags: ["In-House Graphic Design", "Brand Identity", "Packaging", "Campaigns"],
    tagline: "Multi-Brand Design Leadership",
    sub: "Owning end-to-end creative for six Korean restaurant brands in Los Angeles — concept to print-ready file, no handoffs.",
    role: "In-House Graphic Designer (team of 2)",
    duration: "Nov 2025–Present",
    tools: "Adobe Suite · Figma · AI-assisted creation",
    sections: [
      {
        id: "overview",
        anchor: "Overview",
        kicker: "Overview",
        heading: "Six brands, no handoffs",
        blocks: [
          {
            type: "prose",
            text: "As one of two designers at Sixth Avenue Hospitality Group, I own the full creative pipeline for six Korean F&B brands: rok, Hamjipark, Moohan, Lasung SDB, Origin, and Lasung House. When a promotion launches, I take it from concept and copywriting through art direction, production, and final print-ready files — no handoffs in between.",
          },
        ],
      },
      {
        id: "rationale",
        anchor: "Rationale",
        kicker: "Rationale",
        heading: "Personality on top, system below",
        blocks: [
          {
            type: "prose",
            text: "A matcha café and a KBBQ house should never look related — but with a two-person team, neither can start from scratch each time. So I design two things at once: a distinct identity per brand, and a repeatable production toolkit underneath it.",
          },
        ],
      },
      {
        id: "system",
        anchor: "Brand System",
        kicker: "Brand System — rok (featured)",
        heading: "LA's #1-ranked matcha café",
        blocks: [
          {
            type: "prose",
            text: "rok is LA's #1-ranked matcha café, built on ceremonial-grade Uji matcha. I anchored the identity in a tight, premium palette — Olive Leaf (#3E4029) and Creme (#F1EDDB) — and a stacked wordmark that doubles as a pattern. Around it: a full brand story system (snapshot, vision, sourcing narrative), complete guidelines, and a calm, contemporary visual language that signals quality without shouting for it.",
          },
          { type: "shot", label: "[ rok identity & packaging system ]" },
        ],
      },
      {
        id: "deliverables",
        anchor: "Applications",
        kicker: "Applications",
        heading: "Packaging, campaigns, motion",
        blocks: [
          {
            type: "gallery",
            items: ["Cups & carriers", "Totes & merch", "Hoodies & caps", "\"#1 Best Matcha\" poster", "rok × Girls Inc. drop", "Drink-sticker set", "AI marketing video", "Hamjipark poster series"],
          },
          {
            type: "list",
            items: [
              "<b>Packaging & merch</b> — cups, carriers, totes, hoodies, caps, mugs, ceramic plates.",
              "<b>Campaigns</b> — the \"#1 Best Matcha\" poster, a rok × Girls Inc. charity drink drop, seasonal launches.",
              "<b>Illustration & motion</b> — a full drink-sticker set across the menu + an AI-assisted marketing video.",
              "<b>Beyond rok</b> — a four-part illustrated poster series for Hamjipark (Minhwa, Retro Comic, Traditional, Vintage Folk) and a cocktails / banchan / Moohan Maid campaign system for Moohan.",
            ],
          },
        ],
      },
      {
        id: "reflect",
        anchor: "Reflection",
        kicker: "Reflection",
        heading: "Reuse without flattening personality",
        blocks: [
          {
            type: "prose",
            text: "Running six identities at once taught me to design for reuse without flattening personality — and to think production-first from the very first sketch, because I'm the one preparing every final file.",
          },
        ],
      },
    ],
  },
  {
    slug: "thurgood-marshall",
    prism: "graphic",
    category: "Graphic Design",
    tint: "t-brand",
    title: "Thurgood Marshall College",
    teaser:
      "My first time leading branding — engaging event designs for one of UC San Diego's biggest college events, from logo to physical merch.",
    tags: ["Graphic Design", "Event Branding", "Illustration", "Merchandise"],
    tagline: "Event Branding & Illustration",
    sub: "Engaging event designs to elevate student experiences and community connection across one of UC San Diego's seven undergraduate colleges.",
    role: "Graphic Designer (team of 2)",
    duration: "Jun 2023–Jun 2024",
    tools: "Figma · Adobe Suite · Procreate · Slack",
    sections: [
      {
        id: "overview",
        anchor: "Overview",
        kicker: "Overview",
        heading: "Design for community connection",
        blocks: [
          {
            type: "prose",
            text: "Thurgood Marshall College — known for its focus on social justice, civic responsibility, and academic excellence — hosts events and programs throughout the year. I led the design process for event marketing materials: creating brand-aligned visuals, collaborating across departments for cohesive branding, and participating in critiques for continuous improvement.",
          },
        ],
      },
      {
        id: "system",
        anchor: "Selected Work",
        kicker: "Selected Work",
        heading: "Three event systems",
        blocks: [
          {
            type: "list",
            items: [
              "<b>Marshallpalooza</b> — a free, student-planned carnival and one of the college's biggest annual events. With two designers I built the full system: a central Ferris-wheel character holding carnival items, bright pastel colors (pink, purple, blue), bold playful typography, and a neon effect on key activities (\"RIDES, FOOD, PERFORMANCES, PRIZES\") — extended into Instagram posts and reels, stickers, a disco-ball keychain, and a T-shirt.",
              "<b>Cultural Celebration</b> — celebrating the Marshall community's diversity through food, dance, music, and art (Holi, Lunar New Year, St. Patrick's Day, Carnival). I focused on the logo and stickers, extended into Instagram posts, T-shirts, and tote-bag mockups.",
              "<b>Graduation Event</b> — a bucket-list sticker series for UCSD's 2024 graduates, with stickers differentiated by college logo.",
            ],
          },
          {
            type: "gallery",
            items: ["Marshallpalooza key art", "Instagram reels", "Disco-ball keychain", "Event T-shirt", "Cultural Celebration logo", "Graduation stickers"],
          },
        ],
      },
      {
        id: "reflect",
        anchor: "Reflection",
        kicker: "Reflection",
        heading: "My first time leading branding",
        blocks: [
          {
            type: "prose",
            text: "This role was my first time leading branding, and it shaped how I work. I learned to build a cohesive, consistent identity across many deliverables; to manage the high cognitive load of taking design from concept to execution; to communicate clearly when translating digital designs into physical outputs; and to manage time and generate ideas fast under tight deadlines.",
          },
        ],
      },
    ],
  },
];

export const caseStudiesBySlug = Object.fromEntries(
  caseStudies.map((c) => [c.slug, c])
) as Record<string, CaseStudy>;
