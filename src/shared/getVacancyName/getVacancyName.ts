export function getVacancyName(form: HTMLFormElement) {
   const vacancy = form.dataset.vacancy;

   const data = {
      isVacancy: vacancy ? true : false,
      vacancyTitle: vacancy || null,
   };

   return data;
}
