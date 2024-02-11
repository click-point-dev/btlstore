import Swiper from 'swiper';
// import 'swiper/css';

export function sliderCases(): void {
   const sliderCases = new Swiper('.card-circle__swiper', {
      spaceBetween: 30,
      speed: 500,
      initialSlide: 0,
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      centeredSlides: true,
      loop: true,
      breakpoints: {
         360: {
            spaceBetween: 10,
         },
         475: {
            spaceBetween: 30,
         },
      },
   });
}
