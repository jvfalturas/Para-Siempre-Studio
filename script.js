document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("mainNavbar");
  /* |-------------------------------------------------------------------------- | Navbar shadow when scrolling |-------------------------------------------------------------------------- */ window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
  );
  /* |-------------------------------------------------------------------------- | Close mobile navbar after clicking a link |-------------------------------------------------------------------------- */ const navLinks =
    document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const navbarContent = document.getElementById("navbarContent");
      if (navbarContent.classList.contains("show")) {
        const navbarButton = document.querySelector(".navbar-toggler");
        navbarButton.click();
      }
    });
  });
  /* |-------------------------------------------------------------------------- | Update active navigation link while scrolling |-------------------------------------------------------------------------- */ const sections =
    document.querySelectorAll("section[id]");
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