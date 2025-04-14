import gsap from 'gsap';

export async function changeElements(
   what: HTMLElement,
   forWhat: HTMLElement,
   time: number = 0,
) {
   if (!what || !forWhat) return;

   // const startHeight = what.getBoundingClientRect().height;
   // const startWidth = what.getBoundingClientRect().width;
   // forWhat.style.height = `${startHeight}px`;
   // forWhat.style.width = `${startWidth}px`;

   const whatParent = what.parentElement;
   // console.log(what + '\n', forWhat + '\n', whatParent);

   whatParent.insertAdjacentElement('beforeend', forWhat);

   // async function handlTimeout() {
   //    await changeElements(forWhat, what);
   //    forWhat.remove();
   // }
   await animate(what, forWhat).play();

   time &&
      setTimeout(async () => {
         await animate(what, forWhat).reverse();
      }, time);
}

function animate(what: HTMLElement, forWhat: HTMLElement) {
   const timeline = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: 'power2.inOut' },
   });

   timeline.to(forWhat, { opacity: 1 });

   return timeline;
}
