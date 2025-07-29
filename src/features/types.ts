export const CATEGORIES = [
  'Dairy',
  'Vegetables',
  'Fruits',
  'Grains',
  'Meat',
  'Snacks',
  'Beverages',
  'Bakery',
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface ShoppingListFormInput {
  name: string;
  category: Category | '';
  subcategory: string;
  qty: number;
  price: number;
  date: string;
}

export interface ShoppingListTableProps {
  data: ShoppingListFormInput[];
  globalFilter?: string;
  categoryFilter?: string;
  subcategoryFilter?: string;
}

export type ShoppingListApiResponse = {
  data: ShoppingListFormInput[];
  meta: {
    totalRowCount: number;
  };
};
