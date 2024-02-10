import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

//FIX add loader const, checker for this existance

export function hideLoader(): void {
   const point = document.querySelector('.first-screen__content h1 span');

   const cords = point && point.getBoundingClientRect();

   const tlLoader = gsap.timeline({ paused: true });

   tlLoader
      .to('.loader', {
         // clipPath: `circle(0% at 25% 52.2%)`,
         clipPath: `circle(0% at ${cords ? cords.x - 30 : 100}px ${cords ? cords.y + cords.height - 25 : 200}px)`,
         duration: 1.2,
         ease: 'power1.in',
      })
      .from('.first-screen__content svg', {
         scale: 0,
         delay: -0.3,
         duration: 1,
         ease: 'power3.out',
      })
      .to('.first-screen__content svg', {
         scale: 1.5,
         duration: 190,
         repeat: -1,
         yoyo: true,
         ease: CustomEase.create(
            'custom',
            'M0,0 C0.012,0 0.025,0.066 0.05,0.066 0.1,0.066 0.1,-0.211 0.15,-0.211 0.2,-0.211 0.2,0.363 0.25,0.363 0.3,0.363 0.3,-0.499 0.35,-0.499 0.399,-0.499 0.399,0.461 0.449,0.461 0.499,0.461 0.498,-0.462 0.549,-0.462 0.6,-0.462 0.599,0.409 0.649,0.409 0.7,0.409 0.699,-0.17 0.749,-0.17 0.799,-0.17 0.799,0.114 0.849,0.114 0.899,0.114 0.899,-0.024 0.949,-0.024 0.974,-0.024 0.974,0 1,0 ',
         ),
      });

   window.addEventListener('load', () => {
      console.log('load');
      tlLoader.play();
   });
}
