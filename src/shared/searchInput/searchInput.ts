export function searchInput(
   inputElement: HTMLElement,
   e?: Event,
   initialValue?: string,
) {
   let inputValue = initialValue || '';

   function handleInput(e: Event) {
      if (e && e.target instanceof HTMLInputElement) {
         inputValue = e.target.value;
      }
   }

   handleInput(e);
   return { inputElement, inputValue, handleInput };
}
