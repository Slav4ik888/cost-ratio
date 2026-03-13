import { useTheme as muiUseTheme } from '@mui/material/styles';
import { CustomTheme } from '../../types';

export const useTheme = () => muiUseTheme() as CustomTheme
