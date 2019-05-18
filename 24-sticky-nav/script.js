const nav = document.querySelector("nav");
const navOffsetTop = nav.offsetTop;
function handleScroll() {
  if (window.pageYOffset >= navOffsetTop) {
    document.body.style.paddingTop = `${nav.offsetHeight}px`;
    document.body.classList.add("sticky");
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove("sticky");
  }
}

window.addEventListener("scroll", handleScroll);
