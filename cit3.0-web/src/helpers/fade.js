/* eslint-disable no-bitwise */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
export function fadeIn(el) {
  console.log(el);
  let opacity = 0;

  el.style.opacity = 0;
  el.style.filter = "";
  el.style.display = "block";

  let last = +new Date();
  const tick = () => {
    opacity += (new Date() - last) / 400;
    el.style.opacity = opacity;
    el.style.filter = `alpha(opacity=${100 * opacity}` | `${0})`;

    last = +new Date();

    if (opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };

  tick();
}

export function fadeOut(el) {
  let opacity = 1;

  el.style.opacity = 1;
  el.style.filter = "";

  let last = +new Date();
  const tick = () => {
    opacity -= (new Date() - last) / 400;
    el.style.opacity = opacity;
    el.style.filter = `alpha(opacity=${100 * opacity}` | `${1})`;

    last = +new Date();

    if (opacity > 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
    if (opacity < 0.2) {
      el.style.display = "none";
    }
  };

  tick();
}
