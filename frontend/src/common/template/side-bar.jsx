import React, { Component } from 'react'

import Menu from './menu'

export default class SideBar extends Component {

    render() {
        return <aside className="main-sidebar">
            <Menu></Menu>
        </aside>
    }

}   