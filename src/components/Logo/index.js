import React from 'react';
import s from './Logo.module.css'; 

const Logo = () => {

    return (
        <>
            <div className={s.spin}>
                <div className={s.logo}>
                    EasyEnglish
                </div>
                    
                <div className={s.label}>
                    на React.JS
                </div>
            </div>
        </>
    )
}

export default Logo;