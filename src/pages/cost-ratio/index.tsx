import { FC } from 'react';
import { Section } from 'shared/ui/section';
import { BigTable } from 'widgets/big-table';
import { ResultTabl } from '../../components/ResultTabl';
import { makeResultForFinishTable, changePointToComma } from '../../utils/make-result-for-finish-table';
import { calcMbCostAll, makeDataForBigTable } from '../../utils/make-data-for-bigtable';
import ResultAnalisTabl from '../../components/ResultAnalisTabl';
import { FacturaData } from 'widgets/factura-data';
import { cfg } from 'app/config';
import { PageLoader } from 'widgets/page-loader';
import { AltergaItem } from 'entities/altegra';
import { useAutomatization } from 'entities/automatization';
import { Factura } from 'entities/factura';
import { FromAltegra } from 'widgets/from-altegra';



export const CostRatio: FC = () => {
  const { isAltegra } = useAutomatization();

  // const state = {
    // arrFromAltegra: [], // созданный массив из полученных данных от Алтегры
    // arrayOfProject: [], // загруженны массив с service desk
    // arrForBigTable: [], // массив для "Сводной таблицы" (по SiteID)
    // arrResult:[], // конечный массив (по Project)

    // mbSiteId: [], // массив помегабатного трафика
    // striteSiteId: [],  // массив полосного трафика
    // mbCostAll: 0,// Общие затраты по трафику рассчитанные + доп услуги
    // spTrafficAll: 0,// Общий трафик в полосе
  // };

  // Читаем данные из Гугл
  // async getArrFromGoogle() {};


  /**
   * Принимаем массив из обработанной таблицы от Алтегры
   * Объединяем входящий и исходящий трафик
   * @param {AltergaItem[]} arr - массив из обработанной таблицы от Алтегры
   */

  function handleSetArr (arrFromAltegra: AltergaItem[]) {
    setTimeout(() => {
      
    }, 100);
  };

  


  return (
    <>
      <FacturaData />
      {! isAltegra && <FromAltegra />}

      {/* формируем таблицы и выводим Помегабайтный и Полосной */}
      {/* {isAltegra &&
        <Section>
          <TwoServicies arrThMb={mbSiteId} arrThSprite={striteSiteId}/>
        </Section>
      } */}

      {/* формируем таблицы и выводим Большую таблицу */}
      {isAltegra && <BigTable />}

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
