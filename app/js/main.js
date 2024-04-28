// sticky header

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

// Mobile menu

const body = document.querySelector("body");
const burgerOpen = document.querySelector("#burgerOpen");
const burgerClose = document.querySelector("#burgerClose");

burgerOpen.addEventListener("click", function () {
  header.classList.add("mobile");
  body.classList.add("fixed");
});

burgerClose.addEventListener("click", function () {
  header.classList.remove("mobile");
  body.classList.remove("fixed");
});

window.addEventListener("resize", function () {
  if (!window.matchMedia("(max-width: 768px)").matches) {
    header.classList.remove("mobile");
    body.classList.remove("fixed");
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

// Rewiews slider

const swiperReviews = new Swiper(".reviews-swiper", {
  loop: true,

  pagination: {
    el: ".pagination",
    bulletClass: "pagination__bullet",
    bulletActiveClass: "pagination__bullet--active",
    clickable: true
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});

// Restaurants slider
let swiperRestaurants;

if (window.matchMedia("(max-width: 768px)").matches) {
  swiperRestaurantsInit();
}

window.addEventListener("resize", function () {
  if (window.matchMedia("(max-width: 768px)").matches) {
    if (
      swiperRestaurants === undefined ||
      swiperRestaurants.destroyed === true
    ) {
      swiperRestaurantsInit();
    }
  } else {
    if (swiperRestaurants !== undefined) {
      swiperRestaurants.destroy(true, true);
    }
  }
});

function swiperRestaurantsInit() {
  swiperRestaurants = new Swiper(".restaurants-swiper", {
    loop: true,
    pagination: {
      el: ".pagination",
      bulletClass: "pagination__bullet",
      bulletActiveClass: "pagination__bullet--active",
      clickable: true
    }
  });
}
