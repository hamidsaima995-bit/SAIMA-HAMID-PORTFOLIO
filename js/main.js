const root = document.documentElement,
  btn = document.getElementById("toggle");
function setTheme(t) {
  root.setAttribute("data-theme", t);
  btn.innerHTML = t === "dark" ? "&#9788;" : "&#9790;";
}
btn.onclick = () =>
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
setTheme("dark");
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      e.target.classList.toggle("in", e.isIntersecting);
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal,.fx").forEach((el) => io.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    var id = a.getAttribute("href");
    if (id && id.length > 1) {
      var t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

(function () {
  var el = document.getElementById("typed");
  if (!el) return;
  var w = [
    "Full Stack Developer & Web Designer",
    "React \u00b7 Node \u00b7 Express Developer",
    "Ecommerce & AI Solutions",
    "Founder of Ninja Tech",
  ];
  var i = 0,
    c = 0,
    del = false;
  function t() {
    var s = w[i];
    if (!del) {
      c++;
      if (c >= s.length) {
        del = true;
        el.textContent = s;
        setTimeout(t, 1500);
        return;
      }
    } else {
      c--;
      if (c <= 0) {
        del = false;
        i = (i + 1) % w.length;
      }
    }
    el.textContent = s.slice(0, c);
    setTimeout(t, del ? 40 : 85);
  }
  t();
})();

(function () {
  var root = document.documentElement;
  root.setAttribute("data-theme", "dark");
  try {
    localStorage.setItem("theme", "dark");
  } catch (e) {}
  document.body.classList.add("orbs-day");
  var btn = document.getElementById("toggle");
  if (btn) {
    btn.innerHTML = "\u2600";
    btn.onclick = function () {
      var day = document.body.classList.toggle("orbs-day");
      btn.innerHTML = day ? "\u2600" : "\u263D";
      root.setAttribute("data-theme", "dark");
    };
  }
  var burger = document.getElementById("shBurger"),
    navEl = document.querySelector("nav");
  if (burger && navEl) {
    burger.onclick = function (e) {
      e.stopPropagation();
      navEl.classList.toggle("sh-open");
    };
    navEl.querySelectorAll(".links a").forEach(function (a) {
      a.addEventListener("click", function () {
        navEl.classList.remove("sh-open");
      });
    });
    document.addEventListener("click", function (e) {
      if (navEl.classList.contains("sh-open") && !navEl.contains(e.target)) {
        navEl.classList.remove("sh-open");
      }
    });
  }
})();

(function () {
  try {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("sh-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    document.querySelectorAll(".svc").forEach(function (c) {
      io.observe(c);
    });
  } catch (err) {
    document.querySelectorAll(".svc").forEach(function (c) {
      c.classList.add("sh-in");
    });
  }
})();

