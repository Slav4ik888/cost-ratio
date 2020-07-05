import React from 'react';
// import s from './textarea-from-altegra.module.css';
import mockAltegra from '../../mocks/arr-from-altegra.js';


/************************************************/
/* ПРИНИМАЕМ И СОЗДАЁМ МАССИВ ИЗ ДАННЫХ АЛТЕГРЫ */
/************************************************/

class TextareaFromAltegra extends React.PureComponent {

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      strFromAltegra: '', // mockAltegra, //  принятый текст для создания массива слов
      arrFromAltegra: [], // созданный массив 
    };
  }
 

  // Запускаем мок
  // componentDidMount() {
  //   // создаём массив из полученных данных и отправляем его
  //   const {onHandleSetArr} = this.props;
  //   onHandleSetArr(this.madeArray());
  // }



  handleChange(event) {
    this.setState({
      strFromAltegra: event.target.value,
    });
  }

  // принимаем данные из формы
  handleSubmit(event) {
    event.preventDefault();
    // создаём массив из полученных данных и отправляем его
    const {onHandleSetArr} = this.props;
    onHandleSetArr(this.madeArray());
  }

  // убираем пробелы
  transformSpace = (text) => {
    let value;
    value = text.replace(/\s/g,'');
    return value;
  }

  // Запускаем цикл преобразования полученных данных в строки
  madeArray = () => {
    let str = this.state.strFromAltegra;
    str = str.replace(/\n/g,'*'); // добавляем * в конце строки
    
    let arr = [];
    let obj = {
        siteID: ``,
        trafficType: ``, 
        trafficMb: ``, 
        price: ``,
    }
  
    while (true) {
        if ( str.indexOf('\t') === -1 ) break; //если нет табуляции, значит строки закончились
  
        obj.siteID = str.slice(0, str.indexOf('\t') );
        str = str.slice( str.indexOf('\t') + 1 ); // удаляем его из строки
  
        obj.trafficType = str.slice(0, str.indexOf('\t') );
        str = str.slice( str.indexOf('\t') + 1 ); // удаляем его из строки
  
        obj.trafficMb = str.slice(0, str.indexOf('\t') );
        obj.trafficMb = this.transformSpace( obj.trafficMb ); // удаляем пробелы из трафика
        str = str.slice( str.indexOf('\t') + 1 ); // удаляем его из строки
  
        // ищем и сохраняем прайс
        // если последняя строка, отдаём всё слово до конца, тк не даёт последний символ
        if ( str.indexOf('*') === -1 ) { 
            obj.price = str;
        } else {
            // Последнее слово берём всё до звёздочки
            obj.price = str.slice(0, str.indexOf('*') );
            str = str.slice( str.indexOf('*') + 1 ); // удаляем его из строки
        }
        arr.push(obj); // результат obj добавляем в массив
        obj = {};
    };
    return arr
}

  
  render() {
    return (
        <>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>Данные от Алтегры:</div>
              <textarea rows="10" cols="85" 
                  placeholder="Вставьте скопированные данные от Алтегры" 
                  name="text"
                  onChange={this.handleChange} />
            </label>
            <input type="submit" value="Обработать" />
          </form>
        </>
    )
}

}

export default TextareaFromAltegra;
