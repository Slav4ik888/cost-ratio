import React, { Component } from 'react';
import s from './App.module.css';
import cl from 'classnames';

import Tasks from './pages/Tasks';

import { Spin, Layout } from 'antd';

// import {ReactComponent as ReactLogoSvg} from './logo.svg';
// import {ReactComponent as wordsList} from './components/Cards/wordsList.js';

const { Content, Footer } = Layout;


class App extends Component {

    render() {

        return (
            <>
                <div className={s.container}>
                    <div className={s.header}>
                        
                        <Layout>
                            <Content>
                               <Tasks />
                            </Content>
                            <Footer style={{ textAlign: 'center' }}> © 2020 Created by Slav4ik888</Footer>
                        </Layout>
                    </div>
                </div>

            </>
        );
    }
}

export default App;