(function () {
  var book = document.getElementById("sh-book");
  if (!book) return;
  var slides = [].slice.call(book.querySelectorAll(".bk-slide"));
  var N = slides.length,
    pos = 0,
    timer = null,
    paused = false,
    started = false,
    animating = false;
  var dotsWrap = document.getElementById("bk-dots");
  // build dots
  slides.forEach(function (_, i) {
    var d = document.createElement("span");
    d.className = "bk-dot" + (i === 0 ? " on" : "");
    d.setAttribute("role", "button");
    d.setAttribute("tabindex", "0");
    d.setAttribute("aria-label", i === 0 ? "Cover" : "Project " + i);
    d.addEventListener("click", function () {
      jump(i);
    });
    d.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        jump(i);
      }
    });
    dotsWrap.appendChild(d);
  });
  var dots = [].slice.call(dotsWrap.children);
  // side mini buttons
  var prevBtn = document.createElement("button");
  prevBtn.className = "bk-mini bk-mini-prev";
  prevBtn.setAttribute("aria-label", "Previous page");
  prevBtn.innerHTML = "&#8249;";
  var nextBtn = document.createElement("button");
  nextBtn.className = "bk-mini bk-mini-next";
  nextBtn.setAttribute("aria-label", "Next page");
  nextBtn.innerHTML = "&#8250;";
  var nav = document.createElement("div");
  nav.className = "bk-nav";
  dotsWrap.parentNode.insertBefore(nav, dotsWrap);
  nav.appendChild(prevBtn);
  nav.appendChild(dotsWrap);
  nav.appendChild(nextBtn);
  prevBtn.addEventListener("click", function () {
    step(-1);
  });
  nextBtn.addEventListener("click", function () {
    step(1);
  });

  function setDots(n) {
    dots.forEach(function (d, i) {
      d.classList.toggle("on", i === n);
    });
  }
  function clearClasses(el) {
    el.classList.remove("bk-on", "bk-under", "bk-flipout", "bk-flipstart");
  }

  function turn(n, dir) {
    n = (n + N) % N;
    if (n === pos || animating) return;
    animating = true;
    var cur = slides[pos],
      nxt = slides[n];
    setDots(n);
    if (dir > 0) {
      // forward: reveal next beneath, flip current page to the left
      clearClasses(nxt);
      nxt.classList.add("bk-under");
      void nxt.offsetWidth;
      cur.classList.remove("bk-on");
      cur.classList.add("bk-flipout");
      var done = function () {
        cur.removeEventListener("transitionend", done);
        clearClasses(cur);
        clearClasses(nxt);
        nxt.classList.add("bk-on");
        pos = n;
        animating = false;
      };
      cur.addEventListener("transitionend", done);
      setTimeout(function () {
        if (animating) {
          done();
        }
      }, 1000);
    } else {
      // backward: next page starts folded on the left, unfolds over current
      cur.classList.remove("bk-on");
      cur.classList.add("bk-under");
      nxt.style.transition = "none";
      clearClasses(nxt);
      nxt.classList.add("bk-flipstart");
      void nxt.offsetWidth;
      nxt.style.transition = "";
      nxt.classList.remove("bk-flipstart");
      nxt.classList.add("bk-flipout");
      void nxt.offsetWidth;
      nxt.classList.remove("bk-flipout");
      nxt.classList.add("bk-on");
      var done2 = function () {
        nxt.removeEventListener("transitionend", done2);
        clearClasses(cur);
        pos = n;
        animating = false;
      };
      nxt.addEventListener("transitionend", done2);
      setTimeout(function () {
        if (animating) {
          done2();
        }
      }, 1000);
    }
  }
  function step(d) {
    turn(pos + d, d >= 0 ? 1 : -1);
    if (started) restart();
  }
  function jump(n) {
    if (n === pos) return;
    turn(n, n > pos ? 1 : -1);
    if (started) restart();
  }
  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      if (!paused && !animating) turn(pos + 1, 1);
    }, 4600);
  }
  function begin() {
    if (started) return;
    started = true;
    restart();
  }

  book.addEventListener("mouseenter", function () {
    paused = true;
  });
  book.addEventListener("mouseleave", function () {
    paused = false;
  });
  book.addEventListener(
    "touchstart",
    function () {
      paused = true;
      setTimeout(function () {
        paused = false;
      }, 6000);
    },
    { passive: true },
  );

  slides[0].classList.add("bk-on");
  setDots(0);
  var target = document.getElementById("services") || book;
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            begin();
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(target);
  } else {
    begin();
  }
})();

