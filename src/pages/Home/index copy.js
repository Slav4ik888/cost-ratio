import React, { Component } from 'react';
import './Home.module.css';
// import database from '../../servicies/firebase';
import {withFirebase} from '../../context/firebaseContext';

import HeaderMenu from '../../components/HeaderMenu';
import LoginPage from '../../pages/Login';
import CreateUser from '../../pages/CreateUser';

import HeaderBlock from '../../components/HeaderBlock';
import Header from '../../components/Header';

import Paragraph from '../../components/Paragraph';

import FooterBlock from '../../components/FooterBlock';
import Logo from '../../components/Logo';

// import Card from '../../components/Card';
// import {hoc} from '../../components/CardListNew';
import CardList from '../../components/CardList';

import Comment from '../../components/User';
import TextContext from '../../context/testcontext';
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

    state = {
        wordArr: [],
        isAuth: false, // нажал авторизироваться 
        isReg: false,  // нажал 
    };

    // urlRequest = `/cards/${this.props.user.uid}`;

    componentDidMount() {
        const { getUserCardsRef } = this.props.firebase;

        getUserCardsRef().once('value', response => {
                    console.log('HOME Читаем из базы = ', response.val());
                    this.setState({
                        wordArr: response.val() || []
                    }); 
                });

        // database.ref(this.urlRequest).on('value', response => {
        //         console.log('Читаем из базы = ', response.val());
        //         this.setState({
        //             wordArr: response.val() || []
        //         }); 
        //     });
    
        // database.ref(this.urlRequest).once('value').then( response => {
        //     console.log('Читаем из базы = ', response.val());
        //     this.setState({
        //         wordArr: response.val() || []
        //     }); // , this.setNewWord
        // });

    }

    // Читаем из базы данные карточек и выводим их
    onUpdateCard = () => {
        const { getUserCardsRef } = this.props.firebase;
        getUserCardsRef().once('value', response => {
            console.log('HOME Читаем из базы Update = ', response.val());
            this.setState({
                wordArr: response.val() || []
            }); 
        });
    }

    // Записываем в базу новое слово
    // setNewWord = () => {
    //     database.ref('/cards/' + this.state.wordArr.length).set({
    //         eng: 'Mouse',
    //         rus: 'Мышь',
    //         id: Math.floor(Math.random() * Math.floor(100))
    //     })
    // }

    // Добавляем карточку в базу
    handleAddItem = (newEng, newRus) => {
        const { wordArr } = this.state;
        const { getUserCardsRef } = this.props.firebase;

        // console.log('wordArr: ', wordArr);
        if (wordArr.find( word => word.eng === newEng) ) {
            console.log('В базе уже есть такое слово');
            return
        }
        newEng = newEng.toLowerCase();
        newRus = newRus.toLowerCase();
        const newArr = [
            ...wordArr,
            {
                eng: newEng,
                rus: newRus,
                id: newEng,   //id: Math.floor(Math.random() * Math.floor(100))
            }
        ]
        getUserCardsRef().set(newArr);
        this.setState({ 
            wordArr: newArr,
        })
        // console.log('Длина массива newArr', newArr.length);

    }


    // Удаляем карточку
    handleDeletItem = (id) => {
        const { wordArr } = this.state;
        const { getUserCardsRef } = this.props.firebase;

        const newArr = wordArr.filter (item => item.id !== id);
        
        getUserCardsRef().set(newArr);
        this.setState({ 
            wordArr: newArr,
        })

    }

    // Получаем пользователя, после регистрации или авторизации и отменяем вывод модальных окон
    onGetUser = (id) => {
        console.log('Получен onGetUser - ', id.user);
        const { setUserUid } = this.props.firebase;

        setUserUid(id.user.uid);
        this.onUpdateCard();
        console.log('setUserUid(id.user.uid): ', id.user.uid);

        this.setState({ 
            user: id.user,
            isAuth: false,
            isReg: false,
        })
        
    }

    toggleAuth = () => { // Выводим окно для авторизации
        // console.log('Статус user`а ДО: ', this.state.user);

        const { auth, setUserUid, userUid } = this.props.firebase;

        // Разлогиниться, если был под пользователем
        if (userUid) {
            
            auth.signOut().then(function() {
                    console.log('Выход пользователя успешен', userUid);
                    setUserUid(null);    

                  }).catch(function(error) {
                    console.log('Выход пользователя с ошибкой');
                  });
              
                 
            // fire.auth().signOut().then(function() {
            //         console.log('Выход пользователя успешен');
            //       }).catch(function(error) {
            //         console.log('Выход пользователя с ошибкой');
            //       });
            //       console.log('Статус user`а: ', this.state.user);
        }
        this.setState( ( {isAuth} ) => {
            return {
                isAuth: !isAuth
            }
        });

    }
    
    toggleReg = () => { // Выводим окно для регистрации
        // console.log('toggleReg:', this.state.isReg);
        const { auth, setUserUid, userUid  } = this.props.firebase;

        // Разлогиниться, если был под пользователем
        if (userUid) {
            auth.signOut().then(function() {
                console.log('Выход пользователя успешен');
                setUserUid(null);    

              }).catch(function(error) {
                console.log('Выход пользователя с ошибкой');
              });
        }
        this.setState( ( {isReg} ) => {
            return {
                isReg: !isReg
            }
        });
    }

render() {
    const { wordArr, isAuth, isReg } = this.state;
    // console.log('user: ', this.props.user.uid);
    return (
        <>
            <HeaderMenu 
                onButtonAuth={this.toggleAuth}
                onButtonReg={this.toggleReg}
                
            />
            { isReg ? <CreateUser isReg={isReg} getUser={this.onGetUser}/> : ""}
            { isAuth ? <LoginPage isAuth={isAuth} getUser={this.onGetUser}/> : ""}

            <HeaderBlock fullHeight>

                <Header size='1' bcolor>
                    "Изучаем английский язык"
                </Header>

                <Paragraph>
                    "Сервис по тренировке знаний английского языка"
                </Paragraph>

                <Paragraph>
                    Добавляйте новые слова в свою базу для тренировок
                </Paragraph>

            </HeaderBlock>

            <HeaderBlock hideBackground>
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
            </HeaderBlock>

            <HeaderBlock hideBackground>

                <Header size='1' bcolor>
                    "Твой онлайн тренер"
                </Header>

                <Paragraph>
                    Тренируйся каждый день и станешь Мастером тренировок
                </Paragraph>
                <Paragraph>
                    Карточка с правильным ответом, уходит из текущей тренировки.
                </Paragraph>
                <Paragraph>
                    При неверном ответе, карточка остаётся до тех пор, пока вы на ответите верно.
                </Paragraph>
                <Paragraph>
                    Чем чаще вы даёте правильный ответ, тем реже данная карточка будет появляться в тренировках.
                </Paragraph>
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


            <FooterBlock>
                    <Logo />

                    
            </FooterBlock>

        </>
    );
  }
}

export default withFirebase(HomePage);