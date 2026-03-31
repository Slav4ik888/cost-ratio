import React, { FC, ReactNode } from 'react';
import { MainItem } from 'entities/automatization';
import { GoogleTable } from './table';
import { Modal } from 'shared/ui/modal';
import './modal-change-row.scss';



interface ModalChangeRowProps {
  isModal         : boolean
  row             : any
  serviceDeskData : any
  callback        : (row?: any) => void
  children?       : ReactNode
}

export class ModalChangeRow extends React.PureComponent<ModalChangeRowProps, { row: any; searchText: string; searchFocus: boolean }> {
  constructor (props: ModalChangeRowProps) {
		super(props);
    this.handleChangeItem = this.handleChangeItem.bind(this); 
    this.handleOk = this.handleOk.bind(this); 
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleFocusBlur = this.handleFocusBlur.bind(this);
    this.setItem = this.setItem.bind(this);

    this.state = {
      row         : this.props.row,
      // visible     : false, // модальное окно
      searchText  : '', // значение поиска
      searchFocus : false,
    };
  }

  handleOk() {
    this.props.callback(this.state.row);
  }

  handleCancel() {
    this.props.callback();
  }

  // Изменение индивидуальных значений сч/ф
	handleChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {row} = this.state;
    let obj = Object.assign({}, row);

    const target = event.target;
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
      row: obj,
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
  

  setItem(obj: any) {
    const newElement = {} as MainItem;
    newElement.siteID = obj.siteID;
    newElement.project = obj.project;
    newElement.organization = obj.organization;
    newElement.mbCostServicies = 0;

    this.setState({
      row: newElement,
    })
  }

  render() {
    const {row, searchText, searchFocus} = this.state;
    const {children, serviceDeskData} = this.props;
    // console.log('serviceDeskData: ', serviceDeskData);

    return (
      <Modal
        title    = 'Внесение изменений'
        isModal  = {this.props.isModal}
        onCancel = {this.handleCancel}
        onOk     = {this.handleOk}
      >
        <>
          <div>
            <input
              className    = 'inputSearch'
              type         = 'text'
              name         = 'search'
              placeholder  = 'Поиск в ServiceDesk по SiteID'
              value        = {searchText}
              autoComplete = 'off'
              // ref={this.searchRef}
              onChange     = {this.handleChangeItem}
              onFocus      = {this.handleFocus}
              // onBlur={this.handleFocusBlur}
            />
          </div>
          <div className='search'>
            {searchFocus &&
              <GoogleTable searchText={searchText} arr={serviceDeskData} callback={this.setItem} />
            }
          </div>    
          <table className='table'>
            <tbody>
              <tr className='trInput'>
                <td className='tdTitle'>SiteID</td>
                <td>
                  <input
                    className    = 'tdInputValue'
                    type         = 'text'
                    name         = 'siteID'
                    placeholder  = 'SiteID'
                    autoComplete = 'off'
                    value        = {row.siteID}
                    onChange     = {this.handleChangeItem}
                  />
                </td>
              </tr>
              <tr className='trInput'>
                <td>Проект</td>
                <td>
                  <input 
                    className    = 'tdInputValue'
                    type         = 'text' 
                    name         = 'project'
                    placeholder  = 'Проект'
                    autoComplete = 'off'
                    value        = {row.project}
                    onChange     = {this.handleChangeItem}
                  /> 
                </td>
              </tr>
              <tr className='trInput'>
                <td>Клиент</td>
                <td>
                  <input 
                    className    = 'tdInputValue'
                    type         = 'text' 
                    name         = 'organization'
                    autoComplete = 'off'
                    placeholder  = 'Название клиента'
                    value        = {row.organization}
                    onChange     = {this.handleChangeItem}
                  />
                </td>
              </tr>
              <tr className='trInput'>
                <td>Затраты из счёт фактуры</td>
                <td>
                  <input 
                    className    = 'tdInputValue'
                    type         = 'number' 
                    name         = 'mbCostServicies'
                    autoComplete = 'off'
                    placeholder  = 'Данные из счёт фактуры'
                    value        = {row.mbCostServicies}
                    onFocus      = {(e) => {
                      e.target.select(); // Выделяем весь текст при фокусе
                    }}
                    onChange     = {this.handleChangeItem}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {children}
        </>
      </Modal>              
    )
  }
}
