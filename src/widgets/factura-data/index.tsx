import { PureComponent } from 'react';
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

// Верхнее меню для ввода данных
export class FacturaData extends PureComponent {

  state = {
    // @ts-ignore
    allSum: this.props.factura.value, //779797.36,
    // @ts-ignore
    spriteSum: this.props.factura.sprite, //205887.1,
    // @ts-ignore
    mbSum: this.props.factura.mb,
  }

  // Отправка значений введённых значений
    // @ts-ignore
  handleSubmit = (event) => {
		event.preventDefault();
    const factura = {};
    // @ts-ignore
    factura.value = +this.state.allSum;
    // @ts-ignore
    factura.sprite = +this.state.spriteSum;
    // @ts-ignore
    factura.mb = +this.state.mbSum;
    // @ts-ignore
    this.props.onSetFactura(factura);
  }

    // @ts-ignore
  handleOnChange = event => {
    const target = event.target;
    const value = correctValid(target.value);
    const name = target.name;
    
    this.setState({
          [name]: value,
        });

    this.setState((state) => ({
    // @ts-ignore
      mbSum: (state.allSum - state.spriteSum).toFixed(2),
    }));
  }

  render() {
    const { allSum, spriteSum, mbSum } = this.state;
    // @ts-ignore
    const {mbCostAll, spTrafficAll} = this.props;

    return (
      <div className='factura-data'>
        <form onSubmit={this.handleSubmit}>
          {/* <div className='capt'></div> */}
          <table className='table'>
            <thead>
              <tr>
                <th className='facturaTitle' scope='col'>Данные из сч./фактуры</th> 
                <th className='facturaTitleValue' scope='col'></th>

                <th className='trafficTitle' scope='col'>Расчётные данные</th> 
                <th className='trafficTitleValue' scope='col'></th>
                <th className='trafficTitle' scope='col'></th>
                <th className='trafficTitleValue' scope='col'></th>

              </tr>
            </thead>
            
            <tbody>
              <tr>
                <td>Общая сумма:</td>
                <td>
                  <input 
                    type='text'
                    name='allSum'
                    value={allSum}
                    onChange={this.handleOnChange}
                    />
                </td>
                <td>Общий трафик Мб (помегаб):</td>
                <td>
                  {}
                </td>
                <td>Общие затраты по трафику:</td>
                <td>
                  {mbCostAll}
                </td>
              </tr>

              <tr>
                <td>За полосу:</td>
                <td>
                  <input 
                    type='text'
                    name='spriteSum'
                    value={spriteSum}
                    onChange={this.handleOnChange}
                    />
                </td>
                <td>Общий трафик Мб (в полосе):</td>
                <td>
                  {spTrafficAll}
                </td>
                <td>Общие затраты по трафику:</td>
                <td>
                  {}
                </td>
              </tr>

              <tr>
                <td>Помегабайтно:</td>
                <td>
                  {mbSum}
                </td>
                <td></td>
                <td>
                  {}
                </td>
                <td></td>
                <td>
                  {}
                </td>
              </tr>
            </tbody>
          </table>

          <input className='button' type='submit' value='Обновить значения' />
        </form>
      </div>
    );
  };
};
