import { useAutomatization } from 'entities/automatization';
import { TextareaFromAltegra } from 'features/textarea-from-altegra';
import { FC } from 'react';


export const FromAltegra: FC = () => {
  const { isAltegra } = useAutomatization();
  
  if (isAltegra) return null;
  
  return (
    <TextareaFromAltegra />
  );
};
