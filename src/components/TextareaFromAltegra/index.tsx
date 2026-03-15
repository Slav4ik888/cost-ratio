import React, { ChangeEvent, FormEvent } from 'react';
import MOCK_ALTEGRA from '../../mocks/arr-from-altegra-2026-02';
import { cfg } from 'app/config';
import { AltergaItem, makeArray } from 'entities/altegra';



interface Props {
  onHandleSetArr: (arr: any[]) => void;
}

interface State {
  strFromAltegra: string;
  arrFromAltegra: any[];
}

/**
 * ПРИНИМАЕМ ТАБЛИЦУ ДАННЫХ АЛТЕГРЫ И СОЗДАЁМ МАССИВ НУЖНЫХ НАМ ДАННЫХ
 * 
 * @return {array} arrFromAltegra  
 */

class TextareaFromAltegra extends React.PureComponent<Props, State> {

  constructor (props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      strFromAltegra: cfg.IS_DEV ? MOCK_ALTEGRA : '', //  принятый текст для создания массива слов
      arrFromAltegra: [], // созданный массив 
    };
  }
 

  handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      strFromAltegra: e.target.value || '',
    });
  }

  // принимаем данные из формы
  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // создаём массив из полученных данных и отправляем его
    const {onHandleSetArr} = this.props;
    onHandleSetArr(makeArray(this.state.strFromAltegra));
  }

  
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div>Данные от Алтегры:</div>
            <textarea rows={10} cols={85}
              placeholder="Вставьте скопированные данные от Алтегры" 
              name="text"
              onChange={this.handleChange}
              value={this.state.strFromAltegra}
            />
          </label>
          <input type="submit" value="Обработать" />
        </form>
      </>
    )
}

}

export default TextareaFromAltegra;
