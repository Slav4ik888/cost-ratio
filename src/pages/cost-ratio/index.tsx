import { FC } from 'react';
import { Section } from 'shared/ui/section';
import { BigTable } from 'widgets/big-table';
import { ResultTabl } from '../../widgets/result-tabl';
import { ResultAnalisTabl } from '../../widgets/result-analis-tabl';
import { FacturaData } from 'widgets/factura-data';
import { useAutomatization } from 'entities/automatization';
import { FromAltegra } from 'widgets/from-altegra';



export const CostRatio: FC = () => {
  const { isAltegra, arrResult } = useAutomatization();

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
        <ResultAnalisTabl />
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
