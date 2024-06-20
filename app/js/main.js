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
  if (
    !window.matchMedia("(max-width: 768px)").matches &&
    mobileMenu.classList.contains("active")
  ) {
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
    if (
      !window.matchMedia("(max-width: 992px)").matches &&
      sidebar.classList.contains("open")
    ) {
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
    nextEl: ".slider-btn--next",
    prevEl: ".slider-btn--prev"
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

// Product slider

const productSlider = new Swiper("#productSlider", {
  loop: true,

  navigation: {
    nextEl: ".slider-popup-btn--next",
    prevEl: ".slider-popup-btn--prev"
  }
});

// Product popup slider

const productPopupSlider = new Swiper("#productPopupSlider", {
  loop: true,

  navigation: {
    nextEl: ".slider-popup-btn--next",
    prevEl: ".slider-popup-btn--prev"
  },

  pagination: {
    el: ".pagination-slider",
    bulletClass: "pagination-slider__bullet",
    bulletActiveClass: "pagination-slider__bullet--active",
    clickable: true
  }
});

// Interesting slider

const swiperInteresting = new Swiper("#interestingSlider", {
  loop: true,
  autoplay: true,
  slidesPerView: "auto",
  spaceBetween: 27,
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 3
    },

    577: {
      slidesPerView: "auto",
      spaceBetween: 3
    },

    993: {
      spaceBetween: 27,
      slidesPerView: "auto"
    }
  },

  pagination: {
    el: ".pagination-slider",
    bulletClass: "pagination-slider__bullet",
    bulletActiveClass: "pagination-slider__bullet--active",
    clickable: true
  },

  navigation: {
    nextEl: ".interesting__top .slider-btn--next",
    prevEl: ".interesting__top .slider-btn--prev"
  }
});

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

// STAR RATINGS

const starRatingsReadonly = document.querySelectorAll(".star-rating-readonly");
const starRatings = document.querySelectorAll(".star-rating");

if (starRatingsReadonly.length > 0) {
  starRatingsReadonly.forEach(function (rating) {
    const starRating = new Starry(rating, {
      readOnly: true,
      beginWith: rating.getAttribute("data-rating"),
      icons: {
        blank: "./images/sprite.svg#star-off",
        hover: "./images/sprite.svg#star-on",
        active: "./images/sprite.svg#star-on"
      }
    });
  });
}

if (starRatings.length > 0) {
  starRatings.forEach(function (rating) {
    const starRating = new Starry(rating, {
      icons: {
        blank: "./images/sprite.svg#star-blank",
        hover: "./images/sprite.svg#star-on",
        active: "./images/sprite.svg#star-on"
      }
    });
  });
}

// PRODUCT TABS

const filterCards = (grid, filterBtns) => {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove("current");
      });

      btn.classList.add("current");

      const filterValue = btn.getAttribute("data-filter");

      for (const item of grid.children) {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.classList.add("show");
        } else {
          item.classList.remove("show");
        }
      }
    });
  });
};

const productTabBtns = document.querySelectorAll(".description__filter-btn");
const productTabContent = document.querySelector(".description__content");

if (productTabBtns.length > 0 && productTabContent) {
  filterCards(productTabContent, productTabBtns);
}

// Product quantity input

const btnPlus = document.querySelector(".product-cart__quantity-btn--plus");
const btnMinus = document.querySelector(".product-cart__quantity-btn--minus");
const quantityInput = document.querySelector(".product-cart__quantity-input");

if (btnPlus && btnMinus && quantityInput) {
  btnPlus.addEventListener("click", function () {
    if (quantityInput.value < 99) {
      quantityInput.value++;
    }
  });

  btnMinus.addEventListener("click", function () {
    if (quantityInput.value > 1) {
      quantityInput.value--;
    }
  });

  quantityInput.addEventListener("change", function () {
    if (quantityInput.value > 99) {
      quantityInput.value = 99;
    } else if (quantityInput.value < 1) {
      quantityInput.value = 1;
    }
  });
}

// Product popup

const productPopupOpen = document.querySelectorAll(".product__btn");
const productPopupClose = document.querySelector("#productPopupClose");
const productPopup = document.querySelector(".product-popup");

if (productPopupOpen.length > 0 && productPopupClose) {
  productPopupOpen.forEach(function (item) {
    item.addEventListener("click", function () {
      productPopup.classList.add("open");
      body.classList.add("fixed");
    });
  });

  productPopupClose.addEventListener("click", function () {
    productPopup.classList.remove("open");
    body.classList.remove("fixed");
  });
}
