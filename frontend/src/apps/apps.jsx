import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ContentHeader from '../common/template/content-header';
import Content from '../common/template/content';
import Tabs from '../common/tab/tabs';
import TabsContent from '../common/tab/tabs-content';
import TabsHeader from '../common/tab/tabs-header';
import TabHeader from '../common/tab/tab-header';
import TabContent from '../common/tab/tab-content';
import { selectTab, showTabs } from '../common/tab/tab-actions';
import BillingCycleList from './apps-list';
import BillingCycleForm from './apps-form';
import { create, update, remove} from './apps-actions';

class Apps extends Component {

    componentWillMount() {
        this.props.selectTab('tabList')
        this.props.showTabs('tabList', 'tabCreate')
    }

    render() {
        return <div>
            <ContentHeader title="Aplicações" subtitle="Cadastro" />
            <Content>
                <Tabs>
                    <TabsHeader>
                        <TabHeader label="Listar" icon="bars" target="tabList"/>
                        <TabHeader label="Incluir" icon="plus" target="tabCreate"/>
                        <TabHeader label="Alterar" icon="pencil" target="tabUpdate"/>
                        <TabHeader label="Excluir" icon="trash-o" target="tabDelete"/>
                    </TabsHeader>
                    <TabsContent>
                        <TabContent id="tabList">
                            <BillingCycleList />
                        </TabContent>
                        <TabContent id="tabCreate">
                            <BillingCycleForm onSubmit={this.props.create}
                                submitClass="primary" submitLabel="Incluir"/>
                        </TabContent>
                        <TabContent id="tabUpdate">
                            <BillingCycleForm onSubmit={this.props.update}
                                submitClass="warning" submitLabel="Alterar"/>
                        </TabContent>
                        <TabContent id="tabDelete">
                            <BillingCycleForm onSubmit={this.props.remove} readOnly={true}
                                submitClass="danger" submitLabel="Excluir"/>
                        </TabContent>
                    </TabsContent>
                </Tabs>
            </Content>
        </div>
    }

}

const mapDispatchToProps = dispatch => bindActionCreators({selectTab, showTabs, create, update, remove}, dispatch)

export default connect(null, mapDispatchToProps)(Apps)