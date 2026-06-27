// Smooth scrolling and active header sync
window.setupNavigation = function() {
  const links = document.querySelectorAll(".nav-menu .nav-link, .footer-links a");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const targetSec = document.querySelector(targetId);
        if (targetSec) {
          e.preventDefault();
          window.scrollTo({
            top: targetSec.offsetTop - 85,
            behavior: "smooth"
          });
        }
      }
    });
  });
};

// Intersection Observer for highlighting menu paths
window.setupScrollObserver = function() {
  const sections = document.querySelectorAll(".content-section");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: "-80px 0px -40px 0px" });

  sections.forEach(section => sectionObserver.observe(section));
};
