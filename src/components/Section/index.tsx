import React from 'react';
import './section1.scss'; 


// children это деструктурированный ...props 
const Section: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

    return (
        <>
        <div className="container">
            <div className="section">
                {children}
            </div>
        </div>
        </>
    )
}

export default Section;
