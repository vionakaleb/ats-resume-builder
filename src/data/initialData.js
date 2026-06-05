const SEP = "\u00A0\u00A0|\u00A0\u00A0";

export const initialData = {
  name: "VIONA KALEB",
  headline: "Senior Frontend Engineer",
  location: "Jakarta, Indonesia",
  email: "vionakaleb@gmail.com",
  phone: "+6282311888164",
  website: "https://viona-kaleb.vercel.app/",
  linkedin: "https://www.linkedin.com/in/vionakaleb/",
  summary:
    "A frontend-focused Software Engineer with 7+ years of expertise. Building production web applications across banking, fintech, e-commerce and logistics. With deep expertise in Next.js, React, Angular and Vue. Backed by fullstack experience with Node.js, Express, GraphQL and PHP. Founded the frontend system of a UK fintech platform serving 1.2M+ trading accounts. Shipped 3D wayfinding solutions installed across major Singapore landmarks. Now helping digitalize operations across 1,000+ branches at Indonesia's largest state-owned bank. Holds a Master's in Information Technology with a Machine Learning focus.",
  experience: [
    {
      title: "Web Developer",
      org: "Bank Mandiri",
      location: "Jakarta, Indonesia",
      dates: "Dec 2023 \u2013 Present",
      bullets: [
        "Build and maintain Smart Branch, the digital branch platform for Indonesia's largest state-owned bank, helping digitalize banking operations across 1,000+ branches nationwide and cut fraud by 85%.",
        "Develop features for KOPRA, the bank's wholesale banking platform, supporting annual transaction volume above IDR 10,000 trillion.",
      ],
    },
    {
      title: "Web Developer & Data Analyst",
      org: "Hypestacks",
      location: "London, United Kingdom",
      dates: "Jan 2023 \u2013 Dec 2023",
      bullets: [
        "Founded the frontend stack of an early-stage fintech product, building a real-time trading analytics platform serving 1.2M+ trading accounts and 65+ prop-firm clients worldwide.",
        "Built real-time Power BI dashboards from Forex data exported through a .NET API.",
      ],
    },
    {
      title: "Web Developer",
      org: "Aplikasi Super",
      location: "Jakarta, Indonesia",
      dates: "Jan 2021 \u2013 Jan 2023",
      bullets: [
        "Owned the full frontend delivery cycle across multiple product lines for a social-commerce and hyperlocal supply-chain platform.",
        "Sustained 90%+ test coverage on every feature shipped, keeping releases stable as the platform scaled.",
      ],
    },
    {
      title: "Web Developer",
      org: "Adactive Asia",
      location: "Singapore",
      dates: "Jan 2020 \u2013 Dec 2020",
      bullets: [
        "Built and shipped real-time 3D wayfinding solutions deployed across major Singapore landmarks, including Singapore Discovery Centre, the Supreme Court, and Republic Plaza.",
      ],
    },
  ],
  education: [
    {
      title: "Master of Science in Information Technology",
      org: "President University",
      location: "Cikarang, Indonesia" + SEP + "EQF Level 7",
      dates: "Oct 2022 \u2013 May 2026",
      bullets: ["Specialization in Machine Learning."],
    },
    {
      title: "Bachelor of Science in Information Technology",
      org: "President University",
      location: "Cikarang, Indonesia" + SEP + "EQF Level 6",
      dates: "Oct 2014 \u2013 May 2021",
      bullets: [
        "Awarded a government- and university-funded scholarship as one of the program's top graduates.",
      ],
    },
  ],
  skills: [
    { label: "Languages", value: "TypeScript, JavaScript, Python, PHP, SQL" },
    {
      label: "Frontend",
      value: "React, Next.js, Angular, Vue, HTML5, CSS3, Tailwind CSS",
    },
    { label: "Backend", value: "Node.js, Express.js, GraphQL, REST APIs, Firebase" },
    { label: "Databases", value: "MongoDB, MySQL, PostgreSQL" },
    { label: "Cloud & DevOps", value: "AWS, Docker, Git, GitHub, GitLab" },
    { label: "Testing", value: "Jest, React Testing Library" },
  ],
  languages: [
    { name: "Indonesian", level: "Native" },
    { name: "English", level: "C1 (Listening, Reading, Writing); B2 (Speaking)" },
  ],
};

export const SECTION_SEP = SEP;

export function blankEntry() {
  return { title: "", org: "", location: "", dates: "", bullets: [""] };
}
