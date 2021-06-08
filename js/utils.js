import { $, All } from "./lib.js";
// Bootstrap init functions
let tooltipTriggerList = [].slice.call(All('[data-bs-toggle="tooltip"]'));
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
const carousel = new bootstrap.Carousel(
  document.querySelector("[data-id=slide]")
);

// My Tools
export const scrollToElement = (element, sensibility) =>
  window.scrollTo({
    top: $(element).position("top") + window.pageYOffset - (sensibility || 50),
    behavior: "smooth",
  });

export const dispatchOnScroll = ({
  dispatch,
  target,
  sensibility,
}) => {
  let elementPositionIsVisible =
      $(`[data-id-scroll-action=${dispatch}]`).position("bottom") <=
      (sensibility || 0),
    elementDispatched = $(`[data-js-animate=${target}]`);

  elementPositionIsVisible
    ? elementDispatched.removeClass("scale-transition-hidden")
    : elementDispatched.addClass("scale-transition-hidden");
};

export const setHeightLine = () => {
  $(".pseudo-line").style(
    "height",
    `${
      $("[data-line-step=last]").position("top") -
      $(".pseudo-line").position("bottom")
    }px`
  );
}

export const setYearInPage = (element) =>
  $(element).text(new Date().getFullYear() || 2021);
