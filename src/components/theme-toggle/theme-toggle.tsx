import { useTheme } from '@/components/theme-toggle/hooks/useTheme';
import { Switch } from 'antd';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className='flex justify-between items-center w-32'>
      <span className='text-white text-sm'>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      <Switch checked={isDark} onClick={toggleTheme} className='theme-toggle-switch' />
    </div>
  );
};
