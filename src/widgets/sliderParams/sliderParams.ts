import Swiper from 'swiper';
import { Keyboard } from 'swiper/modules';

export function sliderParams(): void {
   const params: HTMLElement[] = Array.from(document.querySelectorAll('.slider-params'));

   if (!params.length) return;

   params.forEach(item => {
      const centralSlideNumber = Math.floor(
         Array.from(item.querySelectorAll('.swiper-slide')).length / 2,
      );
      const sliderParams = new Swiper(item, {
         modules: [Keyboard],
         spaceBetween: 30,
         speed: 500,
         initialSlide: centralSlideNumber,
         slidesPerView: 'auto',
         slideToClickedSlide: true,
         centeredSlides: true,
         // loop: true,
         keyboard: {
            enabled: true,
         },
         breakpoints: {
            360: {
               spaceBetween: 10,
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
