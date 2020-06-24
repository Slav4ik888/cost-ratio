import React from 'react';
import s from './cost-ratio.module.css';
// import cl from 'classnames';

import Section from '../../components/Section/section.jsx';
import TextareaFromAltegra from '../../components/TextareaFromAltegra/textarea-from-altegra.jsx';
import TwoServicies from '../../components/TwoServicies/two-servicies.jsx';
import BigTable from '../../components/BigTable/big-table.jsx';
import {makeResultForFinishTable} from '../../utils/make-result-for-finish-table.js';


import ResultTabl from '../../components/ResultTabl/result-table.jsx';
import {getGoogleSheet} from '../../utils/get-google-data.js';

import getFromGoogleSheet from '../../components/getFromGoogleSheet/get-from-google-sheet.jsx';
import FromGoogleSheet from '../../components/FromGoogleSheet/from-google-sheet.jsx';


// import arrayOfProject from '../../mocks/company-project.js';



class CostRatio extends React.PureComponent {

    constructor (props) {
        super(props);
        this.handleSetArr = this.handleSetArr.bind(this); 
        this.joinTraffic = this.joinTraffic.bind(this); // Объединяет трафик
        this.returnArrMb = this.returnArrMb.bind(this); // Возвращает массив помегабайтного
        this.returnArrSprite = this.returnArrSprite.bind(this); // Возвращает массив полосной
        this.makeBigArr = this.makeBigArr.bind(this); // Подготавливаем данные для большой таблицы
        
    
        this.state = {
            isMadeArr: false,  // получены данные от Алтегры
            arrFromAltegra: [], // созданный массив из полученных данных от Алтегры
            arrForBigTable: [], // большая сводная таблица
            arrResult:[], // конечная таблица для загрузки в 1С
            arrayOfProject: [], // данный загруженные с service desk

            mbSiteId: [], //
            striteSiteId: [], 

            factura: {}, // Данные со счёт-фактуры
            mbCostAll: 0,// Общие затраты по трафику рассчитанные
            spTrafficAll: 0,// Общий трафик в полосе
        };
    }


    /************************************************/
    /*    Объединяем входящий и исходящий трафик    */
    /************************************************/

    joinTraffic(arr) {
        
        let arrNew = [];
        let sum = 0;
        let obj = {};
      
        for(let i=0; i<arr.length; i++) {
            sum = +arr[i].trafficMb; // начальное значение
            // если уже обработали этот siteID, то пропускаем
            if (!arrNew.find( item => item.siteID === arr[i].siteID) ) {
                for(let j=i+1; j<arr.length; j++) {
                    if (arr[i].siteID === arr[j].siteID) sum += +arr[j].trafficMb;
                }
                obj = arr[i];
                obj.trafficMb = sum.toFixed(2);
                arrNew.push(obj);
                obj = {};
            }
        }

        this.returnArrMb(arrNew); // Возвращает массив помегабайтного
        this.returnArrSprite(arrNew); // Возвращает массив полосной

        this.setState({
            arrFromAltegra: arrNew,
        });
    }

    
    // Возвращает массив помегабайтного
    returnArrMb = arr => {
        let newArr = [];
        for(let item of arr) {
                if (!item.siteID.endsWith("-2") ) newArr.push(item);
        }
        this.setState({
            mbSiteId: newArr,
        }); 
    }


    // Возвращает массив полосной
    returnArrSprite = arr => {
        let newArr = [];
        for(let item of arr) {
                if (item.siteID.endsWith("-2") ) {
                        item.siteID = item.siteID.slice(0,-2);
                        newArr.push(item);
                }
        }
        this.setState({
            striteSiteId: newArr,
        }); 
    }



    /************************************************/
    /*   Подготавливаем данные для большой таблицы  */
    /************************************************/

