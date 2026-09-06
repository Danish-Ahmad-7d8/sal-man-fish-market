function toggleMobileMenu() {
  const nav = document.querySelector(".main-nav");
  const button = document.querySelector(".menu-toggle");
  if (!nav || !button) return;
  const open = nav.classList.toggle("open");
  button.setAttribute("aria-expanded", open ? "true" : "false");
  button.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  button.classList.toggle("is-open", open);
}
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".main-nav");
  if (!nav) return;
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      if (window.innerWidth <= 760) {
        nav.classList.remove("open");
        const b = document.querySelector(".menu-toggle");
        if (b) {
          b.setAttribute("aria-expanded", "false");
          b.setAttribute("aria-label", "Open navigation");
          b.classList.remove("is-open");
        }
      }
    }),
  );
});

document.addEventListener("click", (e) => {
  const nav = document.querySelector(".main-nav"),
    btn = document.querySelector(".menu-toggle");
  if (!nav || !btn || window.innerWidth > 760) return;
  if (
    nav.classList.contains("open") &&
    !nav.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    nav.classList.remove("open");
    btn.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    const nav = document.querySelector(".main-nav"),
      btn = document.querySelector(".menu-toggle");
    if (nav) nav.classList.remove("open");
    if (btn) {
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  }
});