(function () {
  var BOTS = {
    ninja: {
      name: "Ninja Assist",
      biz: "Ninja Tech",
      hi: "Hi! I'm Ninja Assist. How can I help you build something today?",
      sug: [
        "What do you build?",
        "Do you make AI chatbots?",
        "How much does it cost?",
        "Contact",
      ],
      kb: [
        {
          k: ["build", "service", "make", "offer", "do you", "what do"],
          a: "Ninja Tech builds custom websites, ecommerce stores, AI chatbots and WhatsApp automation, all hand-coded with React, Node and Supabase (no templates).",
        },
        {
          k: ["ai", "chatbot", "bot", "automation", "whatsapp bot"],
          a: "Yes! We build embeddable AI chatbots (like this one) and WhatsApp automation so businesses can answer customers 24/7.",
        },
        {
          k: ["ecommerce", "ecommerce", "store", "shop", "cart", "checkout"],
          a: "We build full online stores with cart, checkout, product management and an admin dashboard.",
        },
        {
          k: ["price", "cost", "charge", "quote", "rate", "budget", "kitna"],
          a: "Every project is quoted custom based on scope. Message Saima on WhatsApp +92 321 0014466 for a quick quote.",
        },
        {
          k: ["contact", "whatsapp", "number", "email", "reach", "call"],
          a: "You can reach Ninja Tech on WhatsApp +92 321 0014466 or email hamidsaima995@gmail.com.",
        },
        {
          k: ["location", "where", "based", "lahore", "address"],
          a: "Ninja Tech is based in Baghbanpura, Lahore, and works with clients remotely too.",
        },
        {
          k: ["time", "how long", "deliver", "deadline", "fast"],
          a: "Timeline depends on project size: a simple site can take a few days, while bigger apps take longer. Ask on WhatsApp for an estimate.",
        },
        {
          k: ["react", "node", "tech", "stack", "supabase", "technology"],
          a: "Core stack: React, Node.js, Express, Supabase (PostgreSQL), deployed on Railway. Custom code, always.",
        },
      ],
      fb: "Great question! For the details, message Saima on WhatsApp +92 321 0014466. She'll help you personally.",
    },
    glow: {
      name: "Glow Assistant",
      biz: "Glow Aesthetics Clinic",
      hi: "Assalam-o-Alaikum! Welcome to Glow Aesthetics ✨ How can I help you today?",
      sug: ["Your services", "Prices", "Timings", "Book a consultation"],
      kb: [
        {
          k: ["service", "treatment", "offer", "do you", "what do"],
          a: "We offer HydraFacial, laser hair removal, anti-aging facials and a free skin analysis.",
        },
        {
          k: ["hydrafacial", "facial glow"],
          a: "HydraFacial deep-cleanses, exfoliates and hydrates for an instant glow, from Rs 6,000, about 45 minutes.",
        },
        {
          k: ["laser", "hair removal"],
          a: "Laser hair removal is safe and precise, from Rs 4,500 per session.",
        },
        {
          k: ["price", "cost", "rate", "charge", "kitna", "fee"],
          a: "HydraFacial from Rs 6,000, laser from Rs 4,500, anti-aging facial from Rs 7,500. Skin analysis is free.",
        },
        {
          k: ["time", "timing", "open", "hours", "kab"],
          a: "We're open Mon to Sat, 11am to 8pm.",
        },
        {
          k: ["book", "appointment", "consult", "visit"],
          a: "You can book a free consultation by sharing your name and a preferred time, or call the clinic.",
        },
        {
          k: ["location", "where", "address", "lahore"],
          a: "We're located in Lahore, Pakistan.",
        },
      ],
      fb: "I'd love to help! You can book a free consultation or ask about our treatments and prices.",
    },
    vanya: {
      name: "Vanya Assistant",
      biz: "VANYA",
      hi: "Assalam-o-Alaikum! VANYA mein khush aamdeed 🌸 How can I help?",
      sug: ["Your collection", "Prices", "Delivery", "Where are you?"],
      kb: [
        {
          k: [
            "product",
            "dress",
            "wear",
            "collection",
            "kurta",
            "suit",
            "stock",
          ],
          a: "VANYA offers premium Eastern & Western wear, kurtas, formals and more, with elegant designs and premium fabrics.",
        },
        {
          k: ["price", "cost", "rate", "kitna"],
          a: "Prices vary by piece. Tell me what you're looking for and I'll guide you.",
        },
        {
          k: ["order", "buy", "delivery", "ship", "deliver"],
          a: "You can order online or visit us at Emporium Mall, Lahore. We deliver across Pakistan.",
        },
        {
          k: ["location", "where", "store", "address", "mall"],
          a: "VANYA is online and at Emporium Mall, Lahore.",
        },
      ],
      fb: "Happy to help! Ask about our collection, prices or delivery.",
    },
    dental: {
      name: "Dr. Assist",
      biz: "Lahore Dental Clinic",
      hi: "Assalam-o-Alaikum! Lahore Dental Clinic mein khush aamdeed. How can I help you?",
      sug: ["Your services", "Timings", "Book appointment", "Teeth whitening"],
      kb: [
        {
          k: ["service", "treatment", "offer", "do you", "what do"],
          a: "We offer check-ups, teeth whitening, fillings, braces and more.",
        },
        {
          k: ["whitening", "white teeth"],
          a: "Teeth whitening brightens your smile safely. Ask us about current offers.",
        },
        {
          k: ["price", "fee", "cost", "consultation", "kitna"],
          a: "Consultation is affordable. Tell us what you need and we'll guide you on cost.",
        },
        {
          k: ["time", "timing", "open", "hours", "kab"],
          a: "We're open Mon to Sat. Please call to confirm today's timings.",
        },
        {
          k: ["appointment", "book", "visit", "checkup"],
          a: "To book an appointment, share your name and a preferred day, or call the clinic.",
        },
        {
          k: ["location", "where", "address", "lahore"],
          a: "We're located in Lahore, Pakistan.",
        },
      ],
      fb: "Happy to help with your dental questions! For specifics, please call the clinic.",
    },
  };
  var cur = "ninja";
  var wrap = document.getElementById("ncw");
  var body = document.getElementById("ncw-body"),
    sug = document.getElementById("ncw-sug");
  var inp = document.getElementById("ncw-in");
  function esc(t) {
    return t.replace(/[&<>]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
    });
  }
  function add(txt, who) {
    var d = document.createElement("div");
    d.className = "msg " + who;
    d.innerHTML = esc(txt);
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }
  function renderSug() {
    var b = BOTS[cur];
    sug.innerHTML = "";
    b.sug.forEach(function (q) {
      var x = document.createElement("button");
      x.textContent = q;
      x.onclick = function () {
        handle(q);
      };
      sug.appendChild(x);
    });
  }
  function answer(text) {
    var b = BOTS[cur];
    var t = " " + text.toLowerCase() + " ";
    if (/\b(hi|hello|salam|asalam|assalam|hey|hola)\b/.test(t)) return b.hi;
    for (var i = 0; i < b.kb.length; i++) {
      for (var j = 0; j < b.kb[i].k.length; j++) {
        if (t.indexOf(b.kb[i].k[j]) > -1) return b.kb[i].a;
      }
    }
    if (/\b(thanks|thank|shukriya|shukria)\b/.test(t))
      return "You're welcome! 😊 Anything else?";
    return b.fb;
  }
  function handle(text) {
    text = (text || "").trim();
    if (!text) return;
    add(text, "me");
    inp.value = "";
    setTimeout(function () {
      add(answer(text), "bot");
    }, 350);
  }
  function openBot(key) {
    cur = key;
    var b = BOTS[key];
    document.getElementById("ncw-name").textContent = b.name;
    document.getElementById("ncw-biz").textContent = b.biz;
    body.innerHTML = "";
    add(b.hi, "bot");
    renderSug();
    wrap.classList.add("open");
    inp.focus();
  }
  wrap.querySelector(".ncw-launch").onclick = function () {
    if (wrap.classList.contains("open")) {
      wrap.classList.remove("open");
    } else {
      if (!body.innerHTML) {
        openBot(cur);
      } else {
        wrap.classList.add("open");
      }
    }
  };
  wrap.querySelector(".ncw-x").onclick = function () {
    wrap.classList.remove("open");
  };
  document.getElementById("ncw-send").onclick = function () {
    handle(inp.value);
  };
  inp.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handle(inp.value);
    }
  });
  // wire the AI-bots cards
  [].slice
    .call(document.querySelectorAll(".botbtn[data-bot]"))
    .forEach(function (btn) {
      btn.addEventListener("click", function () {
        openBot(btn.getAttribute("data-bot"));
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
    });
})();

