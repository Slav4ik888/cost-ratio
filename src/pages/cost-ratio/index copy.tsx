import React from 'react';
import { Section } from 'shared/ui/section';
import {TextareaFromAltegra} from '../../features/textarea-from-altegra';
import {BigTable} from '../../widgets/big-table';
import { ResultTabl } from '../../widgets/result-tabl';
import { makeResultForFinishTable, changePointToComma } from '../../utils/make-result-for-finish-table';
import { pushArrBmAndStriteTraffic, calcMbCostAll, calcSpTrafficAll,
  makeDataForBigTable, makeDataFromGoogle } from '../../utils/make-data-for-bigtable';
import { getFromGoogleData } from '../../entities/service-desk/model/services/get-service-desk-data/get-from-google-data';
import ResultAnalisTabl from '../../components/ResultAnalisTabl';
import { FacturaData } from 'widgets/factura-data';
import { cfg } from 'app/config';
import { PageLoader } from 'widgets/page-loader';
import { AltergaItem } from 'entities/altegra';
import { joinTraffic, returnArrMb, returnArrSprite } from 'features/textarea-from-altegra/utils/data-processing-from-alterga';



class CostRatio extends React.PureComponent {

  // @ts-ignore
  constructor (props) {
    super(props);
    // this.getArrFromGoogle = this.getArrFromGoogle.bind(this);
    this.handleUpdateFromGoogle = this.handleUpdateFromGoogle.bind(this);
    this.handleSetArr = this.handleSetArr.bind(this);
    this.handleUpdateBigArr = this.handleUpdateBigArr.bind(this);
    this.handleSetFactura = this.handleSetFactura.bind(this);
    // this.calcBigTabl = this.calcBigTabl.bind(this);
    // this.calcFinishTabl = this.calcFinishTabl.bind(this);

    this.state = {
      isLoading: false,
      isMadeArr: false,   // получены данные от Алтегры

      arrFromAltegra: [], // созданный массив из полученных данных от Алтегры
      // arrayOfProject: [], // загруженны массив с service desk
      arrForBigTable: [], // массив для "Сводной таблицы" (по SiteID)
      arrResult:[], // конечный массив (по Project)

      mbSiteId: [], // массив помегабатного трафика
      striteSiteId: [],  // массив полосного трафика

      mbPrice: 0.132, // Базовая стоимость Мб

      factura: { // Данные со счёт-фактуры
        // value: 779797.3,
        // sprite: 205887.1,
        // mb: 573910.2,
        value: '', //779797.3,
        sprite: '', // 205887.1,
        mb: '', // 573910.2,
      },
      // isFactura: false, //Заполнены ли данные из сч/ф
      mbCostAll: 0,// Общие затраты по трафику рассчитанные + доп услуги
      spTrafficAll: 0,// Общий трафик в полосе
    };
  }



  // componentDidMount() {
  //   this.setState({ isLoading: true });
  //   this.getArrFromGoogle();
  // }



  // Читаем данные из Гугл
  // async getArrFromGoogle() {
  //   const fromLS = JSON.parse(localStorage.getItem('arrayOfProject') || '');
  //   let arrayOfProject = [];
    
  //   if (cfg.IS_DEV) {
  //     console.log('fromLS: ');
  //     console.log(fromLS);
  //     arrayOfProject = fromLS || [];
  //   }
  //   else {
  //     const url = process.env.REACT_APP_GOOGLE_SHEET_URL || '';
  //     arrayOfProject = await getFromGoogleData(url);
      
  //     console.log(arrayOfProject);
  //     localStorage.setItem('arrayOfProject', JSON.stringify(arrayOfProject));
  //   }
    
  //   this.setState({
  //     arrayOfProject,
  //     isLoading: false, // Убираем "загрузку"
  //   });
  // };



  // Обновляем все данные при повторном запроосе к Google
  async handleUpdateFromGoogle(arr: any[]) {
    this.setState({
      isLoading: true, // Выставляем "загрузку"
    });

    // await this.getArrFromGoogle()
    //   .then(() => {
    //     // @ts-ignore
    //     let newArrForBigTable = makeDataFromGoogle(arr, this.state.arrayOfProject);
    //     this.handleUpdateBigArr(newArrForBigTable);
    //   });
  }


  /**
   * Принимаем массив из обработанной таблицы от Алтегры
   * Объединяем входящий и исходящий трафик
   * @param {AltergaItem[]} arr - массив из обработанной таблицы от Алтегры
   */

