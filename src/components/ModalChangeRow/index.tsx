import React, { FC, ReactNode } from 'react';
import s from './modal-change-row.module.css';
import cl from 'classnames';
import { MainItem } from 'entities/altegra';



interface GoogleRowProps {
  item: MainItem
  callback: (item: MainItem) => void
}

const GoogleRow: FC<GoogleRowProps> = ({item, callback}) => {
  const handleCallBack = () => {
    callback(item);
  };

  return (
    <tr className={s.tableSearch}
      onClick={handleCallBack}
    >
      <td>{item.siteID}</td>
      <td>{item.project}</td>
      <td>{item.organization}</td>
    </tr>
  );
}


interface GoogleTableProps {
  searchText: string
  arr: MainItem[]
  callback: (item: MainItem) => void
}

const GoogleTable: FC<GoogleTableProps> = ({ searchText, arr, callback }) => {
  const rows: JSX.Element[] = [];

  arr.forEach((item, i) => {
    
    if ((item.siteID.indexOf(searchText.toUpperCase()) === -1) &&
      (item.organization.indexOf(searchText) === -1)
    ) {
      return;
    }
    
    rows.push(
      <GoogleRow
        item     = {item}
        callback = {callback}
        key      = {item.siteID + i}
      />
    );
  });

  return (
    <table>
      {rows.length > 0 &&
        <thead>
          <tr>
            <th>SiteID</th>
            <th>Проект</th>
            <th>Клиент</th>
          </tr>
        </thead>
      }
      <tbody>{rows}</tbody>
    </table>
  );
}

interface ModalChangeRowProps {
  element: any
  arrayOfProject: any
  callback: (element?: any) => void
}

class ModalChangeRow extends React.PureComponent<ModalChangeRowProps, { element: any; visible: boolean; searchText: string; searchFocus: boolean }> {
  constructor (props: ModalChangeRowProps) {
		super(props);
    this.handleChangeItem = this.handleChangeItem.bind(this); 
    this.handleOk = this.handleOk.bind(this); 
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleFocusBlur = this.handleFocusBlur.bind(this);
    this.setItem = this.setItem.bind(this);

    this.state = {
      element: this.props.element,
      visible: false, // модальное окно
      searchText: '', // значение поиска
      searchFocus: false,
    };
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    document.addEventListener("keydown", this.handleKeyPressed);

    this.setState({
      visible: true,
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPressed);
  } 

  handleOk() {
    // e.preventDefault();
    document.body.style.overflow = '';

    this.setState({
        visible: false,
    });
    // если есть callback вызываем его
    if (this.props.callback) this.props.callback(this.state.element);
  }

  handleCancel() {
    // e.preventDefault();
    document.body.style.overflow = '';

    this.setState({
        visible: false,
    });
    if (this.props.callback) this.props.callback();
  }

  // Изменение индивидуальных значений сч/ф
	handleChangeItem = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {element} = this.state;
    let obj = Object.assign({}, element);

    const target = event.target as HTMLInputElement;
    let value;
    let newSearch;

    switch (target.name) {
      case 'search':
        value = target.value;
        newSearch = value;
        this.setState({
          searchText: newSearch,
        });
        break;

      case 'siteID':
        value = target.value;
        obj.siteID = value;
        break;

      case 'project':
        value = target.value;
        obj.project = value;
        break;

      case 'organization':
        value = target.value;
        obj.organization = value;
        break;

      case 'mbCostServicies':
        value = +target.value;
        obj.mbCostServicies = value;
        break;
  
      default: break;
    };


    this.setState({
      element: obj,
    });
  }

  // При входе в InputSearch
  handleFocus() {
    this.setState({
      searchFocus: true,
    });
  }
  // При выходе из InputSearch
  handleFocusBlur() {
    this.setState({
      searchFocus: false,
      searchText: ``,
    });
  }
  
  // Обработка нажатий клавиш
  handleKeyPressed(e: KeyboardEvent) {
    console.log(e.key);
    const keyHandlers = {
      'Escape': this.handleCancel,
      'Enter': this.handleOk
    };

    const handler = keyHandlers[e.key as keyof typeof keyHandlers];
    if (handler) {
      handler();
    }
  };


  setItem(obj: any) {
    const newElement = {} as MainItem;
    newElement.siteID = obj.siteID;
    newElement.project = obj.project;
    newElement.organization = obj.organization;
    newElement.mbCostServicies = 0;

    

    this.setState({
      element: newElement,
    })
  }

  render() {
    const {element, visible, searchText, searchFocus} = this.state;
                      // @ts-ignore
    const {children, arrayOfProject} = this.props;
    // console.log('arrayOfProject: ', arrayOfProject);

    return (
      <>
        <div className={cl(s.modal, {[s.isOpen]: visible})}>
          <div className={cl(s.modalDialog, s.modalDialogAuth)}> 
            <div className={s.modalBody}>
              <div className={s.modalTitle}>Внесение изменений</div>
              <div className={s.child}>              
                <form onSubmit={this.handleOk}>
                  <div >
                    <input
                      className={s.inputSearch}
                      type="text"
                      name="search"
                      placeholder="Поиск в ServiceDesk по SiteID"
                      value={searchText}
                      autoComplete="off"
                      // ref={this.searchRef}
                      // @ts-ignore
                      onChange={this.handleChangeItem}
                      onFocus={this.handleFocus}
                      // onBlur={this.handleFocusBlur}
                    />
                  </div>

                  <div className={s.search}>
                    {searchFocus &&
                      <GoogleTable searchText={searchText} arr={arrayOfProject} callback={this.setItem}/>
                    }
                  </div>    
                  <table className={s.table}>
                    <tbody>
                      
                      
                      <tr className={s.trInput}>
                        <td className={s.tdTitle}>SiteID</td>
                        <td>
                          <input
                            className={s.tdInputValue}
                            type="text"
                            name="siteID"
                            placeholder="SiteID"
                            autoComplete="off"
                            value={element.siteID}
                      // @ts-ignore
                            onChange={this.handleChangeItem}
                          />
                        </td>
                      </tr>
                      <tr className={s.trInput}>
                        <td>Проект</td>
                        <td>
                          <input 
                            className={s.tdInputValue}
                            type="text" 
                            name="project"
                            placeholder="Проект"
                            autoComplete="off"
                            value={element.project}
                      // @ts-ignore
                            onChange={this.handleChangeItem}
                          /> 
                        </td>
                      </tr>
                      <tr className={s.trInput}>
                        <td>Клиент</td>
                        <td>
                          <input 
                            className={s.tdInputValue}
                            type="text" 
                            name="organization"
                            autoComplete="off"
                            placeholder="Название клиента"
                            value={element.organization}
                      // @ts-ignore
                            onChange={this.handleChangeItem}
                          />
                        </td>
                      </tr>
                      <tr className={s.trInput}>
                        <td>Затраты из счёт фактуры</td>
                        <td>
                          <input 
                            className={s.tdInputValue}
                            type="number" 
                            name="mbCostServicies"
                            autoComplete="off"
                            placeholder="Данные из счёт фактуры"
                            value={element.mbCostServicies}
                      // @ts-ignore
                            onChange={this.handleChangeItem}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
                {children}
              </div>
              <div className={s.modalFooter}>
                <div className={s.footerButtons}>
                  <button className={cl(s.button)} onClick={this.handleCancel}>Отмена</button>
                  <button className={cl(s.button, s.buttonPrimary)} onClick={this.handleOk}>Ok</button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ModalChangeRow;
