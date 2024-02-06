import Swiper, { Autoplay } from 'swiper';

export function sliderParams(): void {
   const sliderParams = new Swiper('.slider-params', {
      spaceBetween: 30,
      speed: 500,
      initialSlide: 1,
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      centeredSlides: true,
      loop: true,
   });
}
