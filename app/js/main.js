$(function () {
  $('.open-popup').magnificPopup({
    type: 'inline',
    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
      beforeOpen: function () {
        this.st.mainClass = this.st.el.attr('data-effect');
      },
    },
    midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  $('.close-popup').on('click', () => $('.open-popup').magnificPopup('close'));

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
        // slidesPerView: 3,

        allowTouchMove: false,
        navigation: {
          nextEl: `.line-arrow.next-arrow`,
          prevEl: `.line-arrow.prev-arrow`,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            centeredSlides: true,
          },
          746: {
            slidesPerView: 3,
          },
        },
      });
    } else {
      $('.portfolio .line-links').removeClass('swiper-wrapper');
      $('.portfolio .line-link').removeClass('swiper-slide');
      portfolioNav.destroy(1, 1);
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
