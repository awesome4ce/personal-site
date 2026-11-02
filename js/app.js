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
  const photo = (p) => `<figure>${p.img ? `<div class="tile nat"><img src="${esc(p.img)}" alt="${esc(p.caption || "")}" loading="lazy"></div>` : `<div class="tile ph"><span>add photo</span></div>`}${p.caption ? `<figcaption>${esc(p.caption)}${p.sub ? `<span>${esc(p.sub)}</span>` : ""}</figcaption>` : ""}</figure>`;
  const header = (title, sub) => {
    const t = TABS.find((x) => x.label.startsWith(title.split(" ")[0]));
    return `<div class="page-head">${t ? `<span class="page-suit ${isRed(t.suit) ? "red" : ""}">${t.suit}</span>` : ""}<div><h1 class="page-title">${esc(title)}</h1><p class="page-sub">${esc(sub)}</p></div></div>`;
  };
  const resumeBtn = (label, cls = "pill solid") => `<a class="${cls} resume-btn" href="${esc(S.resume)}" target="_blank" rel="noopener">${label}</a>`;

  /* ---------- views ---------- */
  const views = {
    home: () => `
      <section class="table">
        <div class="table-text">
          <p class="hello">Hi, I'm</p>
          <h1>${esc(S.name)}</h1>
          <p class="sub">${esc(S.eyebrow)}</p>
          ${S.intro.map((p) => `<p class="intro">${md(p)}</p>`).join("")}
          <div class="pills">
            <a class="pill solid" href="mailto:${esc(S.email)}">email</a>
            <a class="pill" href="${esc(S.linkedin)}" target="_blank" rel="noopener">linkedin</a>
            ${resumeBtn("resume", "pill")}
          </div>
        </div>
        <div class="hand" aria-label="Photo of ${esc(S.name)}">
          <div class="pc pc-back"><span class="ix red">S<br>♥</span><span class="pip red">♥</span><span class="ix red flip">S<br>♥</span></div>
          <div class="pc pc-photo">
            <span class="ix">E<br>♠</span>
            ${S.headshot ? `<img src="${esc(S.headshot)}" alt="${esc(S.name)}">` : `<div class="photo-ph">your photo here<br><small>photos/headshot.jpg</small></div>`}
            <span class="ix flip">E<br>♠</span>
          </div>
        </div>
      </section>
      <section class="grid-2 below">
        <div class="card">
          <p class="eyebrow">${suit("♠")}Right now</p>
          <ul class="now-list">${S.now.map((n) => `<li>${md(n)}</li>`).join("")}</ul>
        </div>
        <div class="card">
          <p class="eyebrow">${suit("♥")}Experience</p>
          <ul class="exp-list">
            ${S.experience.slice(0, 4).map((e) => `
              <li><div><h4>${esc(e.company)}</h4><div class="role">${esc(e.role)}</div></div><div class="when">${esc(e.dates)}</div></li>`).join("")}
          </ul>
          <a class="more" href="#work">Full experience →</a>
        </div>
      </section>`,

    work: () => `
      ${header("Work", "Real estate credit, capital markets, and a little bit of everything data.")}
      <ol class="timeline">
        ${S.experience.map((e) => `
          <li>
            <div class="when">${esc(e.dates)}<br>${esc(e.location)}</div>
            <div>
              <h3>${esc(e.company)}</h3>
              <p class="role">${esc(e.role)}</p>
              ${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
            </div>
          </li>`).join("")}
      </ol>
      <hr class="rule">
      <section class="grid-2">
        <div class="card">
          <p class="eyebrow">${suit("♦")}Education</p>
          <h3>${esc(S.education.school)}</h3>
          <p class="role">${esc(S.education.degree)}</p>
          <p class="meta">${esc(S.education.dates)}</p>
          <ul>${S.education.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
        </div>
        <div class="card">
          <p class="eyebrow">${suit("♣")}Awards</p>
          ${S.awards.map((a) => `<div class="award"><h4>${esc(a.title)}</h4><p>${esc(a.detail)}</p></div>`).join("")}
          <p class="meta" style="margin-top:20px">Tools: ${S.skills.map(esc).join(" · ")}</p>
        </div>
      </section>
      <div class="pills resume-btn">${resumeBtn("Download full resume")}</div>`,

    play: () => `
      ${header("Play", "Mostly bikes. Some snow, some sand, some hardwood.")}
      <h2 class="sec-title">${suit("♠")}Cycling<span>Two favorite centuries</span></h2>
      <div class="rides">
        ${S.rides.map((r) => `
          <article class="card ride">
            <div class="ride-num">${esc(r.miles)}<small>miles</small></div>
            <h3>${esc(r.name)}</h3>
            <p class="meta">${esc(r.date)} · ${esc(r.elevation)} climbing · ${esc(r.where)}</p>
            ${elevation(r.profile)}
            <p>${esc(r.note)}</p>
            <div class="ride-photos">${r.photos.map((p, i) => tile(p, `${r.name} route`)).join("")}</div>
          </article>`).join("")}
      </div>
      ${S.bikePhotos?.length ? `<div class="gallery bikes">${S.bikePhotos.map(photo).join("")}</div>` : ""}
      <hr class="rule">
      <h2 class="sec-title">${suit("♦")}Skiing<span>${esc(S.ski.sub)}</span></h2>
      <p class="lead-line">${esc(S.ski.text)}</p>
      <div class="gallery">${S.ski.photos.map(photo).join("")}</div>
      <hr class="rule">
      <h2 class="sec-title">${suit("♥")}Volleyball<span>${esc(S.volleyball.sub)}</span></h2>
      <p class="lead-line">${esc(S.volleyball.text)}</p>
      <div class="gallery">${S.volleyball.photos.map(photo).join("")}</div>
      <hr class="rule">
      <div class="grid-2">
        ${S.hobbies.map((h, i) => `
          <article class="card">
            <p class="eyebrow">${suit(h.icon || ["♥", "♣"][i % 2])}${esc(h.sub)}</p>
            <h3>${esc(h.title)}</h3>
            <p>${esc(h.text)}</p>
          </article>`).join("")}
      </div>
      <hr class="rule">
      <h2 class="sec-title">${suit("♣")}Places</h2>
      <div class="gallery">${S.travel.map((t) => photo({ img: t.img, caption: t.place, sub: t.region })).join("")}</div>`,

    eats: () => {
      const list = [...S.eats].sort((a, b) => b.score - a.score);
      const tone = (s) => (s >= 8.5 ? "hi" : s >= 7 ? "mid" : "lo");
      return `
      ${header("Eats", "Over 200 places logged on Beli. Here are my top 12. Big sushi guy.")}
      <div class="pills" style="margin:-24px 0 40px"><a class="pill" href="${esc(S.beli)}" target="_blank" rel="noopener">follow me on beli ↗</a></div>
      <ol class="beli">
        ${list.map((e, i) => `
          <li>
            <span class="rank">${i + 1}</span>
            <div><h4>${esc(e.name)}</h4><p class="meta">${esc(e.cuisine)} · ${esc(e.city)}</p>${e.order ? `<p class="order">Order: ${esc(e.order)}</p>` : ""}</div>
            <span class="score ${tone(e.score)}">${Number(e.score).toFixed(1)}</span>
          </li>`).join("")}
      </ol>
`;
    },

    reads: () => {
      const tags = [...new Set(S.reads.flatMap((r) => [r.type === "book" ? "books" : "articles", ...r.tags]))];
      return `
      ${header("Quotes & Reads", "Lines I keep coming back to, and things worth your time.")}
      <div class="deal-area">
        <div class="deal-stage">
          <div class="shoe" aria-hidden="true"><span class="shoe-cards"></span><span class="shoe-mouth"></span></div>
          <div class="qcard" id="qcard"><div class="qcard-inner">
            <div class="qcard-back"></div>
            <div class="qcard-front"><span class="ix" id="q-ix">A<br>♠</span><blockquote id="q-text"></blockquote><cite id="q-by"></cite></div>
          </div></div>
        </div>
        <div class="deal-copy"><p>Can't decide? Let the shoe pick one.</p><button class="pill solid" id="deal">Deal a quote</button></div>
      </div>
      <ul class="quotes">
        ${S.quotes.map((q) => `<li class="quote"><figure><blockquote>“${esc(q.text)}”</blockquote>${q.author ? `<figcaption>— ${esc(q.author)}</figcaption>` : ""}</figure></li>`).join("")}
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

  const after = {
    reads: () => {
      const card = $("#qcard");
      const ranks = ["A", "K", "Q", "J", "10", "9"];
      let last = -1, first = true;
      let busy = false;
      const deal = () => {
        if (busy) return; busy = true;
        let i; do { i = (Math.random() * S.quotes.length) | 0; } while (S.quotes.length > 1 && i === last);
        last = i;
        const go = () => {
          const s = SUITS[(Math.random() * 4) | 0];
          const ix = $("#q-ix");
          ix.innerHTML = `${ranks[(Math.random() * ranks.length) | 0]}<br>${s}`;
          ix.className = "ix" + (isRed(s) ? " red" : "");
          $("#q-text").textContent = `“${S.quotes[i].text}”`;
          $("#q-by").textContent = S.quotes[i].author ? `— ${S.quotes[i].author}` : "";
          card.className = "qcard";            // reset: face down, back in the shoe
          void card.offsetWidth;
          card.classList.add("dealing");       // slide out of the shoe + pop
          setTimeout(() => card.classList.add("flipped"), 750);   // reveal
          setTimeout(() => (busy = false), 1350);
        };
        if (first) { first = false; go(); return; }
        card.classList.add("toss");            // old card leaves first
        setTimeout(go, 280);
      };
      $("#deal").addEventListener("click", deal);
      card.addEventListener("click", deal);
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

  function route() {
    const id = (location.hash || "#home").slice(1);
    const tab = views[id] ? id : "home";
    nav.querySelectorAll("a").forEach((a) => (a.dataset.id === tab ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    const main = $("#main");
    window.scrollTo({ top: 0, behavior: "instant" });   // jump, don't smooth-scroll, between pages
    main.innerHTML = views[tab]();
    after[tab]?.();
    hideResume();
    reveal(main);
  }

  // click any photo to see it big
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".tile img");
    const box = document.querySelector(".lightbox");
    if (box) { box.remove(); return; }
    if (!img) return;
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<img src="${img.src}" alt=""><p>${esc(img.alt)}</p>`;
    document.body.appendChild(lb);
  });
  addEventListener("keydown", (e) => { if (e.key === "Escape") document.querySelector(".lightbox")?.remove(); });

  if (S.resume && location.protocol !== "file:") {
    fetch(S.resume, { method: "HEAD" }).then((r) => (resumeOk = r.ok)).catch(() => (resumeOk = false)).finally(hideResume);
  }
  addEventListener("hashchange", route);
  route();
})();
