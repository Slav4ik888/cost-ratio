import { ChangeEvent, FC, FormEvent, useCallback } from 'react';
import MOCK_ALTEGRA from '../../mocks/arr-from-altegra-2026-02';
import { cfg } from 'app/config';
import { AltergaItem } from 'entities/altegra';
import { makeArray } from './utils/make-array';
import { useAutomatization } from 'entities/automatization';
import { joinTraffic, returnArrMb, returnArrSprite } from './utils/data-processing-from-alterga';
import { useServiceDesk } from 'entities/service-desk';
import { calcMbCostAll, calcSpTrafficAll, makeDataForBigTable, makeDataFromGoogle, pushArrBmAndStriteTraffic } from 'utils/make-data-for-bigtable';
import { changePointToComma, makeResultForFinishTable } from 'utils/make-result-for-finish-table';



/**
 * ПРИНИМАЕМ ТАБЛИЦУ ДАННЫХ АЛТЕГРЫ И СОЗДАЁМ МАССИВ НУЖНЫХ НАМ ДАННЫХ
 * 
 * @return {array} arrFromAltegra  
 */

export const TextareaFromAltegra: FC = () => {
  const {
    factura, mbPrice, setMbCostAll, setSpTrafficAll, setMbSiteId, setStriteSiteId, setAltegraData
  } = useAutomatization();
  const { serviceDeskData } = useServiceDesk();
  // const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   this.setState({
  //     strFromAltegra: e.target.value || '',
  //   });
  // }

  // принимаем данные из формы
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Получаем значение текстового поля из формы
    const textarea = e.currentTarget.querySelector('textarea');
    const value = textarea ? textarea.value : '';
    console.log('value: ', value);
    
    // создаём массив из полученных данных
    const arrFromAltegra = makeArray(value);
    console.log('arrFromAltegra: ', arrFromAltegra);
    
    const arrFromAltegraTransformed = joinTraffic(arrFromAltegra);
    console.log('arrFromAltegraTransformed: ', arrFromAltegraTransformed);
    const mbSiteId = returnArrMb(arrFromAltegraTransformed);
    console.log('mbSiteId: ', mbSiteId);
    const striteSiteId = returnArrSprite(arrFromAltegraTransformed);
    console.log('striteSiteId: ', striteSiteId);

    // Рассчитываем данные для "Сводной таблицы"

    // Первоначальное наполнение пустого массива данными по трафику Мб и полосному
    const arr = pushArrBmAndStriteTraffic(mbSiteId, striteSiteId, mbPrice);
    console.log('arr: ', arr);

    // Подсчёт общих затрат по Мб трафику + сч/ф
    const mbCostAll = calcMbCostAll(arr);
    console.log('mbCostAll: ', mbCostAll);

    // Подсчёт общего трафика полосы
    const spTrafficAll = calcSpTrafficAll(arr);
    console.log('spTrafficAll: ', spTrafficAll);

    // Рассчитываем Затраты скорректированные
    let { newArrForBigTable } = makeDataForBigTable(arr, factura, mbCostAll, spTrafficAll);
    console.log('newArrForBigTable 1: ', newArrForBigTable);

    // Обновляем arrForBigTable, данными из массива от Гугл 
    newArrForBigTable = makeDataFromGoogle(newArrForBigTable, serviceDeskData);
    console.log('newArrForBigTable 2: ', newArrForBigTable);

    
    setAltegraData(arrFromAltegraTransformed);
    setMbSiteId(mbSiteId);
    setStriteSiteId(striteSiteId);
    setMbCostAll(mbCostAll);
    setSpTrafficAll(spTrafficAll);


    // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
    const { arrResult } = makeResultForFinishTable(newArrForBigTable);

    // Меняем точку на запятую в итоговой ячейке "Сводной таблицы"
    const lastBigStore = changePointToComma(newArrForBigTable, 'result');

    // this.setState({
    //   arrForBigTable: lastBigStore,
    //   arrResult,
    // });
  },
    [factura, mbPrice, setMbCostAll, setSpTrafficAll, setMbSiteId, setStriteSiteId, setAltegraData]
  );

  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <div>Данные от Алтегры:</div>
        <textarea
          rows        = {10}
          cols        = {85}
          name        = 'text'
          placeholder = 'Вставьте скопированные данные от Алтегры' 
          // onChange    = {handleChange}
          value       = {cfg.IS_DEV ? MOCK_ALTEGRA : ''}
        />
      </label>
      <input type='submit' value='Обработать' />
    </form>
  )
}