(function () {
  var z = document.createElement("div");
  z.id = "bk-zoom";
  z.setAttribute("role", "dialog");
  z.setAttribute("aria-modal", "true");
  z.innerHTML =
    '<button class="zx" aria-label="Close">&times;</button><img alt=""><div class="zn"><button class="zp" aria-label="Previous screenshot">&#8249;</button><span class="zc"></span><button class="zq" aria-label="Next screenshot">&#8250;</button></div>';
  document.body.appendChild(z);
  var im = z.querySelector("img"),
    cnt = z.querySelector(".zc"),
    list = [],
    i = 0;
  function show() {
    var s = list[i];
    im.src = s.src;
    im.alt = s.alt;
    cnt.textContent = list.length > 1 ? i + 1 + " / " + list.length : "";
    z.classList.toggle("single", list.length < 2);
  }
  function openZ(fig) {
    list = [].slice.call(fig.querySelectorAll("img"));
    if (!list.length) return;
    i = 0;
    if (list.length > 1 && parseFloat(getComputedStyle(list[1]).opacity) > 0.5)
      i = 1;
    show();
    z.classList.add("on");
  }
  function closeZ() {
    z.classList.remove("on");
    im.removeAttribute("src");
  }
  function go(d) {
    if (list.length > 1) {
      i = (i + d + list.length) % list.length;
      show();
    }
  }
  document.addEventListener("click", function (e) {
    var f = e.target.closest && e.target.closest(".bk-shot");
    if (f && !f.classList.contains("bk-wa")) {
      openZ(f);
    }
  });
  z.addEventListener("click", function (e) {
    if (e.target === z || e.target.classList.contains("zx")) closeZ();
    else if (e.target === im) go(1);
  });
  z.querySelector(".zp").addEventListener("click", function () {
    go(-1);
  });
  z.querySelector(".zq").addEventListener("click", function () {
    go(1);
  });
  document.addEventListener("keydown", function (e) {
    if (!z.classList.contains("on")) return;
    if (e.key === "Escape") closeZ();
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
  });
})();

/* Force-download the CV reliably (download attribute alone can be ignored
   by some browsers / in-app webviews, which just open the PDF instead). */
(function () {
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[download][href$=".pdf"]');
    if (!a) return;
    e.preventDefault();
    var href = a.getAttribute("href");
    var name = a.getAttribute("download") || "download.pdf";
    fetch(href)
      .then(function (r) { return r.blob(); })
      .then(function (blob) {
        var url = URL.createObjectURL(blob);
        var t = document.createElement("a");
        t.href = url;
        t.download = name;
        document.body.appendChild(t);
        t.click();
        t.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      })
      .catch(function () {
        /* last resort: open it so the user can still save manually */
        window.open(href, "_blank");
      });
  });
})();
