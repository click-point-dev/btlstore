import Swiper from 'swiper';
import { checkViewportWidth } from '../../shared';
import { Keyboard } from 'swiper/modules';
// import 'swiper/css';

export function sliderCases(): void {
   const cases: HTMLElement[] = Array.from(
      document.querySelectorAll('.card-circle__swiper'),
   );

   if (!cases.length) return;

   cases.forEach(item => {
      console.log('start sliderCases');
      const centralSlideNumber = Math.floor(
         Array.from(item.querySelectorAll('.swiper-slide')).length / 2 - 1,
      );
      const sliderCases = new Swiper(item, {
         modules: [Keyboard],
         spaceBetween: 30,
         speed: 500,
         initialSlide: centralSlideNumber,
         slidesPerView: 'auto',
         slideToClickedSlide: true,
         centeredSlides: true,
         loop: true,
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
