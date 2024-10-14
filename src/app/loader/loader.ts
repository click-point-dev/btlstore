import gsap from 'gsap';
import { documentUnlock, isAvaliableURI } from '../../shared';

export function hideLoader(): void {
   if (!isAvaliableURI()) return;

   const point = document.querySelector('.first-screen__logo');
   const cords = point && point.getBoundingClientRect();
   const loader: HTMLElement = document.querySelector('.loader');

   // loader.style.top = `${window.scrollY - 20}px`;
   // console.log(window.scrollY);

   const tlLoader = gsap.timeline({ paused: true });

   const cX = (cords.right - cords.left) / 2 + cords.left;
   const cY = (cords.bottom - cords.top) / 2 + cords.top;

   tlLoader
      .to('body', {
         opacity: 1,
      })
      .to(loader, {
         clipPath: `circle(0% at ${cords ? cX : 100}px ${cords ? cY : 300}px)`,
         duration: 1.2,
         ease: 'power1.in',
         onComplete: () => {
            documentUnlock();
         },
      });

   tlLoader.play();
}
