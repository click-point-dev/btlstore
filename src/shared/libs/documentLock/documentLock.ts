export function documentLock(): void {
   const element = document.documentElement;

   if (!element) return;

   if (!element.classList.contains('lock')) {
      element.classList.add('lock');
      element.classList.contains('unlock') &&
         element.classList.remove('unlock');
   }
}

export function documentUnlock(): void {
   const element = document.documentElement;

   if (!element) return;

   if (element.classList.contains('lock')) {
      element.classList.remove('lock');
      !element.classList.contains('unlock') && element.classList.add('unlock');
   }
}
