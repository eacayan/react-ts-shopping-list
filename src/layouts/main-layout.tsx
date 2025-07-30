import { Dashboard, Header, Subheader } from '@/components';

const MainLayout: React.FC = () => {
  return (
    <div className='h-screen bg-light text-dark dark:bg-dark dark:text-light'>
      <Header />
      <Subheader />
      <Dashboard />
    </div>
  );
};

export { MainLayout };
