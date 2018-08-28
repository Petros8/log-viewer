import '../common/template/template-dependencies'
import React, {Component} from 'react'
import {HashRouter as Router} from 'react-router-dom'

import Header from '../common/template/header'
import SideBar from '../common/template/side-bar'
import Footer from '../common/template/footer'
import MainRoutes from './routes';

export default class App extends Component{

    render() {
        return <Router>
            <div className="wrapper">
                <Header></Header>
                <SideBar></SideBar>
                <div className="content-wrapper">
                    <MainRoutes/>
                </div>
                <Footer></Footer>
            </div>
        </Router>
    }

}