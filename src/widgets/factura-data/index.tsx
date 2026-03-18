import { useAutomatization } from 'entities/automatization';
import { Factura } from 'entities/factura';
import { FC, useCallback, useState } from 'react';
import './index.scss';



const correctValid = (str: string) =>{
  let newStr = str.replace(/,/, '.');
  const idx = newStr.indexOf('.');
  
  if (idx !== -1) {
    let endStr = newStr.slice(idx + 1);
    const e = endStr.replace(/\./, '');
    newStr = newStr.slice(0, idx + 1) + e;
  }
  return newStr;
};


interface Props {
  mbCostAll    : number,
  spTrafficAll : number,
}

// Верхнее меню для ввода данных
export const FacturaData: FC<Props> = () => {
  const { factura, setFacturaData } = useAutomatization();
  const [facturaUpdate, setFacturaUpdate] = useState<Factura>(factura);

  // Отправка значений введённых значений
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setFacturaData(factura);
  },
    [setFacturaData]
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const newValue = correctValid(target.value);
    const name = target.name;
    console.log('name: ', name);
      
    setFacturaUpdate((prev) => {
      const value = name === 'value' ? +newValue : +prev.value;
      console.log('value: ', value);
      const sprite = name === 'sprite' ? +newValue : +prev.sprite;
      console.log('sprite: ', sprite);
      
      return {
        value,
        sprite,
        mb: Number((value - sprite).toFixed(2)),
      }
    });
  }

  return (
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
                  value    = {facturaUpdate.value}
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
                  value    = {facturaUpdate.sprite}
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
              <td>{mbSum}</td>
              <td></td>
              <td>{}</td>
              <td></td>
              <td>{}</td>
            </tr>
          </tbody>
        </table>

        <input className='button' type='submit' value='Обновить значения' />
      </form>
    </div>
  );
};
