import React, { Component } from 'react'
import { toastr } from 'react-redux-toastr';
import Websocket from 'react-websocket';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { newLogTextChunk } from '../dashboard/dashboard-actions'

class AppLog extends Component {

    getLogText() {
        return this.props.selectedApp[this.props.tabId].logText
    }

    handleData(message) {
        this.props.newLogTextChunk(this.props.tabId, message)
    }

    handleOpen() {
        toastr.success('', 'Conexão Iniciada')
    }

    handleClose() {
        toastr.error('', 'Não foi possível conectar ao servidor, por favor verifique as informações da aplicação')
    }

    resolveUrl() {

        let pathName =`${window.location.pathname}`
            
        let port = process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? 
            80
            :
            3000
        
        return `ws://${window.location.hostname}:${port}${pathName}api/log?app=${this.props.id}`

    }

    render(){
        return <div className="col-sm-12 m-t-25">
            <pre id="box-log" className="box-log">
                {this.getLogText()}
            </pre>
            <Websocket url={this.resolveUrl()}
              debug={true}
              onMessage={this.handleData.bind(this)}
              onOpen={this.handleOpen.bind(this)}
              onClose={this.handleClose.bind(this)}/>
        </div>
    }

}

function mapStateToProps(state) {
    return {
        selectedApp: state.dashboardForm.selectedApp
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        newLogTextChunk
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppLog)