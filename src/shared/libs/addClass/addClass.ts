export function addClass(target: HTMLElement, className: string = ''): void {
   if (!target) return;

   !target.classList.contains(className) && target.classList.add(className);
}

export function removeClass(target: HTMLElement, className: string = ''): void {
   if (!target) return;

   target.classList.contains(className) && target.classList.remove(className);
}
