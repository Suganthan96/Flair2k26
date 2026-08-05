// Mock/placeholder content for Flair 2k26. Swap with real content later.

export const siteConfig = {
  name: "FLAIR 2K26",
  tagline: "Assemble. Innovate. Elevate.",
  dates: "Jan 22–24, 2027",
  eventStart: "2027-01-22T09:00:00",
  eventEnd: "2027-01-24T18:00:00",
  venue: "LICET, Chennai",
  registerUrl: "#register",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Sponsor", href: "#sponsors" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { label: "Participants", value: "500+" },
  { label: "Events", value: "20+" },
  { label: "Prize Pool", value: "₹1L+" },
  { label: "Colleges", value: "15+" },
];

export const aboutCopy =
  "Flair 2k26 is LICET's flagship technical symposium, bringing together the brightest minds from colleges across the region for three days of competition, collaboration, and innovation. From high-stakes hackathons to rapid-fire quizzes, every event is built to test your skills and push your limits. Join the ranks — the mission starts now.";

// Shared across every event's detail page — fest-wide rules rather than
// something that varies per event.
export const commonGuidelines: string[] = [
  "Only students with a valid college ID are eligible to participate.",
  "Teams must report to the venue at least 15 minutes before the scheduled time.",
  "Participants are expected to maintain discipline and follow the organizers' instructions at all times.",
  "Any form of malpractice or unfair conduct will lead to immediate disqualification.",
  "The judges' decision will be final and binding — no further discussion will be entertained.",
  "Mobile phones and personal electronic devices are not permitted during the event unless explicitly stated otherwise.",
  "Certificates will be issued only to registered participants who complete the event.",
];

export type EventQueryContact = { name: string; phone: string };

