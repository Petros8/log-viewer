import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectTab, closeTab } from './tab-actions';
import If from '../operator/if';

class TabHeader extends Component {

    render() {

        const isSelectedTab = this.props.tab.selected === this.props.target
        const isTabVisible = this.props.tab.visible[this.props.target] || this.props.neverHide

        return <If condition={isTabVisible} > 
            <li className={isSelectedTab ? 'active posRelative' : 'posRelative'}>
                <a data-toggle="tab" data-target={this.props.target} onClick={() => { this.props.selectTab(this.props.target) }} className="p-r-30" href="javascript:;">
                    <i className={`fa fa-${this.props.icon}`}></i> {this.props.label}
                </a>
                {
                    this.props.closeable ?
                    <button onClick={() => { this.props.closeTab(this.props.target) }} type="button" className="btn btn-box-tool">
                        <i className="fa fa-times"></i>
                    </button>
                    :
                    null
                }
            </li>
        </If>
    }

}

const mapStateToProps = (state) => {
    return {
        tab: state.tab
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({selectTab, closeTab}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TabHeader)