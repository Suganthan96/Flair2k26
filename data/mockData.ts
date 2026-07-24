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
  { label: "About", href: "#about" },
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
  teamSize: string;
  time: string;
  venue: string;
  organizers: string;
  queries: EventQueryContact[];
  lumaEventId: string;
}[] = [
  {
    id: "hackathon",
    title: "Prompt with Jarvis",
    icon: "Code2",
    description: "24-hour build sprint to ship a working prototype from scratch.",
    teamSize: "2-4",
    time: "09:00 AM – 09:00 AM (24 hrs) [ 22–23 Jan 2027 ]",
    venue: "Innovation Lab",
    organizers: "Arjun Kumar, Divya Sree",
    queries: [
      { name: "Arjun Kumar", phone: "+91 90000 11122" },
      { name: "Divya Sree", phone: "+91 90000 11123" },
    ],
    lumaEventId: "evt-80hU40SG5wXqj3V",
  },
  {
    id: "paper-presentation",
    title: "The Stark Expo",
    icon: "FileText",
    description: "Present original research and ideas to a panel of expert judges.",
    teamSize: "1-3",
    time: "10:30 AM – 01:00 PM [ 22 Jan 2027 ]",
    venue: "Seminar Hall A",
    organizers: "Priya Dharshini, Naveen Kumar",
    queries: [
      { name: "Priya Dharshini", phone: "+91 90000 22233" },
      { name: "Naveen Kumar", phone: "+91 90000 22234" },
    ],
    lumaEventId: "evt-TRewZ5zsA2Xb8fO",
  },
  {
    id: "treasure-hunt",
    title: "Where is Gamora?",
    icon: "MapPin",
    description: "Solve clues and puzzles scattered across campus to find the prize.",
    teamSize: "2-4",
    time: "01:00 PM – 03:00 PM [ 24 Jan 2027 ]",
    venue: "Campus Wide",
    organizers: "Vishal Raj, Sanjana R",
    queries: [
      { name: "Vishal Raj", phone: "+91 90000 33344" },
      { name: "Sanjana R", phone: "+91 90000 33345" },
    ],
    lumaEventId: "evt-uXjsXiOFz0G0nGx",
  },
  {
    id: "robo-race",
    title: "Debuggers Assemble",
    icon: "Bot",
    description: "Design and race autonomous bots through a timed obstacle track.",
    teamSize: "1-2",
    time: "02:00 PM – 04:00 PM [ 23 Jan 2027 ]",
    venue: "Computer Lab 2",
    organizers: "Arjun Kumar, Vishal Raj",
    queries: [
      { name: "Arjun Kumar", phone: "+91 90000 44455" },
      { name: "Vishal Raj", phone: "+91 90000 44456" },
    ],
    lumaEventId: "evt-0DlblubojnaeKj2",
  },
  {
    id: "quiz",
    title: "Infinity IQ / Trivia 3000",
    icon: "BrainCircuit",
    description: "Rapid-fire rounds testing tech trivia and general knowledge.",
    teamSize: "2",
    time: "04:00 PM – 06:00 PM [ 22 Jan 2027 ]",
    venue: "Seminar Hall B",
    organizers: "Divya Sree, Sanjana R",
    queries: [
      { name: "Divya Sree", phone: "+91 90000 55566" },
      { name: "Sanjana R", phone: "+91 90000 55567" },
    ],
    lumaEventId: "evt-EReesO2u1YgnQLq",
  },
  {
    id: "web-design",
    title: "I Can Meme This All Day",
    icon: "LayoutTemplate",
    description: "Build a pixel-perfect responsive site against the clock.",
    teamSize: "1",
    time: "11:00 AM – 01:00 PM [ 23 Jan 2027 ]",
    venue: "Design Studio",
    organizers: "Priya Dharshini, Naveen Kumar",
    queries: [
      { name: "Priya Dharshini", phone: "+91 90000 66677" },
      { name: "Naveen Kumar", phone: "+91 90000 66678" },
    ],
    lumaEventId: "evt-ziwcw16DWyGLOn2",
  },
  {
    id: "gaming",
    title: "X-Charades",
    icon: "Gamepad2",
    description: "Compete in a bracketed esports tournament across top titles.",
    teamSize: "3-5",
    time: "03:00 PM – 05:00 PM [ 24 Jan 2027 ]",
    venue: "Main Auditorium",
    organizers: "Vishal Raj, Sanjana R",
    queries: [
      { name: "Vishal Raj", phone: "+91 90000 77788" },
      { name: "Sanjana R", phone: "+91 90000 77789" },
    ],
    lumaEventId: "evt-gfyfV5c2R6TMYtU",
  },
  {
    id: "case-study",
    title: "Sacred Connections",
    icon: "Briefcase",
    description: "Crack real-world business problems under time pressure.",
    teamSize: "2-3",
    time: "01:00 PM – 03:00 PM [ 23 Jan 2027 ]",
    venue: "Seminar Hall A",
    organizers: "Arjun Kumar, Divya Sree",
    queries: [
      { name: "Arjun Kumar", phone: "+91 90000 88899" },
      { name: "Divya Sree", phone: "+91 90000 88900" },
    ],
    lumaEventId: "evt-yfO2RHvL8hwS6DF",
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
    { label: "Team", href: "#team" },
  ],
  contact: {
    email: "flair2k26@licet.ac.in",
    phone: "+91 98765 43210",
    address: "LICET Campus, St. Thomas Mount, Chennai - 600016",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
};