  handleSetArr = (arrFromAltegra: AltergaItem[]) => {
    setTimeout(() => {
      const arrFromAltegraTransformed = joinTraffic(arrFromAltegra);
      const mbSiteId = returnArrMb(arrFromAltegraTransformed);
      const striteSiteId = returnArrSprite(arrFromAltegraTransformed);

      // Рассчитываем данные для "Сводной таблицы"
      // @ts-ignore
      const { arrayOfProject, factura, mbPrice } = this.state;

      // Первоначальное наполнение пустого массива данными по трафику Мб и полосному
      const arr = pushArrBmAndStriteTraffic(mbSiteId, striteSiteId, mbPrice);

      // Подсчёт общих затрат по Мб трафику + сч/ф
      const mbCostAll = calcMbCostAll(arr);
      //

      // Подсчёт общего трафика полосы
      const spTrafficAll = calcSpTrafficAll(arr);
      //

      // Рассчитываем Затраты скорректированные
      let { newArrForBigTable } = makeDataForBigTable(arr, factura, mbCostAll, spTrafficAll);

      // Обновляем arrForBigTable, данными из массива от Гугл
      // console.log('!!!arrayOfProject: ', arrayOfProject);
      
      newArrForBigTable = makeDataFromGoogle(newArrForBigTable, arrayOfProject);

      this.setState({
        arrFromAltegra: arrFromAltegraTransformed,
        mbSiteId,
        striteSiteId,
        isMadeArr: true,
        mbCostAll,
        spTrafficAll,
      });


      // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
      const {arrResult} = makeResultForFinishTable(newArrForBigTable);

      // Меняем точку на запятую в итоговой ячейке "Сводной таблицы"
      const lastBigStore = changePointToComma(newArrForBigTable, 'result');

      this.setState({
        arrForBigTable: lastBigStore,
        arrResult,
      });
    }, 100);
  };



  // Меняем значения на пришедшие из таблицы и пересчитываем итоговые значения
  handleUpdateBigArr(arr: any[]) {
  // @ts-ignore
    const {factura, spTrafficAll} = this.state;

    // Обновляем "Сводную таблицу"  обновлёнными значениями из данных сч/ф mbCostServicies - пересчитываем
    let mbCostAll = calcMbCostAll(arr);
    // Рассчитываем Затраты скорректированные
    let {newArrForBigTable} = makeDataForBigTable(arr, factura, mbCostAll, spTrafficAll);

    // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
    const { arrResult } = makeResultForFinishTable(newArrForBigTable);

    // Меняем точку на запятую в итоговой ячейке "Сводной таблицы"
    const lastBigStore = changePointToComma(newArrForBigTable, `result`);

    this.setState({
        arrForBigTable: lastBigStore,
        mbCostAll,
        arrResult,
    });
  };

  // Присвоение значений сч/фактуры
  handleSetFactura(factura: any) {
    setTimeout(() => {
  // @ts-ignore
      const {arrForBigTable, arrayOfProject} = this.state;
      // Рассчитываем данные для "Сводной таблицы"

      // Подсчёт общих затрат по Мб трафику + сч/ф
      const mbCostAll = calcMbCostAll(arrForBigTable);
      // Подсчёт общего трафика полосы
      const spTrafficAll = calcSpTrafficAll(arrForBigTable);

      // Рассчитываем Затраты скорректированные
      let {newArrForBigTable} = makeDataForBigTable(arrForBigTable, factura, mbCostAll, spTrafficAll);

      // Обновляем newArrForBigTable, данными из массива от Гугл
      newArrForBigTable = makeDataFromGoogle(newArrForBigTable, arrayOfProject);

      this.setState({
        arrForBigTable: newArrForBigTable,
        isMadeArr: true,
        mbCostAll,
        spTrafficAll,
        factura,
      });


      // Рассчитываем данные для "Итоговой таблицы Анализа и 1C"
      const {arrResult} = makeResultForFinishTable(arrForBigTable);

      // Меняем точку на запятую в итоговой ячейке "Сводной таблицы"
      const lastBigStore = changePointToComma(arrForBigTable, `result`);

      this.setState({
        arrForBigTable: lastBigStore,
        arrResult,
      });
    }, 0);
  }


  render() {
  // @ts-ignore
    const { isLoading, isMadeArr,
  // @ts-ignore
            arrForBigTable, factura,
  // @ts-ignore
            arrayOfProject,
            // mbSiteId, striteSiteId,
  // @ts-ignore
            mbCostAll, spTrafficAll,
  // @ts-ignore
            arrResult,
  // @ts-ignore
            mbPrice,
    } = this.state;

    
    if (isLoading) return <PageLoader />
    

    return (
      <>
        <Section>
          <FacturaData
            // @ts-ignore
            factura={factura}
            onSetFactura={this.handleSetFactura}
            mbCostAll={mbCostAll}
            spTrafficAll={spTrafficAll}
          />
        </Section>


        {!isMadeArr &&
          <Section>
            {/* @ts-ignore */}
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
          // @ts-ignore
              mbPrice={mbPrice}
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
