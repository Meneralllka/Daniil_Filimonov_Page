/* Daniil Filimonov — site logic: i18n, hash routing, robot-driven page transitions. */
(function () {
  "use strict";
  var C = window.CONTENT, SP = window.SPRITES || {};
  var ROUTES = ["home", "cv", "experience", "projects", "consulting", "mentorship"];
  var EMAIL = ["df2789", "nyu.edu"].join("@"); // assembled here so the address is not sitting in the HTML for scrapers
  var PHOTO = "";                              // set to "assets/photo.jpg" once the portrait is in that folder
  var CV_PDF = "assets/Daniil_Filimonov_CV.pdf";

  // which robot brings which page
  var TRANS = {
    home:       { kind: "run", sprite: "ciri",   dir: "up",    fps: 14, dur: 1700 },
    cv:         { kind: "run", sprite: "worma",  dir: "right", fps: 12, dur: 1700 },
    experience: { kind: "run", sprite: "flexiv", dir: "left",  fps: 16, dur: 1500 },
    projects:   { kind: "run", sprite: "ciri",   dir: "up",    fps: 14, dur: 1700 },
    consulting: { kind: "run", sprite: "worma",  dir: "left",  fps: 12, dur: 1700 },
    mentorship: { kind: "run", sprite: "flexiv", dir: "right", fps: 16, dur: 1500 }
  };
  // media per project id (language independent)
  var MEDIA = {
    worma: [["slope", "worma-slope"], ["step", "worma-step"], ["swim", "worma-swim"]],
    ciri: [["climb", "ciri-climb"]],
    flexiv: [["demo", "flexiv"]],
    tensegrity: [["drop test", "tensegrity"]]
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var md = function (s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); };
  var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var lang = store.get("lang");
  if (!C[lang]) lang = "en"; // English by default
  var current = null, busy = false, pending = null, IMG = {};

  /* ---------------- renderers ---------------- */
  function spriteStill(name) {
    var s = SP[name];
    return '<div class="sprite" data-sprite="' + name + '" style="width:0;height:' + Math.min(180, s.h) + 'px"></div>';
  }
  function video(file, extra) {
    return '<video muted loop playsinline preload="none" poster="assets/video/' + file + '.jpg" src="assets/video/' + file + '.mp4" ' + (extra || "") + "></video>";
  }
  var R = {
    home: function (t) {
      var h = t.home;
      var me = '<figure class="me polaroid' + (PHOTO ? "" : " empty") + '">' + (PHOTO ? '<img src="' + PHOTO + '" alt="' + esc(t.name) + '">' : '<div class="ph">' + esc(t.ui.photoSoon) + "</div>") + "</figure>";
      return '<section class="hero"><div class="hero-text"><p class="kicker">' + esc(h.kicker) + "</p><h1>" + esc(t.name) + '</h1><p class="lead">' + md(h.lead) + '</p><p class="sub">' + md(h.sub) + "</p>" +
        '<div class="btns">' + h.cta.map(function (c, i) { return '<a class="btn' + (i ? "" : " primary") + '" href="#/' + c.to + '">' + esc(c.label) + "</a>"; }).join("") +
        '<a class="btn" href="' + CV_PDF + '" download>' + esc(t.ui.downloadCv) + "</a></div></div>" + me + "</section>" +
        "<h2>" + esc(h.shelfTitle) + '</h2><div class="shelf">' +
        [["ciri", "ciri-climb", " tall"], ["worma", "worma-slope", ""], ["flexiv", "flexiv", ""], ["tensegrity", "tensegrity", ""]].map(function (x) {
          return '<a class="bot" href="#/projects"><div class="stage"><div class="polaroid' + x[2] + '">' + video(x[1], "data-hover") + '</div></div><div class="cap">' + esc(h.shelf[x[0]]) + "</div></a>";
        }).join("") + "</div>" +
        '<p class="hint">↑ ' + esc(t.ui.hoverHint) + "</p>" +
        "<h2>" + esc(h.numbersTitle) + '</h2><div class="nums">' + h.numbers.map(function (n) { return '<div class="num"><b>' + esc(n.n) + "</b><i>" + esc(n.u) + "</i><p>" + esc(n.t) + "</p></div>"; }).join("") + "</div>" +
        "<h2>" + esc(h.tracksTitle) + '</h2><div class="cards">' + h.tracks.map(function (c) { return '<a class="card" href="#/' + c.to + '"><h3>' + esc(c.h) + "</h3><p>" + esc(c.p) + "</p></a>"; }).join("") + "</div>";
    },
    cv: function (t) {
      var c = t.cv;
      return "<h1>" + esc(c.h) + '</h1><div class="btns" style="margin-top:0"><a class="btn primary" href="' + CV_PDF + '" download>' + esc(t.ui.downloadCv) + "</a></div>" +
        "<h2>" + esc(c.educationTitle) + '</h2><ul class="rows">' + c.education.map(function (e) { return "<li><span>" + md(e.what) + '</span><span class="when">' + esc(e.when) + "</span></li>"; }).join("") + "</ul>" +
        "<h2>" + esc(c.pubsTitle) + "</h2>" + c.pubs.map(function (p) { return '<div class="pub"><div>' + md(p.authors) + '</div><div class="t">' + esc(p.title) + '</div><div class="v">' + esc(p.venue) + "</div>" + (p.note ? '<div class="n">' + esc(p.note) + "</div>" : "") + "</div>"; }).join("") +
        "<h2>" + esc(c.honorsTitle) + "</h2>" + c.honors.map(function (h) { return "<h3>" + esc(h.h) + '</h3><div class="mono">' + esc(h.sub) + '</div><ul class="dots" style="margin-bottom:22px">' + h.items.map(function (i) { return "<li>" + md(i) + "</li>"; }).join("") + "</ul>"; }).join("") +
        "<h2>" + esc(c.skillsTitle) + '</h2><dl class="skills">' + c.skills.map(function (s) { return "<dt>" + esc(s.h) + "</dt><dd>" + esc(s.v) + "</dd>"; }).join("") + "</dl>";
    },
    experience: function (t) {
      var e = t.experience;
      return "<h1>" + esc(e.h) + '</h1><div style="margin-top:34px">' + e.jobs.map(function (j) {
        return '<article class="job"><h3>' + esc(j.org) + '</h3><div class="meta"><span>' + esc(j.role) + " · " + esc(j.pi) + "</span><span>" + esc(j.when) + '</span></div><ul class="dots">' + j.items.map(function (i) { return "<li>" + md(i) + "</li>"; }).join("") + "</ul></article>";
      }).join("") + '</div><div class="btns"><a class="btn primary" href="#/projects">' + esc(t.nav.projects) + ' →</a><a class="btn" href="#/cv">' + esc(t.nav.cv) + " →</a></div>";
    },
    projects: function (t) {
      var p = t.projects;
      return "<h1>" + esc(p.h) + '</h1><p class="lead">' + esc(p.intro) + "</p>" + p.list.map(function (x) {
        var m = MEDIA[x.id], media;
        if (m) {
          media = '<div class="polaroid">' + video(m[0][1], "data-auto") + "</div>" +
            (m.length > 1 ? '<div class="clips">' + m.map(function (c, i) { return '<button data-clip="' + c[1] + '" aria-pressed="' + (i === 0) + '">' + esc(c[0]) + "</button>"; }).join("") + "</div>" : "");
        } else media = '<div class="nomedia">' + esc(x.name) + "</div>";
        return '<article class="proj' + (x.id === "ciri" ? " portrait" : "") + '" id="p-' + x.id + '"><div class="media">' + media + '</div><div><div class="tag">' + esc(x.tag) + "</div><h3>" + esc(x.name) + "</h3><p>" + esc(x.p) + '</p><ul class="chips">' + x.specs.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" + (x.pub ? '<div class="pubnote">✎ ' + esc(x.pub) + "</div>" : "") + "</div></article>";
      }).join("");
    },
    consulting: function (t) {
      var c = t.consulting;
      return "<h1>" + esc(c.h) + '</h1><p class="lead">' + esc(c.intro) + "</p><h2>" + esc(c.servicesTitle) + '</h2><div class="cards">' +
        c.services.map(function (s) { return '<div class="card"><h3>' + esc(s.h) + "</h3><p>" + esc(s.p) + "</p></div>"; }).join("") + "</div><h2>" + esc(c.proofTitle) + '</h2><ul class="dots">' +
        c.proof.map(function (i) { return "<li>" + md(i) + "</li>"; }).join("") + "</ul>" + cta(c.cta, t);
    },
    mentorship: function (t) {
      var m = t.mentorship;
      return "<h1>" + esc(m.h) + '</h1><p class="lead">' + esc(m.intro) + "</p><h2>" + esc(m.itemsTitle) + '</h2><div class="cards">' +
        m.items.map(function (s) { return '<div class="card"><h3>' + esc(s.h) + "</h3><p>" + esc(s.p) + "</p></div>"; }).join("") + "</div><h2>" + esc(m.topicsTitle) + '</h2><ul class="dots">' +
        m.topics.map(function (i) { return "<li>" + md(i) + "</li>"; }).join("") + "</ul>" + cta(m.cta, t);
    }
  };
  function cta(text, t) {
    return '<div class="cta-box"><div class="big">' + esc(text) + '</div><a class="btn primary" href="mailto:' + EMAIL + '">' + esc(t.ui.email) + " · " + EMAIL + "</a></div>";
  }

  /* ---------------- sprites ---------------- */
  function setFrame(el, name, i, scale) {
    var s = SP[name]; scale = scale || 1;
    el.style.backgroundImage = "url(assets/sprites/" + name + ".webp)";
    el.style.backgroundSize = s.w * s.cols * scale + "px " + s.h * s.rows * scale + "px";
    el.style.backgroundPosition = -(i % s.cols) * s.w * scale + "px " + -Math.floor(i / s.cols) * s.h * scale + "px";
  }
  function fitSprites(root) {
    root.querySelectorAll(".sprite[data-sprite]").forEach(function (el) {
      var n = el.dataset.sprite, s = SP[n], stage = el.parentElement;
      var sc = Math.min(1, (stage.clientWidth || 200) / s.w, 180 / s.h);
      el.dataset.scale = sc; el.style.width = s.w * sc + "px"; el.style.height = s.h * sc + "px";
      setFrame(el, n, Math.floor(s.n / 2), sc);
    });
  }
  function hydrate(root) {
    fitSprites(root);
    // robots on the shelf move on hover / focus
    root.querySelectorAll("[data-play]").forEach(function (a) {
      var el = $(".sprite", a), n = a.dataset.play, s = SP[n], timer = null, i = Math.floor(s.n / 2), d = 1;
      function start() { if (timer || reduced) return; timer = setInterval(function () { i += d; if (i >= s.n - 1 || i <= 0) d = -d; setFrame(el, n, i, +el.dataset.scale); }, 85); }
      function stop() { clearInterval(timer); timer = null; }
      a.addEventListener("pointerenter", start); a.addEventListener("pointerleave", stop);
      a.addEventListener("focus", start); a.addEventListener("blur", stop);
    });
    var touch = window.matchMedia("(hover: none)").matches; // phones: no hover, so shelf clips play while on screen
    root.querySelectorAll("video[data-hover]").forEach(function (v) {
      if (touch) { v.setAttribute("data-auto", ""); return; }
      var a = v.closest("a") || v;
      a.addEventListener("pointerenter", function () { v.play().catch(function () {}); });
      a.addEventListener("pointerleave", function () { v.pause(); });
    });
    // project clips play while on screen
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting && !reduced) e.target.play().catch(function () {}); else e.target.pause(); });
      }, { threshold: 0.5 });
      root.querySelectorAll("video[data-auto]").forEach(function (v) { io.observe(v); });
    }
    root.querySelectorAll(".clips").forEach(function (box) {
      box.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        box.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        var v = $("video", box.parentElement);
        v.poster = "assets/video/" + b.dataset.clip + ".jpg"; v.src = "assets/video/" + b.dataset.clip + ".mp4"; v.play().catch(function () {});
      });
    });
  }

  /* ---------------- chrome ---------------- */
  function chrome() {
    var t = C[lang];
    document.documentElement.lang = lang;
    document.title = t.title;
    $("#nav").innerHTML = ROUTES.map(function (r) { return '<a href="#/' + r + '"' + (r === current ? ' aria-current="page"' : "") + ">" + esc(t.nav[r]) + "</a>"; }).join("");
    document.querySelectorAll("#langs button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lang === lang); });
    themeLabel();
    $("#mail").href = "mailto:" + EMAIL; $("#mail").textContent = EMAIL;
    $("#footnote").textContent = t.ui.footer;
    document.documentElement.style.setProperty("--top-h", $(".top").offsetHeight + "px");
  }
  function themeLabel() { // the button names the mode you would switch TO
    var b = $("#theme"), t = C[lang];
    b.textContent = document.documentElement.dataset.theme === "dark" ? t.ui.light : t.ui.dark;
    b.setAttribute("aria-label", t.ui.theme);
  }
  function paint(route) {
    var page = $("#page");
    page.innerHTML = R[route](C[lang]);
    current = route; chrome(); hydrate(page);
  }

  /* ---------------- transitions ---------------- */
  function ease(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }
  function navigate(route, animate) {
    if (busy) { pending = route; return; } // finish the current run, then play the next one
    var tr = TRANS[route];
    if (!animate || reduced || !current || (tr.kind === "run" && !SP[tr.sprite])) { paint(route); window.scrollTo(0, 0); return; }
    busy = true;
    var sheet = document.createElement("div");
    sheet.className = "sheet"; sheet.setAttribute("aria-hidden", "true");
    sheet.innerHTML = '<div class="page">' + R[route](C[lang]) + "</div>";
    document.body.appendChild(sheet); fitSprites(sheet);
    // mark the destination in the nav straight away
    document.querySelectorAll("#nav a").forEach(function (a) { if (a.getAttribute("href") === "#/" + route) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    function done(extra) {
      paint(route); window.scrollTo(0, 0); sheet.remove(); (extra || []).forEach(function (e) { e.remove(); }); busy = false;
      if (pending && pending !== current) { var r = pending; pending = null; navigate(r, true); } else pending = null;
    }
    if (tr.kind === "drop") {
      sheet.classList.add("drop");
      setTimeout(function () { done(); }, 1050);
      return;
    }
    var s = SP[tr.sprite], vw = window.innerWidth, vh = window.innerHeight;
    var sc = tr.dir === "up" ? Math.min(1, vh * 0.5 / s.h, vw * 0.7 / s.w) : Math.min(1.15, vw * 0.6 / s.w, vh * 0.4 / s.h);
    var w = s.w * sc, h = s.h * sc;
    var bot = document.createElement("div"); bot.className = "runner sprite";
    bot.style.width = w + "px"; bot.style.height = h + "px";
    var flip = tr.dir === "left"; // footage runs left→right; mirror it for right→left
    document.body.appendChild(bot);
    var frames = Math.min(s.n - 1, Math.round(tr.dur / 1000 * tr.fps)), t0 = performance.now();
    function tick(now) {
      var p = Math.min(1, (now - t0) / tr.dur), q = ease(p), x, y, sx = 0, sy = 0;
      setFrame(bot, tr.sprite, Math.round(p * frames), sc);
      if (tr.dir === "up") {            // CIRI climbs and hauls the sheet up behind it
        x = vw / 2 - w / 2; y = vh + (-h - 30 - vh) * q;
        sy = Math.max(0, y + h * 0.82);
      } else if (tr.dir === "right") {  // robot pulls the sheet in from the left edge
        y = vh * 0.6 - h / 2; x = -w + (vw + 30 + w) * q;
        sx = Math.min(0, x + w * 0.12 - vw);
      } else {                          // mirrored: sheet comes from the right edge
        y = vh * 0.6 - h / 2; x = vw + (-w - 30 - vw) * q;
        sx = Math.max(0, x + w * 0.88);
      }
      bot.style.transform = "translate(" + x + "px," + y + "px)" + (flip ? " scaleX(-1)" : "");
      sheet.style.transform = "translate(" + sx + "px," + sy + "px)";
      if (p < 1) requestAnimationFrame(tick); else done([bot]);
    }
    sheet.style.transform = tr.dir === "up" ? "translateY(100%)" : "translateX(" + (tr.dir === "right" ? "-100%" : "100%") + ")";
    // wait for the sprite sheet so the robot never arrives invisible
    // Start only once the sprite sheet is downloaded AND decoded; otherwise the robot is invisible for the
    // first frames (or the whole run). The Image objects are kept in IMG so the browser cannot discard them.
    var img = IMG[tr.sprite] || (IMG[tr.sprite] = new Image()), started = false;
    if (!img.src) img.src = "assets/sprites/" + tr.sprite + ".webp";
    bot.style.opacity = 0; setFrame(bot, tr.sprite, 0, sc);
    function go() { if (started) return; started = true; bot.style.opacity = 1; t0 = performance.now(); requestAnimationFrame(tick); }
    (img.decode ? img.decode() : Promise.reject()).then(go, function () { if (img.complete) go(); else { img.onload = go; img.onerror = go; } });
    setTimeout(go, 1500);
  }

  /* ---------------- wiring ---------------- */
  function routeFromHash() { var r = location.hash.replace(/^#\/?/, ""); return ROUTES.indexOf(r) >= 0 ? r : "home"; }
  window.addEventListener("hashchange", function () { var r = routeFromHash(); if (r !== current) navigate(r, true); });
  $("#langs").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b || b.dataset.lang === lang) return;
    lang = b.dataset.lang; store.set("lang", lang); paint(current);
  });
  $("#theme").addEventListener("click", function () {
    var d = document.documentElement; d.dataset.theme = d.dataset.theme === "dark" ? "light" : "dark"; store.set("theme", d.dataset.theme); themeLabel();
  });
  window.addEventListener("resize", function () { fitSprites($("#page")); });
  // preload sprite sheets so the first transition is instant
  Object.keys(SP).forEach(function (n) { IMG[n] = new Image(); IMG[n].src = "assets/sprites/" + n + ".webp"; if (IMG[n].decode) IMG[n].decode().catch(function () {}); });
  paint(routeFromHash());

})();
