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
    body.classList.add("overlay");
  });

  sidebarClose.addEventListener("click", function () {
    sidebar.classList.remove("open");
    body.classList.remove("fixed");
    body.classList.remove("overlay");
  });

  window.addEventListener("resize", function () {
    if (!window.matchMedia("(max-width: 992px)").matches) {
      sidebar.classList.remove("open");
      body.classList.remove("fixed");
      body.classList.remove("overlay");
    }
  });
}

// Mixitup
const popularContainer = document.querySelector(".popular__list");

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

if (document.querySelector(".restaurants .adaptive-slider")) {
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
    swiperRestaurants = new Swiper(".restaurants .adaptive-slider", {
      loop: true,
      pagination: {
        el: ".pagination",
        bulletClass: "pagination__bullet",
        bulletActiveClass: "pagination__bullet--active",
        clickable: true
      }
    });
  }
}

// Discounts slider

let swiperDiscounts;

if (document.querySelector(".discounts .adaptive-slider")) {
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
    swiperDiscounts = new Swiper(".discounts .adaptive-slider", {
      loop: true,
      pagination: {
        el: ".pagination",
        bulletClass: "pagination__bullet",
        bulletActiveClass: "pagination__bullet--active",
        clickable: true
      }
    });
  }
}

// Dropdown

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(function (container) {
  const mainBtn = container.querySelector(".dropdown__current");
  const optionBox = container.querySelector(".dropdown__list");
  const options = container.querySelectorAll(".dropdown__option");

  mainBtn.addEventListener("click", function () {
    container.classList.add("open");

    options.forEach(function (option) {
      option.addEventListener("click", function () {
        const optionValue = option.querySelector(".dropdown__value").innerText;
        mainBtn.innerText = optionValue;
        container.classList.remove("open");
      });
    });

    document.addEventListener("click", function (e) {
      if (!optionBox.contains(e.target) && !container.contains(e.target)) {
        container.classList.remove("open");
      }
    });
  });
});

// Price range slider

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
