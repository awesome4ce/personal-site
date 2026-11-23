/* =====================================================================
   ALL SITE CONTENT LIVES HERE. Edit this file, push, done.
   Anything marked  // PLACEHOLDER  is filler — replace it with your own.
   Images: drop files into /photos and reference them like "photos/x.jpg".
   Leave img: "" to show a styled placeholder tile instead.
   ===================================================================== */

window.SITE = {
  name: "Ethan Seung",
  updated: "November 2026", // shown in the footer; bump it when you change things
  eyebrow: "Stanford · Data Science · Problem-Solving Junkie",
  headshot: "photos/headshot.jpg",
  babyPhoto: "photos/baby.jpg", // shows on the S♥ card ("then")
  email: "eseung@stanford.edu",
  linkedin: "https://www.linkedin.com/in/ethan-seung",
  resume: "assets/resume.pdf",
  beli: "https://beliapp.co/app/ethanseung",

  /* ---------------- ABOUT ---------------- */
  intro: [
    "I call myself a problem-solving junkie. I love finding an edge, from competitive chess and poker to the sports analytics I did in high school, and real estate has the biggest ones.",
    "Most of it trades privately, with no exchange and no public prices, so the edge is the information.",
    "The rest of the time I'm on a bike, on a mountain, or ordering the strangest thing on the menu.",
  ],
  now: [
    "Getting one more century cycling ride in",
    "Tishman Speyer acquisitions internship, New York, summer 2027",
    "Running firm relations for the Stanford Real Estate Association",
  ],

  /* ---------------- WORK ---------------- */
  education: {
    school: "Stanford University",
    logo: "stanford.edu",
    degree: "B.S. Data Science, Concentration in Quantitative Finance",
    dates: "Expected Jun. 2029",
    details: [
      "GPA: 3.97 / 4.00",
      "Stanford Real Estate Association — VP, Corporate and Industry Partnerships",
      "Stanford Cycling Club · Stanford Blyth Fund · Stanford Ski Club",
    ],
  },
  experience: [
    {
      company: "Tishman Speyer",
      blurb: "Joining the Acquisitions team in New York for summer 2027.",
      logo: "tishmanspeyer.com", // company website, used to show its logo
      role: "Incoming Acquisitions Summer Analyst",
      location: "New York, NY",
      dates: "Jun. – Aug. 2027",
      bullets: [],
    },
    {
      company: "ACORE Capital",
      blurb: "Underwrote 57 prospective deals (~$8B), 11 of them quoted (~$1.4B). Built stabilized cash flows, sized senior loans, mezzanine debt, and preferred equity, led broker Q&A, and drafted IC memo sections for two loans taken to investment committee. Built an AI-agent council that reviews third-party reports and flags diligence issues.",
      logo: "acorecapital.com", // company website, used to show its logo
      logoPad: true, // shrink the logo a bit inside its tile instead of filling it
      role: "Summer Analyst",
      location: "Los Angeles, CA",
      dates: "Jun. – Aug. 2026",
      bullets: [
        "Underwrote 57 prospective deals (~$8B), 11 of them quoted (~$1.4B), across data center, industrial, multifamily, retail, self-storage, hotel, and office",
        "Built stabilized cash flows, reconciling sponsor NOI against independent market rent, absorption, tenant credit, and expense assumptions drawn from lease comps, third-party reports, and market data",
        "Sized senior loans, mezzanine debt, and preferred equity to LTV, debt yield, and DSCR constraints",
        "Led broker Q&A on live deals and drafted IC memo sections for 2 loans taken to investment committee",
        "Built an AI-agent council that reviews third-party reports (appraisal, PCA, Phase I) and flags issues in due diligence",
      ],
    },
    {
      company: "Bregal Sagemount",
      blurb: "Partner-led training in deal origination, diligence, valuation, and LBO modeling. Sourced and evaluated six software companies against the firm's criteria and presented the target list to the partners.",
      logo: "sagemount.com", // company website, used to show its logo
      role: "Spring Analyst",
      location: "Palo Alto, CA",
      dates: "Apr. – May 2026",
      bullets: [
        "Completed partner-led curriculum covering deal origination, financial due diligence, valuation, and LBO modeling",
        "Sourced and evaluated 6 software companies against Sagemount’s investment criteria, presenting target list to partners",
      ],
    },
    {
      company: "Los Angeles Rams",
      blurb: "Analyzed college and pro running-back data to identify performance correlations and predict opponents' draft picks.",
      logo: "therams.com", // company website, used to show its logo
      role: "Summer Data Analyst",
      location: "Los Angeles, CA",
      dates: "Jul. – Aug. 2024",
      bullets: ["Analyzed running-back college and pro play-by-play data to identify draft-round performance correlations"],
    },
    {
      company: "Cimulate (acquired by Salesforce, 2026)",
      blurb: "Built memory tagging for the company's LLM system and benchmarked new models, cutting compute costs by ~60%. Cimulate was acquired by Salesforce in 2026.",
      logo: "cimulate.ai", // company website, used to show its logo
      logoPad: true,
      role: "AI Engineering Intern",
      location: "Los Angeles, CA",
      dates: "Jun. – Jul. 2024",
      bullets: ["Built memory-tagging for the LLM system and benchmarked new models, cutting compute costs ~60%"],
    },
  ],
  // ---- Work page: the story + one card per stop. `learned` is my own one-line takeaway (optional).
  work: {
    story: "It started with competitive chess and poker, where the edge is knowing something the other side doesn't. I chased that into sports analytics, then AI, then real estate, where prices and deal terms are mostly private and the edge is the information. Next stop: Tishman Speyer.",
    cards: [
      { id: "acore", date: "Summer 2026", short: "ACORE", tag: "Real estate credit", company: "ACORE Capital", logo: "acorecapital.com", logoPad: true, role: "Summer Analyst", when: "2026",
        stat: "57 deals", statLabel: "~$8B underwritten · 11 quoted",
        line: "Underwrote loans across seven property types, quoted 11 of them (~$1.4B), drafted IC memo sections for two loans taken to investment committee, and built an AI-agent council for diligence.",
        learned: "" },
      { id: "sagemount", date: "Spring 2026", short: "Sagemount", tag: "Private equity", company: "Bregal Sagemount", logo: "sagemount.com", role: "Spring Analyst", when: "2026",
        stat: "6 targets", statLabel: "sourced and pitched",
        line: "Sourced and evaluated software companies against the firm's criteria and presented them to the partners.",
        learned: "" },
      { id: "wharton", date: "2024", short: "Wharton", tag: "Sports analytics", company: "Wharton Data Science Competition", logo: "wharton.upenn.edu", role: "Team lead", when: "2024",
        stat: "#1 of 216", statLabel: "teams",
        line: "Led a four-person team building a Whole-History Rating model to predict soccer match outcomes. Published twice in the Wharton Sports Analytics Journal.",
        learned: "" },
      { id: "cimulate", date: "Summer 2024", short: "Cimulate", tag: "AI", company: "Cimulate", logo: "cimulate.ai", logoPad: true, role: "AI Engineering Intern", when: "2024",
        stat: "~60%", statLabel: "less compute",
        line: "Built memory tagging for the LLM system and benchmarked new models. Acquired by Salesforce in 2026.",
        learned: "" },
      { id: "rams", date: "Summer 2024", short: "Rams", tag: "Sports analytics", company: "Los Angeles Rams", logo: "therams.com", role: "Summer Data Analyst", when: "2024",
        stat: "RB × draft", statLabel: "college + pro running-back data",
        line: "Analyzed college and pro running-back data to find performance correlations and predict opponents' draft picks.",
        learned: "" },
    ],
    next: { id: "tishman", short: "Tishman Speyer", tag: "Next", company: "Tishman Speyer", logo: "tishmanspeyer.com", role: "Incoming Acquisitions Summer Analyst", when: "2027", date: "Summer 2027", stat: "Up next", statLabel: "Acquisitions, New York", line: "Joining the Acquisitions team in New York.", learned: "" },
  },
  // ---- Leadership & professional development (shown on the Work page, below the roles)
  leadership: [
    { name: "Stanford Real Estate Association", role: "VP, Corporate and Industry Partnerships", when: "Sep. 2026 – Present",
      line: "Leads relationships with real estate equity, lending, and advisory firms, and organizes office visits and recruiting events (like TPG Real Estate) that connect members with people in the industry." },
    { name: "Hines Skyline Scholars", role: "2026 cohort", when: "Jun. – Aug. 2026",
      line: "Studied Hines case studies and the acquisitions process, underwriting, and fund structure of Hines Global Income Trust, a $6.5B non-traded REIT." },
    { name: "NAIOP University Challenge", role: "Student Developer", when: "Dec. 2025 – Mar. 2026",
      line: "Underwrote a 1.2M SF office, multifamily, and retail development to levered returns, then sized its construction debt and equity and stress-tested the assumptions with GC, architecture, and brokerage partners." },
  ],
  awards: [
    { title: "Wharton Data Science Competition — 2024 Winner", detail: "#1 of 216 teams; led a four-person team predicting soccer match outcomes" },
    { title: "Wharton Sports Analytics Journal — Published Author (2×)", detail: "“Calculating Win Probabilities of Any Matchup of Soccer Teams” (Special Ed. 2024) · “Evaluating the Impact of NFL Special Teams on Winning” (Spring 2024)" },
    { title: "Hines Skyline Scholars", detail: "2026 Cohort" },
    { title: "Eastdil Secured RE Finance Training Program", detail: "2026" },
  ],
  skills: ["Excel", "Financial Modeling", "Argus", "CoStar", "Python", "R", "Java", "C++"],

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
      note: "Longest ride I've ever done: 8h20m of moving time, about 5,000 calories burned, and 10 Gatorades plus 3,000 calories eaten along the way.",
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
    { img: "photos/bike-red-jersey.jpg", caption: "Spring in the hills" },
    { img: "photos/bike-group-ride.jpg", caption: "Group ride" },
  ],
  ski: {
    sub: "Stanford Ski Club",
    text: "Tree runs, deep powder, boot-packing for the good stuff, and the occasional total whiteout on the chairlift.", // edit me
    photos: [
      { img: "photos/ski-powder.jpg", caption: "Powder day" },
      { img: "photos/ski-kiss.jpg", caption: "", alt: "Kissing my skis in the trees" },
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
      { img: "photos/vb-dive.jpg", caption: "", alt: "Diving for a dig during a match" },
      { img: "photos/vb-team-ucsb.jpg", caption: "Tournament at UCSB (red jersey)" },
    ],
  },
  hobbies: [],
  travel: [
    // Captions are guesses from the photos. Fix any that are off.
    { place: "Lake Lucerne", region: "Switzerland", img: "photos/swiss-sunset-swim.jpg" },
    { place: "Yosemite", region: "Half Dome in snow", img: "photos/yosemite-half-dome.jpg" },
    { place: "Switzerland", region: "Mountain railway", img: "photos/swiss-train.jpg" },
    { place: "Yosemite", region: "Horsetail Fall", img: "photos/yosemite-firefall.jpg" },
    { place: "Bürgenstock", region: "Switzerland", img: "photos/swiss-lake.jpg" },
    { place: "Jungfrau", region: "Switzerland", img: "photos/swiss-lake-reflection.jpg" },
    { place: "Half Moon Bay", region: "", img: "photos/coast-sea-cave.jpg" },
    { place: "Wengen", region: "Switzerland", img: "photos/swiss-hillside.jpg" },
  ],

  /* ---------------- EATS (Beli-style) ---------------- */
  // score is out of 10 like Beli. Sorted automatically, highest first.
  // Bottom of my Beli list. `rank` is where it sits on my list.
  eatsWorst: [
    { rank: 185, name: "Spontini", city: "Milan, Italy", cuisine: "Pizza, Italian", score: 3.9 },
    { rank: 186, name: "MJ Sushi", city: "Palo Alto, CA", cuisine: "Japanese, Sushi", score: 3.8 },
    { rank: 187, name: "La Note", city: "Berkeley, CA", cuisine: "Breakfast, French", score: 3.7 },
    { rank: 188, name: "Restaurant Hermitage", city: "Lucerne, Switzerland", cuisine: "Swiss, International", score: 3.5 },
    { rank: 189, name: "Blue Plate Oysterette", city: "Santa Monica, CA", cuisine: "Bar, Seafood", score: 3.4 },
    { rank: 190, name: "Osteria Il Pozzo", city: "Menaggio, Italy", cuisine: "Italian", score: 2.3 },
    { rank: 191, name: "Lecker Asia", city: "Lauterbrunnen, Switzerland", cuisine: "Japanese", score: 1.2 },
  ],
  eats: [
    // From my Beli "Been" list. Add `order: "..."` to any spot to show what to get.
    { name: "J'ai la patate", city: "Hokkaido, Japan", cuisine: "French, Japanese", score: 10.0 },
    { name: "The Brothers Sushi", city: "Santa Monica, CA", cuisine: "Sushi", score: 10.0 },
    { name: "SANGHYUN", city: "Seoul, South Korea", cuisine: "Omakase", score: 9.9 },
    { name: "Kuni Sushi", city: "Sapporo, Japan", cuisine: "Omakase", score: 9.9 },
    { name: "Ristorante L'Escale", city: "Tremezzina, Italy", cuisine: "Italian, Wine Bar", score: 9.9 },
    { name: "Farmshop", city: "Brentwood, CA", cuisine: "American", score: 9.8 },
    { name: "Matu Kai", city: "Brentwood, CA", cuisine: "Steakhouse", score: 9.8 },
    { name: "Robin", city: "Menlo Park, CA", cuisine: "Omakase", score: 9.8 },
    { name: "Nozawa Bar", city: "Beverly Hills, CA", cuisine: "Omakase", score: 9.8 },
    { name: "yeobo, darling", city: "Menlo Park, CA", cuisine: "Korean, Taiwanese", score: 9.7 },
    { name: "The Mulberry", city: "Sawtelle, LA", cuisine: "Korean", score: 9.7 },
    { name: "White House Tavern", city: "Aspen, CO", cuisine: "Burgers, Sandwiches", score: 9.7 },
  ],

  /* ---------------- QUOTES ---------------- */
  // `note` is my one-line take (optional). Leave author "" if unknown.
  quotes: [
    { text: "Life is a train that stops for no one.", author: "",
      note: "Hit home when I lost my home in the Palisades fire and still had to finish school, move, and get through college interviews. The world doesn't pause, so you don't either." },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela",
      note: "So go do the impossible." },
    { text: "Failure is simply the opportunity to begin again, this time more intelligently.", author: "Henry Ford",
      note: "" },
    { text: "Only those who dare to fail greatly can ever achieve greatly.", author: "Robert F. Kennedy",
      note: "" },
    { text: "I trained four years to run nine seconds.", author: "Usain Bolt",
      note: "The result is the small, visible part. The reps nobody sees are the real work." },
    { text: "Don't practice until you get it right. Practice until you can't get it wrong.", author: "Nick Saban",
      note: "" },
    { text: "There is no tomorrow!", author: "Apollo Creed, Rocky III",
      note: "" },
    { text: "Stay gold, Ponyboy.", author: "Johnny Cade, The Outsiders",
      note: "" },
    { text: "Go be a f***ing dawg.", author: "My dad",
      note: "" },
    { text: "Risk comes from not knowing what you're doing.", author: "Warren Buffett",
      note: "Poker taught me this one: risk isn't the bet, it's betting without an edge." },
    { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg",
      note: "Read it with the one above: take bets, just make them calculated ones." },
    { text: "It never gets easier, you just go faster.", author: "Greg LeMond",
      note: "Mile 120 of a century says hi." },
  ],

  /* ---------------- READS ---------------- */
  showReads: false, // set to true to show the Reads section again
  // type: "book" or "article". tags drive the filter buttons.
  reads: [
    // PLACEHOLDER — swap in your own
    { title: "How to Do Great Work", author: "Paul Graham", type: "article", url: "https://paulgraham.com/greatwork.html", tags: ["career"], note: "Follow the thing you can't stop poking at until it turns into an edge. Basically the problem-solving-junkie manifesto." },
    { title: "Oaktree Memos", author: "Howard Marks", type: "article", url: "https://www.oaktreecapital.com/insights", tags: ["markets"], note: "Second-level thinking is poker for markets: what does everyone else believe, and where are they wrong?" },
    { title: "Moneyball", author: "Michael Lewis", type: "book", url: "", tags: ["sports", "data"], note: "The book that kicked off the data-analytics revolution in sports, and why I spent a summer in Rams play-by-play data." },
    { title: "Thinking in Bets", author: "Annie Duke", type: "book", url: "", tags: ["decisions", "poker"], note: "Judge the decision, not the outcome. Every poker player learns it the hard way; Duke makes it a life rule." },
    { title: "Money Stuff", author: "Matt Levine", type: "article", url: "https://www.bloomberg.com/account/newsletters/money-stuff", tags: ["markets"], note: "Made credit and capital markets click before I ever sat on an underwriting desk, and it's the only finance newsletter that makes me laugh." },
  ],
};
