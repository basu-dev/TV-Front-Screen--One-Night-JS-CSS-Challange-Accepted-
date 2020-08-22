"use strict";
const d = document;
const select = (selector) => d.querySelector(selector),
  selectAll = (selector) => d.querySelectorAll(selector),
  css = (selector, style) => {
    for (let [k, v] of Object.entries(style)) {
      selector.style[k] = v;
    }
  },
  displayTime = () => {
    let tim = new Date(),
      hrs = tim.getHours(),
      min = tim.getMinutes(),
      sec = tim.getSeconds();
    let ampm = "";
    ampm = hrs > 11 ? "PM" : "AM";
    hrs = hrs == 0 ? 12 : hrs > 12 ? hrs - 12 : hrs;
    hrs = hrs.toString().length > 1 ? hrs : `0${hrs}`;
    min = min.toString().length > 1 ? min : `0${min}`;
    sec = sec.toString().length > 1 ? sec : `0${sec}`;
    return `${hrs}:${min}:${sec} ${ampm}`;
  },
  flashTitle = select(".flash-news .title"),
  flashNewsContent = selectAll(".flash-news .content span");
  let muted=true;
  function mute(){
    let text=muted?"MUTE":"UNMUTE";
    muted=!muted;
    select('video').muted=muted;
    select(".mute").innerHTML=text;
}
let video = select("video");
document.addEventListener("DOMContentLoaded", () => {
    document.onfocus=()=>console.log('abc')

  select("#time");
  setInterval(() => {
    select("#time").innerText = displayTime();
  }, 1000);
  let flashTimer = null;
  let flashNewsCount = flashNewsContent.length;
  const flashNewsTop = `${flashTitle.clientHeight + 2}px`;
  let flashNewsShowing = 0;
  const startFlash = () => {
    css(flashTitle, { marginLeft: "0px" });
    css(select(".content div"), { right: "0px" });
    const show = () => {
      let nextToShow =
        flashNewsShowing < flashNewsCount - 1 ? flashNewsShowing + 1 : 0;
      let currentElement = flashNewsContent[flashNewsShowing],
        nextElement = flashNewsContent[nextToShow];
      css(nextElement, {
        visibility: "visible",
        top: flashNewsTop,
        opacity: "1",
        zIndex: "2",
      });
      css(currentElement, { top: "30px", opacity: 0, zIndex: "0" });
      setTimeout(() => {
        css(currentElement, { visibility: "hidden", top: "55px" });
      }, 1000);
      flashNewsShowing = nextToShow;
    };
    setTimeout((_) => show(), 1000);
    console.log(flashNewsShowing);
    flashTimer = setInterval(() => {
      show();
    }, 4000);
    setTimeout(() => {
      stopFlash();
    }, 20000);
  };
  const stopFlash = () => {
    window.clearInterval(flashTimer);
    css(flashTitle, { marginLeft: "-100%" });
    css(select(".content div"), { right: "-100%" });
    css(flashNewsContent[flashNewsShowing], {
      opacity: 0,
      top: "55px",
    });
    flashNewsShowing = 0;
  };
  startFlash();
  setInterval(() => {
    startFlash();
  }, 30000);
});
