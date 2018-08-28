import React, { Component } from 'react'

export default class TabsContents extends Component {

    render() {
        return <div className="tab-content">
            {this.props.children}
        </div>
    }

}