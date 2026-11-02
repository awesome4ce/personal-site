(() => {
  const S = window.SITE;
  const $ = (q, el = document) => el.querySelector(q);
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const TABS = [
    { id: "about", label: "About", suit: "♠" },
    { id: "work", label: "Work", suit: "♥" },
    { id: "play", label: "Play", suit: "♦" },
    { id: "eats", label: "Eats", suit: "♣" },
    { id: "reads", label: "Quotes / Reads", suit: "♠" },
  ];
  const redSuit = (s) => s === "♥" || s === "♦";

  /* ---------- header ---------- */
  $("#name").textContent = S.name;
  $("#tagline").textContent = S.tagline;
  $("#year").textContent = new Date().getFullYear();
  if (S.headshot) {
    const img = $("#headshot");
    img.src = S.headshot; img.hidden = false; $("#headshot-ph").hidden = true;
  }
  // tap-to-flip for touch screens
  document.querySelectorAll(".pcard").forEach((c) => c.addEventListener("click", () => c.classList.toggle("flipped")));

  /* ---------- helpers ---------- */
  const tile = (src, label = "", sub = "") =>
    src
      ? `<div class="tile"><img src="${esc(src)}" alt="${esc(label)}" loading="lazy"></div>`
      : `<div class="tile ph"><span class="mono">${esc(sub || "add photo")}</span><b>${esc(label)}</b></div>`;

  function elevation(profile) {
    const w = 300, h = 70, max = Math.max(...profile), min = Math.min(...profile);
    const pts = profile.map((v, i) => [(i / (profile.length - 1)) * w, h - 6 - ((v - min) / (max - min || 1)) * (h - 14)]);
    const line = pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
    return `<svg class="elev" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      <polygon points="0,${h} ${line} ${w},${h}" class="elev-fill"/>
      <polyline points="${line}" class="elev-line"/></svg>`;
  }

  /* ---------- sections ---------- */
  const views = {
    about: () => `
      <section class="grid-2">
        <div>
          <h2 class="kicker">Hi.</h2>
          ${S.intro.map((p) => `<p class="lead">${esc(p)}</p>`).join("")}
          <div class="links">
            <a class="btn" href="mailto:${esc(S.email)}">${esc(S.email)}</a>
            <a class="btn" href="${esc(S.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>
            <a class="btn solid" href="${esc(S.resume)}" target="_blank" rel="noopener">Resume (PDF)</a>
          </div>
        </div>
        <aside class="panel">
          <h3 class="label">Now</h3>
          <ul class="now">${S.now.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
        </aside>
      </section>`,

    work: () => `
      <section>
        <h3 class="label">Experience</h3>
        <ol class="timeline">
          ${S.experience.map((e) => `
            <li>
              <div class="tl-head">
                <div><h4>${esc(e.company)}</h4><p class="role">${esc(e.role)}</p></div>
                <div class="meta mono">${esc(e.dates)}<br><span>${esc(e.location)}</span></div>
              </div>
              ${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
            </li>`).join("")}
        </ol>
      </section>
      <section class="grid-2 top-gap">
        <div class="panel">
          <h3 class="label">Education</h3>
          <h4>${esc(S.education.school)}</h4>
          <p class="role">${esc(S.education.degree)}</p>
          <p class="meta mono">${esc(S.education.dates)}</p>
          <ul>${S.education.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
        </div>
        <div class="panel">
          <h3 class="label">Awards</h3>
          ${S.awards.map((a) => `<div class="award"><h4>${esc(a.title)}</h4><p>${esc(a.detail)}</p></div>`).join("")}
          <h3 class="label top-gap">Tools</h3>
          <p class="mono skills">${S.skills.map(esc).join(" · ")}</p>
        </div>
      </section>
      <p class="center top-gap"><a class="btn solid" href="${esc(S.resume)}" target="_blank" rel="noopener">Download full resume</a></p>`,

    play: () => `
      <section>
        <h2 class="kicker">On the bike</h2>
        <p class="lead">Stanford Cycling. Two days over a hundred miles:</p>
        <div class="rides">
          ${S.rides.map((r) => `
            <article class="ride">
              <div class="ride-num mono">${esc(r.miles)}<small>mi</small></div>
              <h3>${esc(r.name)}</h3>
              <p class="meta mono">${esc(r.date)} · ${esc(r.elevation)} climbing · ${esc(r.where)}</p>
              ${elevation(r.profile)}
              <p>${esc(r.note)}</p>
              <div class="tiles two">${r.photos.map((p, i) => tile(p, r.name.split("—")[0].trim(), `photo ${i + 1}`)).join("")}</div>
            </article>`).join("")}
        </div>
      </section>
      <section class="top-gap">
        <div class="grid-2 hobbies">
          ${S.hobbies.map((h) => `
            <article class="panel hobby">
              ${tile(h.img, h.title)}
              <h3>${esc(h.title)}</h3>
              <p class="meta mono">${esc(h.sub)}</p>
              <p>${esc(h.text)}</p>
            </article>`).join("")}
        </div>
      </section>
      <section class="top-gap">
        <h3 class="label">Travel</h3>
        <div class="tiles travel">
          ${S.travel.map((t) => `
            <figure>
              ${tile(t.img, t.place, t.coords)}
              <figcaption><b>${esc(t.place)}</b> <span class="mono">${esc(t.region)}</span></figcaption>
            </figure>`).join("")}
        </div>
      </section>`,

    eats: () => {
      const list = [...S.eats].sort((a, b) => b.score - a.score);
      const tone = (s) => (s >= 8.5 ? "hi" : s >= 7 ? "mid" : "lo");
      return `
      <section>
        <div class="row-between">
          <div><h2 class="kicker">Where I eat</h2><p class="lead">Ranked, Beli-style. Scores out of 10.</p></div>
          <a class="btn solid" href="${esc(S.beli)}" target="_blank" rel="noopener">Follow me on Beli ↗</a>
        </div>
        <ol class="beli">
          ${list.map((e, i) => `
            <li>
              <span class="rank mono">${i + 1}</span>
              <div class="b-body">
                <h4>${esc(e.name)}</h4>
                <p class="meta">${esc(e.cuisine)} · ${esc(e.city)}</p>
                <p class="order">Order: ${esc(e.order)}</p>
              </div>
              <span class="score ${tone(e.score)} mono">${Number(e.score).toFixed(1)}</span>
            </li>`).join("")}
        </ol>
      </section>
      <section class="top-gap">
        <h3 class="label">From the app</h3>
        <div class="tiles screens">${S.beliScreens.map((s, i) => tile(s, "Beli screenshot", `screen ${i + 1}`)).join("")}</div>
      </section>`;
    },

    reads: () => {
      const tags = [...new Set(S.reads.flatMap((r) => [r.type === "book" ? "books" : "articles", ...r.tags]))];
      return `
      <section>
        <div class="deal-area">
          <div class="qcard" id="qcard"><div class="qcard-inner">
            <div class="pcard-back"></div>
            <div class="qcard-front"><span class="ix" id="q-ix">A<br>♠</span><blockquote id="q-text"></blockquote><cite id="q-by"></cite></div>
          </div></div>
          <button class="btn solid" id="deal">Deal a quote</button>
        </div>
        <div class="quotes">
          ${S.quotes.map((q, i) => {
            const suit = "♠♥♦♣"[i % 4];
            return `<figure class="quote"><span class="qs ${redSuit(suit) ? "red" : ""}">${suit}</span><blockquote>“${esc(q.text)}”</blockquote><figcaption>— ${esc(q.author)}</figcaption></figure>`;
          }).join("")}
        </div>
      </section>
      <section class="top-gap">
        <div class="row-between"><h3 class="label">Reads</h3>
          <div class="filters" id="filters"><button class="chip on" data-f="all">all</button>${tags.map((t) => `<button class="chip" data-f="${esc(t)}">${esc(t)}</button>`).join("")}</div>
        </div>
        <ul class="reads" id="reads">
          ${S.reads.map((r) => `
            <li data-tags="${esc([r.type === "book" ? "books" : "articles", ...r.tags].join(" "))}">
              <span class="rtype mono">${r.type === "book" ? "BOOK" : "READ"}</span>
              <div>
                <h4>${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)} ↗</a>` : esc(r.title)}</h4>
                <p class="meta">${esc(r.author)}</p>
                <p>${esc(r.note)}</p>
              </div>
            </li>`).join("")}
        </ul>
      </section>`;
    },
  };

  const after = {
    reads: () => {
      const card = $("#qcard");
      const ranks = ["A", "K", "Q", "J", "10", "9", "8", "7"];
      let last = -1;
      const deal = () => {
        let i; do { i = (Math.random() * S.quotes.length) | 0; } while (S.quotes.length > 1 && i === last);
        last = i;
        card.classList.remove("flipped");
        setTimeout(() => {
          const suit = "♠♥♦♣"[(Math.random() * 4) | 0];
          const ix = $("#q-ix");
          ix.innerHTML = `${ranks[(Math.random() * ranks.length) | 0]}<br>${suit}`;
          ix.className = "ix" + (redSuit(suit) ? " red" : "");
          $("#q-text").textContent = `“${S.quotes[i].text}”`;
          $("#q-by").textContent = `— ${S.quotes[i].author}`;
          card.classList.add("flipped");
        }, 350);
      };
      $("#deal").addEventListener("click", deal);
      card.addEventListener("click", deal);
      setTimeout(deal, 300);

      $("#filters").addEventListener("click", (e) => {
        const b = e.target.closest(".chip"); if (!b) return;
        document.querySelectorAll("#filters .chip").forEach((c) => c.classList.toggle("on", c === b));
        const f = b.dataset.f;
        document.querySelectorAll("#reads li").forEach((li) => {
          li.hidden = f !== "all" && !li.dataset.tags.split(" ").includes(f);
        });
      });
    },
  };

  /* ---------- router ---------- */
  const nav = $("#tabs");
  nav.innerHTML = TABS.map((t) => `<a role="tab" href="#${t.id}" data-id="${t.id}"><span class="suit ${redSuit(t.suit) ? "red" : ""}">${t.suit}</span>${t.label}</a>`).join("");

  function route() {
    const id = (location.hash || "#about").slice(1);
    const tab = TABS.find((t) => t.id === id) ? id : "about";
    nav.querySelectorAll("a").forEach((a) => a.setAttribute("aria-selected", a.dataset.id === tab));
    const main = $("#main");
    main.classList.remove("in");
    main.innerHTML = views[tab]();
    void main.offsetWidth; main.classList.add("in");
    after[tab]?.();
  }
  addEventListener("hashchange", route);
  route();
})();
