import gsap from 'gsap';

export async function changeElements(
   what: HTMLElement,
   forWhat: HTMLElement,
   time: number = 0,
) {
   // const what = document.querySelector(what) as HTMLElement;
   // const forWhat = document.querySelector(forWhatSelector) as HTMLElement;
   const whatParent = what.parentElement;

   console.log(what + '\n', forWhat + '\n', whatParent);

   whatParent.insertAdjacentElement('beforeend', forWhat);

   await timelineInit(what, forWhat).play();

   // what.remove();

   function handlTimeout() {
      changeElements(forWhat, what);
   }

   time && setTimeout(handlTimeout, time);
}

function timelineInit(what: HTMLElement, forWhat: HTMLElement) {
   const startHeight = what.getBoundingClientRect().height;

   const timeline = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: 'power2.inOut' },
   });

   forWhat.style.minHeight = `${startHeight}px`;

   timeline
      .to(what, { opacity: 0 })
      .to(what, { css: { display: 'none', visibility: 'hidden' }, duration: 0 })
      .to(forWhat, {
         css: { display: 'block', visibility: 'visible' },
         duration: 0,
      })
      .fromTo(forWhat, { opacity: 0 }, { opacity: 1 });

   return timeline;
}
