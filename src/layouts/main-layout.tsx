import { Dashboard, Header } from '@/components';

const MainLayout: React.FC = () => {
  return (
    <div className='h-screen bg-light text-dark dark:bg-dark dark:text-light'>
      <Header />
      <Dashboard />
    </div>
  );
};

export { MainLayout };
