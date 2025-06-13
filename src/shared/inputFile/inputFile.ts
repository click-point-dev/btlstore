import JustValidate, { Rules } from 'just-validate';

export function inputFile(form: HTMLFormElement, validator: JustValidate) {
   let filesList: File[] | null = [];
   const filesInput = form['file[]'] as HTMLInputElement;

   if (!filesInput) return;

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
         rule: Rules.MaxFilesCount,
         value: 1,
         errorMessage: 'Не более одного файла',
      },
      {
         rule: Rules.Files,
         value: {
            files: {
               extensions: ['jpeg', 'jpg', 'png'],
            },
         },
         errorMessage: 'Только файлы jpeg, jpg, png',
      },
      {
         rule: Rules.Files,
         value: {
            files: {
               maxSize: 15000000,
            },
         },
         errorMessage: 'Большой размер файла (max 15MB)',
      },
      {
         rule: Rules.Files,
         value: {
            files: {
               minSize: 15000,
            },
         },
         errorMessage: 'Мленький размер файла (min 15kB) ',
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
      }

      if (files === null) clearPlaceholder();
   }

   filesInput.addEventListener('change', async e => {
      if (e.target instanceof HTMLInputElement) {
         let files = e.target.files;
         const isValid = await validator.revalidateField(filesInput);

         if (isValid && files.length) {
            for (let file of files) {
               file.size > 0 && filesList.push(file);
            }
         }

         if (isValid) paintList(files, filesPlaceholder);
         if (!isValid) paintList(null, filesPlaceholder);
      }
   });

   return filesList;
}
