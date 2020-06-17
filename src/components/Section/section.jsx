import React from 'react';
import s from './section.module.css'; 


// children это деструктурированный ...props 
const Section = ({ children }) => {

    return (
        <>
        <div className={s.container}>
            <div className={s.section}>
                {children}
            </div>
        </div>
        </>
    )
}

export default Section;
