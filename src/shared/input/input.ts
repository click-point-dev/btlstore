import gsap from 'gsap';

export function input(): void {
   const inputs: HTMLInputElement[] = gsap.utils.toArray('.input');
   // console.log(inputs);
   if (!inputs.length) return;

   inputs.forEach(input => {
      const parent = input.closest('.input-block'),
         label = parent?.querySelector('label');

      if (!parent || !label) return;

      const animationOnFocus = gsap.timeline({ paused: true });

      animationOnFocus.to(label, {
         transformOrigin: 'left',
         // top: '-=42px',
         bottom: `90%`,
         paddingBottom: 0,
         scale: 0.55,
         duration: 0.3,
         onReverseComplete: () => gsap.set(label, { clearProps: 'all' }),
      });

      function animationOnHover(item: HTMLElement) {
         const animationOnHoverTl = gsap.timeline({ paused: true });
         animationOnHoverTl.to(item, {
            y: 5,
            duration: 0.2,
         });
         return animationOnHoverTl;
      }
      //

      input.addEventListener('focus', () => {
         animationOnFocus.play();
      });

      input.addEventListener('blur', () => {
         if (input.value) return;
         animationOnFocus.reverse();
      });

      input.addEventListener('mouseover', () => {
         if (input == document.activeElement) return;
         const animation = animationOnHover(label);
         animation.play();
      });
      input.addEventListener('mouseout', () => {
         if (input == document.activeElement) return;
         const animation = animationOnHover(label);
         animation.reverse();
      });
      input.addEventListener('keyup', e => {
         if (e.key === 'Escape') {
            console.log('esc');
            input.blur();
         }
      });
   });
}
