import React, { Component } from 'react';
import './Home.module.css';

import HeaderBlock from '../../components/HeaderBlock';
// import Section from '../../components/Section';


import HeaderUp from '../../components/HeaderUp';

import Paragraph from '../../components/Paragraph';

import { connect } from 'react-redux';

// import Card from '../../components/Card';
// import {hoc} from '../../components/CardListNew';
// import CardList from '../../components/CardList';

import Comment from '../../components/User';
import TextContext from '../../context/testcontext';

import * as actions from '../../actions';
import { bindActionCreators } from 'redux';
// import {Clock} from '../../components/ClockReact';

// import {ReactComponent as ReactLogoSvg} from './logo.svg';
// import {ReactComponent as wordsList} from './components/Cards/wordsList.js';


const comment = {
    date: new Date(),
    text: 'Я изучаю React!',
    author: {
        name: 'Вячеслав Корзан',
        avatarUrl: 'https://placekitten.com/g/64/64',
    },
};




class HomePage extends Component {

    // state = {
    //     wordArr: [],
       
    // };

    // componentDidMount() {
    //     const { getUserCardsRef } = this.props.firebase;

    //     getUserCardsRef().once('value', response => {
    //                 console.log('HOME Читаем из базы = ', response.val());
    //                 this.setState({
    //                     wordArr: response.val() || []
    //                 }); 
    //             });
    // }

    // // Читаем из базы данные карточек и выводим их
    // onUpdateCard = () => {
    //     const { getUserCardsRef } = this.props.firebase;
    //     getUserCardsRef().once('value', response => {
    //         console.log('HOME Читаем из базы Update = ', response.val());
    //         this.setState({
    //             wordArr: response.val() || []
    //         }); 
    //     });
    // }

    // Добавляем карточку в базу
    // handleAddItem = (newEng, newRus) => {
    //     const { wordArr } = this.state;
    //     const { getUserCardsRef } = this.props.firebase;

    //     // console.log('wordArr: ', wordArr);
    //     if (wordArr.find( word => word.eng === newEng) ) {
    //         console.log('В базе уже есть такое слово');
    //         return
    //     }
    //     newEng = newEng.toLowerCase();
    //     newRus = newRus.toLowerCase();
    //     const newArr = [
    //         ...wordArr,
    //         {
    //             eng: newEng,
    //             rus: newRus,
    //             id: newEng,   //id: Math.floor(Math.random() * Math.floor(100))
    //         }
    //     ]
    //     getUserCardsRef().set(newArr);
    //     this.setState({ 
    //         wordArr: newArr,
    //     })

    // }


    // Удаляем карточку
    // handleDeletItem = (id) => {
    //     const { wordArr } = this.state;
    //     const { getUserCardsRef } = this.props.firebase;

    //     const newArr = wordArr.filter (item => item.id !== id);
        
    //     getUserCardsRef().set(newArr);
    //     this.setState({ 
    //         wordArr: newArr,
    //     })

    // }

    

render() {
    // console.log('props', this.props);

    const { countNumber, plusAction, minusAction } = this.props;

    return (
        <>
            <HeaderBlock fullHeight>

                <HeaderUp size='1' bcolor>
                    Твой онлайн тренажёр
                </HeaderUp>

                <Paragraph>
                    Английские слова, которые вы хотите выучить
                </Paragraph>
                <Paragraph>
                    Добавляйте в свою "Базу слов"
                </Paragraph>
                <Paragraph>
                    В "Тренировке" нажимай на правильный ответ
                </Paragraph>
                <Paragraph>
                    Карточка с правильным ответом, уходит из текущей тренировки.
                </Paragraph>
                <Paragraph>
                    При неверном ответе, карточка появится снова.
                </Paragraph>
                <Paragraph>
                    Чем меньше ошибок, тем реже появляется это слово.
                </Paragraph>

                <Paragraph>
                    { countNumber }
                </Paragraph>
                <button onClick={() => plusAction(1) }>PLUS</button>
                <button onClick={() => minusAction(1) }>MINUS</button>


            </HeaderBlock>

            {/* <Section hideBackground>
                <TextContext.Consumer>
                    {
                        (value) => {
                            // console.log('Переданный value: ', value);
                            return (
                                <CardList 
                                onDeletedItem={this.handleDeletItem} 
                                // onDeletedItem={(id) => console.log('3 LEVEL id-', id)} 
                                onAddItem={this.handleAddItem}
                                // onAddItem={ (eng, rus) => console.log('eng, rus: ', eng + ' ' + rus) }
                                item={wordArr}
                            />
                            )
                        }
                    }
                </TextContext.Consumer>
            </Section> */}

            <HeaderBlock hideBackground>

                <HeaderUp size='2' bcolor>
                    "Твой онлайн тренер"
                </HeaderUp>

               
                <Comment
                        date={comment.date}
                        text={comment.text}
                        author={comment.author}
                />

            </HeaderBlock>

            {/* <HeaderBlock hideBackground>

                <FirebaseContext.Consumer>
                    {
                        ( getUserCardsRef ) => {
                            const CardEndList = hoc(Card, getUserCardsRef);
                            return <CardEndList />
                        }
                    }
                </FirebaseContext.Consumer>
                
            </HeaderBlock> */}


            {/* <FooterBlock>
                    <Logo />

                    
            </FooterBlock> */}

        </>
    );
  }
}

const mapStateToProps = state => {
    // console.log('mapStateToProps', state);
    return {
        countNumber: state.counter.count,
    }
}

const mapDispatchToProps = dispatch => {
    // return {
    //     plus: (arg) => dispatch(plusAction(arg)),
    // }
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
