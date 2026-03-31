import { FC } from 'react';
import { Section } from 'shared/ui/section';
import { BigTable } from 'widgets/big-table';
import { ResultTabl } from '../../widgets/result-tabl';
import ResultAnalisTabl from '../../components/ResultAnalisTabl';
import { FacturaData } from 'widgets/factura-data';
import { useAutomatization } from 'entities/automatization';
import { FromAltegra } from 'widgets/from-altegra';



export const CostRatio: FC = () => {
  const { isAltegra, arrResult, arrForBigTable } = useAutomatization();

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
            arr    = {arrResult}
            arrBig = {arrForBigTable}
          />
        </Section>
      }

      {/* формируем таблицы и выводим Итоговую таблицу для 1С */}
      {isAltegra &&
        <Section>
          <ResultTabl arr={arrResult} />
        </Section>
      }
    </>
  )
}
