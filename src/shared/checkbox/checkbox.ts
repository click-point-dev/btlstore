export function checkbox(): void {
   const checkboxes = document.querySelectorAll('.input-block.checkbox');
   if (!checkboxes.length) return;

   checkboxes.forEach(item => {
      const input = item.querySelector('input');

      function handleClick() {
         const isChecked = input.hasAttribute('checked');

         if (isChecked) input.removeAttribute('checked');
         if (!isChecked) input.setAttribute('checked', '');
      }

      item.addEventListener('click', handleClick);
   });
}
