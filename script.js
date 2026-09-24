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

  // ============================================================
// CUSTOM CURSOR — REALISTIC GLOWING SPARK + TRAIL
// Desktop only
// ============================================================

(function initSparkCursor() {

    // --------------------------------------------------------
    // Skip touch devices
    // --------------------------------------------------------

    const isTouchDevice =
        window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (isTouchDevice) return;


    // --------------------------------------------------------
    // Elements
    // --------------------------------------------------------

    const sparkCore =
        document.getElementById("cursorSparkCore");

    const sparkGlow =
        document.getElementById("cursorSparkGlow");

    const trailContainer =
        document.getElementById("cursorTrailContainer");


    if (!sparkCore || !sparkGlow || !trailContainer) {
        return;
    }


    // --------------------------------------------------------
    // Mouse position
    // --------------------------------------------------------

    let mouseX = 0;
    let mouseY = 0;

    let coreX = 0;
    let coreY = 0;

    let glowX = 0;
    let glowY = 0;


    // --------------------------------------------------------
    // Trail position
    // --------------------------------------------------------

    let lastTrailX = 0;
    let lastTrailY = 0;

    let initializedMouse = false;


    // --------------------------------------------------------
    // Track mouse
    // --------------------------------------------------------

    document.addEventListener("mousemove", function (e) {

        mouseX = e.clientX;
        mouseY = e.clientY;


        // First mouse position
        if (!initializedMouse) {

            coreX = mouseX;
            coreY = mouseY;

            glowX = mouseX;
            glowY = mouseY;

            lastTrailX = mouseX;
            lastTrailY = mouseY;

            initializedMouse = true;
        }

    });


    // ========================================================
    // SMOOTH CURSOR ANIMATION
    // ========================================================

    function animate() {

        // ----------------------------------------------------
        // Core = fast
        // ----------------------------------------------------

        coreX +=
            (mouseX - coreX) * 0.42;

        coreY +=
            (mouseY - coreY) * 0.42;


        // ----------------------------------------------------
        // Glow = slower
        // ----------------------------------------------------

        glowX +=
            (mouseX - glowX) * 0.12;

        glowY +=
            (mouseY - glowY) * 0.12;


        // ----------------------------------------------------
        // Apply position
        // ----------------------------------------------------

        sparkCore.style.left =
            coreX + "px";

        sparkCore.style.top =
            coreY + "px";


        sparkGlow.style.left =
            glowX + "px";

        sparkGlow.style.top =
            glowY + "px";


        requestAnimationFrame(animate);
    }


    animate();


    // ========================================================
    // CREATE REALISTIC SPARK
    // ========================================================

    function createTrailParticle(
        x,
        y,
        directionX = 0,
        directionY = 0
    ) {

        const particle =
            document.createElement("div");


        // ----------------------------------------------------
        // Random particle type
        // ----------------------------------------------------

        const random =
            Math.random();


        if (random < 0.22) {

            particle.className =
                "trail-particle micro";

        } else if (random < 0.38) {

            particle.className =
                "trail-particle streak";

        } else {

            particle.className =
                "trail-particle";
        }


        // ----------------------------------------------------
        // Random size
        // ----------------------------------------------------

        const size =
            Math.random() * 4 + 2;


        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        // ----------------------------------------------------
        // Random position offset
        // ----------------------------------------------------

        const offsetX =
            (Math.random() - 0.5) * 8;

        const offsetY =
            (Math.random() - 0.5) * 8;


        particle.style.left =
            (x + offsetX) + "px";

        particle.style.top =
            (y + offsetY) + "px";


        // ====================================================
        // PARTICLE DIRECTION
        // ====================================================

        const baseAngle =
            Math.atan2(
                directionY,
                directionX
            );


        // Random spread
        const spread =
            (Math.random() - 0.5) *
            Math.PI *
            1.5;


        const angle =
            baseAngle + spread;


        // Random travel distance
        const distance =
            20 + Math.random() * 55;


        // ----------------------------------------------------
        // Add a little gravity
        // ----------------------------------------------------

        const moveX =
            Math.cos(angle) *
            distance;


        const moveY =
            Math.sin(angle) *
            distance
            +
            Math.random() * 15;


        particle.style.setProperty(
            "--move-x",
            moveX + "px"
        );

        particle.style.setProperty(
            "--move-y",
            moveY + "px"
        );


        // ====================================================
        // RANDOM LIFETIME
        // ====================================================

        const duration =
            0.35 + Math.random() * 0.65;


        particle.style.animationDuration =
            duration + "s";


        // ====================================================
        // STREAK ROTATION
        // ====================================================

        if (
            particle.classList.contains("streak")
        ) {

            const streakAngle =
                Math.atan2(
                    moveY,
                    moveX
                ) *
                180 /
                Math.PI;


            particle.style.setProperty(
                "--angle",
                streakAngle + "deg"
            );
        }


        // ----------------------------------------------------
        // Add particle
        // ----------------------------------------------------

        trailContainer.appendChild(
            particle
        );


        // ----------------------------------------------------
        // Remove automatically
        // ----------------------------------------------------

        setTimeout(function () {

            particle.remove();

        }, duration * 1000);

    }


    // ========================================================
    // MOUSE TRAIL
    // ========================================================

    document.addEventListener(
        "mousemove",
        function (e) {

            if (!initializedMouse) {
                return;
            }


            const dx =
                e.clientX -
                lastTrailX;

            const dy =
                e.clientY -
                lastTrailY;


            const distance =
                Math.hypot(dx, dy);


            // ------------------------------------------------
            // Generate sparks every few pixels
            // ------------------------------------------------

            if (distance > 5) {


                // Main spark
                createTrailParticle(
                    e.clientX,
                    e.clientY,
                    dx,
                    dy
                );


                // Extra spark
                if (Math.random() < 0.70) {

                    createTrailParticle(
                        e.clientX,
                        e.clientY,
                        dx * 0.6,
                        dy * 0.6
                    );
                }


                // Reverse tiny spark
                if (Math.random() < 0.35) {

                    createTrailParticle(
                        e.clientX,
                        e.clientY,
                        -dx,
                        -dy
                    );
                }


                lastTrailX =
                    e.clientX;

                lastTrailY =
                    e.clientY;
            }

        }
    );


    // ========================================================
    // HOVER TARGETS
    // ========================================================

    const hoverTargets =
        document.querySelectorAll(
            `
            a,
            button,
            .btn,
            .nav-link,
            .service-card,
            .project-card,
            .included-card,
            .process-card,
            .feature-mini,
            .contact-item
            `
        );


    hoverTargets.forEach(
        function (target) {

            target.addEventListener(
                "mouseenter",
                function () {

                    sparkCore.classList.add(
                        "hover"
                    );

                    sparkGlow.classList.add(
                        "hover"
                    );

                }
            );


            target.addEventListener(
                "mouseleave",
                function () {

                    sparkCore.classList.remove(
                        "hover"
                    );

                    sparkGlow.classList.remove(
                        "hover"
                    );

                }
            );

        }
    );


    // ========================================================
    // CLICK / SPARK BURST
    // ========================================================

    document.addEventListener(
        "mousedown",
        function () {

            sparkCore.classList.add(
                "click"
            );

            sparkCore.classList.add(
                "flash"
            );


            // ------------------------------------------------
            // Main burst
            // ------------------------------------------------

            for (
                let i = 0;
                i < 30;
                i++
            ) {

                setTimeout(
                    function () {

                        const angle =
                            Math.random() *
                            Math.PI *
                            2;


                        const distance =
                            15 +
                            Math.random() *
                            70;


                        const burstX =
                            mouseX +
                            Math.cos(angle) *
                            distance;


                        const burstY =
                            mouseY +
                            Math.sin(angle) *
                            distance;


                        createTrailParticle(
                            burstX,
                            burstY,
                            Math.cos(angle),
                            Math.sin(angle)
                        );

                    },
                    Math.random() * 120
                );
            }


            // ------------------------------------------------
            // Extra micro sparks
            // ------------------------------------------------

            for (
                let i = 0;
                i < 18;
                i++
            ) {

                setTimeout(
                    function () {

                        createTrailParticle(
                            mouseX,
                            mouseY,
                            (Math.random() - 0.5) * 2,
                            (Math.random() - 0.5) * 2
                        );

                    },
                    Math.random() * 160
                );

            }

        }
    );


    // ========================================================
    // MOUSE UP
    // ========================================================

    document.addEventListener(
        "mouseup",
        function () {

            sparkCore.classList.remove(
                "click"
            );


            setTimeout(
                function () {

                    sparkCore.classList.remove(
                        "flash"
                    );

                },
                200
            );

        }
    );


    // ========================================================
    // HIDE WHEN MOUSE LEAVES WINDOW
    // ========================================================

    document.addEventListener(
        "mouseleave",
        function () {

            sparkCore.style.opacity =
                "0";

            sparkGlow.style.opacity =
                "0";

        }
    );


    // ========================================================
    // SHOW WHEN MOUSE ENTERS WINDOW
    // ========================================================

    document.addEventListener(
        "mouseenter",
        function () {

            sparkCore.style.opacity =
                "1";

            sparkGlow.style.opacity =
                "1";

        }
    );


    // ========================================================
    // GLOW PARALLAX / DEPTH
    // ========================================================

    document.addEventListener(
        "mousemove",
        function (e) {

            const x =
                (e.clientX /
                    window.innerWidth -
                    0.5) *
                20;


            const y =
                (e.clientY /
                    window.innerHeight -
                    0.5) *
                20;


            sparkGlow.style.transform =
                `translate(
                    calc(-50% + ${x}px),
                    calc(-50% + ${y}px)
                )`;

        }
    );


})();

});