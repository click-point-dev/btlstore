export function documentLock(): void {
   const element = document.documentElement;
   if (!element) return;

   !element.classList.contains('lock') && element.classList.add('lock');
}

export function documentUnlock(): void {
   const element = document.documentElement;
   if (!element) return;

   element.classList.contains('lock') && element.classList.remove('lock');
}
