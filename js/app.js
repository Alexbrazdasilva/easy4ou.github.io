import { $, All } from "./lib.js";
import {
  scrollToElement,
  dispatchOnScroll,
  setYearInPage,
  setHeightLine,
} from "./utils.js";

All("[data-href], [data-mob-href]").forEach(({ dataset }) => {
  $(`[data-href=${dataset.href}], [data-mob-href=${dataset.mobHref}]`).on(
    "click",
    ({ target }) => {
      const _href = target.dataset.href || target.dataset.mobHref;
      const _el = `[data-id-scroll-action=${_href}]`;
      scrollToElement(_el);
    }
  );
});

setYearInPage("[data-id=year]");
setHeightLine();
// Update on scroll
window.addEventListener("scroll", () =>
  dispatchOnScroll({
    dispatch: "dispatch-circle-animate",
    target: "active-on-scroll",
  })
);
