import gsap from 'gsap';

export function circleWithImage(): void {
   const circles: Element[] = gsap.utils.toArray('.circl-with-image');
   if (!circles.length) return;

   circles.map(circle => {
      const hoverAnimation = gsap.timeline({ paused: true });

      const image = circle.querySelector('.circl-with-image__image > img');
      const gradient = circle.querySelector('.circl-with-image__image > div');
      const description = circle.querySelector(
         '.circl-with-image__description',
      );
      const title = circle.querySelector('.circl-with-image__title');

      hoverAnimation
         .from(gradient, {
            backgroundImage:
               'linear-gradient(0deg,#0055b000 3.03%, #0055b000 50%)',
         })
         .from(
            image,
            {
               duration: 0.3,
               css: {
                  filter: 'grayscale(100%)',
                  '-webkit-filter': 'grayscale(100%)',
               },
            },
            0,
         )
         .from(title, { y: 400 }, '-=0.2')
         .from(
            description,
            { y: 400, ease: 'back.out(0.7)', duration: 0.7 },
            '-=0.4',
         );

      function handleHoverAnimationStart() {
         hoverAnimation.play();
      }
      function handleHoverAnimationRevers() {
         hoverAnimation.reverse();
      }

      function handleObserver(mutationRecord: MutationRecord[]) {
         const target = mutationRecord[0].target as Element;
         const isActive = Array.from(target.classList).includes(
            'swiper-slide-active',
         );

         console.log('hello from observer');

         if (isActive) handleHoverAnimationStart();
         if (!isActive) handleHoverAnimationRevers();
      }

      if (window.innerWidth <= 1280) {
         const configObserver = { attributeFilter: ['class'], subtree: true };
         const circleParent = circle.closest('.swiper-slide');

         if (!circleParent) return;

         let observer = new MutationObserver(mutationRecord =>
            handleObserver(mutationRecord),
         );

         observer.observe(circleParent, configObserver);
      }

      if (window.innerWidth > 1280) {
         circle.addEventListener('mouseenter', handleHoverAnimationStart);
         circle.addEventListener('mouseleave', handleHoverAnimationRevers);
      }
   });
}
