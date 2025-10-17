import {useMemo} from 'react';
import {theme} from '../theme/colors';

export const useTheme = () => {
  return useMemo(() => theme, []);
};

