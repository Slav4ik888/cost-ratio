import React from 'react';
import s from './modal-analis-block.module.css';
import cl from 'classnames';
import {TITLE_DETAIL_ROW_TABLE} from '../../../consts/consts.js';
import {addSpaceToNumber} from '../../../utils/untils.js';

class ModalAnalisBlock extends React.PureComponent {
  constructor (props) {
		super(props);
    this.handleOk = this.handleOk.bind(this); 
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);

    this.state = {
      element: this.props.element,
      visible: false, // модальное окно
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

  handleOk = (e) => {
    // e.preventDefault();
    document.body.style.overflow = '';

    this.setState({
        visible: false,
    });
    // если есть callback вызываем его
    if (this.props.callback) this.props.callback();
  }

  handleCancel = (e) => {
    // e.preventDefault();
    document.body.style.overflow = '';

    this.setState({
        visible: false,
    });
    // если есть callback вызываем его
    if (this.props.callback) this.props.callback();
  }
  
  // Обработка нажатий клавиш
  handleKeyPressed(e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 27:
        this.handleCancel();
        break;
      case 13:
        this.handleOk();
        break;

      default: return;
    }
  }

  render() {
    const {visible} = this.state;
    const {children, result} = this.props;
    // console.log('arrayOfProject: ', arrayOfProject);

    return (
      <>
        <div 
          className={cl(s.modal, {[s.isOpen]: visible})}
          
        >
          <div className={cl(s.modalDialog, s.modalDialogAuth)}> 
            <div className={s.modalBody}>
              <div className={s.modalTitle}>Станции в проекте</div>
              <div className={s.child} onKeyDown={this.handleKeyPressed}>              
                <div>
                  <table className={s.table} >
                    <thead>
                      <tr>
                        {TITLE_DETAIL_ROW_TABLE.map( (item, i) => <th key={item+i} className={s.thTitle}>
                          {item}
                        </th> )}
                      </tr>
                    </thead>
                    <tbody>
                      
                      
                      {result.map( (item, i) => (
                        <tr key={item.result+i}>
                          <td className={s.tdOrganization}>{item.organization}</td>
                          <td className={s.tdSiteID}>{item.siteID}</td>
                          <td className={s.tdMbCostCorrect}>{addSpaceToNumber(item.mbCostCorrect, 2, `,`)} р.</td>
                          <td className={s.tdSpCostTraffic}>{item.spCostTraffic ? addSpaceToNumber(item.spCostTraffic, 2, `,`) + ` р.` : `-`}</td>
                          <td className={s.tdResult}>{item.result} р.</td>
                        </tr>
                      ))}
                      
                    </tbody>
                  </table>
                </div>
                {children}
              </div>
              <div className={s.modalFooter}>
                <div className={s.footerButtons}>
                  {/* <button className={cl(s.button)} onClick={this.handleCancel}>Отмена</button> */}
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

export default ModalAnalisBlock;