    makeBigArr() {
        const {mbSiteId, striteSiteId, arrayOfProject} = this.state;

        let storage = [];
        let objSiteID = {};

        // Заполняем основной массив данными по трафику вне полосы
        for(let st of mbSiteId) {
            objSiteID = {};
            objSiteID.siteID = st.siteID;
            objSiteID.project = '';
            objSiteID.organization = '';
            objSiteID.mbPrice = 0.132;
            objSiteID.mbCostServicies = '';
            objSiteID.mbTraffic = st.trafficMb;
            objSiteID.mbCostTraffic = (objSiteID.mbTraffic * objSiteID.mbPrice);
            objSiteID.mbCostCorrect = '';

            objSiteID.spTraffic = '';
            objSiteID.spCostTraffic = '';
            objSiteID.result = '';

            storage.push(objSiteID);
        }

        // Заполняем данными по трафику в полосе
        for(let st of striteSiteId) {
            objSiteID = {};
            let result = storage.find( obj => obj.siteID === st.siteID);
            if (result) {
                result.spTraffic = st.trafficMb;
            } else {
                objSiteID = {};
                objSiteID.siteID = st.siteID;
                objSiteID.project = '';
                objSiteID.organization = '';
                objSiteID.mbPrice = 0.132;
                objSiteID.mbCostServicies = '';
                objSiteID.mbTraffic = '';
                objSiteID.mbCostTraffic = '';
                objSiteID.mbCostCorrect = '';
                objSiteID.spTraffic = st.trafficMb;
                objSiteID.spCostTraffic = '';
                objSiteID.result = '';

                storage.push(objSiteID);
                
            }
        }


        // Присваиваем данные из сч/фактуры
        let factura = {};
        factura.value = 779797.36;
        console.log('Со сч/ф value: ', factura.value);
        factura.sprite = 205887.1;
        console.log('Со сч/ф sprite: ', factura.sprite);
        factura.mb = factura.value - factura.sprite;
        console.log('Со сч/ф mb: ', factura.mb);

        // Подсчёт общих затрат по Мб трафику 
        let mbCostAll = 0;
        for(let stantion of storage) {
            mbCostAll += +stantion.mbCostTraffic;
        };
        console.log('Общие затраты по трафику рассчитанные: ', mbCostAll.toFixed(2));


        // Подсчёт общего трафика полосы
        let spTrafficAll = 0;
        for(let stantion of storage) {
            spTrafficAll += +stantion.spTraffic;
        };
        console.log('Общий трафик в полосе рассчитанный: ', spTrafficAll.toFixed(2));



        // Рассчитываем Затраты скорректированные
        for(let obj of storage) {
            if (obj.mbCostTraffic / mbCostAll * factura.mb) {
                obj.mbCostCorrect = (obj.mbCostTraffic / mbCostAll * factura.mb).toFixed(2);
            }
        }

        // Стоимость пропорционально общей сумме затрат за полосу
        for(let obj of storage) {
            if (obj.spTraffic / spTrafficAll * factura.sprite) {
                obj.spCostTraffic = (obj.spTraffic / spTrafficAll * factura.sprite).toFixed(2);
            }
        }
        
        // Итоговые затраты
        for(let obj of storage) {
            obj.result = (+obj.spCostTraffic + +obj.mbCostCorrect).toFixed(2);
        }

        // siteId в arrayOfProject (Это данные по организациям и проектам)
        // console.log('arrayOfProject: ', arrayOfProject);
        console.log('storage: ', storage);
        if (arrayOfProject) {
            console.log('arrayOfProject: ', arrayOfProject);
            for(let item of storage) {
                
                

                let result = arrayOfProject.find( it => it.siteID === item.siteID);
                console.log('result: ', result);
                
                
                if (result) {
                    item.project = result.project;
                    item.organization = result.organization;
                }
            }
        }
        // console.log('storage: ', storage);
        
        this.setState({
            factura: factura,
            mbCostAll: mbCostAll.toFixed(2),
            spTrafficAll: spTrafficAll.toFixed(2),
            arrForBigTable: storage,
            
        });
    }


    // В стёйт добавляем полученный массив данных и обрабатываем его
    handleSetArr = arr => {
        
        const arrFetch = getGoogleSheet();
        
        this.setState({
            arrayOfProject: arrFetch,
        });

        setTimeout(()=> this.joinTraffic(arr), 100);

        setTimeout(()=> this.makeBigArr(), 100);

        setTimeout(()=> {
            const {lastBigStore, newStorage} = makeResultForFinishTable(this.state.arrForBigTable);
        
            this.setState({
                arrForBigTable: lastBigStore,
                arrResult: newStorage,
            });
        }, 100);

        this.setState({
            isMadeArr: true,
        });
                
    }




    render() {
        const {isMadeArr, arrForBigTable, mbSiteId, striteSiteId, arrResult} = this.state;

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
                        <TwoServicies arrThMb={mbSiteId} arrThSprite={striteSiteId}/>
                    </Section>
                }

                {/* формируем таблицы и выводим Большую таблицу */}
                {isMadeArr && 
                    <BigTable arr={arrForBigTable}/>
                }

                {/* формируем таблицы и выводим Большую таблицу */}
                {isMadeArr && 
                    <Section>
                        <ResultTabl arr={arrResult}/>
                    </Section>
                }

                {/* данные из гугл */}
                {/* {isMadeArr && 
                    <FromGoogleSheet/>
                } */}
            </>
        )
    }
}


export default CostRatio;