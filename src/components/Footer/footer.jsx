import React from 'react';
import s from './footer.module.css';


const Footer = ({ children }) => {

    return (
            <div className={s.cover}>
                <div className={s.wrap}>
                    {children}
                </div>
            </div>
    )
}


export default Footer;


