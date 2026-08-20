/* ==========================================================================
   TIRUPATI METACHEMS — main.js
   Nav, menu, scrollspy, reveals, counters, parallax, cursor, products
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
     1. PRODUCT DATA  (factual content only — no invented specs)
  --------------------------------------------------------------- */
  var CATEGORIES = [
    { id: "chemicals", name: "Foundry Chemicals & Fluxes" },
    { id: "rcs", name: "Resin Coated Sand" },
    { id: "furnace", name: "Furnace & Lining Materials" },
    { id: "abrasives", name: "Abrasives & Industrial Materials" }
  ];

  var PRODUCTS = [
    {
      id: "degasser", cat: "chemicals", name: "De-Gasser",
      lede: "A specialised flux used for the removal of dissolved gases from molten metal during melting and holding.",
      applications: ["Ferrous casting", "Non-ferrous casting", "Metal refining"],
      benefits: ["Helps reduce dissolved gas content in molten metal", "Supports cleaner metal for casting operations"]
    },
    {
      id: "grain-refiner", cat: "chemicals", name: "Grain Refiner",
      lede: "A flux formulation used to refine the grain structure of cast metal for improved casting characteristics.",
      applications: ["Non-ferrous casting", "Aluminium casting", "Metal refining"],
      benefits: ["Supports refined grain structure", "Improves casting consistency"]
    },
    {
      id: "cover-flux", cat: "chemicals", name: "Cover Flux",
      lede: "A protective flux applied as a cover over molten metal to minimise oxidation and gas pickup.",
      applications: ["Furnace operations", "Holding furnaces", "Non-ferrous casting"],
      benefits: ["Reduces surface oxidation", "Helps limit gas pickup during holding"]
    },
    {
      id: "mgr-tablet", cat: "chemicals", name: "M.G.R. Tablet",
      lede: "Tablet-form metal treatment flux for foundry application requirements.",
      applications: ["Metal refining", "Foundry moulding operations"],
      benefits: ["Convenient measured dosing", "Consistent treatment performance"]
    },
    {
      id: "foundry-fluxes", cat: "chemicals", name: "Foundry Fluxes",
      lede: "A comprehensive line of fluxes formulated for foundry melting, holding and casting operations.",
      applications: ["Ferrous casting", "Non-ferrous casting", "Foundry moulding", "Core manufacturing"],
      benefits: ["Broad application coverage", "Backed by decades of foundry experience"]
    },
    {
      id: "reducing-fluxes", cat: "chemicals", name: "Reducing Fluxes",
      lede: "Fluxes designed to create reducing conditions during molten metal treatment.",
      applications: ["Metal refining", "Ferrous casting"],
      benefits: ["Supports controlled metal treatment", "Assists in removal of non-metallic inclusions"]
    },
    {
      id: "oxidation-fluxes", cat: "chemicals", name: "Oxidation Fluxes",
      lede: "Fluxes formulated for oxidation-based molten metal treatment processes.",
      applications: ["Metal refining", "Non-ferrous casting"],
      benefits: ["Facilitates specific treatment reactions", "Technical support available"]
    },
    {
      id: "resin-coated-sand", cat: "rcs", name: "Resin Coated Sand",
      lede: "Specialised resin-coated sand manufactured for shell moulding and core-making applications.",
      applications: ["Shell moulding", "Core manufacturing", "Foundry moulding"],
      benefits: ["Consistent coating quality", "Engineered for mould and core applications", "Supported by application expertise"]
    },
    {
      id: "silica-lining", cat: "furnace", name: "Silica Lining Materials",
      lede: "Silica-based lining materials for furnace and induction furnace applications.",
      applications: ["Induction furnace operations", "Furnace maintenance"],
      benefits: ["Silica-based construction", "Supported by technical guidance"]
    },
    {
      id: "magnesite-lining", cat: "furnace", name: "Magnesite Lining Materials",
      lede: "Magnesite-based lining materials for furnace applications.",
      applications: ["Furnace operations", "Induction furnace operations"],
      benefits: ["Magnesite-based construction", "Technical support available"]
    },
    {
      id: "heat-treatment-salts", cat: "furnace", name: "Heat Treatment Salts",
      lede: "Salt products used in heat treatment processes across industrial applications.",
      applications: ["Heat treatment processes", "Metal processing"],
      benefits: ["Range of heat treatment salt products", "Application guidance available"]
    },
    {
      id: "carbon-products", cat: "furnace", name: "Carbon Products",
      lede: "Carbon-based products for foundry and metallurgical applications.",
      applications: ["Foundry processes", "Metal treatment"],
      benefits: ["Carbon-based material range", "Technical support available"]
    },
    {
      id: "abrasives-grains", cat: "abrasives", name: "Abrasives & Grains",
      lede: "Abrasives, grains and other specialised industrial materials for processing applications.",
      applications: ["Surface processing", "Industrial material applications"],
      benefits: ["Industrial-grade material range", "Consultation on requirements"]
    },
    {
      id: "industrial-materials", cat: "abrasives", name: "Industrial Materials",
      lede: "Specialised industrial materials supplied to meet specific processing and manufacturing requirements.",
      applications: ["Industrial processing", "Specialised requirements"],
      benefits: ["Custom requirement consultation", "Reliable supply"]
    }
  ];

  /* ---------------------------------------------------------------
     2. DOM helpers
  --------------------------------------------------------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------------------------------------------------------------
     3. NAVIGATION
  --------------------------------------------------------------- */
  var nav = $(".nav");
  var burger = $(".nav__burger");
  var mobileMenu = $(".mobile-menu");
  var menuLinks = $$(".mobile-menu a");

  function onScrollNav() {
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  function closeMenu() {
    nav.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
    menuLinks.forEach(function (a, i) { a.style.transitionDelay = "0s"; });
  }

  if (burger) {
    burger.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("is-open");
      nav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        menuLinks.forEach(function (a, i) { a.style.transitionDelay = (0.08 + i * 0.07) + "s"; });
      }
    });
  }
  menuLinks.forEach(function (a) { a.addEventListener("click", closeMenu); });
  var menuClose = $(".mobile-menu__close");
  if (menuClose) menuClose.addEventListener("click", closeMenu);
  window.addEventListener("resize", function () { if (window.innerWidth > 1080) closeMenu(); });

  /* ---------------------------------------------------------------
     4. SCROLLSPY (active nav link)
  --------------------------------------------------------------- */
  var spySections = $$("main section[id], main header[id]");
  var navLinks = $$(".nav__links a");

  function spy() {
    var pos = window.scrollY + 120;
    var current = "home";
    spySections.forEach(function (sec) {
      if (sec.offsetTop <= pos) current = sec.id;
    });
    navLinks.forEach(function (a) {
      var target = a.getAttribute("href").replace("#", "");
      a.classList.toggle("is-active", target === current || a.classList.contains("is-page-active"));
    });
  }
  window.addEventListener("scroll", spy, { passive: true });
  window.addEventListener("load", spy);

  /* ---------------------------------------------------------------
     5. REVEAL ON SCROLL
  --------------------------------------------------------------- */
  var revealEls = $$(".reveal, .reveal-line, .hero__title .line, .stats__item");

  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------------------------------------------------------
     6. COUNTERS
  --------------------------------------------------------------- */
  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10);
        var dur = 1600;
        var start = null;
        function tick(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
  }

  /* ---------------------------------------------------------------
     7. PARALLAX
  --------------------------------------------------------------- */
  var parallaxEls = $$("[data-parallax]");
  var isMobile = window.innerWidth <= 640;
  if (!prefersReduced && !isMobile && parallaxEls.length) {
    var ticking = false;
    function setParallax() {
      ticking = false;
      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) return;
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
        var offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
    }
    function requestParallax() {
      if (!ticking) { ticking = true; requestAnimationFrame(setParallax); }
    }
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
    setParallax();
  }

  /* ---------------------------------------------------------------
     8. MAGNETIC BUTTONS (desktop only)
  --------------------------------------------------------------- */
  var magnetic = $$(".btn-magnetic");
  if (!prefersReduced && window.matchMedia("(pointer:fine)").matches) {
    magnetic.forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * 0.12 + "px," + y * 0.18 + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------------
     9. CUSTOM CURSOR (desktop only)
  --------------------------------------------------------------- */
  if (!prefersReduced && window.matchMedia("(pointer:fine)").matches) {
    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    var mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
      document.body.classList.add("has-cursor");
    });
    (function ringLoop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(ringLoop);
    })();
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest("a, button, .prod-card, .app, .modal__close, input, textarea, select")) {
        ring.classList.add("is-hover");
      }
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest("a, button, .prod-card, .app, .modal__close, input, textarea, select")) {
        ring.classList.remove("is-hover");
      }
    });
  }

  /* ---------------------------------------------------------------
     10. PRODUCT CATALOG MODAL
  --------------------------------------------------------------- */
  var modal = $(".modal");
  var modalBackdrop = $(".modal__backdrop");
  var modalClose = $(".modal__close");
  var modalBody = $(".modal__body");
  var body = document.body;

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function openModal() {
    modal.classList.add("is-open");
    body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("is-open");
    body.style.overflow = "";
  }
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  function chip(c, active) {
    return '<button type="button" class="chip' + (active ? " is-active" : "") + '" data-filter="' + c.id + '">' + esc(c.name) + "</button>";
  }

  function catalogHTML(activeCat) {
    var list = activeCat === "all" ? PRODUCTS : PRODUCTS.filter(function (p) { return p.cat === activeCat; });
    var cats = CATEGORIES.map(function (c) { return chip(c, activeCat === c.id); }).join("");
    var tiles = list.map(function (p) {
      return '<button type="button" class="pcard" data-id="' + p.id + '">' +
        '<span class="pcard__name">' + esc(p.name) + "</span>" +
        '<span class="pcard__lede">' + esc(p.lede) + "</span>" +
        '<span class="pcard__go">View details &rarr;</span>' +
        "</button>";
    }).join("");
    return '<div class="catalog">' +
      '<div class="catalog__head">' +
        '<h4 class="modal__h">Browse products</h4>' +
        '<div class="catalog__chips">' + chip({ id: "all", name: "All Products" }, activeCat === "all") + cats + "</div>" +
      "</div>" +
      '<div class="catalog__grid">' + tiles + "</div>" +
      "</div>";
  }

  function openCatalog(activeCat) {
    modalBody.innerHTML = catalogHTML(activeCat || "all");
    openModal();
    bindCatalog();
  }

  function detailHTML(p) {
    var apps = p.applications.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("");
    var ben = p.benefits.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("");
    return '<div class="pdetail">' +
      '<button type="button" class="pdetail__back">&larr; All products</button>' +
      '<div class="modal__head pdetail__head">' +
        '<span class="modal__cat">' + esc(catName(p.cat)) + "</span>" +
        '<h3 class="modal__title">' + esc(p.name) + "</h3>" +
      "</div>" +
      '<p class="modal__lede">' + esc(p.lede) + "</p>" +
      '<div class="modal__cols">' +
        '<div><h4 class="modal__h">Applications</h4><ul class="modal__list">' + apps + "</ul></div>" +
        '<div><h4 class="modal__h">Benefits</h4><ul class="modal__list">' + ben + "</ul></div>" +
      "</div>" +
      '<div class="modal__foot">' +
        '<button type="button" class="btn btn--dark btn-magnetic enquire" data-product="' + esc(p.name) + '">Request Product Information <span class="arr">&rarr;</span></button>' +
      "</div>" +
      "</div>";
  }

  function openDetail(id) {
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    modalBody.innerHTML = detailHTML(p);
    modalBody.scrollTop = 0;
    $(".pdetail__back").addEventListener("click", function () { openCatalog(p.cat); });
    bindEnquire();
  }

  function bindCatalog() {
    $$(".catalog__chips .chip", modalBody).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        $$(".catalog__chips .chip", modalBody).forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        var grid = $(".catalog__grid", modalBody);
        grid.style.opacity = "0";
        setTimeout(function () {
          modalBody.innerHTML = catalogHTML(f);
          bindCatalog();
        }, 220);
      });
    });
    $$(".pcard", modalBody).forEach(function (card) {
      card.addEventListener("click", function () { openDetail(card.getAttribute("data-id")); });
    });
  }

  function bindEnquire() {
    $$(".enquire", modalBody).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var product = btn.getAttribute("data-product");
        var contact = $("#contact");
        if (contact) {
          var select = $("#enquiry-product");
          if (select) select.value = product;
          closeModal();
          contact.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(function () {
            var first = $(".form input, .form textarea, .form select");
            if (first) first.focus({ preventScroll: true });
          }, 700);
        } else {
          window.location.href = "contact.html?product=" + encodeURIComponent(product);
        }
      });
    });
  }

  $$(".js-open-catalog").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openCatalog(el.getAttribute("data-cat") || "all");
    });
  });

  /* ---------------------------------------------------------------
     11. PRODUCT FORM SELECT + ENQUIRY FORM
  --------------------------------------------------------------- */
  var productSelect = $("#enquiry-product");
  if (productSelect) {
    var opts = PRODUCTS.map(function (p) {
      return '<option value="' + esc(p.name) + '">' + esc(p.name) + "</option>";
    }).join("");
    productSelect.innerHTML = "<option value=\"General Enquiry\" selected>General Enquiry</option>" + opts;
  }

  var urlParams = new URLSearchParams(window.location.search);
  var productParam = urlParams.get("product");
  if (productParam && productSelect) productSelect.value = productParam;

  var form = $(".form");
  var formSuccess = $(".form-success");

  function formField(id) {
    var el = $("#" + id);
    return el ? el.value.trim() : "";
  }

  function formSummary() {
    return {
      name: formField("f-name"),
      company: formField("f-company"),
      email: formField("f-email"),
      phone: formField("f-phone"),
      product: formField("enquiry-product"),
      message: formField("f-message")
    };
  }

  function showSuccess(msg) {
    if (formSuccess) {
      formSuccess.textContent = msg;
      formSuccess.classList.add("is-show");
    }
  }

  function validForm() {
    form.querySelectorAll(".form__input, .form__select, .form__textarea").forEach(function (el) {
      el.classList.toggle("is-invalid", !el.checkValidity());
    });
    form.querySelectorAll(".is-invalid").forEach(function (el) {
      el.addEventListener("input", function () { el.classList.remove("is-invalid"); }, { once: true });
    });
    var ok = form.checkValidity();
    if (!ok && form.reportValidity) form.reportValidity();
    return ok;
  }

  if (form) {
    var mailBtn = $("#send-mail");

    form.addEventListener("invalid", function (e) {
      e.target.classList.add("is-invalid");
    }, true);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validForm()) return;
      var d = formSummary();
      var email = form.getAttribute("data-email") || "sales@tirupatimetachems.in";
      var subject = encodeURIComponent("Enquiry from " + d.name + " — Tirupati Metachems");
      var body = encodeURIComponent(
        "Name: " + d.name + "\n" +
        "Company: " + (d.company || "—") + "\n" +
        "Email: " + d.email + "\n" +
        "Phone: " + (d.phone || "—") + "\n" +
        "Product / Requirement: " + (d.product || "General Enquiry") + "\n\n" +
        "Message:\n" + d.message
      );
      window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
      showSuccess("Your email app should open with your enquiry ready to send.");
    });

    var waBtn = $("#send-whatsapp");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        if (!validForm()) return;
        var d = formSummary();
        var text = encodeURIComponent(
          "Enquiry for Tirupati Metachems\n" +
          "Name: " + d.name + "\n" +
          "Company: " + (d.company || "—") + "\n" +
          "Email: " + d.email + "\n" +
          "Phone: " + (d.phone || "—") + "\n" +
          "Product / Requirement: " + (d.product || "General Enquiry") + "\n\n" +
          d.message
        );
        window.open("https://wa.me/919711268001?text=" + text, "_blank", "noopener");
        showSuccess("WhatsApp should open with your enquiry ready to send.");
      });
    }
  }

  /* ---------------------------------------------------------------
     12. FOOTER YEAR
  --------------------------------------------------------------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function catName(id) {
    var c = CATEGORIES.filter(function (x) { return x.id === id; })[0];
    return c ? c.name : "";
  }
})();
