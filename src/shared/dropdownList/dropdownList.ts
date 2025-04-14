export function dropdownList(
   element: HTMLElement,
   data: { value: string; content: string }[],
) {
   let list = element.querySelector(`ul`);
   if (!list) {
      const ul = document.createElement('ul');
      ul.setAttribute('class', 'dropdown-list text-xxs');
      element.appendChild(ul);
      list = ul;
   }

   list.innerHTML = '';

   const listData = data.map(item => {
      const li = document.createElement('li');
      li.textContent = item.content || '';
      li.setAttribute('tabindex', '0');
      li.dataset.value = item.value || '';
      list.appendChild(li);
      return {
         content: li.textContent,
         value: li.dataset.value,
         element: li,
         list,
      };
   });

   return listData;
}
