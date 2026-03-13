import { FC, ReactNode, useEffect, useMemo, useReducer } from 'react';
import {
  ThemeProvider as MuiThemeProvider, createTheme, useTheme as useMUITheme
 } from '@mui/material/styles';
import { PaletteMode, UIConfiguratorProviderState } from '../types';
import { reducer, setMode, setSidebarColor } from '../model/ui-configurator-reducer/reducer';
import { calcLeftOffsetScrollButton, getThemeByName } from '../utils';
import {
  UIConfiguratorContext, UIConfiguratorContextType
} from '../model/ui-configurator-reducer/ui-configurator-context';
import { LS } from 'shared/lib/local-storage';
import { isNotUndefined } from 'shared/lib/validators';
import { SIDEBAR_FULL_WIDTH } from '../consts';



const fromLS = LS.getUIConfiguratorState();

const isSidebar   = isNotUndefined(fromLS?.isSidebar) ? Boolean(fromLS?.isSidebar) : true;
const sidebarMini = fromLS?.sidebarMini || false;

const initialState: UIConfiguratorProviderState = {
  mode                   : fromLS?.mode                   || 'system',
  isOpenConfigurator     : fromLS?.isOpenConfigurator     || false,
  navbarFixed            : fromLS?.navbarFixed            || true,
  navbarTransparent      : fromLS?.navbarTransparent      || false,
  navbarColor            : fromLS?.navbarColor            || 'navbar_white',
  isSidebar,
  isMobileOpenSidebar    : false,
  sidebarWidth           : fromLS?.sidebarWidth           || SIDEBAR_FULL_WIDTH,
  sidebarMini,
  sidebarColor           : fromLS?.sidebarColor           || 'sidebar_black',
  leftOffsetScrollButton : calcLeftOffsetScrollButton(isSidebar, sidebarMini), // При монтировании ScrollableWorkspace рассчитается
};


interface Props {
  initial? : PaletteMode // For Story
  children : ReactNode
}

export const UIConfiguratorProvider: FC<Props> = ({ initial, children }) => {
  const [controller, dispatch] = useReducer(reducer, initialState) as UIConfiguratorContextType;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (e: any) => {
      setMode(dispatch, e.matches ? 'dark' : 'light');
      setSidebarColor(dispatch, e.matches ? 'sidebar_black' : 'sidebar_grey');
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const muiTheme = useMUITheme();

  const value = useMemo(() => [controller, dispatch] as UIConfiguratorContextType, [controller, dispatch]);

  const theme = useMemo(() => createTheme(getThemeByName(muiTheme, controller)), [muiTheme, controller]);


  return (
    <UIConfiguratorContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {
          children
        }
      </MuiThemeProvider>
    </UIConfiguratorContext.Provider>
  )
};
