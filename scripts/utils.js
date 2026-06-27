// Global state holding configuration overrides
window.appState = {
  theme: "dark",
  messages: []
};

// Save & load state using browser storage
window.loadLocalStorage = function() {
  try {
    if (localStorage.getItem("sre_portfolio_theme")) {
      window.appState.theme = localStorage.getItem("sre_portfolio_theme");
    }
    if (localStorage.getItem("sre_portfolio_messages")) {
      window.appState.messages = JSON.parse(localStorage.getItem("sre_portfolio_messages"));
    }
  } catch (e) {
    console.warn("Unable to load state from localStorage:", e);
  }
};

window.saveState = function(key, val) {
  window.appState[key] = val;
  try {
    if (typeof val === "object") {
      localStorage.setItem(`sre_portfolio_${key}`, JSON.stringify(val));
    } else {
      localStorage.setItem(`sre_portfolio_${key}`, val);
    }
  } catch (e) {
    console.warn("Unable to save state to localStorage:", e);
  }
};

// Form validation helpers
window.validateEmail = function(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

window.showInputError = function(inputEl, errorId) {
  if (inputEl) inputEl.classList.add("invalid");
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.style.display = "block";
};

window.resetFormErrors = function() {
  document.querySelectorAll(".form-input").forEach(i => i.classList.remove("invalid"));
  document.querySelectorAll(".form-error-msg").forEach(m => m.style.display = "none");
};

// Toast notification helper
window.showToast = function(text) {
  const toast = document.getElementById("toast-msg-container");
  const msgEl = document.getElementById("toast-msg-text");
  if (toast && msgEl) {
    msgEl.innerText = text;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }
};
