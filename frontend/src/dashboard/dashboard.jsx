import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { cacheSelectedTab } from './dashboard-actions'
import { selectTab, showTabs } from '../common/tab/tab-actions';
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabs-header'
import TabHeader from '../common/tab/tab-header'
import TabsContent from '../common/tab/tabs-content'
import TabContent from '../common/tab/tab-content'
import ContentHeader from '../common/template/content-header';
import Content from '../common/template/content';
import DashboardForm from './dashboard-form'

class Dashboard extends Component{

    tabExists(tabId) {
        for(let x = 0; this.props.tabs; x++) {
            if(this.props.tabs[x].id === tabId){
                return true
            }
        }
        return false
    }

    tabToSelect() {
        if(this.props.cacheTab && this.tabExists(this.props.cacheTab)) {
            return this.props.cacheTab
        } else if (this.props.tabs.length > 0) {
            return this.props.tabs[this.props.tabs.length -1].id
        }
    }

    componentWillMount() {
        this.props.selectTab(this.tabToSelect())
    }

    componentDidUpdate() {
        let tabToSelect = this.tabToSelect();
        if(tabToSelect) {
            this.props.selectTab(tabToSelect)
        }
    }

    renderHeaders(){
        return this.props.tabs.map(
            (element) => {
                return <TabHeader
                            closeable={true}
                            key={element.id}
                            label={element.name}
                            neverHide={true}
                            icon="television" 
                            target={element.id}
                        />
            }
        )
    }

    renderContents(){
        return this.props.tabs.map(
            (element) => {
                return <TabContent 
                            key={element.id}
                            id={element.id}
                        >
                            <DashboardForm form={`selectAppForm:${element.id}`}/>
                        </TabContent>
            }
        )
    }

    render() {
        return <div>
            <ContentHeader title='Visualizar Logs' subtitle='Versão 1.3'/>
            <Content>
                <Tabs>
                    <TabsHeader buttonNew={true}>
                        {this.renderHeaders()}
                    </TabsHeader>
                    <TabsContent>
                        {this.renderContents()}
                    </TabsContent>
                </Tabs>
            </Content>
        </div>
    }

}

function mapStateToProps(state) {
    return {
        tabs: state.dashboard.tabs,
        cacheTab: state.dashboard.cachedTab
    }
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({ selectTab, showTabs, cacheSelectedTab }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(Dashboard)