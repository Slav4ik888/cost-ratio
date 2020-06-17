import React from 'react';
import s from './HeaderUp.module.css'; 



const HeaderUp = ({ children, size = '1', bcolor = false}) => {
    const styleCover = { 
        backgroundColor: (bcolor) ? '#c1e0e6' : '',
        boxShadow: (size === '1') ? '1px 2px 3px rgba(0, 0, 0, .3)' : '',
        fontSize: (size === '2') ? '32px' : '48px',
        fontWeight: (size === '2') ? '300' : 'bold',
    }
    
    return  (
        <>
            <div className={s.header} style={styleCover}>
                { children }
            </div>
            
        </>    
        )
};

export default HeaderUp;
