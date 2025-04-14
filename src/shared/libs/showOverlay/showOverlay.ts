import gsap from 'gsap';

export async function showOverlay(
   target: HTMLElement,
   message: string,
   className?: string,
   duration?: number,
) {
   const width = target.getBoundingClientRect().width;
   const parentTarget = target.parentElement;
   gsap.set(parentTarget, { css: { position: 'relative' } });
   const overlay = document.createElement('div');
   overlay.className = className || 'text-xs';
   overlay.innerHTML = `<p class="">${message}</p>`;

   const timeline = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: 'power2.inOut' },
   });

   const isInRequestPopup = Boolean(
      parentTarget.closest('[data-popup-type="request-popup"]'),
   );

   const disappearingElement = gsap.utils.selector(parentTarget)('& > *');

   timeline
      .fromTo(
         disappearingElement,
         { opacity: 1 },
         {
            opacity: 0,
            onReverseComplete: () => {
               gsap.set(disappearingElement, { clearProps: 'all' });
               gsap.set(parentTarget, { clearProps: 'all' });
            },
         },
      )
      .fromTo(
         overlay,
         { opacity: 0 },
         {
            opacity: 1,
            onReverseComplete: () => {
               overlay.remove();
            },
         },
      );

   overlay.style.cssText = `
				position: absolute;
				z-index: 151;
				inset: 0;
				width: ${width}px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				${isInRequestPopup ? 'color:white;' : ''}
				opacity: 0;
				* {
				text-align: center;
				}
				`;

   parentTarget.appendChild(overlay);

   await timeline.play();
   duration && setTimeout(() => timeline.reverse(), duration);
}
