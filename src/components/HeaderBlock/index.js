import React from 'react';
import s from './HeaderBlock.module.css'; //импортируем МОДУЛЬ
// import ReactLogoPng from '../../logo.svg';
// import {ReactComponent as ReactLogoSvg} from '../../logo.svg';

// children это деструктурированный ...props 
const HeaderBlock = ({ hideBackground = false, fullHeight = false, children }) => {

    const styleCover = hideBackground ? { backgroundImage: 'none'} : {};
    
    if (fullHeight) { styleCover.height = '100vh' };


    return (
        
        <div className={s.cover} style={styleCover}>
            <div className={s.bg}>
                <div className={s.wrap}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default HeaderBlock;

// {/* { title ? <h1 className={s.header}>{title}</h1> : null } */}
// { title && <h1 className={s.header}>{title}</h1> }
                
// { descr && <p className={s.decr}>{descr}</p> }
// {children}
// {/* <img src={ReactLogoPng} alt="logo" /> */}
