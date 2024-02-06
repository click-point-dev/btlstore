import gsap from 'gsap';

export function input(): void {
   const inputs: HTMLInputElement[] = gsap.utils.toArray('.input');
   if (!inputs.length) return;

   inputs.map(input => {
      const parent = input.closest('.input-block'),
         label = parent.querySelector('label');

      const animationOnFocus = gsap.timeline({ paused: true });
      const animationOnHover = gsap.timeline({ paused: true });

      animationOnFocus
         .to(label, {
            bottom: '100%',
            // ease: 'sine.in',
            duration: 0.2,
         })
         .to(label, { fontSize: 13, duration: 0.2 }, 0);

      animationOnHover.to(label, { y: 5, duration: 0.2 });

      input.addEventListener('focus', () => {
         animationOnFocus.play();
      });

      input.addEventListener('blur', () => {
         if (input.value) return;
         animationOnFocus.reverse();
      });

      input.addEventListener('mouseover', () => {
         if (input == document.activeElement) return;
         animationOnHover.play();
      });
      input.addEventListener('mouseout', () => {
         if (input == document.activeElement) return;
         animationOnHover.reverse();
      });
   });
}
