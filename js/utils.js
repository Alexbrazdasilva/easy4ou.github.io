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

export const dispatchOnScroll = ({ dispatch, target, sensibility }) => {
  let elementPositionIsVisible =
    $(`[data-id-scroll-action=${dispatch}]`).position("bottom") <=
    (sensibility || 0),
    elementDispatched = $(`[data-js-animate=${target}]`);

  elementPositionIsVisible
    ? elementDispatched.removeClass("scale-transition-hidden")
    : elementDispatched.addClass("scale-transition-hidden");
};

export const setHeightLine = (isVisible) => {
  $(".pseudo-line").style(
    "height",
    `${$("[data-line-step=last]").position("top") -
    $(".pseudo-line").position("bottom")
    }px`
  );
  const sizeHeight = isVisible 
    ? $("[data-line-step=end]").position("top") - $(".anouther-pseudo-line").position("bottom") 
    : $("[data-line-step=mobile]").position("top") - $(".anouther-pseudo-line").position("bottom");
  
    $('.anouther-pseudo-line').style("height",`${sizeHeight}px`)
}
export const setDivLine = (isVisible) => {
  if (isVisible) {
    const diferenceWidth =
      $("[data-line=stage]").position("right") - ($("[data-line=stage]").width() / 2) -
      $("[data-line=review]").position("left") - ($("[data-line=review]").width() / 2);
    const diferenceHeight =
      $("[data-line=level-tree").position("bottom") -
      $("[data-line=level-tree").height() / 2 -
      $(".link-square-rounded").position("top");

    $(".link-square-rounded").css(
      `height: ${diferenceHeight}px; width: ${diferenceWidth}px; `
    );

    $(".link-square-rounded").show();
  } else {
    $(".link-square-rounded").hidden();
  }
};
export const setYearInPage = (element) =>
  $(element).text(new Date().getFullYear() || 2021);
