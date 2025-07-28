import { Header } from '@/components/header/header';
import { Dashboard } from '@/features/dashboard/dashboard';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
};

export { MainLayout };
