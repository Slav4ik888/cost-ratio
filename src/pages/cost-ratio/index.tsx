import React, { FC } from 'react';
import { Section } from 'shared/ui/section';
import TextareaFromAltegra from '../../components/TextareaFromAltegra';
import BigTable from '../../components/BigTable';
import { ResultTabl } from '../../components/ResultTabl';
import { makeResultForFinishTable, changePointToComma } from '../../utils/make-result-for-finish-table';
import { pushArrBmAndStriteTraffic, calcMbCostAll, calcSpTrafficAll,
  makeDataForBigTable, makeDataFromGoogle } from '../../utils/make-data-for-bigtable';
import { getFromGoogleData } from '../../entities/service-desk/model/services/get-service-desk-data/get-from-google-data';
import ResultAnalisTabl from '../../components/ResultAnalisTabl';
import { FacturaData } from 'widgets/factura-data';
import { cfg } from 'app/config';
import { PageLoader } from 'widgets/page-loader';
import { AltergaItem, joinTraffic, returnArrMb, returnArrSprite } from 'entities/altegra';
import { useAutomatization } from 'entities/automatization';
import { Factura } from 'entities/factura';



export const CostRatio: FC = () => {
  const { isAltegra } = useAutomatization();

    
  const state = {
    arrFromAltegra: [], // созданный массив из полученных данных от Алтегры
    // arrayOfProject: [], // загруженны массив с service desk
    arrForBigTable: [], // массив для "Сводной таблицы" (по SiteID)
    arrResult:[], // конечный массив (по Project)

    mbSiteId: [], // массив помегабатного трафика
    striteSiteId: [],  // массив полосного трафика

    mbPrice: 0.132, // Базовая стоимость Мб

    mbCostAll: 0,// Общие затраты по трафику рассчитанные + доп услуги
    spTrafficAll: 0,// Общий трафик в полосе
  };

  // Читаем данные из Гугл
  // async getArrFromGoogle() {};

  // Обновляем все данные при повторном запроосе к Google
  function handleUpdateFromGoogle(arr: any[]) {
    // this.setState({
    //   isLoading: true, // Выставляем "загрузку"
    // });

    // await this.getArrFromGoogle()
    //   .then(() => {
    //     // @ts-ignore
    //     let newArrForBigTable = makeDataFromGoogle(arr, this.state.arrayOfProject);
    //     this.handleUpdateBigArr(newArrForBigTable);
    //   });
  }

  /**
   * Принимаем массив из обработанной таблицы от Алтегры
   * Объединяем входящий и исходящий трафик
   * @param {AltergaItem[]} arr - массив из обработанной таблицы от Алтегры
   */

  function handleSetArr (arrFromAltegra: AltergaItem[]) {
    setTimeout(() => {
      const arrFromAltegraTransformed = joinTraffic(arrFromAltegra);
      const mbSiteId = returnArrMb(arrFromAltegraTransformed);
      const striteSiteId = returnArrSprite(arrFromAltegraTransformed);

      // Рассчитываем данные для "Сводной таблицы"
      // @ts-ignore
      const { arrayOfProject, factura, mbPrice } = this.state;

      // Первоначальное наполнение пустого массива данными по трафику Мб и полосному
      const arr = pushArrBmAndStriteTraffic(mbSiteId, striteSiteId, mbPrice);

      // Подсчёт общих затрат по Мб трафику + сч/ф
      const mbCostAll = calcMbCostAll(arr);
      //

      // Подсчёт общего трафика полосы
      const spTrafficAll = calcSpTrafficAll(arr);
      //

      // Рассчитываем Затраты скорректированные
      let { newArrForBigTable } = makeDataForBigTable(arr, factura, mbCostAll, spTrafficAll);

      // Обновляем arrForBigTable, данными из массива от Гугл
      // console.log('!!!arrayOfProject: ', arrayOfProject);
      
      newArrForBigTable = makeDataFromGoogle(newArrForBigTable, arrayOfProject);

      // this.setState({
      //   arrFromAltegra: arrFromAltegraTransformed,
      //   mbSiteId,
      //   striteSiteId,
      //   isAltegra: true,
      //   mbCostAll,
      //   spTrafficAll,
      // });


      // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
      const {arrResult} = makeResultForFinishTable(newArrForBigTable);

      // Меняем точку на запятую в итоговой ячейке "Сводной таблицы"
      const lastBigStore = changePointToComma(newArrForBigTable, 'result');

      // this.setState({
      //   arrForBigTable: lastBigStore,
      //   arrResult,
      // });
    }, 100);
  };

  // Меняем значения на пришедшие из таблицы и пересчитываем итоговые значения
  function handleUpdateBigArr(arr: any[]) {
  // @ts-ignore
    const {factura, spTrafficAll} = this.state;

    // Обновляем "Сводную таблицу"  обновлёнными значениями из данных сч/ф mbCostServicies - пересчитываем
    let mbCostAll = calcMbCostAll(arr);
    // Рассчитываем Затраты скорректированные
    let {newArrForBigTable} = makeDataForBigTable(arr, factura, mbCostAll, spTrafficAll);

    // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
    const { arrResult } = makeResultForFinishTable(newArrForBigTable);

    // Меняем точку на запятую в итоговой ячейке "Сводной таблицы"
    const lastBigStore = changePointToComma(newArrForBigTable, `result`);

    // this.setState({
    //     arrForBigTable: lastBigStore,
    //     mbCostAll,
    //     arrResult,
    // });
  };

  // Присвоение значений сч/фактуры
  function handleSetFactura(factura: Factura) {
    setTimeout(() => {
      // const {arrForBigTable, arrayOfProject} = this.state;
      // Рассчитываем данные для "Сводной таблицы"

      // Подсчёт общих затрат по Мб трафику + сч/ф
      // const mbCostAll = calcMbCostAll(arrForBigTable);
      // Подсчёт общего трафика полосы
      // const spTrafficAll = calcSpTrafficAll(arrForBigTable);

      // Рассчитываем Затраты скорректированные
      // let {newArrForBigTable} = makeDataForBigTable(arrForBigTable, factura, mbCostAll, spTrafficAll);

      // Обновляем newArrForBigTable, данными из массива от Гугл
      // newArrForBigTable = makeDataFromGoogle(newArrForBigTable, arrayOfProject);

      // this.setState({
      //   arrForBigTable: newArrForBigTable,
      //   isAltegra: true,
      //   mbCostAll,
      //   spTrafficAll,
      //   factura,
      // });


      // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
      // const {arrResult} = makeResultForFinishTable(arrForBigTable);

      // Меняем точку на запятую в итоговой ячейке "Сводной таблицы"
      // const lastBigStore = changePointToComma(arrForBigTable, `result`);

      // this.setState({
      //   arrForBigTable: lastBigStore,
      //   arrResult,
      // });
    }, 0);
  }


  return (
    <>
      <Section>
        <FacturaData
          // factura={factura}
          // onSetFactura={handleSetFactura}
          mbCostAll    = {100} // mbCostAll} // Общие затраты по трафику рассчитанные + доп услуги
          spTrafficAll = {200} // spTrafficAll} // Общий трафик в полосе
        />
      </Section>


      {! isAltegra &&
        <Section>
          <TextareaFromAltegra onHandleSetArr={handleSetArr}/>
        </Section>
      }

      {/* формируем таблицы и выводим Помегабайтный и Полосной */}
      {/* {isAltegra &&
        <Section>
          <TwoServicies arrThMb={mbSiteId} arrThSprite={striteSiteId}/>
        </Section>
      } */}

      {/* формируем таблицы и выводим Большую таблицу */}
      {isAltegra &&
        <BigTable
        // @ts-ignore
            mbPrice={mbPrice}
        // @ts-ignore
            arr={arrForBigTable}
        // @ts-ignore
            onHandleUpdateBigArr={this.handleUpdateBigArr}
        // @ts-ignore
            arrayOfProject={arrayOfProject}
        // @ts-ignore
            onHandleUpdateFromGoogle={this.handleUpdateFromGoogle}
          />
      }


      {/* формируем таблицы и выводим Итоговую таблицу для анализа */}
      {isAltegra &&
        <Section>
          <ResultAnalisTabl
        // @ts-ignore
            arr={arrResult}
        // @ts-ignore
            arrBig={arrForBigTable}
          />
        </Section>
      }

      {/* формируем таблицы и выводим Итоговую таблицу для 1С */}
      {isAltegra &&
        <Section>
{/* @ts-ignore */}
          <ResultTabl arr={arrResult} />
        </Section>
      }
    </>
  )
}
