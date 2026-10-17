(function () {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || typeof window.gsap === "undefined") {
    root.classList.remove("js-motion");
    return;
  }

  const gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  root.classList.add("motion-on");

  const stage = document.querySelector("[data-work]");
  if (stage) {
    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: function () {
        root.classList.remove("js-motion");
      }
    });
    intro
      .fromTo(".intro > *", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.62, stagger: 0.09, clearProps: "transform" })
      .fromTo(".stage", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, clearProps: "transform" }, 0.12)
      .fromTo(".stage-sheen", { xPercent: -120 }, { xPercent: 140, duration: 0.95, ease: "power2.inOut" }, 0.38);

    gsap.to(".stage-glow", {
      x: -90,
      y: 130,
      duration: 7.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const glide = stage.querySelector(".stage-glide");
    const selectedTab = function () {
      return stage.querySelector('[role="tab"][aria-selected="true"]');
    };
    const placeGlide = function (tab, animate) {
      if (!glide || !tab) return;
      const vars = { x: tab.offsetLeft, width: tab.offsetWidth, overwrite: "auto" };
      if (animate) {
        gsap.to(glide, Object.assign({ duration: 0.38, ease: "power3.out" }, vars));
      } else {
        gsap.set(glide, vars);
      }
    };

    placeGlide(selectedTab(), false);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        placeGlide(selectedTab(), false);
      });
    }
    window.addEventListener("resize", function () {
      placeGlide(selectedTab(), false);
    });

    stage.addEventListener("tabchange", function (event) {
      const tab = event.detail && event.detail.tab;
      const dir = (event.detail && event.detail.dir) || 1;
      if (!tab) return;
      placeGlide(tab, true);
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      if (!panel) return;
      gsap.fromTo(panel, { x: 26 * dir, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
        clearProps: "transform"
      });
    });

    const lower = document.querySelector(".lower");
    if (lower && window.ScrollTrigger && lower.getBoundingClientRect().top > window.innerHeight * 0.7) {
      gsap.fromTo(".lower > div", { y: 28, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: lower, start: "top 88%" }
      });
    }
  } else {
    const heroBits = document.querySelectorAll(".blog-hero .hero-inner > *, .sobre-hero .hero-inner > *, #heroSection .hero-inner > *");
    if (heroBits.length) {
      gsap.fromTo(heroBits, { y: 18, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
        onComplete: function () {
          root.classList.remove("js-motion");
        }
      });
    } else {
      root.classList.remove("js-motion");
    }
  }

  if (!window.ScrollTrigger) return;

  const cardSelector = ".case-row, .sys-row, .site-line, .post-card, .featured-post, .edu-card, .cert-card";
  let queued = false;

  function armCards() {
    queued = false;
    document.querySelectorAll(cardSelector).forEach(function (el) {
      if (el.dataset.motion === "1") return;
      el.dataset.motion = "1";
      gsap.fromTo(el, { y: 18, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 92%", once: true }
      });
    });
  }

  function queueCards() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(armCards);
  }

  queueCards();
  const list = document.querySelector("main") || document.body;
  new MutationObserver(queueCards).observe(list, { childList: true, subtree: true });
})();
