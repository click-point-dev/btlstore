import { dropdownList, searchInput } from '../../shared';

export function searchWidget(
   inputElement: HTMLInputElement,
   resultElement: HTMLElement,
   data: any,
): void {
   let results = dropdownList(resultElement, data);

   function handleToggleDropdown(e: Event) {
      if (
         e.target instanceof HTMLInputElement &&
         e.target === inputElement &&
         resultElement.classList.contains('hide')
      ) {
         results = dropdownList(resultElement, data);
         resultElement.classList.remove('hide');
      }

      if (
         e.target !== inputElement &&
         !resultElement.classList.contains('hide')
      )
         resultElement.classList.add('hide');
   }

   // Открытие выпадающего списка по клику на поле ввода
   document.addEventListener('click', e => {
      handleToggleDropdown(e);
   });
   inputElement.addEventListener('focusin', e => {
      // console.log(e.target);
      handleToggleDropdown(e);
   });

   // Вывод результатов поиска
   inputElement.addEventListener('input', e => {
      if (e.target instanceof HTMLInputElement) {
         const { inputValue } = searchInput(inputElement, e, e.target.value);
         // console.log(inputValue);

         if (inputValue && inputValue.length > 2) {
            results = dropdownList(
               resultElement,
               data.filter((item: any) =>
                  item.content.toLowerCase().includes(inputValue.toLowerCase()),
               ),
            );
         }

         if (!inputValue) dropdownList(resultElement, data);
      }
   });

   function handleSelectItem(e: Event) {
      let value, content;
      results.forEach(item => {
         if (e.target instanceof HTMLLIElement && e.target === item.element) {
            // console.log(item.content, item.value);
            inputElement.value = item.content;
            inputElement.focus();
            value = item.value;
            content = item.content;
            !resultElement.classList.contains('hide') &&
               resultElement.classList.add('hide');
         }
      });
      const selectEvent = new CustomEvent('selectEvent', {
         detail: { value: value || '', content: content || '' },
      });
      document.dispatchEvent(selectEvent);
   }

   // запись value при клике на элементе или по Enter
   resultElement.addEventListener('click', e => handleSelectItem(e));
   resultElement.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
         handleSelectItem(e);
      }
      if (e.key === 'Escape') {
         console.log('esc');
         handleToggleDropdown(e);
      }
   });
}
