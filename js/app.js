import { $, All } from "./lib.js";
import {
  scrollToElement,
  setYearInPage,
  setHeightLine,
  setDivLine,
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

const setLines = (target) => {
  if(target.innerWidth > 767) {
    setDivLine(true) 
    setHeightLine(true)
  } else {
    setDivLine(false) 
    setHeightLine(false)
  }
}
window.onload = ({ currentTarget }) => setLines(currentTarget)