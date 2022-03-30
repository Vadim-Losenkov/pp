$(function () {
  $('[data-form="number"]').mask('+7 (999) 999-9999');
  $('.header__burger').on('click', function () {
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('active');
  });

  let portfolioNav;
  setPortfolioSlider();
  $(window).resize(setPortfolioSlider);
  $(window).on('orientationchange', setPortfolioSlider);

  function setPortfolioSlider() {
    if (window.innerWidth <= 1000) {
      $('.portfolio .line-links').addClass('swiper-wrapper');
      $('.portfolio .line-link').addClass('swiper-slide');
      portfolioNav = new Swiper('.portfolio .line-inner', {
        slidesPerView: 3,
        allowTouchMove: false,
        navigation: {
          nextEl: `.line-arrow.next-arrow`,
          prevEl: `.line-arrow.prev-arrow`,
        },
      });
    } else {
      $('.portfolio .line-links').removeClass('swiper-wrapper');
      $('.portfolio .line-link').removeClass('swiper-slide');
    }
  }
});

for (let i = 1; i <= 5; i++) {
  new Swiper(`.category-${i} .portfolio__slider`, {
    spaceBetween: 30,
    pagination: {
      el: `.portfolio__pagination-${i} .portfolio__pagination-num`,
      type: 'fraction',
    },
    navigation: {
      nextEl: `.portfolio__pagination-${i} .portfolio__pagination-arrow--right`,
      prevEl: `.portfolio__pagination-${i} .portfolio__pagination-arrow--left`,
    },
  });
}

mixitup('.portfolio__inner', {
  load: {
    filter: '.category-1',
  },
});
