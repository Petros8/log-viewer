import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectTab, newTab } from './tab-actions'

class TabsHeaders extends Component {

    render() {
        return <ul className="nav nav-tabs">
            {this.props.children}

            {
                this.props.buttonNew ? 
                <li>
                    <a href="javascript:;"
                        data-toggle="tab"
                        data-target={this.props.target}
                        onClick={() => { this.props.newTab() }}>
                        <i className={`fa fa-plus`}></i>
                    </a>
                </li>
                :
                null
            }

        </ul>
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( { selectTab, newTab } , dispatch);
}

export default connect(null, mapDispatchToProps)(TabsHeaders)