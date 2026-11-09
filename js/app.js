(() => {
  const S = window.SITE;
  const $ = (q, el = document) => el.querySelector(q);
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); // **bold** support in data.js
  const SUITS = ["♠", "♥", "♦", "♣"];
  const isRed = (s) => s === "♥" || s === "♦";
  const suit = (s) => `<span class="s ${isRed(s) ? "red" : ""}">${s}</span>`;

  const TABS = [
    { id: "work", label: "Work", suit: "♠" },
    { id: "play", label: "Play", suit: "♥" },
    { id: "eats", label: "Eats", suit: "♦" },
    { id: "reads", label: "Quotes & Reads", suit: "♣" },
  ];

  $("#year").textContent = new Date().getFullYear();
  if (S.updated) $("#updated").textContent = ` · Last updated ${S.updated}`;

  /* ---------- helpers ---------- */
  const tile = (src, label = "") =>
    src
      ? `<div class="tile"><img src="${esc(src)}" alt="${esc(label)}" loading="lazy"></div>`
      : `<div class="tile ph"><span>${esc(label || "add photo")}</span></div>`;

  function elevation(profile) {
    const w = 300, h = 64, max = Math.max(...profile), min = Math.min(...profile);
    const pts = profile.map((v, i) => [(i / (profile.length - 1)) * w, h - 4 - ((v - min) / (max - min || 1)) * (h - 10)]);
    const line = pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
    return `<svg class="elev" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      <polygon points="0,${h} ${line} ${w},${h}" class="elev-fill"/><polyline points="${line}" class="elev-line"/></svg>`;
  }
  // natural-aspect photo for masonry galleries (click to enlarge)
  const photo = (p) => `<figure>${p.img ? `<div class="tile nat" style="aspect-ratio:${ratio(p.img)}"><img src="${esc(p.img)}" alt="${esc(p.caption || "")}" loading="lazy"></div>` : `<div class="tile ph"><span>add photo</span></div>`}${p.caption ? `<figcaption>${esc(p.caption)}${p.sub ? `<span>${esc(p.sub)}</span>` : ""}</figcaption>` : ""}</figure>`;
  const ratio = (src) => (window.PHOTO_SIZES || {})[src] || 0.75;
  const gallery = (items, cls = "", cols = 3) => {
    const colsHtml = Array.from({ length: cols }, () => []);
    const heights = Array(cols).fill(0);
    items.forEach((p) => {
      const c = heights.indexOf(Math.min(...heights));
      colsHtml[c].push(photo(p));
      heights[c] += 1 / ratio(p.img) + 0.12;   // + caption allowance
    });
    return `<div class="gallery ${cls}">${colsHtml.map((c) => `<div class="gcol">${c.join("")}</div>`).join("")}</div>`;
  };
  // company logo from its website's icon; falls back to an initials badge if it can't load
  const initials = (name) => name.replace(/\(.*?\)/g, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
  // `domain` can be a website (logo fetched from its icon) or a local file like "photos/logos/x.png"
  const logo = (name, domain, size = "", pad = false) => {
    const src = !domain ? "" : domain.includes("/") ? domain : `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
    return `<span class="logo ${size} ${pad ? "pad" : ""}" data-i="${esc(initials(name))}">${src
      ? `<img src="${esc(src)}" alt="" loading="lazy" onerror="this.remove()" onload="if(this.naturalWidth<32)this.remove()">` : ""}</span>`;
  };
  // Home background: running averages of noisy bets converging on their expected value (law of large numbers)
  function evBackground() {
    // Law of large numbers: running averages of noisy bets swing wildly, then converge on the expected value.
    let seed = 7;
    const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const W = 1600, H = 420, mid = H * 0.52, n = 260, j0 = 1, paths = [];
    const A = H * 0.47;                                        // max swing (soft-limited, so spikes never flatten)
    const series = [];
    for (let k = 0; k < 7; k++) {
      let sum = 0, d = "";
      const pts = [];
      series.push(pts);
      for (let j = 1; j <= n; j++) {
        let draw = (rand() + rand() + rand() - 1.5) * 3.4;       // one noisy outcome, mean 0 (= EV)
        if (k === 1 && j <= 3) draw = 3.2 - j * 0.4;              // one line gets a hot start, way above EV
        sum += draw;
        if (j < j0) continue;
        const x = Math.pow((j - j0) / (n - j0), 0.68) * W;       // give the wild early part more room
        const y = mid - A * Math.tanh((sum / j) / 1.6);           // running average so far
        pts.push([x, y]);
        d += `${j === j0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      }
      paths.push(`<path class="${k === 3 ? "hot" : ""}" d="${d}" pathLength="1" style="animation-delay:${(k * 0.15).toFixed(2)}s"/>`);
    }
    evBackground.edges = { left: mid / H, right: mid / H };
    evBackground.geo = { W, H, mid, series };
    return `<svg class="ev-bg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
      <line class="ev-line" x1="0" y1="${mid}" x2="${W}" y2="${mid}"/>
      ${paths.join("")}
    </svg>`;
  }
  const header = (title, sub, aside = "", extra = "") => {
    const t = TABS.find((x) => x.label.startsWith(title.split(" ")[0]));
    return `<div class="page-head">${t ? `<span class="page-suit ${isRed(t.suit) ? "red" : ""}">${t.suit}</span>` : ""}<div><h1 class="page-title">${esc(title)}</h1><p class="page-sub">${esc(sub)}</p>${aside ? `<p class="aside">${esc(aside)}</p>` : ""}${extra}</div></div>`;
  };
  const resumeBtn = (label, cls = "pill solid") => `<a class="${cls} resume-btn" href="${esc(S.resume)}" target="_blank" rel="noopener">${label}</a>`;

  /* ---------- views ---------- */
  const views = {
    home: () => `
      <div class="hero-wrap" id="hero-wrap">
      ${evBackground()}
      <div class="ev-tip" aria-hidden="true" style="--yl:${evBackground.edges.left};--yr:${evBackground.edges.right}"><span class="ev-dash"></span><i>LLN</i> · motto of life</div>
      <section class="table">

        <div class="table-text">
          <h1>${esc(S.name)}</h1>
          <p class="sub">${esc(S.eyebrow).replace(/ · /g, ' <span class="dot">·</span> ')}</p>
          ${S.intro.map((p) => `<p class="intro">${md(p)}</p>`).join("")}
          <div class="pills">
            <a class="pill solid" href="mailto:${esc(S.email)}">email</a>
            <a class="pill" href="${esc(S.linkedin)}" target="_blank" rel="noopener">linkedin</a>
            ${resumeBtn("resume", "pill")}
          </div>
        </div>
        <div class="hand ${S.babyPhoto ? "swappable" : ""}" id="hand" ${S.babyPhoto ? `role="button" tabindex="0" aria-label="Photos of ${esc(S.name)}: click to switch cards"` : `aria-label="Photo of ${esc(S.name)}"`}>
          <div class="pc pc-photo behind" data-card="then">
            <span class="ix red">S<br>♥</span>
            ${S.babyPhoto ? `<img src="${esc(S.babyPhoto)}" alt="${esc(S.name)} as a baby">` : `<div class="plain-back"><span class="pip red">♥</span></div>`}
            <span class="ix red flip">S<br>♥</span>
            ${S.babyPhoto ? `<span class="pc-tag">then</span>` : ""}
          </div>
          <div class="pc pc-photo front" data-card="now">
            <span class="ix">E<br>♠</span>
            ${S.headshot ? `<img src="${esc(S.headshot)}" alt="${esc(S.name)}">` : `<div class="photo-ph">your photo here<br><small>photos/headshot.jpg</small></div>`}
            <span class="ix flip">E<br>♠</span>
            ${S.babyPhoto ? `<span class="pc-tag">now</span>` : ""}
          </div>
          ${S.babyPhoto ? `<span class="hand-hint">tap to switch</span>` : ""}
        </div>
      </section>
      </div>
      <section class="grid-2 below">
        <div class="card">
          <p class="eyebrow">${suit("♠")}Right now</p>
          <ul class="now-list">${S.now.map((n) => `<li>${md(n)}</li>`).join("")}</ul>
        </div>
        <div class="card">
          <p class="eyebrow">${suit("♥")}Where I've been</p>
          <ul class="exp-list">
            ${S.experience.slice(0, 4).map((e) => `
              <li>${logo(e.company, e.logo, "sm", e.logoPad)}<div class="exp-main"><h4>${esc(e.company.replace(/\s*\(.*\)/, ""))}</h4><div class="role">${esc(e.role)}</div></div></li>`).join("")}
          </ul>
          <a class="more" href="#work">See the work →</a>
        </div>
      </section>`,

    work: () => {
      const W = S.work, SU = ["♠", "♥", "♦", "♣"];
      return `
      ${header("Work", "")}
      <p class="story">${esc(W.story)}</p>
      <ol class="path">
        ${W.path.map((p, i) => `<li>${p.to ? `<a href="#work" data-to="${esc(p.to)}">` : "<span>"}${suit(SU[i % 4])}${esc(p.label)}${p.note ? ` <em>${esc(p.note)}</em>` : ""}${p.to ? "</a>" : "</span>"}</li>`).join("")}
      </ol>
      <div class="jobs">
        ${W.cards.map((c) => `
          <article class="card job" id="job-${esc(c.id)}">
            <div class="co">${logo(c.company, c.logo, "sm", c.logoPad)}<div><h4>${esc(c.company)}</h4><p class="role">${esc(c.role)} · ${esc(c.when)}</p></div></div>
            <div class="stat">${esc(c.stat)}<small>${esc(c.statLabel)}</small></div>
            <p class="blurb">${esc(c.line)}</p>
            ${c.learned ? `<p class="learned">${esc(c.learned)}</p>` : ""}
          </article>`).join("")}
      </div>
      <div class="card next-up" id="job-${esc(W.next.id)}">
        ${logo(W.next.company, W.next.logo)}
        <div><p class="eyebrow">${suit("♠")}Next</p><h3>${esc(W.next.company)}</h3><p class="role">${esc(W.next.line)}</p></div>
      </div>
      <p class="boring resume-btn"><a href="${esc(S.resume)}" target="_blank" rel="noopener">Full resume (PDF) ↗</a></p>`;
    },

    play: () => `
      ${header("Play", "Mostly bikes. Some snow, some sand.", "Working hard, or hardly working?")}
      <h2 class="sec-title">${suit("♠")}Cycling<span>Two favorite centuries</span></h2>
      <div class="rides">
        ${S.rides.map((r, i) => `
          <article class="card ride pcard-ride ${["♥","♦"].includes(r.suit || ["♠","♥"][i % 2]) ? "is-red" : ""}">
            <span class="ix">${esc(r.rank || ["A","K"][i % 2])}<br>${r.suit || ["♠","♥"][i % 2]}</span>
            <span class="ix flip">${esc(r.rank || ["A","K"][i % 2])}<br>${r.suit || ["♠","♥"][i % 2]}</span>
            <div class="ride-num">${esc(r.miles)}<small>miles</small></div>
            <h3>${esc(r.name)}</h3>
            <p class="meta">${esc(r.date)} · ${esc(r.elevation)} climbing · ${esc(r.where)}</p>
            ${elevation(r.profile)}
            <p>${esc(r.note)}</p>
            <div class="ride-photos">${r.photos.map((p, i) => tile(p, `${r.name} route`)).join("")}</div>
          </article>`).join("")}
      </div>
      ${S.bikePhotos?.length ? gallery(S.bikePhotos, "bikes") : ""}
      <hr class="rule">
      <h2 class="sec-title">${suit("♦")}Skiing<span>${esc(S.ski.sub)}</span></h2>
      <p class="lead-line">${esc(S.ski.text)}</p>
      ${gallery(S.ski.photos)}
      <hr class="rule">
      <h2 class="sec-title">${suit("♥")}Volleyball<span>${esc(S.volleyball.sub)}</span></h2>
      <p class="lead-line">${esc(S.volleyball.text)}</p>
      ${gallery(S.volleyball.photos)}
      ${S.hobbies.length ? `<hr class="rule"><div class="grid-2">${S.hobbies.map((h, i) => `
        <article class="card">
          <p class="eyebrow">${suit(h.icon || ["♥", "♣"][i % 2])}${esc(h.sub)}</p>
          <h3>${esc(h.title)}</h3>
          <p>${esc(h.text)}</p>
        </article>`).join("")}</div>` : ""}
      <hr class="rule">
      <h2 class="sec-title">${suit("♣")}Places</h2>
      ${gallery(S.travel.map((t) => ({ img: t.img, caption: t.place, sub: t.region })))}`,

    eats: () => {
      const list = [...S.eats].sort((a, b) => b.score - a.score);
      // chip denomination by score: high roller (black/gold) → green → red → plain white
      const chipTier = (s) => (s >= 9.5 ? "c-black" : s >= 7 ? "c-green" : s >= 3.5 ? "c-red" : "c-white");
      const row = (e, rank, cls = "") => `
          <li class="${cls}">
            <span class="rank">${rank}</span>
            <div><h4>${esc(e.name)}</h4><p class="meta">${esc(e.cuisine)} · ${esc(e.city)}</p>${e.order ? `<p class="order">Order: ${esc(e.order)}</p>` : ""}</div>
            <span class="chip-score ${chipTier(e.score)}" title="${Number(e.score).toFixed(1)} / 10 on Beli">
              <svg viewBox="0 0 56 56" aria-hidden="true">
                <circle class="c-body" cx="28" cy="28" r="27"/>
                <circle class="c-edge" cx="28" cy="28" r="23.5"/>
                <circle class="c-ring" cx="28" cy="28" r="19"/>
                <circle class="c-face" cx="28" cy="28" r="17.6"/>
              </svg>
              <b>${Number(e.score).toFixed(1)}</b>
            </span>
          </li>`;
      return `
      ${header("Eats", "Almost 200 places logged on Beli: the best of them, and a few I'd skip. Big sushi guy.", "AI can do a lot. It can't taste.",
        `<div class="pills head-pills"><a class="pill sm" href="${esc(S.beli)}" target="_blank" rel="noopener">Follow me on Beli ↗</a><button class="pill sm" id="rain">Make it rain</button></div>`)}
      <h2 class="sec-title">${suit("♥")}Top of my list</h2>
      <ol class="beli top" id="beli-top">${list.map((e, i) => row(e, i + 1, i >= 6 ? "extra" : "")).join("")}</ol>
      ${list.length > 6 ? `<button class="pill see-more" id="see-more">See all ${list.length} ↓</button>` : ""}
      ${S.eatsWorst?.length ? `
      <hr class="rule rule-lg">
      <h2 class="sec-title">${suit("♣")}And the ones I'd skip<span>bottom of my list</span></h2>
      <ol class="beli worst">${[...S.eatsWorst].sort((a, b) => a.rank - b.rank).map((e) => row(e, e.rank)).join("")}</ol>` : ""}`;
    },

    reads: () => {
      const tags = [...new Set(S.reads.flatMap((r) => [r.type === "book" ? "books" : "articles", ...r.tags]))];
      return `
      ${header("Quotes & Reads", "Keep moving when life won't wait, put in the reps nobody sees, and take the good bets. Plus a few reads worth your time.")}
      <div class="deal-area">
        <div class="deal-stage">
          <div class="shoe" aria-hidden="true">
            <svg viewBox="0 0 180 120">
              <defs>
                <pattern id="cb" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" fill="#a8352b"/><rect width="1.4" height="5" fill="#c4574c"/></pattern>
              </defs>
              <ellipse cx="92" cy="112" rx="80" ry="6" fill="rgba(0,0,0,.12)"/>
              <!-- body: wedge-shaped shoe, tall at the front (right) -->
              <path d="M8 58 L150 22 Q160 20 162 30 L166 98 Q166 106 158 106 L16 106 Q8 106 8 98 Z" fill="#2a3530"/>
              <!-- see-through top: the deck of cards inside, slanted toward the front -->
              <path d="M18 60 L146 29 L148 52 L20 84 Z" fill="#fff"/>
              <g stroke="#cfc6b4" stroke-width="1">
                ${Array.from({ length: 22 }, (_, i) => { const x = 22 + i * 5.8; return `<line x1="${x}" y1="${59 - i * 1.4}" x2="${x + 1.4}" y2="${83 - i * 1.4}"/>`; }).join("")}
              </g>
              <path d="M18 60 L146 29 L148 52 L20 84 Z" fill="none" stroke="#1b2420" stroke-width="2"/>
              <!-- brass trim -->
              <path d="M8 58 L150 22" stroke="#c9a24a" stroke-width="3" stroke-linecap="round"/>
              <!-- front slot with a card sliding out -->
              <rect x="146" y="70" width="18" height="26" rx="4" fill="#141b17"/>
              <g transform="rotate(-8 168 86)">
                <rect x="150" y="76" width="30" height="20" rx="2.5" fill="#fff"/>
                <rect x="152.5" y="78.5" width="25" height="15" rx="1.5" fill="url(#cb)"/>
              </g>
              <path d="M146 96 Q156 101 166 96" stroke="#c9a24a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="qcard" id="qcard"><div class="qcard-inner">
            <div class="qcard-back"></div>
            <div class="qcard-front"><span class="ix" id="q-ix">A<br>♠</span><blockquote id="q-text"></blockquote><cite id="q-by"></cite></div>
          </div></div>
        </div>
        <div class="deal-copy"><p>One card from the shoe. Your move.</p><button class="pill solid deal-btn" id="deal">Flip it over</button></div>
      </div>
      <ul class="quotes">
        ${S.quotes.map((q) => `<li class="quote"><figure><blockquote>“${esc(q.text)}”</blockquote>${q.author ? `<figcaption>— ${esc(q.author)}</figcaption>` : ""}${q.note ? `<p class="qnote">${esc(q.note)}</p>` : ""}</figure></li>`).join("")}
      </ul>
      <hr class="rule">
      <h2 class="sec-title">${suit("♣")}Reads</h2>
      <div class="filters" id="filters"><button class="chip on" data-f="all">all</button>${tags.map((t) => `<button class="chip" data-f="${esc(t)}">${esc(t)}</button>`).join("")}</div>
      <ul class="reads" id="reads-list">
        ${S.reads.map((r) => `
          <li data-tags="${esc([r.type === "book" ? "books" : "articles", ...r.tags].join(" "))}">
            <span class="rtype">${r.type === "book" ? "BOOK" : "READ"}</span>
            <div>
              <h4>${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)} ↗</a>` : esc(r.title)}</h4>
              <p class="meta">${esc(r.author)}</p>
              <p>${esc(r.note)}</p>
            </div>
          </li>`).join("")}
      </ul>`;
    },
  };

  // 🍣 a short burst of falling sushi (Eats page)
  const SUSHI = ["🍣", "🍣", "🍣", "🍙", "🍤", "🍱", "🥢", "🐟"];
  function sushiRain(n = 34) {
    if (reduceMotion) return;
    const box = document.createElement("div");
    box.className = "sushi-rain";
    for (let i = 0; i < n; i++) {
      const el = document.createElement("span");
      el.textContent = SUSHI[(Math.random() * SUSHI.length) | 0];
      el.style.left = `${Math.random() * 100}vw`;
      el.style.fontSize = `${22 + Math.random() * 26}px`;
      el.style.animationDuration = `${2.4 + Math.random() * 1.8}s`;
      el.style.animationDelay = `${Math.random() * 1.4}s`;
      el.style.setProperty("--spin", `${(Math.random() * 2 - 1) * 540}deg`);
      el.style.setProperty("--drift", `${(Math.random() * 2 - 1) * 60}px`);
      box.appendChild(el);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 5000);
  }

  // Home: hovering the margins beside the green panel brings the EV lines into focus
  if (matchMedia("(hover: hover)").matches) {
    const nearLine = (svg, cx, cy, px = 22) => {
      const g = evBackground.geo, r = svg.getBoundingClientRect();
      const x = ((cx - r.left) / r.width) * g.W, sy = r.height / g.H;
      const yAt = (pts) => {                       // line's height at this x (pts are sorted by x)
        let lo = 0, hi = pts.length - 1;
        if (x <= pts[0][0]) return pts[0][1];
        if (x >= pts[hi][0]) return pts[hi][1];
        while (hi - lo > 1) { const m = (lo + hi) >> 1; (pts[m][0] < x ? (lo = m) : (hi = m)); }
        const [x0, y0] = pts[lo], [x1, y1] = pts[hi];
        return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0 || 1);
      };
      const cySvg = cy - r.top;
      // inside the spread of lines at this x (gaps count), plus a small margin
      const ys = [...g.series.map(yAt), g.mid].map((y) => y * sy);
      return cySvg >= Math.min(...ys) - px && cySvg <= Math.max(...ys) + px;
    };
    document.addEventListener("mousemove", (e) => {
      const wrap = document.getElementById("hero-wrap");
      if (!wrap) return;
      const t = wrap.querySelector(".table").getBoundingClientRect();
      const outside = e.clientX < t.left || e.clientX > t.right;
      const on = outside && nearLine(wrap.querySelector(".ev-bg"), e.clientX, e.clientY);
      wrap.classList.toggle("ev-focus", on);
      if (on) wrap.dataset.side = e.clientX < t.left ? "left" : "right";
    });
  }

  // Quote "shoe": shuffle all the quotes once per visit, then loop through that same order forever.
  // Every quote comes up once per lap, and the same card can never be dealt twice in a row.
  const quoteOrder = S.quotes.map((_, i) => i);
  for (let i = quoteOrder.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [quoteOrder[i], quoteOrder[j]] = [quoteOrder[j], quoteOrder[i]]; }
  let quotePos = 0;
  const nextQuote = () => quoteOrder[quotePos++ % quoteOrder.length];

  const after = {
    work: () => {
      document.querySelectorAll(".path a[data-to]").forEach((a) => a.addEventListener("click", (e) => {
        e.preventDefault();
        const el = document.getElementById("job-" + a.dataset.to);
        if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); }
      }));
    },
    home: () => {
      const hand = $("#hand");
      if (!reduceMotion && hand.animate) {
        // deal the two photo cards in: they start stacked below, then fan out into place
        [...hand.querySelectorAll(".pc")].reverse().forEach((card, i) => {
          const end = getComputedStyle(card).transform;
          card.animate(
            [{ transform: "translate(0, 70px) rotate(0deg) scale(.92)", opacity: 0 }, { transform: "translate(0, 0) rotate(0deg)", opacity: 1, offset: .45 }, { transform: end, opacity: 1 }],
            { duration: 900, delay: 120 + i * 140, easing: EASE, fill: "backwards" });
        });
      }
      if (!S.babyPhoto) return;          // swap turns on once there's a baby photo
      let busy = false;
      const swap = () => {
        if (busy) return; busy = true;
        const front = hand.querySelector(".front"), back = hand.querySelector(".behind");
        back.classList.add("pull");                       // slide the back card out to the side
        setTimeout(() => {
          back.classList.remove("pull", "behind"); back.classList.add("front");
          front.classList.remove("front"); front.classList.add("behind");
          hand.classList.add("used");
          setTimeout(() => (busy = false), 450);
        }, 260);
      };
      hand.addEventListener("click", swap);
      // don't leave the baby photo up: swap back when the mouse leaves (or after a few seconds on touch screens)
      const thenUp = () => hand.querySelector(".front").dataset.card === "then";
      let backTimer;
      hand.addEventListener("mouseleave", () => { clearTimeout(backTimer); backTimer = setTimeout(() => { if (thenUp()) swap(); }, 350); });
      hand.addEventListener("mouseenter", () => clearTimeout(backTimer));
      if (!matchMedia("(hover: hover)").matches) {
        hand.addEventListener("click", () => { clearTimeout(backTimer); backTimer = setTimeout(() => { if (thenUp()) swap(); }, 4000); });
      }
      hand.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); swap(); } });
    },
    eats: () => {
      $("#rain").addEventListener("click", () => sushiRain());
      const more = $("#see-more");
      if (more) more.addEventListener("click", () => {
        const ol = $("#beli-top"), open = ol.classList.toggle("open");
        more.textContent = open ? "Show top 6 ↑" : `See all ${ol.children.length} ↓`;
        if (!open) ol.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    reads: () => {
      const card = $("#qcard");
      const btn = $("#deal");
      const ranks = ["A", "K", "Q", "J", "10", "9"];
      let first = true, busy = false, faceUp = false;
      // deal a new card out of the shoe, face DOWN
      const deal = () => {
        if (busy) return; busy = true;
        const i = nextQuote();
        const go = () => {
          const s = SUITS[(Math.random() * 4) | 0];
          const ix = $("#q-ix");
          ix.innerHTML = `${ranks[(Math.random() * ranks.length) | 0]}<br>${s}`;
          ix.className = "ix" + (isRed(s) ? " red" : "");
          $("#q-text").textContent = `“${S.quotes[i].text}”`;
          $("#q-by").textContent = S.quotes[i].author ? `— ${S.quotes[i].author}` : "";
          card.className = "qcard";
          void card.offsetWidth;
          card.classList.add("dealing");
          faceUp = false;
          btn.textContent = "Flip it over";
          setTimeout(() => (busy = false), 1100);
        };
        if (first) { first = false; go(); return; }
        card.classList.add("toss");
        setTimeout(go, 360);
      };
      // reveal the card that's on the table
      const flip = () => {
        if (busy || faceUp) return;
        card.classList.add("flipped");
        faceUp = true;
        btn.textContent = "Deal another";
      };
      const next = () => (faceUp ? deal() : flip());
      btn.addEventListener("click", next);
      card.addEventListener("click", next);
      setTimeout(deal, 300);

      $("#filters").addEventListener("click", (e) => {
        const b = e.target.closest(".chip"); if (!b) return;
        document.querySelectorAll("#filters .chip").forEach((c) => c.classList.toggle("on", c === b));
        document.querySelectorAll("#reads-list li").forEach((li) => {
          li.hidden = b.dataset.f !== "all" && !li.dataset.tags.split(" ").includes(b.dataset.f);
        });
      });
    },
  };

  /* ---------- router ---------- */
  const nav = $("#tabs");
  nav.innerHTML = TABS.map((t) => `<a href="#${t.id}" data-id="${t.id}">${suit(t.suit)}${t.label}</a>`).join("");

  let resumeOk = !!S.resume;
  const hideResume = () => { if (!resumeOk) document.querySelectorAll(".resume-btn").forEach((b) => (b.hidden = true)); };

  // Fade blocks in as they scroll into view. One rule for every page:
  // each "block" fades up once; blocks that arrive together stagger top-to-bottom, left-to-right.
  const BLOCKS = [
    ".page-head", ".table", ".card", ".sec-title", ".lead-line", ".pills", ".rule",
    ".timeline > li", ".gallery figure", ".beli li", ".quote", ".reads li", ".filters", ".deal-area",
  ].join(",");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = "IntersectionObserver" in window && !reduceMotion
    ? new IntersectionObserver((entries) => {
        const shown = entries.filter((e) => e.isIntersecting)
          .sort((x, y) => (x.boundingClientRect.top - y.boundingClientRect.top) || (x.boundingClientRect.left - y.boundingClientRect.left));
        shown.forEach((e, i) => {
          e.target.style.transitionDelay = `${Math.min(i, 5) * 80}ms`;
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        });
      }, { rootMargin: "0px 0px -6% 0px", threshold: 0.05 })
    : null;
  function reveal(root) {
    if (!io) return;
    const all = [...root.querySelectorAll(BLOCKS)];
    // only animate outermost blocks, so nothing fades twice (e.g. a card and its contents)
    all.filter((el) => !all.some((o) => o !== el && o.contains(el))).forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  // sliding underline under the active tab
  const bar = document.createElement("span");
  bar.className = "tab-bar";
  nav.appendChild(bar);
  function moveBar(animate = true) {
    const a = nav.querySelector('a[aria-current="page"]');
    if (!animate) bar.style.transition = "none";
    if (a) {
      bar.style.width = a.offsetWidth + "px";
      bar.style.transform = `translateX(${a.offsetLeft}px)`;
      bar.style.opacity = "1";
    } else bar.style.opacity = "0";
    if (!animate) { void bar.offsetWidth; bar.style.transition = ""; }
  }
  addEventListener("resize", () => moveBar(false));
  document.fonts?.ready.then(() => moveBar(false));

  const ORDER = ["home", ...TABS.map((t) => t.id)];
  const EASE = "cubic-bezier(.22,1,.36,1)";
  let current = null, swapping = Promise.resolve();

  function render(tab) {
    const main = $("#main");
    window.scrollTo({ top: 0, behavior: "instant" });   // jump, don't smooth-scroll, between pages
    main.innerHTML = views[tab]();
    after[tab]?.();
    hideResume();
    reveal(main);
  }

  function route() {
    const id = (location.hash || "#home").slice(1);
    const tab = views[id] ? id : "home";
    nav.querySelectorAll("a").forEach((a) => (a.dataset.id === tab ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    const first = current === null;
    moveBar(!first);
    const dir = first ? 0 : Math.sign(ORDER.indexOf(tab) - ORDER.indexOf(current));   // +1 = moving right
    current = tab;
    const main = $("#main");
    if (first || !dir || reduceMotion || !main.animate) { render(tab); return; }
    // swipe: old page slides out one way, new page slides in from the other side
    swapping = swapping.then(() =>
      main.animate([{ transform: "none", opacity: 1 }, { transform: `translateX(${-dir * 60}px)`, opacity: 0 }], { duration: 160, easing: "ease-in", fill: "forwards" }).finished
        .then(() => {
          render(tab);
          return main.animate([{ transform: `translateX(${dir * 80}px)`, opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 380, easing: EASE }).finished;
        })
        .then(() => main.getAnimations().forEach((a) => a.cancel()))
        .catch(() => {})
    );
  }

  // click any photo: it grows out of its spot into the lightbox, and shrinks back on close
  let lbSource = null;
  const flipFrom = (from, to) => {
    const dx = from.left + from.width / 2 - (to.left + to.width / 2), dy = from.top + from.height / 2 - (to.top + to.height / 2);
    return `translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height})`;
  };
  function closeLightbox() {
    const lb = document.querySelector(".lightbox");
    if (!lb || lb.dataset.closing) return;
    lb.dataset.closing = "1";
    const big = lb.querySelector("img");
    if (reduceMotion || !lbSource || !lbSource.isConnected || !big.animate) { lb.remove(); return; }
    big.animate([{ transform: "none" }, { transform: flipFrom(lbSource.getBoundingClientRect(), big.getBoundingClientRect()) }], { duration: 300, easing: EASE, fill: "forwards" });
    lb.animate([{ backgroundColor: "rgba(24,22,18,.88)" }, { backgroundColor: "rgba(24,22,18,0)" }], { duration: 300, easing: "ease", fill: "forwards" }).finished.then(() => lb.remove());
    lb.querySelector("p").style.opacity = "0";
  }
  document.addEventListener("click", (e) => {
    if (document.querySelector(".lightbox")) { closeLightbox(); return; }
    const img = e.target.closest(".tile img");
    if (!img) return;
    lbSource = img;
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<img src="${img.src}" alt=""><p>${esc(img.alt)}</p>`;
    document.body.appendChild(lb);
    const big = lb.querySelector("img");
    if (reduceMotion || !big.animate) return;
    lb.style.animation = "none";
    const grow = () => {
      big.animate([{ transform: flipFrom(img.getBoundingClientRect(), big.getBoundingClientRect()) }, { transform: "none" }], { duration: 420, easing: EASE });
      lb.animate([{ backgroundColor: "rgba(24,22,18,0)" }, { backgroundColor: "rgba(24,22,18,.88)" }], { duration: 300, easing: "ease" });
    };
    big.complete ? grow() : big.addEventListener("load", grow, { once: true });
  });
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  if (S.resume && location.protocol !== "file:") {
    fetch(S.resume, { method: "HEAD" }).then((r) => (resumeOk = r.ok)).catch(() => (resumeOk = false)).finally(hideResume);
  }
  // footer checkmate: play when the footer scrolls into view (replays on each page)
  const mate = $("#mate");
  const mateIO = "IntersectionObserver" in window
    ? new IntersectionObserver(([e]) => { if (e.isIntersecting) { mate.classList.add("go"); mateIO.unobserve(mate); } }, { threshold: 1 })
    : null;
  const armMate = () => { if (!mateIO) return; mate.classList.remove("go"); void mate.offsetWidth; mateIO.unobserve(mate); mateIO.observe(mate); };
  addEventListener("hashchange", armMate);
  armMate();

  addEventListener("hashchange", route);
  route();
})();
