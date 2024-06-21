export function getVacancyName(form: HTMLFormElement) {
   const parentBlock = form.closest('.full-width-form');
   const vacancyBlock =
      parentBlock &&
      parentBlock.querySelector('.full-width-form__vacancy-title');
   const vacancy = (vacancyBlock && vacancyBlock.textContent.trim()) || null;

   const data = {
      isVacancy: vacancy ? true : false,
      vacancyTitle: vacancy,
   };

   return data;
}
