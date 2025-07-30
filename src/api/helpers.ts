import { Category, ShoppingListFormInput } from '@/features/types';
import mockData from '@/api/mock-data.json';

export const FETCH_SIZE = 30;

export function generateMockData(
  mockData: ShoppingListFormInput[],
  targetCount: number,
): ShoppingListFormInput[] {
  const result: ShoppingListFormInput[] = [];

  result.push(...mockData);

  while (result.length < targetCount) {
    const baseItem = mockData[result.length % mockData.length];
    const variation = Math.floor(result.length / mockData.length);

    result.push({
      ...baseItem,
      name: `${baseItem.name} ${variation > 0 ? `(${variation})` : ''}`.trim(),
      qty: Math.floor(Math.random() * 10) + 1,
      price: +(baseItem.price * (0.8 + Math.random() * 0.4)).toFixed(2),
      date: generateRandomDate(),
      category: baseItem.category as Category, // Ensure type
    });
  }

  return result;
}

function generateRandomDate(): string {
  const start = new Date(2025, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0];
}

const initialData = generateMockData(mockData as ShoppingListFormInput[], FETCH_SIZE);

export const fetchData = async (start: number) => {
  const dbData = [...initialData];

  // simulate a backend api
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    data: dbData.slice(start, start + FETCH_SIZE),
    meta: {
      totalRowCount: dbData.length,
    },
  };
};

export const addMockItem = async (item: ShoppingListFormInput) => {
  await new Promise((res) => setTimeout(res, 100)); // simulate latency
  initialData.unshift(item);
};
