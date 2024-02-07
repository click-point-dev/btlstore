import gsap from 'gsap';

export function person() {
   const persons: HTMLElement[] = gsap.utils.toArray('.team__person');
   const paths: HTMLElement[] = gsap.utils.toArray(
      '[data-name="persons"] path',
   );

   if (!persons.length || !paths.length) return;

   paths.forEach(path => {
      const hoveredPerson = findPerson(path, persons);

      const hoverAnimation = gsap.timeline({ paused: true });
      const tooltip = hoveredPerson.querySelector('.team__tooltip');
      const image = hoveredPerson.querySelector('img');

      hoverAnimation
         .to(tooltip, { opacity: 1 })
         .to(image, { filter: 'grayScale(0)' }, 0);

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
