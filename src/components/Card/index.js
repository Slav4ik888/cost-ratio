import React from 'react';
import cl from 'classnames';
import s from './Card.module.css'; //импортируем МОДУЛЬ
import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

class Card extends React.PureComponent{

    state = {
        done: false,          // состояние "НЕ перевёрнута"
        isRemembered: false,  // состояние "НЕ запомнили"
    }

    componentDidMount() {
        // console.log('Card props: ', this.props);
        const { match: { params }, index } = this.props;
        const { isTrain } = this.props;
        // console.log('index: ', index);

        if (index === +params.id) { //если в ссылке указано номер слова то его переворачиваем
            this.setState({
                done: params.isDone
            })
        }
        if (isTrain) {  // если тренировка то переворачиваем карты русскими вверх
            // console.log('answer',answer);
            this.setState({
                done: true,
               
            })
        } 

    }

    // Если нажали на карту - перевернуть
    handleCardClick = () => {
        if (this.props.isTrain) { // если тренировка 
            setTimeout(() => {
                this.setState({ done: !this.state.done });
            }, 1500);
            
            this.props.onTrain(this.props.index); // отправляем индекс нажатой карточки
          

        }
        this.setState( ( {done} ) => { 
            if (this.state.isRemembered) { // если "запомнена" то не переворачиваем
                return {};
            }
            return {
                done: !done 
            }
        });

        

    }

    // Если нажали на checkbox карты - зачеркнуть "запомнить"
    handleIsRememberClick = () => {
        this.setState( ( {isRemembered} ) => {
            // console.log("Запомнить");
            return {
                isRemembered: !isRemembered
            } 
        });
    }

    // Нажали удалить карточку
    handleDeletedClick = () => {
        console.log("1 LEVEL");
        this.props.onDeleted();
        
    }

    render() {
        const { eng, rus, isTrain, r, w } = this.props;
        const { done, isRemembered } = this.state;
        
        return (
            <div className = {s.root}>
                <div 
                    className = {cl(s.card, 
                        {[s.done] : done},
                        {[s.isRemembered] : isRemembered}
                        )}
                    onClick = {this.handleCardClick}
                >
                   
                    <div className = {s.cardInner} >
                        <div className = {s.cardFront} >
                            <div className = {s.cardFrontWord}>
                                { eng }
                            </div>
                            <div className = {s.cardResult}>
                                <div className = {s.right}>{ r }</div>
                                <div className = {s.tab}> / </div>
                                 <div className = {s.wrong}>{ w }</div>
                            </div>
                        </div>

                        <div className = {s.cardBack} >
                            { rus }
                        </div>
                    </div>
                </div>
                
                <div className = {s.icons} >
                    { isTrain ? '' : <CheckSquareOutlined onClick = {this.handleIsRememberClick} /> }
                </div>
                <div className = {s.icons} >
                    { isTrain ? '' : <DeleteOutlined onClick = {this.handleDeletedClick} /> }
                </div>

            </div>
        );
    }
}



export default withRouter(Card);