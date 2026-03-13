import { customPalette as customPaletteLight } from '../../model/themes/light-custom-palette';
import { customPalette as customPaletteDark } from '../../model/themes/dark-custom-palette';
import { UIConfiguratorProviderState, CustomTheme } from '../../types';
import { gradients as gradientsLight } from '../../model/themes/light-gradients';
import { gradients as gradientsDark } from '../../model/themes/dark-gradients';
import { navbarThemes as navbarThemesLight } from '../../model/themes/light-navbar';
import { navbarThemes as navbarThemesDark } from '../../model/themes/dark-navbar';
import { sidebarThemes as sidebarThemesLight } from '../../model/themes/light-sidebar';
import { sidebarThemes as sidebarThemesDark } from '../../model/themes/dark-sidebar';
import { borders } from '../../model/themes/base/borders';
import { breakpoints } from '../../model/themes/base/breakpoints';
import { Theme } from '@mui/material/styles';
import { isSystemDarkMode } from '../is-system-dark-mode';


export const getThemeByName = (muiTheme: Theme, controller: UIConfiguratorProviderState): CustomTheme => {
  const { mode, navbarColor, sidebarColor } = controller;
  const isSystemModeDark = isSystemDarkMode();
  const fontFamily = '"Montserrat-Regular", "Roboto", "Helvetica", "Arial", sans-serif';

  const theme = {
    ...muiTheme,
    borders: { ...borders },
    breakpoints: { ...breakpoints },
    components: {
      ...muiTheme.components,
      fontFamily,
      MuiTypography : { styleOverrides: { root: { fontFamily } } },
      MuiBox        : { styleOverrides: { root: { fontFamily } } },
      MuiButton     : { styleOverrides: { root: { fontFamily } } },
    }
  } as unknown as CustomTheme;

  if (mode === 'light' || ! isSystemModeDark) {
    theme.palette = {
      ...muiTheme.palette,
      ...customPaletteLight,
      ...sidebarThemesLight[sidebarColor],
      ...navbarThemesLight[navbarColor],
      gradients: gradientsLight,
    };
    theme.components = {
      ...theme.components,

      MuiCheckbox: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: '#8b8b8b',
              '& .MuiSvgIcon-root': {
                color: '#8b8b8b',
              },
            },
            '&:not(.Mui-checked)': {
              color: '#8b8b8b',
              '& .MuiSvgIcon-root': {
                color: '#8b8b8b',
              },
            }
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: '#d5d5d5',
            '&:hover': {
              backgroundColor: '#c4c4c4',
            }
          },
          // outlined: {
          //   borderColor: '#e0e0e0',
          // },
          // filled: {
          //   backgroundColor: '#f5f5f5',
          //   '&:hover': {
          //     backgroundColor: '#e0e0e0',
          //   },
          // },
        },
      },
    }
  }
  else {
    theme.palette = {
      ...muiTheme.palette,
      ...customPaletteDark,
      ...sidebarThemesDark[sidebarColor],
      ...navbarThemesDark[navbarColor],
      gradients: gradientsDark,
    };
    theme.components = {
      ...theme.components,
      MuiToggleButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              background: '#383838',
              '& .MuiSvgIcon-root': {
                color: '#a2a2a2',
              },
            },
            '&:not(.Mui-selected)': {
              color: '#666666',
              '&:hover': {
                background: '#303030',
              },
              '& .MuiSvgIcon-root': {
                color: '#4f4f4f',
              },
            }
          }
        }
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: '#bcbcbc',
              '& .MuiSvgIcon-root': {
                color: '#bcbcbc',
              },
            },
            '&:not(.Mui-checked)': {
              color: '#616161',
              '& .MuiSvgIcon-root': {
                color: '#616161',
              },
            }
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: '#616161',
              '& .MuiSvgIcon-root': {
                color: '#616161',
              },
            },
            '&:not(.Mui-checked)': {
              color: '#616161',
              '& .MuiSvgIcon-root': {
                color: '#616161',
              },
            }
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: '#383838',
            '&:hover': {
              backgroundColor: '#1e1e1e',
            }
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }
          },
        },
      },
    }
  }

  return theme // as CustomTheme;
}
