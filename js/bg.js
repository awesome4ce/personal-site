/* Drifting numbers background: finance + poker odds + ride stats. */
(() => {
  const TOKENS = [
    // finance
    "1.25x DSCR", "65% LTV", "9.2% DY", "IRR 18.4%", "5.75% cap", "T-12", "NOI", "$8B", "1.8x MOIC", "SOFR+325", "56", "IO 24mo",
    // poker
    "AKs 67%", "EV+", "pot odds 3:1", "4.5% ", "♠", "♥", "♦", "♣", "A♠ K♥", "p=0.82", "QQ 80%", "outs: 9",
    // cycling
    "250W", "92 rpm", "8.4% grade", "102 mi", "6,800 ft", "FTP", "VAM 1100", "34×28", "52/36", "22.4 mph",
    // math
    "σ", "Σ", "∫", "μ", "β", "3.14159", "e^x", "∂", "Δ", "0.97",
  ];
  const c = document.getElementById("bg");
  const ctx = c.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W, H, dpr, items = [], mouse = { x: -999, y: -999 };

  function make(randomY) {
    const size = 11 + Math.random() * 18;
    return {
      t: TOKENS[(Math.random() * TOKENS.length) | 0],
      x: Math.random() * W,
      y: randomY ? Math.random() * H : H + 30,
      s: size,
      v: 0.08 + Math.random() * 0.22,
      a: 0.04 + Math.random() * 0.07,
      red: Math.random() < 0.12,
    };
  }
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    c.width = W * dpr; c.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round((W * H) / 22000);
    items = Array.from({ length: n }, () => make(true));
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (const p of items) {
      if (!reduce) p.y -= p.v;
      if (p.y < -30) Object.assign(p, make(false));
      const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      const glow = d < 160 ? (1 - d / 160) * 0.35 : 0;
      ctx.font = `${p.s}px "JetBrains Mono", monospace`;
      ctx.fillStyle = p.red
        ? `rgba(212,72,59,${p.a + glow})`
        : `rgba(236,230,214,${p.a + glow})`;
      ctx.fillText(p.t, p.x, p.y);
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  addEventListener("resize", () => { resize(); if (reduce) frame(); });
  addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; if (reduce) frame(); });
  resize();
  frame();
})();
