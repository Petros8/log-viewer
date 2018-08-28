import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { init } from './apps-actions';
import LabeledInput from '../common/form/labeled-input';

class AppsForm extends Component {

    render() {
        const { handleSubmit } = this.props
        return <form role="form" onSubmit={handleSubmit}>
            <div className="box-body">
                <Field name='shortname' component={LabeledInput} 
                    label="Sigla" maxlength="5" cols="6" placeholder="Informe uma Sigla"
                    required={true} readOnly={this.props.readOnly}/>
                <Field name='host' component={LabeledInput} 
                    label="Host" cols="6" maxlength="30" placeholder="Informe o Host" 
                    type="text" required={true} readOnly={this.props.readOnly}/>
                <Field name='description' maxlength="50" component={LabeledInput} 
                    label="Descrição" required={true} cols="12" placeholder="Informe Uma Descrição" 
                    type="text" readOnly={this.props.readOnly}/>
                <Field name='login' required={true} component={LabeledInput} 
                    label="Login" cols="6" maxlength="30" placeholder="Informe o Login" 
                    type="text" readOnly={this.props.readOnly}/>
                <Field name='password' required={true} component={LabeledInput} 
                    label="Senha" cols="6" maxlength="30" placeholder="Informe a Senha" 
                    type="password" readOnly={this.props.readOnly}/>
                <Field name='logLocation' required={true} component={LabeledInput} 
                    label="Caminho do Arquivo de LOG" cols="12" maxlength="200" placeholder="Informe o Caminho do Arquivo de Log" 
                    type="text" readOnly={this.props.readOnly}/>
            </div>
            <div className="box-footer">
                <button type="submit" className={`btn btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
                <button type="button" className="btn btn-default" onClick={this.props.init}>Cancelar</button>
            </div>
        </form>
    }

}

const decoratedForm = reduxForm({form: 'appsForm'})(AppsForm)

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)

export default connect(null, mapDispatchToProps)(decoratedForm)