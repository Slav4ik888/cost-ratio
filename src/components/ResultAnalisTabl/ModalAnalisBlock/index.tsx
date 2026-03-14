import React from 'react';
import s from './modal-analis-block.module.css';
import cl from 'classnames';
import {TITLE_DETAIL_ROW_TABLE} from '../../../consts';
import { addSpaceToNumber } from '../../../utils/untils';


interface ModalAnalisBlockProps {
  element: any
  result: any[]
  children: React.ReactNode
  callback: () => void
}

class ModalAnalisBlock extends React.PureComponent<ModalAnalisBlockProps, { element: any, visible: boolean }> {
  constructor (props: ModalAnalisBlockProps) {
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

  handleOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // e.preventDefault();
    document.body.style.overflow = '';

    this.setState({
        visible: false,
    });
    // если есть callback вызываем его
    if (this.props.callback) this.props.callback();
  }

  handleCancel = (e: KeyboardEvent) => {
    // e.preventDefault();
    document.body.style.overflow = '';

    this.setState({
        visible: false,
    });
    // если есть callback вызываем его
    if (this.props.callback) this.props.callback();
  }
  
  // Обработка нажатий клавиш
  handleKeyPressed(e: KeyboardEvent) {
    console.log(e.key);
    const keyHandlers = {
      'Escape': () => this.handleCancel(e),
      'Enter': () => this.handleOk(e as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>)
    };

    const handler = keyHandlers[e.key as keyof typeof keyHandlers];
    if (handler) {
      handler();
    }
  }

  render() {
    const {visible} = this.state;
    const {children, result} = this.props;
    // console.log('arrayOfProject: ', arrayOfProject);

    return (
      <>
        <div className={cl(s.modal, {[s.isOpen]: visible})}>
          <div className={cl(s.modalDialog, s.modalDialogAuth)}> 
            <div className={s.modalBody}>
              <div className={s.modalTitle}>Станции в проекте</div>
              {/* @ts-ignore */}
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
