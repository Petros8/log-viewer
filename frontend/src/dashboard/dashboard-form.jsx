import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { getApps, selectApp, clearApp, openModalInputLines, closeModalInputLines, fetchAppLines, deleteLogFile, openModalConfirmDelete, closeModalConfirmDelete } from './dashboard-actions'
import LabeledSelect from '../common/form/labeled-select'
import AppLog from './app-log'
import ModalInputNumberLines from './modal/modal-input-number-lines'
import ModalConfirm from './modal/modal-confirm'

class DashboardForm extends Component {

    componentWillMount() {
        if(!this.isAppSelected()) {
            this.props.getApps()
        }
    }

    closeModal(payload) {
        if(payload.qtdLines) {
            this.props.fetchAppLines(this.props.selectedApp[this.getTabId()], payload)
        }
        this.props.closeModalInputLines()
    }

    getTabId() {
        return this.props.form.split(':')[1]
    }

    closeModalConfirm() {
        this.props.deleteLogFile(this.props.selectedApp[this.getTabId()].id, this.getTabId())
        this.props.closeModalConfirmDelete()
    }

    isAppSelected() {
        let selectedApp = this.props.selectedApp[this.getTabId()]
        return selectedApp && selectedApp.id ? true : false
    }

    getAppObjectById(id) {
        for(let x = 0; x < this.props.apps.length; x++) {
            if(this.props.apps[x].id === id){
                return this.props.apps[x]
            }
        }
    }

    render() {
        return <form name={this.props.form} 
            onSubmit={this.props.handleSubmit(
                (payload) => { 
                    this.props.selectApp(payload.app.value, this.getTabId()) 
                } 
            )}>
            
            <div className="box-body">
                <Field name='app' component={LabeledSelect} 
                    disabled={this.isAppSelected()} required={true} label="Aplicação" 
                    cols="12" options={this.props.apps}
                />
                <div className="col-sm-12 text-right">
                    {!this.isAppSelected() ? 
                        <button type="submit" className="btn btn-primary" >
                            Selecionar
                        </button>
                        :
                        <div>
                            <button onClick={() => { this.props.openModalInputLines() }} type="button" className="btn btn-primary" >
                                Baixar Log
                            </button>
                            <button onClick={() => { this.props.openModalConfirmDelete() }} type="button" className="btn btn-warning">
                                Limpar Arquivo de Log
                            </button>
                            <button onClick={() => { this.props.clearApp(this.getTabId()); this.props.reset() }} type="button" className="btn btn-danger" >
                                Cancelar
                            </button>
                        </div>
                    }
                </div>
                {
                    this.isAppSelected() ?
                    <AppLog id={this.props.selectedApp[this.getTabId()].id} tabId={this.getTabId()}/>
                    :
                    null
                }
                {
                    this.props.showInputLineModal ? 
                        <ModalInputNumberLines
                            onRequestClose={this.closeModal.bind(this)} />
                        :
                        null
                }
                {
                    this.props.showConfirmDeleteModal ? 
                        <ModalConfirm
                            onRequestClose={this.closeModalConfirm.bind(this)}
                            title="Deseja realmente limpar o arquivo de log?"
                            confirmButtonText="Sim"
                            cancelButtonText="Não" 
                        />
                        :
                        null
                }
            </div>
            
        </form>
    }

}

const decoratedForm = reduxForm({
    destroyOnUnmount: false
})(DashboardForm)

function mapStateToProps(state) {
    return {
        apps: state.dashboardForm.apps,
        selectedApp: state.dashboardForm.selectedApp,
        showInputLineModal: state.dashboard.showInputLineModal,
        showConfirmDeleteModal: state.dashboardForm.showModalConfirmDelete
    }
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({
        getApps, selectApp, 
        clearApp, openModalInputLines,
        closeModalInputLines,
        fetchAppLines,
        openModalConfirmDelete,
        closeModalConfirmDelete,
        deleteLogFile}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(decoratedForm) 