// Тип для карточки портфолио
export interface CaseCard {
   id: string;
   type: 'EVENT' | 'PR' | 'BTL';
   title: string;
   description: string;
   link: string;
   image: string;
}

// Тип для массива карточек
export type CasesData = CaseCard[];

type FilterKey = keyof CaseCard;

export type Filters = [FilterKey, string[]];
