import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function person() {
   const persons: HTMLElement[] = gsap.utils.toArray('.team__person');
   const paths: HTMLElement[] = gsap.utils.toArray(
      '[data-name="persons"] path',
   );

   if (!persons.length || !paths.length) return;

   gsap.registerPlugin(ScrollTrigger);
   gsap.from('.team__image', {
      scrollTrigger: {
         trigger: '.team__body',
         start: '20% 35%',
      },
      y: '120%',
      duration: 0.9,
      stagger: 0.08,
      ease: 'back.out(0.7)',
   });
   gsap.from('[data-name="persons"]', { y: 800, delay: 2 });

   paths.forEach(path => {
      const hoveredPerson = findPerson(path, persons);

      const hoverAnimation = gsap.timeline({ paused: true });
      const tooltip = hoveredPerson.querySelector('.team__tooltip');
      const image = hoveredPerson.querySelector('img');
      const title = hoveredPerson.querySelector('.tooltip__title');
      const description = hoveredPerson.querySelector('.tooltip__description');

      hoverAnimation
         .to(image, { filter: 'grayScale(0)' })
         .from(tooltip, { opacity: 0, duration: 0.5, delay: 0.5 }, '<')
         .from(title, {
            y: 400,
            opacity: 0,
            duration: 0.3,
            ease: 'back.out(0.7)',
         })
         .from(
            description,
            {
               y: 400,
               opacity: 0,
               duration: 0.3,
               ease: 'back.out(0.7)',
            },
            '-=0.2',
         );

      path.addEventListener('mouseover', () => {
         hoverAnimation.play();
      });
      path.addEventListener('mouseout', () => {
         hoverAnimation.reverse();
      });
   });

   function findPerson(hoverTarget: HTMLElement, personsArray: HTMLElement[]) {
      const hoveredPerson = personsArray.find(
         person => person.dataset.order === hoverTarget.dataset.order,
      );
      return hoveredPerson;
   }
}
