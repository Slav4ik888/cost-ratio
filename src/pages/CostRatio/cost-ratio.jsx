import React from 'react';
// import s from './cost-ratio.module.css';
import Loader from '../../components/Loader/loader.js';
import Section from '../../components/Section/section.jsx';
import TextareaFromAltegra from '../../components/TextareaFromAltegra/textarea-from-altegra.jsx';
import BigTable from '../../components/BigTable/big-table.jsx';
import {ResultTabl} from '../../components/ResultTabl/result-table.jsx';
import {joinTraffic, returnArrMb, returnArrSprite} from '../../utils/data-processing-from-alterga.js';
import {makeResultForFinishTable} from '../../utils/make-result-for-finish-table.js';
import {pushArrBmAndStriteTraffic, calcMbCostAll, calcSpTrafficAll,
  makeDataForBigTable, updateBigArr, makeDataFromGoogle} from '../../utils/make-data-for-bigtable.js';

import {getFromGoogleData} from '../../utils/get-from-google-data.js';
import ResultAnalisTabl from '../../components/ResultAnalisTabl/result-analis-table.jsx';
import {Header} from '../../components/Header/header.jsx';



class CostRatio extends React.PureComponent {

  constructor (props) {
      super(props);
      this.getArrFromGoogle = this.getArrFromGoogle.bind(this);
      this.handleUpdateFromGoogle = this.handleUpdateFromGoogle.bind(this);
      this.handleSetArr = this.handleSetArr.bind(this); 
      this.handleUpdateBigArr = this.handleUpdateBigArr.bind(this);
      this.handleSetFactura = this.handleSetFactura.bind(this);
      this.calcAnalisTabl = this.calcAnalisTabl.bind(this);
      this.calcFinishTabl = this.calcFinishTabl.bind(this);

      this.state = {
          isLoading: false,  // загрузились данные из Google - service desk
          isMadeArr: false,  // получены данные от Алтегры

          arrFromAltegra: [], // созданный массив из полученных данных от Алтегры
          arrayOfProject: [], // загруженны массив с service desk
          arrForBigTable: [], // массив для "Сводной таблицы" (по SiteID)
          arrResult:[], // конечный массив (по Project)

          mbSiteId: [], // массив помегабатного трафика
          striteSiteId: [],  // массив полосного трафика

          mbPrice: 0.132, // Базовая стоимость Мб

          factura: { // Данные со счёт-фактуры
            value: 779797.3,
            sprite: 205887.1,
            mb: 573910.2,
            // value: '', //779797.3,
            // sprite: '', // 205887.1,
            // mb: '', // 573910.2,
          }, 
          // isFactura: false, //Заполнены ли данные из сч/ф
          mbCostAll: 0,// Общие затраты по трафику рассчитанные + доп услуги
          spTrafficAll: 0,// Общий трафик в полосе
      };
  }


  componentDidMount() {
    this.getArrFromGoogle();
  }

  // Читаем данные из Гугл
  async getArrFromGoogle() {
    const url = process.env.REACT_APP_GOOGLE_SHEET_URL_OLD;
    const arrayOfProject = await getFromGoogleData(url);
    this.setState({
      arrayOfProject,
      isLoading: true,
    });
  };

  // Обновляем все данные при повторном запроосе к Google 
  async handleUpdateFromGoogle(arr) {
    console.log(`updateFromGoogle`);
    // Выставляем загрузку
    this.setState({
      isLoading: false,
    });
    await this.getArrFromGoogle();

    this.setState({
      arrForBigTable: makeDataFromGoogle(arr, this.state.arrayOfProject),
    });
    

    // this.handleUpdateBigArr(arr);

  }


  /**
   * Принимаем массив из обработанной таблицы от Алтегры
   * Объединяем входящий и исходящий трафик 
   *
   * @param {array} arr - массив из обработанной таблицы от Алтегры
   * 
   * @return {array} arrFromAltegra  
   */

  handleSetArr = arrFromAltegra => {
    setTimeout(() => {
      arrFromAltegra = joinTraffic(arrFromAltegra);
      const mbSiteId = returnArrMb(arrFromAltegra);
      const striteSiteId = returnArrSprite(arrFromAltegra);

      this.setState({
        arrFromAltegra, mbSiteId, striteSiteId,
        isMadeArr: true,
      });

      // Рассчитываем данные для "Сводной таблицы"
      this.calcAnalisTabl(); 
      // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
      this.calcFinishTabl(); 
        
    }, 0);
  };

// Первоначально рассчитываем данные для "Сводной таблицы"
calcAnalisTabl = () => {
  const { arrayOfProject, factura, mbSiteId, striteSiteId, mbPrice } = this.state;

  // Первоначальное наполнение пустого массива данными по трафику Мб и полосному
  const arr = pushArrBmAndStriteTraffic(mbSiteId, striteSiteId, mbPrice);

  // Подсчёт общих затрат по Мб трафику + сч/ф
  const {mbCostAll} = calcMbCostAll(arr);
  console.log('Общие затраты по трафику рассчитанные: ', mbCostAll);

  // Подсчёт общего трафика полосы
  const {spTrafficAll} = calcSpTrafficAll(arr);
  console.log('Общий трафик в полосе рассчитанный: ', spTrafficAll);

  let {arrForBigTable} = makeDataForBigTable(arr, factura, mbCostAll, spTrafficAll);

  // Обновляем данными из Гугл
  arrForBigTable = makeDataFromGoogle(arrForBigTable, arrayOfProject);

  this.setState({
    mbCostAll,
    spTrafficAll,
    arrForBigTable,
  });
};


// Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
calcFinishTabl = () => {
  const {arrForBigTable} = this.state;
  const {lastBigStore, newStorage} = makeResultForFinishTable(arrForBigTable);
  this.setState({
    arrForBigTable: lastBigStore,
    arrResult: newStorage,
  });
};

  // Меняем значения на пришедшие из таблицы и пересчитываем итоговые значения
  handleUpdateBigArr(arr) {
    const {factura} = this.state;

    // Обновляем "Сводную таблицу"  обновлёнными значениями из данных сч/ф mbCostServicies - пересчитываем
    const storage = updateBigArr(arr, factura);

    // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
    const { newStorage } = makeResultForFinishTable(storage);

    this.setState({
        arrForBigTable: storage,
        arrResult: newStorage,
    });
  };
  
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

  
  render() {
    const { isLoading, isMadeArr,
            arrForBigTable, factura,
            arrayOfProject,
            // mbSiteId, striteSiteId, 
            mbCostAll, spTrafficAll,
            arrResult, 
    } = this.state;

    if (!isLoading) {
      return <Loader />
    }

    return (
      <>
        <Section>
          <Header
            factura={factura}
            onSetFactura={this.handleSetFactura}
            mbCostAll={mbCostAll}
            spTrafficAll={spTrafficAll}
          />
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
            <BigTable
              arr={arrForBigTable} 
              onHandleUpdateBigArr={this.handleUpdateBigArr}
              arrayOfProject={arrayOfProject}
              onHandleUpdateFromGoogle={this.handleUpdateFromGoogle}
            />
        }
        
        
        {/* формируем таблицы и выводим Итоговую таблицу для анализа */}
        {isMadeArr &&
            <Section>
                <ResultAnalisTabl
                  arr={arrResult}
                  arrBig={arrForBigTable}/>
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