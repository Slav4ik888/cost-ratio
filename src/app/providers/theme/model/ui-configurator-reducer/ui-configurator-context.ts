import { createContext } from 'react';
import { UIConfiguratorProviderState } from '../../types';



export interface UIConfiguratorContextType extends Array<UIConfiguratorProviderState | any> {
  0: UIConfiguratorProviderState
  1: any
}


export const UIConfiguratorContext = createContext<UIConfiguratorContextType>(
  [] as unknown as UIConfiguratorContextType
);

// Setting custom name for the context which is visible on react dev tools
UIConfiguratorContext.displayName = 'UIConfiguratorContext';