export const events: {
  id: string;
  title: string;
  icon: string;
  description: string;
  /** Fuller write-up shown in the event detail modal — distinct from the
   * short teaser `description` shown on the promo card. */
  longDescription: string;
  teamSize: string;
  time: string;
  venue: string;
  organizers: string;
  queries: EventQueryContact[];
  /** When set, the promo card renders this as a full-bleed background
   * image instead of the usual gradient + icon panel. */
  backgroundImage?: string;
  /** CSS object-position for the background image crop; defaults to "center". */
  backgroundPosition?: string;
  /** Full event poster, shown in the detail modal in place of the plain
   * gradient + icon panel when present. */
  posterImage?: string;
  /** Per-event rules PDF, opened in an in-page viewer from the detail modal. */
  guidelinesPdf?: string;
  lumaEventId: string;
}[] = [
    {
      id: "AI Prompting",
      title: "Prompt with Jarvis",
      icon: "Code2",
      description: "24-hour build sprint to ship a working prototype from scratch.",
      longDescription:
        "Talk to the tech.Control the output. Step up solo to see the commands AI best.Survive the fast text , image , and multiprompt challenges, then build a winning presentation using nothing but raw prompt engineering..",
      teamSize: "2-4",
      time: "1:15 PM - 2:45 PM",
      venue: "A21",
      organizers: "Fatima Theresa, Sharini",
      queries: [
        { name: "Zenith Joshua", phone: "+91 74483 43632" },
        { name: "Richan", phone: "+91 91502 48398" },
      ],
      lumaEventId: "evt-80hU40SG5wXqj3V",
      backgroundImage: "/assets/age of ultron.png",
      posterImage: "/Event-Posters/AI Prompting  [Prompt with Jarvis].png",
      guidelinesPdf: "/Guidelines/AI Prompting.pdf.pdf",
    },
    {
      id: "paper-presentation",
      title: "S.H.I.E.L.D's Archive",
      icon: "FileText",
      description: "Present original research and ideas to a panel of expert judges.",
      longDescription:
        "Technical paper presentation is a platform for ambitious students to present thier ideas of innovation as teams in form of paper,poster or ppt.",
      teamSize: "1-3",
      time: "10:15 AM - 11:30 AM",
      venue: "H23, J14",
      organizers: "Krithik, Sherin",
      queries: [
        { name: "Zenith Joshua", phone: "+91 74483 43632" },
        { name: "Richan", phone: "+91 91502 48398" },
      ],
      lumaEventId: "evt-TRewZ5zsA2Xb8fO",
      backgroundImage: "/assets/sheild's archieve.jpg",
      // "top" alone cropped right at the hairline on this very wide/short
      // tile — Tony and Steve's heads sit roughly 15-30% down the source
      // image, so nudging the focal point down that far keeps them in frame.
      backgroundPosition: "center 20%",
      posterImage: "/Event-Posters/Technical Research Presentation.png",
      guidelinesPdf: "/Guidelines/Technical Research Presentation rules.docx.pdf",
    },
    {
      // id kept as-is: EventsGrid.tsx's TILE_CONFIG/HOVER_VIDEO/ENTRANCE_OFFSET
      // maps (and the bento grid's tile-order math) are keyed off this exact
      // string — renaming it would silently drop the tile back to a default
      // 1x1 span and lose its hover video.
      id: "meme-creation",
      title: "Infinity Interface",
      icon: "LayoutTemplate",
      description: "Design an interface so seamless it feels infinite — against the clock.",
      longDescription:
        "One brief. One canvas. Infinite possibilities. Design a clean, intuitive interface for a given problem statement — wireframes, flow, and a polished final screen. Speed matters, but so does the experience you craft.",
      teamSize: "1",
      time: "1:15 PM – 2:45 PM",
      venue: "H23",
      organizers: "MAGA DEVI P V, Abinesh Vibin",
      queries: [
        { name: "Zenith Joshua", phone: "+91 74483 43632" },
        { name: "Richan", phone: "+91 91502 48398" },
      ],
      lumaEventId: "evt-ziwcw16DWyGLOn2",
      // TODO: still the old meme-creation photo/hover-video (see HOVER_VIDEO
      // in EventsGrid.tsx) — swap both once UI/UX-themed art is available.
      backgroundImage: "/assets/i can meme this all day.jpg",
      backgroundPosition: "top",
      posterImage: "/Event-Posters/UI UX.png",
      guidelinesPdf: "/Guidelines/UI UX Guidelines.pdf",
    },
    {
      id: "Code-Debugging",
      title: "Debuggers Assemble",
      icon: "Bot",
      description: "Design and race autonomous bots through a timed obstacle track.",
      longDescription:
        "Two coders , One broken script. Zero room for error .Smash 12 rapid fire bugs in Round 1 , then pass the keyboard mid-challenge in a brutal Round to relay. clear the test cases and assemble the perfect code.",
      teamSize: "1-2",
      time: "10:15 AM – 12:30 PM",
      venue: "A22",
      organizers: "Keerthivasan, Antony Joshua",
      queries: [
        { name: "Zenith Joshua", phone: "+91 74483 43632" },
        { name: "Richan", phone: "+91 91502 48398" },
      ],
      lumaEventId: "evt-0DlblubojnaeKj2",
      backgroundImage: "/assets/Debuggers-assemble.jpeg",
      posterImage: "/Event-Posters/Code Debugging  [DEBUGGERS ASSEMBLE].png",
      guidelinesPdf: "/Guidelines/DEBUGGERS ASSEMBLE.pdf",
    },
    {
      id: "bussiness-pitch",
      title: "SUSTAINOVATE 2k26",
      icon: "BrainCircuit",
      description: "Rapid-fire rounds testing tech trivia and general knowledge.",
      longDescription:
        "A great oppurtunity for the young innovators to pitch thier startup idea and gain recognition.",
      teamSize: "1-4",
      time: "11:30 AM – 2:30 PM",
      venue: "F11",
      organizers: "ChandraPrasad, Sameera Kathun",
      queries: [
        { name: "Zenith Joshua", phone: "+91 74483 43632" },
        { name: "Richan", phone: "+91 91502 48398" },
      ],
      lumaEventId: "evt-EReesO2u1YgnQLq",
      backgroundImage: "/assets/bussiness-pitch.avif",
      backgroundPosition: "top",
      posterImage: "/Event-Posters/Business pitch  [SUSTAINOVATE].png",
      guidelinesPdf: "/Guidelines/sustainovate Guidelines.pdf",
    },
    {
      id: "treasure-hunt",
      title: "Where is Gamora?",
      icon: "MapPin",
      description: "Solve clues and puzzles scattered across campus to find the prize.",
      longDescription:
        "No Paper.No maps.Just you and the machine.The IT Department presents a digital Treasure Hunt.Navigate hidden directories , crack system clues , and race the clock .",
      teamSize: "2-4",
      time: "10:15 AM – 12:15 PM",
      venue: "A21",
      organizers: "Suganthan, Narayani",
      queries: [
        { name: "Zenith Joshua", phone: "+91 74483 43632" },
        { name: "Richan", phone: "+91 91502 48398" },
      ],
      lumaEventId: "evt-uXjsXiOFz0G0nGx",
      backgroundImage: "/assets/vormir-gamora.jpg",
      backgroundPosition: "top",
      posterImage: "/Event-Posters/WHERE IS GAMORA.png",
      guidelinesPdf: "/Guidelines/Whereisgamora_guidelines.pdf",
    },
    {
      id: "Tech Charades",
      title: "X-Charades",
      icon: "Gamepad2",
      description: "Compete in a bracketed esports tournament across top titles.",
      longDescription:
        "Can you explain tech without speaking? Prove it. Team up in threes to act out complex jargon,sketch digital concepts, and race the clock . Three silent rounds. Zero room for errors.",
      teamSize: "2",
      time: "10:15 AM – 12:15 PM",
      venue: "I32",
      organizers: "Priyanka, Gayathri",
      queries: [
        { name: "Zenith Joshua", phone: "+91 74483 43632" },
        { name: "Richan", phone: "+91 91502 48398" },
      ],
      lumaEventId: "evt-gfyfV5c2R6TMYtU",
      backgroundImage: "/assets/x-chardes.jpeg",
      backgroundPosition: "top",
      posterImage: "/Event-Posters/Tech Charades.png",
      guidelinesPdf: "/Guidelines/Tech Charades Guidelines 2026.pdf",
    },
    {
      id: "Technical Connection",
      title: "Sacred Connections",
      icon: "Briefcase",
      description: "Crack real-world business problems under time pressure.",
      longDescription:
        "Spot the link before time runs out. Team up in pairs to crack visual riddles. Spot the patterns early, decipher fast image sequences, and prove your technical intuition is unmatched.",
      teamSize: "2-3",
      time: "10:15 AM – 12:15 PM",
      venue: "I33",
      organizers: "Aarogiyaramya, Sahaya Nimisha",
      queries: [
        { name: "Zenith Joshua", phone: "+91 74483 43632" },
        { name: "Richan", phone: "+91 91502 48398" },
      ],
      lumaEventId: "evt-yfO2RHvL8hwS6DF",
      // Cache-busting query string: the replacement file kept the same name,
      // and neither the browser nor Next's image optimizer has any way to
      // notice that — same URL reads as the same cached image either way.
      backgroundImage: "/assets/connections.jpg?v=2",
      posterImage: "/Event-Posters/connections (1).png",
      guidelinesPdf: "/Guidelines/connections.pdf.pdf",
    },
  ];

