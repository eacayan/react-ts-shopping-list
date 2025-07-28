import { ThemeToggle } from '@/features';
import zetaLogo from '/zeta.svg';

const Header: React.FC = () => {
  return (
    <header className='bg-grey h-16 p-4 flex justify-between'>
      <img src={zetaLogo} className='w-24 h-8' alt='Zeta logo' />
      <ThemeToggle />
    </header>
  );
};

export { Header };
