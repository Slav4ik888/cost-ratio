import { FC, FormEvent, useCallback } from 'react';
import MOCK_ALTEGRA from '../../mocks/arr-from-altegra-2026-02';
import { cfg } from 'app/config';
import { makeArray } from './utils/make-array';
import { useAutomatization } from 'entities/automatization';
import { joinTraffic, returnArrMb, returnArrSprite } from './utils/data-processing-from-alterga';
import { useServiceDesk } from 'entities/service-desk';
import { calcMbCostAll, calcSpTrafficAll, makeDataForBigTable, makeDataFromGoogle, pushArrBmAndStriteTraffic } from 'utils/make-data-for-bigtable';
import { makeResultForFinishTable } from 'utils/make-result-for-finish-table';
import { Section } from 'shared/ui/section';



/**
 * ПРИНИМАЕМ ТАБЛИЦУ ДАННЫХ АЛТЕГРЫ И СОЗДАЁМ МАССИВ НУЖНЫХ НАМ ДАННЫХ
 */
export const TextareaFromAltegra: FC = () => {
  const {
    factura, mbPrice,
    setMbCostAll, setSpTrafficAll, setMbSiteId, setStriteSiteId, setAltegraData, setArrForBigTable, setArrResult
  } = useAutomatization();
  const { serviceDeskData } = useServiceDesk();

  // принимаем данные из формы
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Получаем значение текстового поля из формы
    const textarea = e.currentTarget.querySelector('textarea');
    const value = textarea ? textarea.value : '';
    
    // создаём массив из полученных данных
    const arrFromAltegra = makeArray(value);
    
    const arrFromAltegraTransformed = joinTraffic(arrFromAltegra);
    const mbSiteId = returnArrMb(arrFromAltegraTransformed);
    const striteSiteId = returnArrSprite(arrFromAltegraTransformed);

    // Рассчитываем данные для "Сводной таблицы"

    // Первоначальное наполнение пустого массива данными по трафику Мб и полосному
    const arr = pushArrBmAndStriteTraffic(mbSiteId, striteSiteId, mbPrice);

    // Подсчёт общих затрат по Мб трафику + сч/ф
    const mbCostAll = calcMbCostAll(arr);

    // Подсчёт общего трафика полосы
    const spTrafficAll = calcSpTrafficAll(arr);

    // Рассчитываем Затраты скорректированные
    const { newArrForBigTable } = makeDataForBigTable(arr, factura, mbCostAll, spTrafficAll);

    // Обновляем arrForBigTable, данными из массива от Гугл 
    const newArrForBigTable_2 = makeDataFromGoogle(newArrForBigTable, serviceDeskData);

    // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
    const arrResult = makeResultForFinishTable(newArrForBigTable_2);

    setAltegraData(arrFromAltegraTransformed);
    setMbSiteId(mbSiteId);
    setStriteSiteId(striteSiteId);
    setMbCostAll(mbCostAll);
    setSpTrafficAll(spTrafficAll);
    setArrForBigTable(newArrForBigTable_2);
    setArrResult(arrResult);
  },
    [
      factura, mbPrice,
      setMbCostAll, setSpTrafficAll, setMbSiteId, setStriteSiteId, setAltegraData, setArrForBigTable, setArrResult
    ]
  );

  
  return (
    <Section>
      <form onSubmit={handleSubmit}>
        <label>
          <div>Данные от Алтегры:</div>
          <textarea
            rows        = {10}
            cols        = {85}
            name        = 'text'
            placeholder = 'Вставьте скопированные данные от Алтегры' 
            defaultValue = {cfg.IS_DEV ? MOCK_ALTEGRA : ''}
          />
        </label>
        <input type='submit' value='Обработать' />
      </form>
    </Section>
  )
}
