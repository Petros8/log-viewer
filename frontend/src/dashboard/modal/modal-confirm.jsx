import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../../common/layout/grid'
import { deleteLogFile, closeModalConfirmDelete } from '../dashboard-actions'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      width                 : '400px',
      maxWidth              : '400px',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class ModalConfirm extends Component {

    render() {
        return <Modal
            isOpen={true}
            onAfterOpen={this.props.onAfterOpen}
            onRequestClose={this.props.onRequestClose}
            style={customStyles}
        >
            <Grid sizes="12">
                <h3>{this.props.title}</h3>
            </Grid>
            <Grid sizes="12" >
            <div className="text-center m-t-25">
                <button style={{padding: '6px 25px'}} onClick={ this.props.onRequestClose } className="btn btn-primary">
                    {this.props.confirmButtonText}
                </button>
                <button style={{padding: '6px 25px'}} onClick={ () => this.props.closeModalConfirmDelete() } className="btn btn-default">
                    {this.props.cancelButtonText}
                </button>
            </div>
            </Grid>
        </Modal>
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteLogFile,
        closeModalConfirmDelete
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(ModalConfirm)