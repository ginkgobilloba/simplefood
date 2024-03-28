// Липка шапка

const header = document.querySelector("#header");
const offsetValue = 1;

if (window.scrollY >= offsetValue) {
  header.classList.add("fixed");
}

document.addEventListener("scroll", function () {
  if (window.scrollY >= offsetValue) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});

// Mixitup

const mixer = mixitup(".popular__list", {
  animation: {
    duration: 700,
    easing: "ease-in-out",
    nudge: true,
    reverseOut: false,
    effects: "fade scale(0.3)"
  }
});
