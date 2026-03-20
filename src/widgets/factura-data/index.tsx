import { useAutomatization } from 'entities/automatization';
import { Factura } from 'entities/factura';
import { FC, useCallback, useState } from 'react';
import { getValueOrZero } from 'shared/helpers/numbers';
import { commaToDot } from 'shared/helpers/strings';
import { Section } from 'shared/ui/section';
import './index.scss';



/** Верхняя форма для ввода данных со счёт фактуры */
export const FacturaData: FC = () => {
  const { factura, mbCostAll, spTrafficAll, setFacturaData } = useAutomatization();
  const [isChanged, setIsChanged] = useState<boolean>();
  const [update, setUpdate] = useState<Factura>(factura);

  
  // Отправка значений введённых значений
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setIsChanged(false);
    setFacturaData(update);
  },
    [update, setFacturaData]
  );

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const newValue = commaToDot(target.value);
    const name = target.name;
    
    setIsChanged(true);
    
    setUpdate((prev) => {
      const value = name === 'value' ? +newValue : getValueOrZero(prev.value);
      const sprite = name === 'sprite' ? +newValue : getValueOrZero(prev.sprite);
      
      return {
        value,
        sprite,
        mb: Number((value - sprite).toFixed(2)),
      }
    });
  },
    [factura, setUpdate]
  );

  
  return (
    <Section>
      <div className='factura-data'>
        <form onSubmit={handleSubmit}>
          {/* <div className='capt'></div> */}
          <table className='table'>
            <thead>
              <tr>
                <th className='facturaTitle'      scope='col'>Данные из сч./фактуры</th> 
                <th className='facturaTitleValue' scope='col'></th>
                <th className='trafficTitle'      scope='col'>Расчётные данные</th> 
                <th className='trafficTitleValue' scope='col'></th>
                <th className='trafficTitle'      scope='col'></th>
                <th className='trafficTitleValue' scope='col'></th>
              </tr>
            </thead>
            
            <tbody>
              <tr>
                <td>Общая сумма:</td>
                <td>
                  <input 
                    type     = 'text'
                    name     = 'value'
                    value    = {update.value || ''}
                    onChange = {handleOnChange}
                  />
                </td>
                <td>Общий трафик Мб (помегаб):</td>
                <td>{}</td>
                <td>Общие затраты по трафику:</td>
                <td>{mbCostAll}</td>
              </tr>

              <tr>
                <td>За полосу:</td>
                <td>
                  <input 
                    type     = 'text'
                    name     = 'sprite'
                    value    = {update.sprite || ''}
                    onChange = {handleOnChange}
                    />
                </td>
                <td>Общий трафик Мб (в полосе):</td>
                <td>{spTrafficAll}</td>
                <td>Общие затраты по трафику:</td>
                <td>{}</td>
              </tr>

              <tr>
                <td>Помегабайтно:</td>
                <td>{update.mb}</td>
                <td></td>
                <td>{}</td>
                <td></td>
                <td>{}</td>
              </tr>
            </tbody>
          </table>

          <input
            className = 'button'
            disabled  = {! isChanged}
            type      = 'submit'
            value     = 'Обновить значения'
          />
        </form>
      </div>
    </Section>
  );
};
