import Swiper from 'swiper';

export function sliderParams(): void {
   const params: HTMLElement[] = Array.from(
      document.querySelectorAll('.slider-params'),
   );

   if (!params.length) return;

   params.forEach(item => {
      const sliderParams = new Swiper(item, {
         speed: 500,
         initialSlide: 0,
         slidesPerView: 'auto',
         slideToClickedSlide: true,
         centeredSlides: true,
         loopAdditionalSlides: 1,
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
   });
}
