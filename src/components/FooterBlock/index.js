import React from 'react';
import s from './FooterBlock.module.css';

import {ReactComponent as ReactLogoSvg} from '../../logo.svg';


const FooterBlock = ({ children }) => {

    return (
            <div className={s.cover}>
                <div className={s.wrap}>
                    <ReactLogoSvg />
                        {children}
                </div>
            </div>
    )
}


export default FooterBlock;


