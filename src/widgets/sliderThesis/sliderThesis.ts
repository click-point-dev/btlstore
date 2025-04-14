// import Swiper JS
import Swiper from 'swiper';
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { checkViewportWidth } from '../../shared';
// import Swiper styles
// import 'swiper/css';

export function sliderThesis(): void {
   const sliders: HTMLElement[] = Array.from(
      document.querySelectorAll('.slider-thesis'),
   );

   if (!sliders.length) return;

   const isPagination = checkViewportWidth('(max-width: 1360px)');
   // console.log(isPagination);

   sliders.forEach(slider => {
      const swiper = new Swiper(slider, {
         modules: [Navigation, Pagination, Autoplay, Keyboard],
         navigation: !isPagination && {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         },
         pagination: {
            el: isPagination ? '.swiper-pagination' : '',
            clickable: true,
         },
         loop: true,
         speed: 500,
         // autoplay: {
         //    delay: 3500,
         //    disableOnInteraction: false,
         // },
         keyboard: {
            enabled: true,
         },
      });
   });
}
