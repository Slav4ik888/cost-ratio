import React from 'react';
import s from './cost-ratio.module.css';
// import cl from 'classnames';

import Section from '../../components/Section/section.jsx';
import TextareaFromAltegra from '../../components/TextareaFromAltegra/textarea-from-altegra.jsx';
import TwoServicies from '../../components/TwoServicies/two-servicies.jsx';



class CostRatio extends React.PureComponent {

    constructor (props) {
        super(props);
        this.handleSetArr = this.handleSetArr.bind(this);
    
        this.state = {
            isMadeArr: false,  // получены данные от Алтегры
            arrFromAltegra: [], // созданный массив из полученных данных от Алтегры
        };
    }

    /************************************************/
    /*    Объединяем входящий и исходящий трафик    */
    /************************************************/

    joinTraffic = arr => {
        // let {arr} = this.state.arrFromAltegra;
        let arrNew = [];
        let sum = 0;
        let obj = {};
      
        for(let i=0; i<arr.length; i++) {
            sum = +arr[i].trafficMb; // начальное значение
    
            // если уже обработали этот siteID, то пропускаем
            if (!arrNew.find( item => item.siteID == arr[i].siteID) ) {
                for(let j=i+1; j<arr.length; j++) {
                    if (arr[i].siteID === arr[j].siteID) sum += +arr[j].trafficMb;
                }
                obj = arr[i];
                obj.trafficMb = sum.toFixed(2);
                arrNew.push(obj);
                obj = {};
            }
        }
    
        this.setState({
            arrFromAltegra: arrNew,
        });
    }

    // В стёйт добавляем полученный массив данных
    handleSetArr = arr => {
        this.setState({
            isMadeArr: true,
        });
        this.joinTraffic(arr);
    }

    render() {
        const {isMadeArr, arrFromAltegra} = this.state;

        return (
            <>
                {!isMadeArr && 
                    <Section>
                        <TextareaFromAltegra onHandleSetArr={this.handleSetArr}/>
                    </Section>
                }

                {/* формируем таблицы и выводим Помегабайтный и Полосной */}
                {isMadeArr && 
                    <Section>
                        <TwoServicies arr={arrFromAltegra}/>
                    </Section>
                }
            </>
        )
    }
}

export default CostRatio;