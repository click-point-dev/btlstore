export function checkbox(): void {
   // const checkboxes = document.querySelectorAll('.input-block.checkbox');
   // if (!checkboxes.length) return;

   // checkboxes.forEach(item => {
   //    const input = item.querySelector('input');
   //    console.log(input);
   //    function handleClick() {
   //       const isChecked = input.hasAttribute('checked');

   //       if (isChecked) input.removeAttribute('checked');
   //       if (!isChecked) input.setAttribute('checked', '');
   //    }

   //    item.addEventListener('click', handleClick);
   // });

   const privacyAgreements = document.querySelectorAll(
      'input[type="checkbox"][name="agreement"]',
   );
   if (!privacyAgreements.length) return;

   privacyAgreements.forEach(item => {
      function handleClick() {
         const isChecked = item.hasAttribute('checked');

         if (isChecked) item.removeAttribute('checked');
         if (!isChecked) item.setAttribute('checked', '');
      }
      // console.log(item.parentElement);
      item.parentElement.addEventListener('click', handleClick);
   });
}
