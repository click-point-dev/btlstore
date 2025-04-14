export function textarea(): void {
   const textareas = document.querySelectorAll('textarea');

   if (!textareas.length) return;

   textareas.forEach(el => {
      // console.log(el.scrollHeight);
      const elHeight = el.scrollHeight ? `${el.scrollHeight}px` : 'auto';

      el.style.height = <any>(
         el.setAttribute('style', 'height: ' + el.scrollHeight + 'px')
      );
      el.classList.add('auto');
      el.addEventListener('input', e => {
         el.style.height = 'auto';
         el.style.height = el.scrollHeight + 'px';
      });
   });
}
