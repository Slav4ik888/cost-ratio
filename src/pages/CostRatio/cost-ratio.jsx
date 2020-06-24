import React from 'react';
import s from './cost-ratio.module.css';
// import cl from 'classnames';
import Loader from '../../components/Loader/loader.js';
import Section from '../../components/Section/section.jsx';
import TextareaFromAltegra from '../../components/TextareaFromAltegra/textarea-from-altegra.jsx';
import TwoServicies from '../../components/TwoServicies/two-servicies.jsx';
import BigTable from '../../components/BigTable/big-table.jsx';
import {ResultTabl} from '../../components/ResultTabl/result-table.jsx';
import {joinTraffic} from '../../utils/join-traffic.js';
import {makeResultForFinishTable} from '../../utils/make-result-for-finish-table.js';
import {makeBigArr} from '../../utils/make-data-for-bigtable.js';
import {TITLE_BIG_TABLE, TITLE_BIG_TABLE_VALUE} from '../../consts/consts.js';
import {getTitle} from '../../utils/get-title.js';
import {DetailRowView} from '../../components/DetailRowView/detail-row-view.jsx';

import {getGoogleSheet} from '../../utils/get-google-data.js';
// import getFromGoogleSheet from '../../components/getFromGoogleSheet/get-from-google-sheet.jsx';
// import FromGoogleSheet from '../../components/FromGoogleSheet/from-google-sheet.jsx';
// import arrFromAltegra from '../../mocks/arr-from-altegra';

import _ from 'lodash';

// import arrayOfProject from '../../mocks/company-project.js';


class CostRatio extends React.PureComponent {

    constructor (props) {
        super(props);
        this.handleSetArr = this.handleSetArr.bind(this); 
        this.onRowSelect = this.onRowSelect.bind(this); 
        this.onSortBigTabl = this.onSortBigTabl.bind(this); 

    
        this.state = {
            isLoading: false,  // загрузились ли данные из service desk
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

            sortType: 'asc',  // 'desc'
            sortField: 'siteID', // поле по умолчанию
            row: null, // нажатая выбранная строка
        };
    }

    async componentDidMount() {
        // Читаем данные из Гугл
        const url = process.env.REACT_APP_GOOGLE_SHEET_URL_OLD;
        const arrayOfProject = await getGoogleSheet(url);

        this.setState({
            arrayOfProject,
            isLoading: true,
        });
    }

    // Принимаем массив текста В стёйт добавляем полученный массив данных и обрабатываем его
    handleSetArr = arr => {
        
        //  Объединяем входящий и исходящий трафик 
        setTimeout(() => {
            const {arrNew, mbSiteId, striteSiteId} = joinTraffic(arr);
            this.setState({
                arrFromAltegra: arrNew,
                mbSiteId, striteSiteId
            });

            // Рассчитываем данные для "Сводной таблицы"
            const {arrayOfProject} = this.state;
            const {factura, mbCostAll, spTrafficAll, storage} = makeBigArr(mbSiteId, striteSiteId, arrayOfProject);
            // console.log('storage: ', storage);
            this.setState({
                factura: factura,
                mbCostAll: mbCostAll,
                spTrafficAll: spTrafficAll,
                arrForBigTable: storage,
                
            });

            // Рассчитываем данные для "Итоговой таблицы"
            const {arrForBigTable, sortType, sortField} = this.state;
            const {lastBigStore, newStorage} = makeResultForFinishTable(arrForBigTable);
            // console.log('lastBigStore: ', lastBigStore);
            this.setState({
                arrForBigTable: _.orderBy(lastBigStore, sortField, sortType),
                arrResult: newStorage,
                isMadeArr: true,
            });
        }, 0);
    }


    // Устанавливаем выбранную строку
    onRowSelect = row => {
        console.log(row);
        this.setState({row});
    }

    // Сортировка "Сводной таблицы"
    onSortBigTabl = sortField => {
        const {sortType, arrForBigTable} = this.state;
        sortField = getTitle(sortField.item, TITLE_BIG_TABLE, TITLE_BIG_TABLE_VALUE);
        console.log(sortField);

        const cloneData = arrForBigTable.concat();
        // Проверяем что у нас сейчас в сортировке
        const sortT = sortType === 'asc' ? 'desc' : 'asc';
        // Сортируем
        const orderedData = _.orderBy(cloneData, sortField, sortT);

        this.setState({
            arrForBigTable: orderedData,
            sortType: sortT,
            sortField: sortField,
          })
    }

    render() {
        const {isLoading, isMadeArr, 
            arrForBigTable, 
            mbSiteId, striteSiteId, arrResult, 
            sortType, sortField, row
        } = this.state;

        if (!isLoading) {
            return <Loader />
        }

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
                    <BigTable arr={arrForBigTable} 
                        onSort={this.onSortBigTabl}
                        sortType={sortType}
                        sortField={sortField}
                        onRowSelect={this.onRowSelect}
                    />
                }
                {/* выводим нажатую строчку */}
                {
                    
                    row ? 
                    <Section> 
                        <DetailRowView company={row} /> 
                    </Section>
                    : null
                }

                {/* формируем таблицы и выводим Итоговую таблицу */}
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