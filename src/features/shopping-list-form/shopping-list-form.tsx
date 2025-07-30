import {
  ShoppingListInputDate,
  ShoppingListInputName,
  ShoppingListInputNumber,
  ShoppingListSelect,
} from '@/features';
import { CATEGORIES, ShoppingListFormInput } from '@/features/types';
import { useForm } from '@tanstack/react-form';
import mockData from '@/api/mock-data.json';
import { PlusOutlined } from '@ant-design/icons';
import { addMockItem } from '@/api/helpers';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const ShoppingListForm: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addMockItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['item'] });
    },
  });
  const form = useForm({
    defaultValues: {
      name: '',
      category: '',
      subcategory: '',
      price: 0,
      qty: 0,
      date: '',
    } as ShoppingListFormInput,
    onSubmit: ({ value }) => {
      mutation.mutate(value);
      form.reset();
    },
  });

  const subcategories = Array.from(new Set(mockData.map((item) => item.subcategory)));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='flex flex-wrap items-end gap-4 w-full py-6 px-10'
    >
      <form.Field
        name='name'
        validators={{
          onChange: ({ value }) => (value.trim() === '' ? 'Item name is required' : undefined),
        }}
      >
        {(field) => (
          <div className='flex flex-col gap-y-2'>
            <ShoppingListInputName
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 && (
              <em className='text-red-500 text-xs'>{field.state.meta.errors.join(', ')}</em>
            )}
          </div>
        )}
      </form.Field>
      <form.Field
        name='category'
        validators={{
          onChange: ({ value }) => (value === '' ? 'Category is required' : undefined),
        }}
      >
        {(field) => (
          <div className='flex flex-col gap-y-2'>
            <ShoppingListSelect
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value as any)}
              options={CATEGORIES}
              label='Category'
            />
            {field.state.meta.errors.length > 0 && (
              <em className='text-red-500 text-xs'>{field.state.meta.errors.join(', ')}</em>
            )}
          </div>
        )}
      </form.Field>
      <form.Field
        name='subcategory'
        validators={{
          onChange: ({ value }) => (value === '' ? 'Sub Category is required' : undefined),
        }}
      >
        {(field) => (
          <div className='flex flex-col gap-y-2'>
            <ShoppingListSelect
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              options={subcategories}
              label='Sub Category'
            />
            {field.state.meta.errors.length > 0 && (
              <em className='text-red-500 text-xs'>{field.state.meta.errors.join(', ')}</em>
            )}
          </div>
        )}
      </form.Field>
      <form.Field
        name='price'
        validators={{
          onChange: ({ value }) => (!value ? 'Price is required' : undefined),
        }}
      >
        {(field) => (
          <div className='flex flex-col gap-y-2'>
            <ShoppingListInputNumber
              value={field.state.value}
              onChange={(value) => field.handleChange(value ?? 0)}
              label='Price'
            />
            {field.state.meta.errors.length > 0 && (
              <em className='text-red-500 text-xs'>{field.state.meta.errors.join(', ')}</em>
            )}
          </div>
        )}
      </form.Field>
      <form.Field
        name='qty'
        validators={{
          onChange: ({ value }) => (!value ? 'Quantity is required' : undefined),
        }}
      >
        {(field) => (
          <div className='flex flex-col gap-y-2'>
            <ShoppingListInputNumber
              value={field.state.value}
              onChange={(value) => field.handleChange(value ?? 0)}
              label='Quantity'
            />
            {field.state.meta.errors.length > 0 && (
              <em className='text-red-500 text-xs'>{field.state.meta.errors.join(', ')}</em>
            )}
          </div>
        )}
      </form.Field>
      <form.Field
        name='date'
        validators={{
          onChange: ({ value }) => (value === '' ? 'Date is required' : undefined),
        }}
      >
        {(field) => (
          <div className='flex flex-col gap-y-2'>
            <ShoppingListInputDate
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
            />
            {field.state.meta.errors.length > 0 && (
              <em className='text-red-500 text-xs'>{field.state.meta.errors.join(', ')}</em>
            )}
          </div>
        )}
      </form.Field>
      <button
        type='submit'
        className='flex items-center gap-x-2 px-4 h-10 rounded-md bg-btn text-text-light self-end'
      >
        <PlusOutlined />
        <span className='text-sm font-bold'>Add Item</span>
      </button>
    </form>
  );
};

export { ShoppingListForm };
