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

function openMobileMenu(body, header, menu) {
  body.classList.add("fixed");
  header.classList.add("mobile");
  menu.classList.add("active");
}

function closeMobileMenu(body, header, menu) {
  body.classList.remove("fixed");
  header.classList.remove("mobile");
  menu.classList.remove("active");
}

const body = document.querySelector("body");
const mobileMenu = document.querySelector("#mobileMenu");
const burgerOpen = document.querySelector("#burgerOpen");
const burgerClose = document.querySelector("#burgerClose");

burgerOpen.addEventListener("click", function () {
  openMobileMenu(body, header, mobileMenu);
});

burgerClose.addEventListener("click", function () {
  closeMobileMenu(body, header, mobileMenu);
});

window.addEventListener("resize", function () {
  if (!window.matchMedia("(max-width: 768px)").matches) {
    closeMobileMenu(body, header, mobileMenu);
  }
});

// Catalog sidebar

const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector("#sidebarClose");
const sidebar = document.querySelector("#sidebar");

if (sidebarOpen && sidebarClose) {
  sidebarOpen.addEventListener("click", function () {
    sidebar.classList.add("open");
    body.classList.add("fixed");
    body.classList.add("bg-overlay");
  });

  sidebarClose.addEventListener("click", function () {
    sidebar.classList.remove("open");
    body.classList.remove("fixed");
    body.classList.remove("bg-overlay");
  });

  window.addEventListener("resize", function () {
    if (!window.matchMedia("(max-width: 992px)").matches) {
      sidebar.classList.remove("open");
      body.classList.remove("fixed");
      body.classList.remove("bg-overlay");
    }
  });
}

// Mixitup
const popularContainer = document.querySelector("#popularContainer");

if (popularContainer) {
  const mixer = mixitup(popularContainer, {
    animation: {
      duration: 700,
      easing: "ease-in-out",
      nudge: true,
      reverseOut: false,
      effects: "fade scale(0.3)"
    }
  });
}

// Rewiews slider

const swiperReviews = new Swiper("#reviewsSlider", {
  loop: true,

  pagination: {
    el: ".pagination-slider",
    bulletClass: "pagination-slider__bullet",
    bulletActiveClass: "pagination-slider__bullet--active",
    clickable: true
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});

// Restaurants slider
let swiperRestaurants;

if (document.querySelector("#restaurantsSlider")) {
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
    swiperRestaurants = new Swiper("#restaurantsSlider", {
      loop: true,
      pagination: {
        el: ".pagination-slider",
        bulletClass: "pagination-slider__bullet",
        bulletActiveClass: "pagination-slider__bullet--active",
        clickable: true
      }
    });
  }
}

// Discounts slider

let swiperDiscounts;

if (document.querySelector("#discountsSlider")) {
  if (window.matchMedia("(max-width: 768px)").matches) {
    swiperDiscountsInit();
  }

  window.addEventListener("resize", function () {
    if (window.matchMedia("(max-width: 768px)").matches) {
      if (swiperDiscounts === undefined || swiperDiscounts.destroyed === true) {
        swiperDiscountsInit();
      }
    } else {
      if (swiperDiscounts !== undefined) {
        swiperDiscounts.destroy(true, true);
      }
    }
  });

  function swiperDiscountsInit() {
    swiperDiscounts = new Swiper("#discountsSlider", {
      loop: true,
      pagination: {
        el: ".pagination-slider",
        bulletClass: "pagination-slider__bullet",
        bulletActiveClass: "pagination-slider__bullet--active",
        clickable: true
      }
    });
  }
}

// Dropdown

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(function (item) {
  const choices = new Choices(item, {
    position: "bottom",
    searchEnabled: false,
    itemSelectText: ""
  });
});

let $range = $("#range-slider");
let $inputFrom = $("#range-from");
let $inputTo = $("#range-to");
let instance;
let min = 0;
let max = 1200;
let from = 0;
let to = 0;

$range.ionRangeSlider({
  skin: "round",
  type: "double",
  hide_min_max: true,
  hide_from_to: true,
  min: min,
  max: max,
  from: 100,
  to: 1000,
  onStart: updateInputs,
  onChange: updateInputs,
  onFinish: updateInputs
});
instance = $range.data("ionRangeSlider");

function updateInputs(data) {
  from = data.from;
  to = data.to;

  $inputFrom.prop("value", from);
  $inputTo.prop("value", to);
}

$inputFrom.on("change", function () {
  let val = $(this).prop("value");

  if (val < min) {
    val = min;
  } else if (val > to) {
    val = to;
  }

  instance.update({
    from: val
  });

  $(this).prop("value", val);
});

$inputTo.on("change", function () {
  let val = $(this).prop("value");

  if (val < from) {
    val = from;
  } else if (val > max) {
    val = max;
  }

  instance.update({
    to: val
  });

  $(this).prop("value", val);
});
