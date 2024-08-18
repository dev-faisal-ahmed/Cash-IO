export type TCategoryType = 'INCOME' | 'EXPENSE' | 'BOTH';
export type TCategory = {
  _id: string;
  userId: string;
  name: string;
  icon: string;
  budget?: number;
  type: TCategoryType;
  isDeleted: boolean;
};

export type TAddCategoryPayload = Pick<
  TCategory,
  'name' | 'icon' | 'budget'
> & {
  type: string;
};
