export const seedData = {
  profile: {
    name: "Your Name",
    logoName: "Dhukar",
    role: "Software Engineer",
    tagline: "Full-Stack Developer · MERN",
    bio: "For [X]+ years I've built and shipped software across [industries] — solving problems where reliability, scalability, and user experience matter.",
    bioSecondary:
      "I go beyond marking tickets as done — I think about the bigger picture: how a system is designed, how it scales, and how easily it can evolve as the business grows.",
    ctaLabel: "Get in touch",
    ctaUrl: "/contact",
    whatsappNumber: "",
    whatsappMessage:
      "Hello, I came from your website and would like to talk.",
    email: "",
    resumeUrl: "",
    location: "Lagos, Nigeria",
    utcOffset: "UTC+1",
    socialLinks: [
      { label: "github", url: "https://github.com/" },
      { label: "twitter", url: "https://twitter.com/" },
      { label: "linkedin", url: "https://www.linkedin.com/" },
    ],
    seoTitle: "Your Name — Software Engineer",
    seoDescription:
      "Full-stack developer building reliable, scalable web applications.",
    ogImage: "",
    accentColor: "emerald",
  },

  projects: [
    {
      title: "MediRun",
      slug: "medirun",
      summary: "Pharmacy delivery platform with real-time rider tracking.",
      description:
        "A full MERN stack pharmacy delivery platform with Socket.IO real-time rider tracking, Firebase authentication, manual bank transfer payments with admin confirmation, and a full admin CMS.",
      url: "",
      tags: ["MERN", "Socket.IO", "Firebase"],
      featured: true,
      order: 1,
    },
    {
      title: "The Shepherd's Fold",
      slug: "the-shepherds-fold",
      summary: "Church management platform.",
      description:
        "A church management platform built to help congregations manage members, events, and communication in one place.",
      url: "",
      tags: ["MERN"],
      featured: true,
      order: 2,
    },
  ],

  experience: [
    {
      company: "Your Company",
      role: "Full-Stack Developer",
      subRole: "",
      context: "Remote",
      startDate: "2023",
      endDate: "Present",
      bullets: [
        "Describe a key responsibility or system you owned.",
        "Describe an impact you had, ideally with a number.",
      ],
      order: 1,
    },
  ],

  posts: [
    {
      title: "Your first article title",
      excerpt: "A short summary of what this post covers.",
      url: "https://medium.com/",
      readTime: "5 min read",
      publishedDate: new Date(),
      tags: ["development"],
      order: 1,
    },
  ],
};
