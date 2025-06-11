import JustValidate, { Rules } from 'just-validate';

export function inputFile(form: HTMLFormElement, validator: JustValidate) {
   let filesList: File[] | null;
   const filesInput = form['file[]'] as HTMLInputElement;

   if (!filesInput) return;
   console.log(filesInput);
   const filesPlaceholder = form.querySelector(
      '[data-files-input-placeholder]',
   ) as HTMLDivElement;

   validator.addField(filesInput, [
      {
         rule: Rules.MinFilesCount,
         value: 1,
         errorMessage: 'Фото обязательно',
      },
      {
         rule: Rules.Files,
         value: {
            files: {
               extensions: ['jpeg', 'jpg', 'png'],
               maxSize: 15000000,
            },
         },
         errorMessage: 'Только картинки не более 15 Мб',
      },
   ]);

   function paintList(files: FileList | null, placeholder: HTMLDivElement) {
      function clearPlaceholder() {
         placeholder.innerHTML = '';
      }

      clearPlaceholder();

      if (files !== null) {
         for (let file of files) {
            placeholder.insertAdjacentHTML(
               'beforeend',
               /*html*/ `
               <div class="input-file__btn">
                  <span>✅ </span><span id="deleteFileButton">${file.name}</span>
            </div>
            `,
            );
         }
         return Array.from(files);
      }

      if (files === null) clearPlaceholder();
      return null;
   }

   filesInput.addEventListener('change', async e => {
      if (e.target instanceof HTMLInputElement) {
         const isValid = await validator.revalidateField(filesInput);
         let files = e.target.files;

         if (isValid) filesList = paintList(files, filesPlaceholder);
         if (!isValid) filesList = paintList(null, filesPlaceholder);
      }
   });

   return filesList;
}
