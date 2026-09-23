(function () {
  "use strict";

  // ============================================================
  // 1. BACKGROUND PARTICLES
  // ============================================================
  const bgEffects = document.querySelector(".bg-effects");
  if (bgEffects) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const size = Math.random() * 3 + 1.5;
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDuration = Math.random() * 15 + 12 + "s";
      particle.style.animationDelay = Math.random() * -15 + "s";
      bgEffects.appendChild(particle);
    }
  }

  // ============================================================
  // 2. INTRO OVERLAY
  // ============================================================
  const intro = document.getElementById("introOverlay");
  if (intro) {
    setTimeout(() => {
      intro.style.display = "none";
    }, 1800);
  }

  // ============================================================
  // 3. DETECT DESKTOP vs MOBILE
  // ============================================================
  const isDesktop = () => window.innerWidth > 768;

  // ============================================================
  // 4. DESKTOP NAVIGATION & PAGE TRANSITIONS
  // ============================================================
  const sections = document.querySelectorAll(".section");
  const navButtons = document.querySelectorAll(".left-page .nav-link");
  const rightPage = document.getElementById("rightPage");

  let currentSection = "home";
  let isTransitioning = false;

  function showDesktopSection(sectionId) {
    if (isTransitioning || sectionId === currentSection) return;
    if (!isDesktop()) return;

    isTransitioning = true;

    const currentEl = document.getElementById(currentSection);
    const nextEl = document.getElementById(sectionId);

    if (!currentEl || !nextEl) {
      isTransitioning = false;
      return;
    }

    currentEl.classList.add("exit");

    setTimeout(() => {
      currentEl.classList.remove("active", "exit");
      currentEl.style.display = "none";

      nextEl.style.display = "flex";
      nextEl.classList.remove("active");
      void nextEl.offsetWidth;
      nextEl.classList.add("active");

      navButtons.forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.section === sectionId) btn.classList.add("active");
      });

      document
        .querySelectorAll(".mobile-menu-overlay .nav-link")
        .forEach((btn) => {
          btn.classList.remove("active");
          if (btn.dataset.section === sectionId) btn.classList.add("active");
        });

      currentSection = sectionId;
      rightPage.scrollTop = 0;

      setTimeout(() => {
        nextEl.querySelectorAll(".reveal").forEach((el) => {
          el.classList.remove("visible");
          void el.offsetWidth;
          el.classList.add("visible");
        });
      }, 100);

      setTimeout(() => {
        isTransitioning = false;
      }, 600);
    }, 500);
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const section = btn.dataset.section;
      if (section && isDesktop()) {
        showDesktopSection(section);
      } else if (section && !isDesktop()) {
        const target = document.getElementById(section);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        document
          .querySelectorAll(".mobile-menu-overlay .nav-link")
          .forEach((b) => {
            b.classList.remove("active");
            if (b.dataset.section === section) b.classList.add("active");
          });
      }
    });
  });

  // ============================================================
  // 5. MOBILE MENU
  // ============================================================
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileCloseBtn = document.getElementById("mobileCloseBtn");

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      mobileMenuOverlay.classList.add("open");
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener("click", () => {
      mobileMenuOverlay.classList.remove("open");
    });
  }

  document.querySelectorAll(".mobile-menu-overlay .nav-link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const section = btn.dataset.section;
      mobileMenuOverlay.classList.remove("open");

      if (section) {
        const target = document.getElementById(section);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }
        document
          .querySelectorAll(".mobile-menu-overlay .nav-link")
          .forEach((b) => {
            b.classList.remove("active");
            if (b.dataset.section === section) b.classList.add("active");
          });
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (mobileMenuOverlay && mobileMenuOverlay.classList.contains("open")) {
      if (
        !mobileMenuOverlay.contains(e.target) &&
        e.target !== hamburgerBtn &&
        !hamburgerBtn.contains(e.target)
      ) {
        mobileMenuOverlay.classList.remove("open");
      }
    }
  });

  // ============================================================
  // 6. CTA BUTTONS (data-section)
  // ============================================================
  document.querySelectorAll("[data-section]").forEach((el) => {
    if (el.classList.contains("nav-link")) return;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const section = el.dataset.section;
      if (!section) return;

      if (isDesktop()) {
        showDesktopSection(section);
      } else {
        const target = document.getElementById(section);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        document
          .querySelectorAll(".mobile-menu-overlay .nav-link")
          .forEach((b) => {
            b.classList.remove("active");
            if (b.dataset.section === section) b.classList.add("active");
          });
      }
    });
  });

  // ============================================================
  // 7. RSVP FORM
  // ============================================================
  const rsvpForm = document.getElementById("rsvpForm");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullname = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!fullname || !email || !phone) {
        alert("Please fill in all required fields.");
        return;
      }

      modalOverlay.classList.add("show");
      rsvpForm.reset();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      modalOverlay.classList.remove("show");
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("show");
      }
    });
  }

  // ============================================================
  // 8. MOBILE SCROLL ANIMATIONS (IntersectionObserver)
  // ============================================================
  let observer = null;

  function initMobileObserver() {
    if (observer) observer.disconnect();

    const sectionContents = document.querySelectorAll(
      ".section .section-content",
    );

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    sectionContents.forEach((content) => {
      content.classList.remove("visible");
      observer.observe(content);
    });
  }

  if (!isDesktop()) {
    initMobileObserver();
  }

  // ============================================================
  // 9. RESIZE HANDLING
  // ============================================================
  let lastIsDesktop = isDesktop();
  window.addEventListener("resize", () => {
    const nowDesktop = isDesktop();
    if (nowDesktop !== lastIsDesktop) {
      lastIsDesktop = nowDesktop;

      if (nowDesktop) {
        // Switching to desktop
        sections.forEach((sec) => {
          sec.classList.remove("active", "exit", "visible");
          sec.style.display = "";
          sec
            .querySelectorAll(".section-content")
            .forEach((c) => c.classList.remove("visible"));
        });
        const home = document.getElementById("home");
        if (home) {
          home.classList.add("active");
          home.style.display = "flex";
        }
        navButtons.forEach((btn) => {
          btn.classList.remove("active");
          if (btn.dataset.section === "home") btn.classList.add("active");
        });
        currentSection = "home";
      } else {
        // Switching to mobile
        sections.forEach((sec) => {
          sec.classList.remove("active", "exit");
          sec.style.display = "";
          sec
            .querySelectorAll(".section-content")
            .forEach((c) => c.classList.remove("visible"));
        });
        initMobileObserver();
      }
    }
  });

  // ============================================================
  // 10. INITIAL SETUP
  // ============================================================
  function init() {
    if (isDesktop()) {
      sections.forEach((sec) => {
        if (sec.id === "home") {
          sec.classList.add("active");
          sec.style.display = "flex";
        } else {
          sec.classList.remove("active");
          sec.style.display = "none";
        }
      });
      currentSection = "home";
    } else {
      sections.forEach((sec) => {
        sec.style.display = "block";
        sec.classList.remove("active", "exit");
      });
      initMobileObserver();

      document
        .querySelectorAll(".mobile-menu-overlay .nav-link")
        .forEach((b) => {
          b.classList.remove("active");
          if (b.dataset.section === "home") b.classList.add("active");
        });
    }

    if (isDesktop()) {
      setTimeout(() => {
        document.querySelectorAll("#home .reveal").forEach((el) => {
          el.classList.add("visible");
        });
      }, 1200);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ============================================================
  // 11. DESKTOP: Handle resize for section display
  // ============================================================
  window.addEventListener("resize", () => {
    if (isDesktop()) {
      sections.forEach((sec) => {
        if (sec.id === currentSection) {
          sec.style.display = "flex";
          sec.classList.add("active");
        } else {
          sec.style.display = "none";
          sec.classList.remove("active", "exit");
        }
      });
    }
  });
})();
