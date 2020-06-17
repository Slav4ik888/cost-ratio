import React from 'react';
import s from './HeaderMenu.module.css'; 

import cl from 'classnames';

// import {ReactComponent as ReactLogoSvg} from '../../logo.svg';
// import FirebaseContext from '../../context/firebaseContext';


// import { Input } from 'antd';
// import { Button } from 'antd';

// children это деструктурированный ...props 
const HeaderMenu = ( { onButtonAuth, onButtonReg, children }) => {
    
    

    return (
        <>
            <div className={s.container}>
                <div className={s.header}>
                    <div className={s.logo}> EasyEnglish
                        {/* <img src="./img/logo.svg" alt="Logo"/> */}
                    </div>
                    {/* <label className={s.inputLabel}>
                        <input type="text" className={cl(s.input, s.inputEng)} placeholder="Найти перевод слова..."/>
                    </label> */}
                    <div className={s.buttons}>
                        <span className={s.userName}></span>
                        <button className={cl(s.button, s.buttonAuth)}
                                onClick={onButtonAuth}>
                            <span className={s.buttonAuthSvg}></span>
                            <span className={s.buttonText}>Войти</span>
                        </button>
                        <button className={cl(s.button, s.buttonPrimary, s.buttonReg)}
                                onClick={onButtonReg}>
                            <span className={s.buttonRegSvg}></span>
                            <span className={s.buttonText}>Зарегистрироваться</span>
                        </button>
                        <button className={cl(s.button, s.buttonPrimary, s.buttonOut)}>
                            <span className={s.buttonText}>Выйти</span>
                            <span className={s.buttonOutSvg}></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* <div className={s.cover}>

                <div className={s.spin}>
                    <ReactLogoSvg />
                    
                </div>
                <div>
                    {children}
                    
                </div>
                
            </div> */}
        </>
    )
}

export default HeaderMenu;