export type ScheduleItem = {
  time: string;
  title: string;
  venue: string;
};

export const schedule: Record<string, ScheduleItem[]> = {
  "Day 1": [
    { time: "09:00 AM", title: "Inauguration Ceremony", venue: "Main Auditorium" },
    { time: "10:30 AM", title: "Paper Presentation — Round 1", venue: "Seminar Hall A" },
    { time: "11:00 AM", title: "Hackathon Kickoff", venue: "Innovation Lab" },
    { time: "02:00 PM", title: "Web Design Sprint", venue: "Computer Lab 2" },
    { time: "04:00 PM", title: "Tech Quiz — Prelims", venue: "Seminar Hall B" },
  ],
  "Day 2": [
    { time: "09:00 AM", title: "Robo Race Qualifiers", venue: "Open Grounds" },
    { time: "11:00 AM", title: "Hackathon — Midway Review", venue: "Innovation Lab" },
    { time: "01:00 PM", title: "Case Study Battle", venue: "Seminar Hall A" },
    { time: "03:00 PM", title: "Gaming Arena — Quarterfinals", venue: "Esports Zone" },
    { time: "06:00 PM", title: "Cultural Night", venue: "Main Auditorium" },
  ],
  "Day 3": [
    { time: "09:00 AM", title: "Hackathon Finals & Demos", venue: "Innovation Lab" },
    { time: "11:00 AM", title: "Robo Race Finals", venue: "Open Grounds" },
    { time: "01:00 PM", title: "Treasure Hunt", venue: "Campus Wide" },
    { time: "03:00 PM", title: "Gaming Arena — Grand Finale", venue: "Esports Zone" },
    { time: "05:00 PM", title: "Valedictory & Prize Distribution", venue: "Main Auditorium" },
  ],
};

