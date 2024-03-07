import gsap from 'gsap';
import { rundomInt } from '../../shared';

export function page404(): void {
   const decor404One = document.querySelector('.page-404__decor--1');
   const decor404Two = document.querySelector('.page-404__decor--2');
   // const delay = rundomInt(0.5, 2);

   if (!decor404One || !decor404Two) return;

   const timeline = gsap.timeline();

   timeline
      .to(decor404One, {
         scale: 5,
         opacity: 0,
         // filter: `blur(${rundomInt(3, 6)}px)`,
         duration: rundomInt(7, 12),
         repeat: -1,
         // yoyo: true,
         ease: 'linear',
      })
      .to(
         decor404Two,
         {
            scale: 3,
            opacity: 0.3,
            duration: 9,
            repeat: -1,
            yoyo: true,
            ease: 'power4.inOut',
            onComplete: () => {
               page404();
            },
         },
         rundomInt(0, 2, 1),
      );
}
