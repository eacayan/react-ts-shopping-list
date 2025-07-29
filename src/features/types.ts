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
  category: Category;
  subcategory: string;
  qty: number;
  price: number;
  date: string;
}

export interface ShoppingListTableRows {
  name: string;
  category: Category;
  subcategory: string;
  qty: number;
  price: number;
  total: number;
  date: string;
}

export interface ShoppingListTableProps {
  data: ShoppingListTableRows[];
  globalFilter?: string;
  categoryFilter?: string;
  subcategoryFilter?: string;
}

export type ShoppingListApiResponse = {
  data: ShoppingListTableRows[];
  meta: {
    totalRowCount: number;
  };
};
