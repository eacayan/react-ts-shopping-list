import { Header } from '@/components/header/header';
import { Dashboard } from '@/features/dashboard/dashboard';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
};

export { MainLayout };
