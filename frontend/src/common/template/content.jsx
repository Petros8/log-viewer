import React, { Component } from 'react'

export default class Content extends Component {

    render() {
        return <section className="content">
            {this.props.children}
        </section>
    }

}