// Тип для карточки портфолио
export interface CaseCard {
   id: string;
   type: 'EVENT' | 'PR' | 'BTL';
   title: string;
   description: string;
   link: string;
   image: string;
   prevNextLinks?: {
      prev: string;
      next: string;
   };
}

// Тип для массива карточек
export type CasesData = CaseCard[];

// тип для фолтра
export type FilterCriteria = {
   [K in keyof Partial<CaseCard>]: CaseCard[K] | Array<CaseCard[K]>;
};
