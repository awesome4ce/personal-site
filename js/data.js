/* =====================================================================
   ALL SITE CONTENT LIVES HERE. Edit this file, push, done.
   Anything marked  // PLACEHOLDER  is filler — replace it with your own.
   Images: drop files into /photos and reference them like "photos/x.jpg".
   Leave img: "" to show a styled placeholder tile instead.
   ===================================================================== */

window.SITE = {
  name: "Ethan Seung",
  eyebrow: "Stanford · Data Science · Quant Finance",
  headshot: "", // e.g. "photos/headshot.jpg"  // PLACEHOLDER
  email: "eseung@stanford.edu",
  linkedin: "https://www.linkedin.com/in/ethan-seung",
  resume: "assets/resume.pdf",
  beli: "https://beliapp.com/", // PLACEHOLDER — your Beli profile link

  /* ---------------- ABOUT ---------------- */
  intro: [
    // PLACEHOLDER — rewrite in your own voice
    // Wrap words in **double asterisks** to bold them.
    "I study data science and quantitative finance at **Stanford**. Most of my work so far has been in **real estate credit and capital markets**: underwriting loans, modeling cash flows, and building tools that make diligence faster.",
    "Outside of that I'm usually **on a bike** (Stanford Cycling), on a mountain when there's snow, or at a poker table.",
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
      name: "Around the Bay",
      date: "Apr. 4, 2026",
      miles: 138.2,
      elevation: "4,147 ft",
      where: "A full loop of the SF Bay",
      note: "Longest ride I've ever done: 8h20m moving at 16.6 mph, 138 W average, and my 2nd-fastest 100 miles along the way.",
      profile: [6, 10, 14, 9, 18, 26, 20, 12, 30, 22, 14, 10, 16, 24, 15, 8, 12, 18, 10, 6],
      photos: ["photos/ride-bay-loop-map.jpg"],
    },
    {
      name: "Page Mill to Santa Cruz",
      date: "Oct. 5, 2025",
      miles: 113.2,
      elevation: "8,173 ft",
      where: "West Old La Honda, the coast, Santa Cruz",
      note: "Ate so much wind: headwind half the ride, including 2h21m straight. Still PR'd Upper West Old La Honda and went 10th all-time on Page Mill → Santa Cruz.",
      profile: [30, 55, 82, 60, 35, 12, 6, 10, 8, 14, 9, 20, 48, 78, 95, 70, 52, 34, 22, 15],
      photos: ["photos/ride-santa-cruz-map.jpg"],
    },
  ],
  // Extra riding photos shown under the two centuries.
  bikePhotos: [
    { img: "photos/bike-sunset.jpg", caption: "Golden hour on the climb" },
    { img: "photos/bike-selfie.jpg", caption: "Out with the crew" },
  ],
  ski: {
    sub: "Stanford Ski Club",
    text: "Tree runs, deep powder, boot-packing for the good stuff, and the occasional total whiteout on the chairlift.", // edit me
    photos: [
      { img: "photos/ski-powder.jpg", caption: "Powder day" },
      { img: "photos/ski-kiss.jpg", caption: "" },
      { img: "photos/ski-chairlift-fog.jpg", caption: "Visibility: zero" },
      { img: "photos/ski-bootpack.jpg", caption: "Boot-packing up" },
    ],
  },
  volleyball: {
    sub: "Varsity & Club · 2019–2025",
    text: "Six years of Harvard-Westlake varsity and club volleyball, usually the one in the red jersey diving for digs. Now it's mostly beach games.", // edit me
    photos: [
      { img: "photos/vb-dig.jpg", caption: "Harvard-Westlake varsity" },
      { img: "photos/vb-beach.jpg", caption: "Beach days" },
      { img: "photos/vb-dive.jpg", caption: "" },
      { img: "photos/vb-team-ucsb.jpg", caption: "Tournament at UCSB (red jersey)" },
    ],
  },
  hobbies: [
    {
      title: "Chess",
      sub: "Always down for a game",
      icon: "♞",
      text: "Rating, favorite opening, or your chess.com / lichess link.", // PLACEHOLDER
    },
  ],
  travel: [
    // Captions are guesses from the photos. Fix any that are off.
    { place: "Switzerland", region: "Lake day", img: "photos/swiss-lake.jpg" },
    { place: "Yosemite", region: "Half Dome in snow", img: "photos/yosemite-half-dome.jpg" },
    { place: "Switzerland", region: "Mountain railway", img: "photos/swiss-train.jpg" },
    { place: "Yosemite", region: "Horsetail Fall", img: "photos/yosemite-firefall.jpg" },
    { place: "Switzerland", region: "Sunset swim", img: "photos/swiss-sunset-swim.jpg" },
    { place: "Switzerland", region: "Alpine lake", img: "photos/swiss-lake-reflection.jpg" },
    { place: "California coast", region: "Sea cave", img: "photos/coast-sea-cave.jpg" },
    { place: "Switzerland", region: "Hillside", img: "photos/swiss-hillside.jpg" },
  ],

  /* ---------------- EATS (Beli-style) ---------------- */
  // score is out of 10 like Beli. Sorted automatically, highest first.
  eats: [
    // From my Beli "Been" list. Add `order: "..."` to any spot to show what to get.
    { name: "J'ai la patate", city: "Hokkaido, Japan", cuisine: "French, Japanese", price: "¥¥¥¥", score: 10.0 },
    { name: "The Brothers Sushi", city: "Santa Monica, CA", cuisine: "Sushi", price: "$$$$", score: 10.0 },
    { name: "SANGHYUN", city: "Seoul, South Korea", cuisine: "Omakase", price: "₩₩₩₩", score: 9.9 },
    { name: "Kuni Sushi", city: "Sapporo, Japan", cuisine: "Omakase", price: "¥¥¥", score: 9.9 },
    { name: "Ristorante L'Escale", city: "Tremezzina, Italy", cuisine: "Italian, Wine Bar", price: "€€€€", score: 9.9 },
    { name: "Farmshop", city: "Brentwood, CA", cuisine: "American", price: "$$$", score: 9.8 },
    { name: "Matu Kai", city: "Brentwood, CA", cuisine: "Steakhouse", price: "$$$$", score: 9.8 },
    { name: "Robin", city: "Menlo Park, CA", cuisine: "Omakase", price: "$$$$", score: 9.8 },
    { name: "Nozawa Bar", city: "Beverly Hills, CA", cuisine: "Omakase", price: "$$$$", score: 9.8 },
    { name: "yeobo, darling", city: "Menlo Park, CA", cuisine: "Korean, Taiwanese", price: "$$$$", score: 9.7 },
    { name: "The Mulberry", city: "Sawtelle, LA", cuisine: "Korean", price: "$$$$", score: 9.7 },
    { name: "White House Tavern", city: "Aspen, CO", cuisine: "Burgers, Sandwiches", price: "$$", score: 9.7 },
  ],
  beliScreens: ["photos/beli-1.jpg", "photos/beli-2.jpg", "photos/beli-3.jpg"],

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
