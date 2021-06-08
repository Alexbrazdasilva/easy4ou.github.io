import { $, All } from "./lib.js";
import { scrollToElement, dispatchOnScroll } from "./utils.js";

All("[data-href]").forEach(({ dataset }) => {
  $(`[data-href=${dataset.href}]`).on("click", ({ target }) =>
    scrollToElement(`[data-id-scroll-action=${target.dataset.href}]`)
  );
});

// Update on scroll
window.addEventListener("scroll", () =>
  dispatchOnScroll("dispatch-circle-animate", "active-on-scroll")
);
const lineSvg = window.document.createElement('line')
document.querySelector('[data-id=vertical-line]')
