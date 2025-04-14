import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

export function clientsSlider(): void {
   const slider = new Swiper('.clients-slider', {
      modules: [Autoplay],
      autoplay: {
         delay: 0,
         disableOnInteraction: false,
         // pauseOnMouseEnter: false,
      },
      // speed: 4000,
      loop: true,
      // Responsive breakpoints: when window width is >= 320px (mobile first)
      breakpoints: {
         340: {
            slidesPerView: 3,
            spaceBetween: 50,
            speed: 5000,
            // autoplay: false,
            // freeMode: {
            // 	enabled: true,
            // 	momentum: true,
            // 	minimumVelocity: 1,
            // },
         },
         // 450: {
         //    slidesPerView: 3,
         //    spaceBetween: 50,
         //    speed: 5000,
         //    // freeMode: {
         //    // 	enabled: true,
         //    // 	momentum: true,
         //    // },
         // },
         600: {
            slidesPerView: 5,
            spaceBetween: 70,
            speed: 5000,
            // freeMode: {
            // 	enabled: true,
            // 	momentum: true,
            // },
         },
         1024: {
            slidesPerView: 7,
            spaceBetween: 80,
            speed: 4000,
            // freeMode: {
            // 	enabled: true,
            // 	momentum: true,
            // },
         },
         1372: {
            slidesPerView: 8,
            spaceBetween: 80,
            speed: 5000,
            // freeMode: {
            // 	enabled: true,
            // 	momentum: true,
            // },
         },
      },
      // preloadImages: false,
   });
}
