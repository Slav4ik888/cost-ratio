import React, { PureComponent } from 'react';
import s from './header.module.css';


const correctValid = (str) =>{
  let newStr = str.replace(/,/,'.');
  const idx = newStr.indexOf(`.`);
  if (idx !== -1) {
    let endStr = newStr.slice(idx + 1);
    const e = endStr.replace(/\./,'');
    newStr = [...newStr.slice(0, idx + 1), ...e].join(``);
  }
  return newStr;
};

// Верхнее меню для ввода данных
export class Header extends PureComponent {

  state = {
    allSum: this.props.factura.value, //779797.36,
    spriteSum: this.props.factura.sprite, //205887.1,
    mbSum: this.props.factura.mb,
  }

  // Отправка значений введённых значений
  handleSubmit = (event) => {
		event.preventDefault();
    const factura = {};
    factura.value = +this.state.allSum;
    factura.sprite = +this.state.spriteSum;
    factura.mb = +this.state.mbSum;
    this.props.onSetFactura(factura);
  }

  handleOnChange = event => {
    const target = event.target;
    const value = correctValid(target.value);
    const name = target.name;
    
    this.setState({
          [name]: value,
        });

    this.setState((state) => ({
      mbSum: (state.allSum - state.spriteSum).toFixed(2),
    }));
  }

  render() {
    const { allSum, spriteSum, mbSum } = this.state;
    const {mbCostAll, spTrafficAll} = this.props;

    return (
      <>
        <div className={s.centerBox}>
          <div className={s.result}>
            <form onSubmit={this.handleSubmit}>
              {/* <div className={s.capt}></div> */}
              <table className={s.table}>
                <thead>
                  <tr>
                    <th className={s.facturaTitle} scope="col">Данные из сч./фактуры</th> 
                    <th className={s.facturaTitleValue} scope="col"></th>

                    <th className={s.trafficTitle} scope="col">Расчётные данные</th> 
                    <th className={s.trafficTitleValue} scope="col"></th>
                    <th className={s.trafficTitle} scope="col"></th>
                    <th className={s.trafficTitleValue} scope="col"></th>

                  </tr>
                </thead>
                
                <tbody>
                  <tr>
                    <td>Общая сумма:</td>
                    <td>
                      <input 
                        type="text"
                        name="allSum"
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
                        type="text"
                        name="spriteSum"
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

              <input className={s.button} type="submit" value="Обновить значения" />
            </form>
          </div>
        </div>
      </>
    );
  };
};
