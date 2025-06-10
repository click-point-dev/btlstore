import gsap from 'gsap';
import { documentLock, documentUnlock } from '../documentLock';

export async function showOverlay(
   target: HTMLElement,
   message: string,
   className?: string,
   duration?: number,
) {
   const overlay = document.createElement('div');
   overlay.className = className || 'text-xs';
   overlay.innerHTML = `<div>${message}</div>`;

   overlay.style.cssText = /*style*/ `
				position: fixed;
            top: 0;
            left:0;
				z-index: 250;
				width: 100vw;
            height: 100vh;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
            background-color: #ffffffc9;
            backdrop-filter: blur(15px);

				* {
				text-align: center;
				}
				`;

   const timeline = gsap.timeline({
      paused: true,
      defaults: { duration: 0.5, ease: 'power2.inOut' },
   });

   timeline.fromTo(
      overlay,
      { opacity: 0 },
      {
         opacity: 1,
         onReverseComplete: () => {
            overlay.remove();
         },
      },
   );
   //fix поправить оверлэй для длинных форм (не видно сообщение)

   target.appendChild(overlay);

   documentLock();
   await timeline.play();
   duration &&
      setTimeout(async () => {
         await timeline.reverse();
         documentUnlock();
      }, duration);
}
