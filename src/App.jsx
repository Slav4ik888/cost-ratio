import React from 'react';
import CostRatio from './pages/CostRatio/cost-ratio.jsx';
import Footer from './components/Footer/footer.jsx';
import s from './App.module.css';


export const App = () => {
    return (
        <div className={s.root}>
            <CostRatio />
            <Footer style={ { textAlign: 'center' } }> © 2020 Created by Slav4ik888 - version 2025-09-09</Footer>
        </div>
    );
}
