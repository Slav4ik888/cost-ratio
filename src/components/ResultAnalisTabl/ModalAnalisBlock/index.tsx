import React from 'react';
import './modal-analis-block.scss';
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
        <div className={`modal, ${visible && "isOpen"}`}>
          <div className="modalDialog modalDialogAuth"> 
            <div className="modalBody">
              <div className="modalTitle">Станции в проекте</div>
              {/* @ts-ignore */}
              <div className="child" onKeyDown={this.handleKeyPressed}>              
                <div>
                  <table className="table" >
                    <thead>
                      <tr>
                        {TITLE_DETAIL_ROW_TABLE.map( (item, i) => <th key={item+i} className="thTitle">
                          {item}
                        </th> )}
                      </tr>
                    </thead>
                    <tbody>
                      {result.map( (item, i) => (
                        <tr key={item.result+i}>
                          <td className="tdOrganization">{item.organization}</td>
                          <td className="tdSiteID">{item.siteID}</td>
                          <td className="tdMbCostCorrect">{addSpaceToNumber(item.mbCostCorrect, 2, `,`)} р.</td>
                          <td className="tdSpCostTraffic">{item.spCostTraffic ? addSpaceToNumber(item.spCostTraffic, 2, `,`) + ` р.` : `-`}</td>
                          <td className="tdResult">{item.result} р.</td>
                        </tr>
                      ))}
                      
                    </tbody>
                  </table>
                </div>
                {children}
              </div>
              <div className="modalFooter">
                <div className="footerButtons">
                  {/* <button className={cl(s.button)} onClick={this.handleCancel}>Отмена</button> */}
                  <button className="button buttonPrimary" onClick={this.handleOk}>Ok</button>
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
