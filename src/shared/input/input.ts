import gsap from 'gsap';

export function input(): void {
   const inputs: HTMLInputElement[] = gsap.utils.toArray('.input');
   if (!inputs.length) return;

   inputs.forEach(input => {
      const parent = input.closest('.input-block'),
         label = parent.querySelector('label');

      const animationOnFocus = gsap.timeline({ paused: true });
      const animationOnHover = gsap.timeline({ paused: true });

      animationOnFocus.to(label, {
         transformOrigin: 'top left',
         top: '-=42px',
         ease: 'power2.inOut',
         scale: 0.55,
         duration: 0.3,
      });

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
