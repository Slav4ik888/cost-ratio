import React, { Component } from 'react';
import CostRatio from './pages/CostRatio/cost-ratio.jsx';
import Footer from './components/Footer/footer.jsx';

// import {Layout} from 'antd';

// import {ReactComponent as ReactLogoSvg} from './logo.svg';
// import {ReactComponent as wordsList} from './components/Cards/wordsList.js';

// const { Content, Footer } = Layout;

class App extends Component {

    render() {
        return (
            <>
                <CostRatio />
                <Footer style={{ textAlign: 'center' }}> © 2020 Created by Slav4ik888 - version 2020-07-06 15:00</Footer>
            </>
        );
    }
}

export default App;
