import Swiper from 'swiper';
// import 'swiper/css';

export function sliderCases(): void {
   const cases: HTMLElement[] = Array.from(
      document.querySelectorAll('.card-circle__swiper'),
   );

   if (!cases.length) return;

   cases.forEach(item => {
      const sliderCases = new Swiper(item, {
         spaceBetween: 30,
         speed: 500,
         initialSlide: 1,
         slidesPerView: 'auto',
         slideToClickedSlide: true,
         centeredSlides: true,
         breakpoints: {
            360: {
               spaceBetween: 10,
               loop: true,
               // loopAdditionalSlides: 1,
            },
            475: {
               spaceBetween: 30,
            },
            1100: {
               loop: false,
            },
         },
      });
   });
}
