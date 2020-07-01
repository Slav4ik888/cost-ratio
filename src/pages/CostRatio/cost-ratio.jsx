import React from 'react';
// import s from './cost-ratio.module.css';
import Loader from '../../components/Loader/loader.js';
import Section from '../../components/Section/section.jsx';
import TextareaFromAltegra from '../../components/TextareaFromAltegra/textarea-from-altegra.jsx';
import BigTable from '../../components/BigTable/big-table.jsx';
import {ResultTabl} from '../../components/ResultTabl/result-table.jsx';
import {joinTraffic} from '../../utils/join-traffic.js';
import {makeResultForFinishTable} from '../../utils/make-result-for-finish-table.js';
import {makeBigArr, updateBigArr} from '../../utils/make-data-for-bigtable.js';

import {getGoogleSheet} from '../../utils/get-google-data.js';
import {ResultAnalisTabl} from '../../components/ResultAnalisTabl/result-analis-table.jsx';
import {Header} from '../../components/Header/header.jsx';


class CostRatio extends React.PureComponent {

  constructor (props) {
      super(props);
      this.handleSetArr = this.handleSetArr.bind(this); 
      this.handleChangeItem = this.handleChangeItem.bind(this);
      this.handleSetFactura = this.handleSetFactura.bind(this);
      this.handleArrForBigTable = this.handleArrForBigTable.bind(this);
      this.calcAnalisTabl = this.calcAnalisTabl.bind(this);
      this.calcFinishTabl = this.calcFinishTabl.bind(this);

      this.state = {
          isLoading: false,  // загрузились ли данные из service desk
          isMadeArr: false,  // получены данные от Алтегры
          arrFromAltegra: [], // созданный массив из полученных данных от Алтегры
          arrForBigTable: [], // большая сводная таблица (по SiteID)
          arrResult:[], // конечный массив (по Project)
          arrayOfProject: [], // данный загруженные с service desk

          mbSiteId: [], // массив помегабатного трафика
          striteSiteId: [],  // массив полосного трафика

          factura: {
              value: 779797.3,
              sprite: 205887.1,
              mb: '',
          }, // Данные со счёт-фактуры
          // isFactura: false, //Заполнены ли данные из сч/ф
          mbCostAll: 0,// Общие затраты по трафику рассчитанные + доп услуги
          spTrafficAll: 0,// Общий трафик в полосе
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

  // Рассчитываем данные для "Сводной таблицы"
  calcAnalisTabl = () => {
    const { arrayOfProject, factura, mbSiteId, striteSiteId } = this.state;
    const { mbCostAll, spTrafficAll, storage } = makeBigArr(mbSiteId, striteSiteId, arrayOfProject, factura);
    this.setState({
      mbCostAll: mbCostAll,
      spTrafficAll: spTrafficAll,
      arrForBigTable: storage,
    });
  }


  // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
  calcFinishTabl = () => {
    const {arrForBigTable} = this.state;
    const {lastBigStore, newStorage} = makeResultForFinishTable(arrForBigTable);
    this.setState({
      arrForBigTable: lastBigStore,
      arrResult: newStorage,
    });
  }

  

  // Принимаем массив текста Алтегры в стёйт добавляем полученный массив данных и обрабатываем его
  handleSetArr = arr => {
    setTimeout(() => {
      //  Объединяем входящий и исходящий трафик 
      const {arrNew, mbSiteId, striteSiteId} = joinTraffic(arr);
      this.setState({
          arrFromAltegra: arrNew,
          mbSiteId, striteSiteId,
          isMadeArr: true,
      });

      // Рассчитываем данные для "Сводной таблицы"
      this.calcAnalisTabl(); 
      // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
      this.calcFinishTabl(); 
        
    }, 0);
  }



  // Меняем значения по mbCostServicies и пересчитываем итоговые значения
  handleChangeItem(event) {
    const {arrForBigTable, factura} = this.state;
    let arr = arrForBigTable.concat();

    const target = event.target;
    console.log('target.name: ', target.name);
    const id = target.id;
    let value;

    switch (target.name) {
      case 'siteID':
        value = target.value;
        arr[id].siteID = value;
        break;

      case 'project':
        value = target.value;
        arr[id].project = value;
        break;

      case 'organization':
        value = target.value;
        arr[id].organization = value;
        break;

      case 'mbCostServicies':
        value = +target.value;
        arr[id].mbCostServicies = value;
        break;
  
      default: break;
    };

    // Рассчитываем данные для "Сводной таблицы"
    const storage = updateBigArr(arr, factura);

    // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
    const { newStorage } = makeResultForFinishTable(storage);

    this.setState({
        arrForBigTable: storage,
        arrResult: newStorage,
    });
  }
  
  // Присвоение значений сч/фактуры
  handleSetFactura(factura) {
    setTimeout(() => {
      this.setState(() => ({
        factura,
        // isFactura: true,
      }));

      // Рассчитываем данные для "Сводной таблицы"
      this.calcAnalisTabl(); 
      // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
      this.calcFinishTabl(); 
    }, 0);

  }


  // Меняем arrForBigTable на отсортированный/изменённый массив
  handleArrForBigTable(newArr) {
    this.setState({
      arrForBigTable: newArr,
    })
  }
  
  render() {
    const { isLoading, isMadeArr,
            arrForBigTable, factura,
            // mbSiteId, striteSiteId, 
            arrResult, 
            // sortType, sortField, row
    } = this.state;

    if (!isLoading) {
      return <Loader />
    }

    return (
      <>
        <Section>
          <Header factura={factura} onSetFactura={this.handleSetFactura}/>
        </Section>
        

        {!isMadeArr && 
          <Section>
            <TextareaFromAltegra onHandleSetArr={this.handleSetArr}/>
          </Section>
        }

        {/* формируем таблицы и выводим Помегабайтный и Полосной */}
        {/* {isMadeArr && 
          <Section>
            <TwoServicies arrThMb={mbSiteId} arrThSprite={striteSiteId}/>
          </Section>
        } */}

        {/* формируем таблицы и выводим Большую таблицу */}
        {isMadeArr && 
            <BigTable arr={arrForBigTable} 
                onChangeItem={this.handleChangeItem}
                onHandleArrForBigTable={this.handleArrForBigTable}
            />
        }
        {/* выводим нажатую строчку */}
        {
            // isMadeArr &&
            // row ? 
            // <Section> 
            //     <DetailRowView company={row} /> 
            // </Section>
            // : null
        }
        
        {/* формируем таблицы и выводим Итоговую таблицу для анализа */}
        {isMadeArr &&
            <Section>
                <ResultAnalisTabl arr={arrResult}/>
            </Section>
        }

        {/* формируем таблицы и выводим Итоговую таблицу для 1С */}
        {isMadeArr &&
            <Section>
                <ResultTabl arr={arrResult}/>
            </Section>
        }
      </>
    )
  }
}


export default CostRatio;