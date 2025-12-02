document.addEventListener('DOMContentLoaded', () => {
  const commonConfig = {
    slidesPerView: 1,
    loop: true,
  };
  const authorSwiper = new Swiper('.author-info-swiper', {
    ...commonConfig,
    allowTouchMove: false,
  });
  const quoteSwiper = new Swiper('.testimonial-swiper', {
    ...commonConfig,
    autoplay: { delay: 5000 },
    lazy: true, 
  });
  quoteSwiper.on('slideChange', () => {
    authorSwiper.slideTo(quoteSwiper.realIndex);
  });
  document.getElementById('prevBtn')
    .addEventListener('click', () => quoteSwiper.slidePrev());
  document.getElementById('nextBtn')
    .addEventListener('click', () => quoteSwiper.slideNext());
});
