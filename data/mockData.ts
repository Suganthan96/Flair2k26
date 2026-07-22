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
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Team", href: "#team" },
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

export type EventCategory = "Technical" | "Non-Technical";

export const events: {
  id: string;
  title: string;
  category: EventCategory;
  icon: string;
  description: string;
}[] = [
  {
    id: "paper-presentation",
    title: "Paper Presentation",
    category: "Technical",
    icon: "FileText",
    description: "Present original research and ideas to a panel of expert judges.",
  },
  {
    id: "hackathon",
    title: "Hackathon",
    category: "Technical",
    icon: "Code2",
    description: "24-hour build sprint to ship a working prototype from scratch.",
  },
  {
    id: "robo-race",
    title: "Robo Race",
    category: "Technical",
    icon: "Bot",
    description: "Design and race autonomous bots through a timed obstacle track.",
  },
  {
    id: "web-design",
    title: "Web Design",
    category: "Technical",
    icon: "LayoutTemplate",
    description: "Build a pixel-perfect responsive site against the clock.",
  },
  {
    id: "gaming",
    title: "Gaming Arena",
    category: "Non-Technical",
    icon: "Gamepad2",
    description: "Compete in a bracketed esports tournament across top titles.",
  },
  {
    id: "quiz",
    title: "Tech Quiz",
    category: "Non-Technical",
    icon: "BrainCircuit",
    description: "Rapid-fire rounds testing tech trivia and general knowledge.",
  },
  {
    id: "case-study",
    title: "Case Study Battle",
    category: "Non-Technical",
    icon: "Briefcase",
    description: "Crack real-world business problems under time pressure.",
  },
  {
    id: "treasure-hunt",
    title: "Treasure Hunt",
    category: "Non-Technical",
    icon: "MapPin",
    description: "Solve clues and puzzles scattered across campus to find the prize.",
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
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Schedule", href: "#schedule" },
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
