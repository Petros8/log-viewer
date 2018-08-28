import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import If from '../operator/if';

class TabContent extends Component {
    

    render() {

        const isTabSelected = this.props.tab.selected === this.props.id
        const isTabVisible = this.props.tab.visible[this.props.id]

        return <If condition="isTabVisible"> 
            <div id={this.props.id}
                    className={`tab-pane ${isTabSelected ? 'active' : ''}`}>
                {this.props.children}
            </div>
        </If>
    }

}

const mapStateToProps = (state) => {
    return {
        tab: state.tab
    }
}

export default connect(mapStateToProps)(TabContent)