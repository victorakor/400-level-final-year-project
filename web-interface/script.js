document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("dark-mode-toggle");
  const languageSelect = document.getElementById("language") || document.getElementById("personnel-language");
  const timezoneSelect = document.getElementById("timezone");
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  // Apply saved preferences
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    if (darkToggle) darkToggle.checked = true;
  }

  if (darkToggle) {
    darkToggle.addEventListener("change", () => {
      const isDark = darkToggle.checked;
      document.body.classList.toggle("dark-mode", isDark);
      localStorage.setItem("darkMode", isDark);
    });
  }

  // Language Switching (Basic structure)
  const translations = {
    en: {
      title: "AI-BASED SURVEILLANCE SYSTEM",
      dark_mode: "Dark Mode",
    },
    fr: {
      title: "SYSTÈME DE SURVEILLANCE BASÉ SUR L'IA",
      dark_mode: "Mode Sombre",
    },
  };

  function applyLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  const currentLang = localStorage.getItem("language") || "en";
  applyLanguage(currentLang);
  if (languageSelect) languageSelect.value = currentLang;

  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      const newLang = languageSelect.value;
      localStorage.setItem("language", newLang);
      applyLanguage(newLang);
    });
  }

  if (timezoneSelect) {
    timezoneSelect.value = localStorage.getItem("timezone") || "Africa/Lagos";
    timezoneSelect.addEventListener("change", () => {
      localStorage.setItem("timezone", timezoneSelect.value);
    });
  }

  function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      timeZone: localStorage.getItem("timezone") || "Africa/Lagos"
    });
    const clock = document.getElementById("current-time");
    if (clock) clock.textContent = time;
  }
  setInterval(updateTime, 1000);
  updateTime();

  // Login Page Logic
  const signinBtn = document.getElementById("signin-btn");
  if (signinBtn) {
    signinBtn.addEventListener("click", () => {
      const users = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "personnel1", password: "pass123", role: "personnel" }
      ];
      const u = document.getElementById("username").value;
      const p = document.getElementById("password").value;
      const match = users.find(user => user.username === u && user.password === p);
      if (match) {
        sessionStorage.setItem("currentUser", JSON.stringify(match));
        location.href = match.role === "admin" ? "admin_overview.html" : "personnel_overview.html";
      } else {
        document.getElementById("signin-error")?.classList.remove("hidden");
      }
    });
    return; // Don't run dashboard scripts on login page
  }

  // Protect dashboard pages
  if (!currentUser) {
    location.href = "index.html";
    return;
  }

  // --- Additional dashboard functionalities like camera, alerts, etc ---
});
