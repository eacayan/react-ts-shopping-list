import { ShoppingListForm, ShoppingListTable } from '@/features';

const Dashboard: React.FC = () => {
  return (
    <section className='bg-light text-dark dark:bg-dark dark:text-light'>
      <ShoppingListForm />
      <ShoppingListTable />
    </section>
  );
};

export { Dashboard };
