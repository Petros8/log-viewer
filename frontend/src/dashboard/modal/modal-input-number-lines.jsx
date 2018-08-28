import React, { Component } from 'react'
import Modal from 'react-modal'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Grid from '../../common/layout/grid'
import LabeledInput from '../../common/form/labeled-input'

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

class ModalInputNumberLines extends Component {

    componentDidMount() {
        setTimeout(() => {console.log(this.mainInput)}, 100)
    }

    render() {
        return <Modal
            isOpen={true}
            onAfterOpen={this.props.onAfterOpen}
            onRequestClose={this.props.onRequestClose}
            style={customStyles}
        >
            <Grid sizes="12">
                <form name="inputLinesForm"
                    onSubmit={this.props.handleSubmit(
                        (payload) => {
                            this.props.onRequestClose(payload)
                        }
                    )}>
                    <Field 
                    ref={(input) => { this.mainInput = input}} 
                    name='qtdLines' component={LabeledInput} 
                    autoFocus={true}
                    required={true} label="Quantidade de Linhas"
                    type="number" cols="12" options={this.props.apps}
                    />
                    <div className="col-sm-12 text-right">
                        <button className="btn btn-primary">
                            Enviar
                        </button>
                    </div>
                </form>
            </Grid>
        </Modal>
    }

}

const decoratedForm = reduxForm({ form: 'inputLinesForm' })(ModalInputNumberLines)

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(null, null)(decoratedForm)