import React, { Component } from 'react'

import MenuItem from './menu-item'
import MenuTree from './menu-tree'

export default class Menu extends Component {

    render() {
        return <ul className="sidebar-menu" data-widget="tree">
            <MenuItem path="/" label="Visualizar Logs" icon="dashboard"/>
            <MenuTree label="Cadastro" icon="edit" >
                <MenuItem path="apps" label="Aplicações" icon="television"/>
            </MenuTree>
        </ul>
    }

}