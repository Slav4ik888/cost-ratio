import React, { PureComponent } from 'react';
import s from './header.module.css';


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
    const value = target.value;
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
    const {mbCostAll, spTrafficAll, factura} = this.props;

    return (
      <>
        <div className={s.centerBox}>
          <div className={s.result}>
            <div className={s.resultCard}>
              <form onSubmit={this.handleSubmit}>

                {/* <div className={s.capt}></div> */}

                <table className={s.table}>
                  <thead>
                    <tr>
                      <th className={s.title} >Данные из сч./фактуры</th> 
                      <th></th>

                      <th className={s.title} >Расчётные данные</th> 
                      <th></th>
                      <th></th>
                      <th></th>

                    </tr>
                  </thead>
                  
                  <tbody>
                    <tr>
                      <td>Общая сумма:</td>
                      <td>
                        <input 
                          type="number"
                          name="allSum"
                          value={allSum}
                          onChange={this.handleOnChange}
                          />
                      </td>
                      <td>Общий трафик Мб (помегаб) рассчитанный:</td>
                      <td>
                        {}
                      </td>
                      <td>Общие затраты по трафику рассчитанные:</td>
                      <td>
                        {mbCostAll}
                      </td>
                    </tr>

                    <tr>
                      <td>За полосу:</td>
                      <td>
                        <input 
                          type="number"
                          name="spriteSum"
                          value={spriteSum}
                          onChange={this.handleOnChange}
                          />
                      </td>
                      <td>Общий трафик Мб (в полосе) рассчитанный:</td>
                      <td>
                        {spTrafficAll}
                      </td>
                      <td>Общие затраты по трафику рассчитанные:</td>
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
        </div>
        
      </>
    );
  };
};
