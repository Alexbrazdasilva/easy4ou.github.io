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
All("[data-item-legend]").forEach(({ dataset }) => {
  $(
    `[data-item-legend=${dataset.itemLegend}], [data-legend=${dataset.itemLegend}]`
  ).on("mouseenter", () =>
    $(`.circle-svg-item[data-circle=${dataset.itemLegend}]`).addClass(
      "selected"
    )
  );
  $(
    `[data-item-legend=${dataset.itemLegend}], [data-legend=${dataset.itemLegend}]`
  ).on("mouseout", () =>
    $(`.circle-svg-item[data-circle=${dataset.itemLegend}]`).removeClass(
      "selected"
    )
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
