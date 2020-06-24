import React from 'react';
import s from './cost-ratio.module.css';
// import cl from 'classnames';

import Section from '../../components/Section/section.jsx';
import TextareaFromAltegra from '../../components/TextareaFromAltegra/textarea-from-altegra.jsx';
import TwoServicies from '../../components/TwoServicies/two-servicies.jsx';
import BigTable from '../../components/BigTable/big-table.jsx';
import ResultTabl from '../../components/ResultTabl/result-table.jsx';
import {joinTraffic} from '../../utils/join-traffic.js';
import {makeResultForFinishTable} from '../../utils/make-result-for-finish-table.js';
import {makeBigArr} from '../../utils/make-data-for-bigtable.js';
import getFromGoogleSheet from '../../components/getFromGoogleSheet/get-from-google-sheet.jsx';
import FromGoogleSheet from '../../components/FromGoogleSheet/from-google-sheet.jsx';
import arrFromAltegra from '../../mocks/arr-from-altegra';


// import arrayOfProject from '../../mocks/company-project.js';


class CostRatio extends React.PureComponent {

    constructor (props) {
        super(props);
        this.handleSetArr = this.handleSetArr.bind(this); 
    
        this.state = {
            isMadeArr: false,  // получены данные от Алтегры
            arrFromAltegra: [], // созданный массив из полученных данных от Алтегры
            arrForBigTable: [], // большая сводная таблица
            arrResult:[], // конечная таблица для загрузки в 1С
            arrayOfProject: [], // данный загруженные с service desk

            mbSiteId: [], // массив помегабатного трафика
            striteSiteId: [],  // массив полосного трафика

            factura: {}, // Данные со счёт-фактуры
            mbCostAll: 0,// Общие затраты по трафику рассчитанные
            spTrafficAll: 0,// Общий трафик в полосе
        };
    }

    // Принимаем массив текста В стёйт добавляем полученный массив данных и обрабатываем его
    handleSetArr = arr => {

        // Читаем данные из Гугл
        let url = "https://script.google.com/macros/s/AKfycbxX_iYuZt9Qco482UepKO4l3ZnRgPv88Zq4ZHFUEGhTmqJKCt0/exec";
        
        let arrFetch = [];
        let obj = {};
        let json = '';

        fetch(url)
            .then(response => {
                return json = response.json();
                })
                .then( res => {

                    for(let item of res.result) {
                        obj.siteID = item[0];
                        obj.siteID = obj.siteID.split(' ').join('');
                        obj.project = item[2];
                        obj.organization = item[1];
                        arrFetch.push(obj);
                        
                        obj = {};
                    }

                    this.setState({
                        arrayOfProject: arrFetch,
                    });
            

                    //  Объединяем входящий и исходящий трафик 
                    const {arrNew, mbSiteId, striteSiteId} = joinTraffic(arr);
                    this.setState({
                        arrFromAltegra: arrNew,
                        mbSiteId, striteSiteId
                    });


                    // Рассчитываем данные для "Сводной таблицы"
                    setTimeout(() => {
                        const {mbSiteId, striteSiteId, arrayOfProject} = this.state;
                        const {factura, mbCostAll, spTrafficAll, storage} = makeBigArr(mbSiteId, striteSiteId, arrayOfProject);
                        this.setState({
                            factura: factura,
                            mbCostAll: mbCostAll,
                            spTrafficAll: spTrafficAll,
                            arrForBigTable: storage,
                            
                        });
                    }, 100);

                    // Рассчитываем данные для "Итоговой таблицы"
                    setTimeout(() => {
                        const {arrForBigTable} = this.state;
                        const {lastBigStore, newStorage} = makeResultForFinishTable(arrForBigTable);
                        this.setState({
                            arrForBigTable: lastBigStore,
                            arrResult: newStorage,
                            isMadeArr: true,
                        });
                    }, 100);
                })
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