import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export function header(): void {
   gsap.registerPlugin(ScrollTrigger);

   document.addEventListener('DOMContentLoaded', () => {
      const header = document.querySelector('.header') as HTMLElement;
      const loader = document.querySelector('.loader') as HTMLDivElement;
      const headerHeight = header.getBoundingClientRect().height;
      document.querySelector('main').style.marginTop = `${headerHeight}px`;
      if (loader) loader.style.paddingTop = `${headerHeight}px`;

      Object.assign(header.style, {
         position: 'fixed',
         // width: '100%',
         // left: 0,

         backgroundColor: '#ffffff94',
         // zIndex: 1,
      });

      const showAnim = gsap.timeline({
         scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 99999,
            // markers: true,
            // onToggle: self => {
            //    // console.log('toggled, isActive:', self.isActive);
            // },
            onUpdate: self => {
               // console.log(
               //    'progress:',
               //    self.progress.toFixed(3),
               //    'direction:',
               //    self.direction,
               //    'velocity',
               //    self.getVelocity(),
               // );
               self.direction === -1 ? showAnim.play() : showAnim.reverse();
            },
         },
         duration: 0.3,
         ease: 'power2.out',
      });

      showAnim
         .fromTo(
            header,
            {
               top: '-100%',
            },
            { top: 0, backdropFilter: 'blur(17px)' },
         )
         .progress(1);
   });
}
header();
