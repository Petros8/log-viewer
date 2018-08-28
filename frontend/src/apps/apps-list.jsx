import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getList, showUpdate, showDelete } from './apps-actions';


class AppsList extends Component {

    componentWillMount() {
        this.props.getList()
    }

    generateBody() {

        const { showUpdate, showDelete } = this.props

        return this.props.list.map(
            element => {
                return <tr key={element.id}>
                    <td className="text-center" style={ {width: '100px'} } >{element.shortname}</td>
                    <td>{element.description}</td>
                    <td>
                        <button type="button" className="btn btn-warning" onClick={() => showUpdate(element)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => showDelete(element)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            }
        )
    }

    render() {
        return <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sigla</th>
                        <th>Descrição</th>
                        <th className="td-actions">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    { this.generateBody() }
                </tbody>
            </table>
        </div>
    }

}

const mapStateToProps = state => {
    return {
        list: state.apps.list
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AppsList)