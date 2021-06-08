import { $, All } from "./lib.js";
// Bootstrap init functions 
let tooltipTriggerList = [].slice.call(All('[data-bs-toggle="tooltip"]'));
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
const carousel = new bootstrap.Carousel(document.querySelector("[data-id=slide]"));
// My Tools
export const scrollToElement = (element, sensibility) =>
  window.scrollTo({
    top: $(element).position("top") + window.pageYOffset - (sensibility || 50),
    behavior: "smooth",
  });

export const dispatchOnScroll = (animateElement, animateDispatch, sensibility) => {
  if ($(`[data-id-scroll-action=${animateElement}]`).position("bottom") <= (sensibility || 0)) {
    $(`[data-js-animate=${animateDispatch}]`).removeClass(
      "scale-transition-hidden"
    );
  } else {
    $(`[data-js-animate=${animateDispatch}]`).addClass(
      "scale-transition-hidden"
    );
  }
};
