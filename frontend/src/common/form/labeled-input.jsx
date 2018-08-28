import React, { Component } from 'react';

import Grid from '../layout/grid';

export default class LabeledInput extends Component {

    render() {
        return <Grid sizes={this.props.cols}>
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input {...this.props.input} 
                    className="form-control"
                    required={this.props.required}
                    placeholder={this.props.placeholder} 
                    readOnly={this.props.readOnly}
                    type={this.props.type}
                    autoFocus={this.props.autoFocus}/>
            </div>
        </Grid>
    }

}