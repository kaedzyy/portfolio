/* script.js
   Interactive features:
   1. Dark / light mode toggle (remembers the choice)
   2. Hamburger menu for mobile navigation
   (Smooth scrolling is handled in style.css with scroll-behavior.) */

// ---------- Get the elements we need from the page ----------
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const root = document.documentElement; // the <html> element

// ---------- Feature 1: Dark / light mode ----------

// Apply a theme ("light" or "dark") and update the button text and label
function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
  themeToggle.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
}

// Read the saved theme; fall back to the visitor's system preference
function getStartingTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Flip between themes when the button is clicked, and save the choice
function toggleTheme() {
  const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

themeToggle.addEventListener("click", toggleTheme);
applyTheme(getStartingTheme()); // set the theme as soon as the page loads

// ---------- Feature 2: Hamburger menu ----------

// Show or hide the mobile navigation panel
function toggleMenu() {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "Close" : "Menu";
}

// Close the menu (used after a link is tapped)
function closeMenu() {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "Menu";
}

menuToggle.addEventListener("click", toggleMenu);

// When any nav link is tapped, close the menu so the section is visible
nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});
