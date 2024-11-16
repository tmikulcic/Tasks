const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  slidesOffsetBefore: 64,
  slidesOffsetAfter: 64,
  spaceBetween: 8,
  grabCursor: true,
  navigation: {
    nextEl: '.custom-next',
    prevEl: '.custom-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      direction: 'vertical',
    },
    769: {
      direction: 'horizontal',
    },
  },
});
