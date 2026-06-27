// Theme system triggers
window.applyTheme = function() {
  const sunIcon = document.getElementById("theme-sun-icon");
  const moonIcon = document.getElementById("theme-moon-icon");

  if (window.appState.theme === "light") {
    document.body.classList.add("light-mode");
    if (sunIcon) sunIcon.style.display = "none";
    if (moonIcon) moonIcon.style.display = "block";
  } else {
    document.body.classList.remove("light-mode");
    if (sunIcon) sunIcon.style.display = "block";
    if (moonIcon) moonIcon.style.display = "none";
  }
};

window.setupThemeToggle = function() {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const newTheme = window.appState.theme === "dark" ? "light" : "dark";
      window.saveState("theme", newTheme);
      window.applyTheme();
    });
  }
};
