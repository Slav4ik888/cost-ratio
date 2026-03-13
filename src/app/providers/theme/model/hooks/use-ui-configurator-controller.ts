import { useContext } from 'react';
import { UIConfiguratorContext, UIConfiguratorContextType } from '../ui-configurator-reducer/ui-configurator-context';



export const useUIConfiguratorController = (): UIConfiguratorContextType => {
  const context = useContext(UIConfiguratorContext);

  if (! context) {
    throw new Error(
      'useUIConfigController should be used inside the UIConfigContextProvider.'
    );
  }

  return context;
}
