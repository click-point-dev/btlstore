import gsap from 'gsap';

export function cardCircle(): void {
   const circles: Element[] = gsap.utils.toArray('.card-circle--animated');
   if (!circles.length) return;

   circles.forEach(circle => {
      const hoverAnimation = gsap.timeline({ paused: true });

      const image = circle.querySelector('.card-circle__image > img');
      const gradient = circle.querySelector('.card-circle__body');
      const description = circle.querySelector('.card-circle__description');
      const title = circle.querySelector('.card-circle__title');

      hoverAnimation
         .to(gradient, {
            background:
               'linear-gradient(0.00deg, rgb(191, 39, 77) 3.03%,rgba(137, 98, 108, 0) 50%)',
         })
         .to(
            image,
            {
               duration: 0.3,
               css: {
                  filter: 'grayscale(0)',
               },
            },
            0,
         )
         .to(title, { y: 0 }, '-=0.2')
         .to(
            description,
            { y: 0, ease: 'back.out(0.7)', duration: 0.7 },
            '-=0.4',
         );

      function handleHoverAnimationStart() {
         hoverAnimation.play();
      }

      function handleHoverAnimationRevers() {
         const isActive = circle.classList.contains('swiper-slide-active');
         if (isActive) return;
         hoverAnimation.reverse();
      }

      function handleObserver(mutationRecord: MutationRecord[]) {
         const target = mutationRecord[0].target as Element;
         const isActive = target.classList.contains('swiper-slide-active');

         if (isActive) {
            handleHoverAnimationStart();
         }
         if (!isActive) {
            handleHoverAnimationRevers();
         }
      }

      const configObserver = { attributeFilter: ['class'], subtree: true };
      let observer = new MutationObserver(mutationRecord =>
         handleObserver(mutationRecord),
      );

      observer.observe(circle, configObserver);

      circle.addEventListener('mouseover', handleHoverAnimationStart);
      circle.addEventListener('mouseout', handleHoverAnimationRevers);
   });
}
