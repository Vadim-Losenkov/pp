$(function () {
  $('[data-button="toSecton"]').on('click', function (e) {
    e.preventDefault();
    const sectionID = $(this).attr('href');

    $('html, body').animate(
      {
        scrollTop: $(sectionID).offset().top,
      },
      {
        duration: 500,
      },
    );
  });
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
  $('.image-popup').magnificPopup({
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

      portfolioNav ? portfolioNav.destroy(1, 1) : '';
    }
  }
});

let prevImages = '.category-1';
const lazyImages = document.querySelectorAll('img[data-src]');

function setImages(category = '.category-1') {
  lazyImages.forEach(($img) => {
    if ($img.closest(category)) {
      replaceSrc($img);
    }
  });
}

const replaceSrc = ($i) => {
  const datas = $i.src;

  $i.src = $i.dataset.src;
  $i.dataset.src = datas;
};

document.querySelector('.portfolio .line').addEventListener('click', (event) => {
  const $target = event.target.dataset.filter;

  if ($target) {
    document
      .querySelector(prevImages)
      .querySelectorAll('img[data-src]')
      .forEach(($img) => replaceSrc($img));

    setTimeout(() => {
      setImages($target);
    }, 500);

    prevImages = $target;
  }
});
setTimeout(() => {
  setImages();
}, 300);

document.querySelector('.portfolio__inner').addEventListener('click', (event) => {
  let popupImage;

  const $el = event.target.closest('.portfolio__slide-image');
  if ($el) {
    popupImage = $el.querySelector('img').src;
    
    document.querySelector('.photo-popup img').src = popupImage
    $('.image-popup').magnificPopup('open')
  }
});

for (let i = 1; i <= 5; i++) {
  new Swiper(`.category-${i} .portfolio__slider`, {
    spaceBetween: 30,
    autoplay: { 
      delay: 5000,
    },
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
