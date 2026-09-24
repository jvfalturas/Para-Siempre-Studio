document.addEventListener("DOMContentLoaded", function () {

  // ============================================================
  // 0. LOADING SCREEN (3 seconds)
  // ============================================================
  (function initLoader() {
    const loaderOverlay = document.getElementById("loaderOverlay");
    const loaderBarFill = document.getElementById("loaderBarFill");
    const loaderPercentage = document.getElementById("loaderPercentage");

    if (!loaderOverlay) return;

    const duration = 3000;   // 3 seconds
    const interval = 30;     // update every 30ms
    const steps = duration / interval;
    let currentStep = 0;

    // Lock scroll while loading
    document.body.classList.add("loading");

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);

      if (loaderBarFill) {
        loaderBarFill.style.width = progress + "%";
      }
      if (loaderPercentage) {
        loaderPercentage.textContent = Math.floor(progress) + "%";
      }

      if (currentStep >= steps) {
        clearInterval(timer);

        setTimeout(() => {
          loaderOverlay.classList.add("hidden");

          // Restore scroll
          document.body.classList.remove("loading");

          // Remove from DOM after fade out
          setTimeout(() => {
            loaderOverlay.remove();
          }, 800);
        }, 200);
      }
    }, interval);
  })();

  // ============================================================
  // 1. NAVBAR SHADOW ON SCROLL
  // ============================================================
  const navbar = document.getElementById("mainNavbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ============================================================
  // 2. CLOSE MOBILE NAVBAR AFTER CLICKING A LINK
  // ============================================================
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const navbarContent = document.getElementById("navbarContent");
      if (navbarContent.classList.contains("show")) {
        const navbarButton = document.querySelector(".navbar-toggler");
        navbarButton.click();
      }
    });
  });

  // ============================================================
  // 3. UPDATE ACTIVE NAV LINK WHILE SCROLLING
  // ============================================================
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });

});