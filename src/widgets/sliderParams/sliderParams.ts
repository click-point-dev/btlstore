import Swiper from 'swiper';

export function sliderParams(): void {
   const params: HTMLElement[] = Array.from(
      document.querySelectorAll('.slider-params'),
   );

   if (!params.length) return;

   params.forEach(item => {
      const sliderParams = new Swiper(item, {
         speed: 500,
         initialSlide: 1,
         slidesPerView: 'auto',
         slideToClickedSlide: true,
         centeredSlides: true,
         breakpoints: {
            360: {
               spaceBetween: 10,
               loop: true,
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
