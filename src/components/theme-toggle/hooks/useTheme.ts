import { ThemeContext } from '@/context/theme/theme-context';
import { useContext } from 'react';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within the ThemeProvider');
  }
  return context;
};
