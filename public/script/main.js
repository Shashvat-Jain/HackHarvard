const text = document.getElementById("text-high");
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY <= 350) {
    text.style.opacity = `${1 - window.scrollY / 300}`;
    text.style.marginTop = `${(window.scrollY / 400) * 500}px`;
  }
  if (window.scrollY >= 100) {
    nav.style.top = "0px";
    nav.style.filter = "invert(1)";
    nav.style.background = "black";
  } else {
    nav.style.top = "30px";
    nav.style.filter = "invert(0)";
    nav.style.background = "none";
  }
});
