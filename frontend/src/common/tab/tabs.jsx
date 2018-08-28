import React, { Component } from 'react'

export default class Tabs extends Component {

    render() {
        return <div className="nav-tabs-custom">
            {this.props.children}
        </div>
    }

}