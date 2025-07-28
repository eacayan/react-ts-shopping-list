import { useTheme } from '@/components/theme-toggle/hooks/useTheme';
import { Switch } from 'antd';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className='flex justify-between items-center w-32'>
      <span className='text-white text-sm'>Dark Mode</span>
      <Switch checked={isDark} onClick={toggleTheme} />
    </div>
  );
};

export { ThemeToggle };
