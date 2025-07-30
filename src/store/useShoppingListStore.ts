import { create } from 'zustand';
import { ShoppingListFormInput } from '@/features/types';

interface ShoppingListStore {
  allData: ShoppingListFormInput[];
  filteredData: ShoppingListFormInput[];

  setAllData: (data: ShoppingListFormInput[]) => void;
  setFilteredData: (data: ShoppingListFormInput[]) => void;

  getTotalSpending: () => number;
  getSubcategoryTotals: () => Record<string, number>;
  getHighestCostItem: () => ShoppingListFormInput | null;
}

export const useShoppingListStore = create<ShoppingListStore>((set, get) => ({
  allData: [],
  filteredData: [],

  setAllData: (data) => set({ allData: data }),
  setFilteredData: (data) => set({ filteredData: data }),

  getTotalSpending: () => {
    const { filteredData } = get();
    return filteredData.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  getSubcategoryTotals: () => {
    const { filteredData } = get();
    return filteredData.reduce(
      (acc, item) => {
        const total = item.price * item.qty;
        acc[item.subcategory] = (acc[item.subcategory] || 0) + total;
        return acc;
      },
      {} as Record<string, number>,
    );
  },

  getHighestCostItem: () => {
    const { filteredData } = get();
    if (filteredData.length === 0) return null;

    return filteredData.reduce((max, item) => {
      const itemTotal = item.price * item.qty;
      const maxTotal = max.price * max.qty;
      return itemTotal > maxTotal ? item : max;
    }, filteredData[0]);
  },
}));
