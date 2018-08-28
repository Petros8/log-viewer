import React, { Component } from 'react';

import Grid from '../layout/grid';

import 'react-select/dist/react-select.css';
import Select from 'react-select';

export default class LabeledSelect extends Component {

    generateOptions() {
        
        let { options } = this.props

        if(options && options.length > 0) {
            let mappedOptions = options.map(
                (element, index) => {
                    return {
                        value: element,
                        label: element.shortname + ' - ' + element.description
                    }
                }
            )

            mappedOptions.splice(0, 0, { value: '', label: 'Selecione Uma Aplicação' })
            return mappedOptions;
        }

        return []
    }

    render() {

        const { input } = this.props

        return <Grid sizes={this.props.cols}>
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <Select 
                    value={input.value}
                    onChange={input.onChange}
                    onBlur={() => input.onBlur(input.value)}
                    noResultsText="Nenhum Resultado Encontrado"
                    required={this.props.required} 
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
                    options={this.generateOptions()}>
                </Select>
            </div>
        </Grid>
    }

}