export const guests = [
  { name: "Dr. Anitha Rajan", title: "AI Research Lead, Vortexa Labs" },
  { name: "Karthik Subramanian", title: "Founder, StackForge" },
  { name: "Meera Iyer", title: "Principal Engineer, NimbusCloud" },
  { name: "Rahul Menon", title: "Robotics Lead, IronWorks Robotics" },
];

export const sponsors = {
  title: [{ name: "Stark Industries" }],
  gold: [{ name: "Wakanda Tech" }, { name: "Oscorp" }],
  silver: [{ name: "Pym Technologies" }, { name: "Cyberdyne" }, { name: "Hammer Industries" }],
  bronze: [
    { name: "Damage Control" },
    { name: "Roxxon" },
    { name: "Baxter Foundation" },
    { name: "Alchemax" },
  ],
};

export const facultyCoordinators = [
  { name: "Dr. S. Venkatesh", role: "Faculty Coordinator, CSE" },
  { name: "Dr. P. Lakshmi", role: "Faculty Coordinator, IT" },
];

export const studentCoreTeam = [
  { name: "Arjun Kumar", role: "Event Head" },
  { name: "Divya Sree", role: "Technical Lead" },
  { name: "Vishal Raj", role: "Operations Lead" },
  { name: "Priya Dharshini", role: "Design Lead" },
  { name: "Naveen Kumar", role: "Sponsorship Lead" },
  { name: "Sanjana R", role: "Marketing Lead" },
];

export const footerLinks = {
  quick: [
    { label: "Events", href: "#events" },
    { label: "Sponsors", href: "#sponsors" },
  ],
  contact: {
    email: "flairit@licet.ac.in",
    phone: "+91 98765 43210",
    address: "Loyola College Licet, Loyola Campus, Nungambakkam, Chennai, Greater Chennai, Tamil Nadu 600034, India",
    addressHref:
      "https://www.google.com/maps/place/LICET+:+Loyola-ICAM+College+of+Engineering+and+Technology/@13.0592975,80.2336586,854m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a5266606a8d51eb:0xcfedaad4ca5bd750!8m2!3d13.0592975!4d80.2336586!16s%2Fm%2F0dlk73f?entry=ttu&g_ep=EgoyMDI2MDcyNi4wIKXMDSoASAFQAw%3D%3D",
    queries: [
      { name: "Zenith Joshua", phone: "+91 74483 43632" },
      { name: "Richan", phone: "+91 91502 48398" },
    ],
    coordinators: ["Steffina Evangelin", "Aadhishankar Babu"],
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/flairit_2k26?igsh=MXRjNDVmYzBiNGZibg==" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/licet-grait/" },
  ],
};
