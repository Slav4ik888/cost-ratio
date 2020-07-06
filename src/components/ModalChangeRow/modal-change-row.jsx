import React from 'react';
import s from './modal-change-row.module.css';
import cl from 'classnames';

class GoogleRow extends React.Component {
  render() {
    const {item} = this.props;

    return (
      <tr>
        <td>{item.siteID}</td>
        <td>{item.project}</td>
        <td>{item.organization}</td>
      </tr>
    );
  }
}

class GoogleTable extends React.Component {
  render() {
    const {searchText, arr} = this.props;

    const rows = [];

    arr.forEach((item, i) => {
      
      if ((item.siteID.indexOf(searchText.toUpperCase()) === -1) &&
        (item.organization.indexOf(searchText) === -1)
      )
      {
        return;
      }
      
      rows.push(
        <GoogleRow
          item={item}
          key={item.siteID + i}
        />
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>SiteID</th>
            <th>Проект</th>
            <th>Клиент</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class ModalChangeRow extends React.PureComponent {
  constructor (props) {
		super(props);
    this.handleChangeItem = this.handleChangeItem.bind(this); 
    this.handleOk = this.handleOk.bind(this); 
    this.handleCancel = this.handleCancel.bind(this);
    
    this.state = {
      element: this.props.element,
      visible: false, // модальное окно
      searchText: '', // значение поиска
    };
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    // e.preventDefault();
    document.body.style.overflow = '';

    this.setState({
        visible: false,
    });
    // если есть callback вызываем его
    if (this.props.callback) this.props.callback(this.state.element);
  }

  handleCancel = (e) => {
    // e.preventDefault();
    document.body.style.overflow = '';

    this.setState({
        visible: false,
    });
    if (this.props.callback) this.props.callback();
  }
  // Изменение индивидуальных значений сч/ф
	handleChangeItem = (event) => {
		const {element} = this.state;
    let obj = Object.assign({}, element);

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
      element: obj,
    });
  }
  


  render() {
    const {element, visible, searchText} = this.state;
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
                    Поиск в ServiceDesk
                       
                    <input
                      type="text"
                      name="search"
                      placeholder="Поиск по SiteID"
                      value={searchText}
                      onChange={this.handleChangeItem}
                    />
                  </div>

                  <div className={s.search}>
                    <GoogleTable searchText={searchText} arr={arrayOfProject}/>
                  </div>    

                  <table className={s.table}>
                    <tbody>
                      
                      
                      <tr>
                        <td>SiteID</td>
                        <td>
                          <input
                            type="text"
                            name="siteID"
                            placeholder="SiteID"
                            value={element.siteID}
                            onChange={this.handleChangeItem}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Проект</td>
                        <td>
                          <input 
                            type="text" 
                            name="project"
                            placeholder="Проект"
                            value={element.project}
                            onChange={this.handleChangeItem}
                          /> 
                        </td>
                      </tr>
                      <tr>
                        <td>Клиент</td>
                        <td>
                          <input 
                            type="text" 
                            name="organization"
                            placeholder="Название клиента"
                            value={element.organization}
                            onChange={this.handleChangeItem}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Затраты из счёт фактуры</td>
                        <td>
                          <input 
                            type="number" 
                            name="mbCostServicies"
                            placeholder="Данные из счёт фактуры"
                            value={element.mbCostServicies}
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
