import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    
    render() {
        return <header className="main-header">
            <Link to="/" className="logo">
                <span className="logo-mini"><b>LOG</b></span>
                <span className="logo-lg">
                    <i className="fa fa-newspaper-o"></i>
                    <b> Log Viewer</b>
                </span>
            </Link>
            <nav className="navbar navbar-static-top">
                <a className="sidebar-toggle" data-toggle="push-menu"></a>
            </nav>
        </header>
    }

}