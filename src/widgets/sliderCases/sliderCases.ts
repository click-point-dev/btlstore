import Swiper, { Autoplay } from 'swiper';

export function sliderCases(): void {
   const sliderCases = new Swiper('.slider-cases', {
      spaceBetween: 30,
      speed: 500,
      initialSlide: 1,
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      centeredSlides: true,
      // loop: true,
   });
}
