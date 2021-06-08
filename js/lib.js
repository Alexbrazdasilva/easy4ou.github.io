const document = window.document || self.document || this.document;
export const All = item => document.querySelectorAll(item)

class NoImplementation extends Error {
  constructor(error) {
    super(error);
  }
}

class myLibQuery {
  constructor(target) {
    if (target) {
      this.element = document.querySelector(target);
    }
  }
  //   InnerValues
  text(text) {
    this.element.innerText = text;
  }
  html(html, increment = false) {
    increment
      ? (this.element.innerHTML += html)
      : (this.element.innerHTML = html);
  }
  val(value) {
    if (value || value == "") this.element.value = value;
    else return this.element.value;
  }
  //   Attributes
  attr(attribute, value) {
    return value
      ? this.element.setAttribute(attribute, value)
      : this.element.getAttribute(attribute);
  }
  prop(propName) {
    return this.element.style.getPropertyValue(propName);
  }
  addClass(className) {
    this.element.classList.add(className);
  }
  removeClass(className) {
    this.element.classList.remove(className);
  }
  hassClass(className) {
    return this.element.classList.contains(className);
  }
  toggleClass(className) {
    this.hassClass(className)
      ? this.removeClass(className)
      : this.addClass(className);
  }
  // EventListeners
  on(event, callback) {
    if (!this.element) {
      throw new NoImplementation("Target is undefined or null");
      return;
    }

    this.element.addEventListener(event, callback);
  }
  click(fn) {
    this.on("click", fn);
  }
  focus(fn) {
    this.on("focus", fn);
  }
  unFocus(fn) {
    this.on("blur", fn);
  }
  change(fn) {
    this.on("change", fn);
  }
  css(style) {
    this.element.style.cssText = style;
  }
  style(prop, value) {
    this.element.style[prop] = value
  }
  // Position
  position(coordinate) {
    const directions = {
      top: this.element.getBoundingClientRect().top,
      bottom: this.element.getBoundingClientRect().bottom,
      right: this.element.getBoundingClientRect().right,
      left: this.element.getBoundingClientRect().left,
    };
    return directions[coordinate || top];
  }
}
export const $ = (element) => new myLibQuery(element);