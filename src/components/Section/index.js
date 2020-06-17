import React from 'react';
import s from './Section.module.css'; 


// children это деструктурированный ...props 
const Section = ({ hideBackground = false, fullHeight = false, children }) => {

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

export default Section;
