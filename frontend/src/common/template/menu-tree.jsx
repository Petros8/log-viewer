import React, { Component } from 'react'

export default class MenuTree extends Component {

    render() {
        return <li className="treeview">
            <a href="#">
                <i className={`fa fa-${this.props.icon}`}></i> 
                <span>{this.props.label}</span>
                <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right"></i>
                </span>
            </a>
            <ul className="treeview-menu">
                {this.props.children}
            </ul>
        </li>
    }

}