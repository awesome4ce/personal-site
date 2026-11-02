/* =====================================================================
   ALL SITE CONTENT LIVES HERE. Edit this file, push, done.
   Anything marked  // PLACEHOLDER  is filler — replace it with your own.
   Images: drop files into /photos and reference them like "photos/x.jpg".
   Leave img: "" to show a styled placeholder tile instead.
   ===================================================================== */

window.SITE = {
  name: "Ethan Seung",
  tagline: "Stanford · Data Science & Quant Finance",
  headshot: "", // e.g. "photos/headshot.jpg"  // PLACEHOLDER
  email: "eseung@stanford.edu",
  linkedin: "https://www.linkedin.com/in/ethan-seung",
  resume: "assets/resume.pdf",
  beli: "https://beliapp.com/", // PLACEHOLDER — your Beli profile link

  /* ---------------- ABOUT ---------------- */
  intro: [
    // PLACEHOLDER — rewrite in your own voice
    "I study data science with a concentration in quantitative finance at Stanford. Most of my work so far has been in real estate credit and capital markets — underwriting loans, modeling cash flows, and building tools that make diligence faster.",
    "Outside of that I ride a lot (Stanford Cycling), ski when there's snow, played volleyball for six years, and will happily talk pot odds with anyone.",
  ],
  now: [
    "Incoming Capital Markets Summer Analyst at JLL (SF, summer 2027)",
    "VP of the Stanford Real Estate Association",
    "Chasing another century ride before the rain season",
  ],

  /* ---------------- WORK ---------------- */
  education: {
    school: "Stanford University",
    degree: "B.S. Data Science, Concentration in Quantitative Finance",
    dates: "Expected Jun. 2029",
    details: [
      "GPA: 3.97 / 4.00",
      "Stanford Real Estate Association — VP; run firm relations and recruiting events",
      "Stanford Cycling Club · Stanford Blyth Fund · Stanford Ski Club",
    ],
  },
  experience: [
    {
      company: "JLL",
      role: "Incoming Capital Markets Summer Analyst",
      location: "San Francisco, CA",
      dates: "Jun. – Aug. 2027",
      bullets: [],
    },
    {
      company: "ACORE Capital",
      role: "Summer Analyst",
      location: "Los Angeles, CA",
      dates: "Jun. – Aug. 2026",
      bullets: [
        "Underwrote 56 prospective deals (~$8B) across data center, industrial, multifamily, retail, self-storage, hospitality, and office",
        "Modeled cash flows from T-12s and rent rolls, sizing loans to LTV, debt yield, and DSCR through broker Q&A",
        "Supported 2 of these loans through IC approval and close, drafting quote sheets and IC memo sections",
        "Built an AI-agent council that reviews third-party reports (appraisal, PCA, Phase I) and flags issues in due diligence",
      ],
    },
    {
      company: "Bregal Sagemount",
      role: "Spring Analyst",
      location: "Palo Alto, CA",
      dates: "Apr. – May 2026",
      bullets: [
        "Completed partner-led curriculum covering deal origination, financial due diligence, valuation, and LBO modeling",
        "Sourced and evaluated 6 software companies against Sagemount’s investment criteria, presenting target list to partners",
      ],
    },
    {
      company: "NAIOP Silicon Valley University Challenge",
      role: "Student Developer",
      location: "Palo Alto, CA",
      dates: "Dec. 2025 – Mar. 2026",
      bullets: [
        "Selected as 1 of 4 to represent Stanford; underwrote a 1.2M SF office, multifamily, and retail development to levered equity returns",
        "Sized construction debt and equity and stress-tested design, cost, and financing assumptions with GC, architecture, and brokerage partners",
      ],
    },
    {
      company: "Los Angeles Rams",
      role: "Summer Data Analyst",
      location: "Los Angeles, CA",
      dates: "Jul. – Aug. 2024",
      bullets: ["Analyzed running-back college and pro play-by-play data to identify draft-round performance correlations"],
    },
    {
      company: "Cimulate (acquired by Salesforce, 2026)",
      role: "AI Engineering Intern",
      location: "Los Angeles, CA",
      dates: "Jun. – Jul. 2024",
      bullets: ["Built memory-tagging for the LLM system and benchmarked new models, cutting compute costs ~60%"],
    },
  ],
  awards: [
    { title: "Wharton Data Science Competition — 2024 Winner", detail: "#1 of 216 teams; led a four-person team predicting soccer match outcomes" },
    { title: "Wharton Sports Analytics Journal — Published Author (2×)", detail: "“Calculating Win Probabilities of Any Matchup of Soccer Teams” (Special Ed. 2024) · “Evaluating the Impact of NFL Special Teams on Winning” (Spring 2024)" },
    { title: "Hines Skyline Scholars", detail: "2026 Cohort" },
    { title: "Eastdil Secured RE Finance Training Program", detail: "2026" },
  ],
  skills: ["Excel", "Argus", "Python", "R", "Java", "C++"],

  /* ---------------- PLAY ---------------- */
  // Two featured century rides. `profile` = rough elevation samples (any units),
  // used to draw the little elevation line. Replace with real numbers later.
  rides: [
    {
      name: "Century #1 — Route name", // PLACEHOLDER
      date: "2026",
      miles: 102,
      elevation: "6,800 ft",
      where: "Peninsula → Half Moon Bay → back",
      note: "One line about the ride — the climb that hurt, the coffee stop, who you rode with.",
      profile: [10, 12, 30, 55, 48, 20, 15, 18, 40, 70, 62, 35, 22, 14, 25, 50, 44, 18, 10],
      photos: ["", ""],
    },
    {
      name: "Century #2 — Route name", // PLACEHOLDER
      date: "2026",
      miles: 110,
      elevation: "8,200 ft",
      where: "Skyline Blvd loop",
      note: "One line about the ride.",
      profile: [5, 8, 20, 45, 80, 76, 60, 30, 25, 50, 85, 90, 70, 40, 30, 20, 35, 22, 8],
      photos: ["", ""],
    },
  ],
  hobbies: [
    {
      title: "Skiing",
      sub: "Stanford Ski Club",
      text: "Where you ski, favorite run, how many days this season.", // PLACEHOLDER
      img: "",
    },
    {
      title: "Volleyball",
      sub: "Varsity & Club · 2019–2025",
      text: "Position, a favorite moment, whether you still play.", // PLACEHOLDER
      img: "",
    },
  ],
  travel: [
    // PLACEHOLDER — add as many as you want
    { place: "Los Angeles", region: "California", coords: "34.05°N 118.24°W", img: "" },
    { place: "Stanford", region: "California", coords: "37.43°N 122.17°W", img: "" },
    { place: "Lake Tahoe", region: "California / Nevada", coords: "39.10°N 120.03°W", img: "" },
    { place: "Somewhere new", region: "Add a trip", coords: "00.00°N 00.00°W", img: "" },
  ],

  /* ---------------- EATS (Beli-style) ---------------- */
  // score is out of 10 like Beli. Sorted automatically, highest first.
  eats: [
    // PLACEHOLDER — all of these
    { name: "Restaurant One", city: "Palo Alto", cuisine: "Italian", order: "What you always get", score: 9.4 },
    { name: "Restaurant Two", city: "Los Angeles", cuisine: "Korean BBQ", order: "What you always get", score: 9.1 },
    { name: "Restaurant Three", city: "San Francisco", cuisine: "Ramen", order: "What you always get", score: 8.7 },
    { name: "Restaurant Four", city: "Los Angeles", cuisine: "Tacos", order: "What you always get", score: 8.5 },
    { name: "Restaurant Five", city: "Palo Alto", cuisine: "Coffee", order: "What you always get", score: 7.9 },
  ],
  beliScreens: ["", "", ""], // e.g. "photos/beli-1.png"  // PLACEHOLDER

  /* ---------------- QUOTES ---------------- */
  quotes: [
    // PLACEHOLDER — swap in your own favorites
    { text: "Risk comes from not knowing what you're doing.", author: "Warren Buffett" },
    { text: "All models are wrong, but some are useful.", author: "George Box" },
    { text: "In the short run, the market is a voting machine but in the long run, it is a weighing machine.", author: "Benjamin Graham" },
    { text: "It never gets easier, you just go faster.", author: "Greg LeMond" },
    { text: "Luck is what happens when preparation meets opportunity.", author: "Seneca (attributed)" },
  ],

  /* ---------------- READS ---------------- */
  // type: "book" or "article". tags drive the filter buttons.
  reads: [
    // PLACEHOLDER — swap in your own
    { title: "How to Do Great Work", author: "Paul Graham", type: "article", url: "https://paulgraham.com/greatwork.html", tags: ["career"], note: "Your one-line take." },
    { title: "Oaktree Memos", author: "Howard Marks", type: "article", url: "https://www.oaktreecapital.com/insights", tags: ["markets"], note: "Your one-line take." },
    { title: "Thinking in Bets", author: "Annie Duke", type: "book", url: "", tags: ["decisions", "poker"], note: "Your one-line take." },
    { title: "Money Stuff", author: "Matt Levine", type: "article", url: "https://www.bloomberg.com/account/newsletters/money-stuff", tags: ["markets"], note: "Your one-line take." },
  ],
};
