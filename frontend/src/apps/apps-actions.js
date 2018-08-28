import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize as initializeForm} from 'redux-form';
import { selectTab, showTabs } from '../common/tab/tab-actions';

const INITIAL_VALUES = {}

export function getList() {

    const request = axios.get(`api/app`)

    return {
        type: 'APPS_FETCHED',
        payload: request
    }

}

export function create(payload) {
    return dispatch => {
        axios.post(`api/app`, payload).then(
            (response) => {
                toastr.success('Sucesso', 'Operação Realizada Com Sucesso!')
                dispatch(init())
            },
            (error) => {
                toastr.error('Error', error.response.data.message)
            }
        )
    }


}

export function update(payload) {
    return dispatch => {
        axios.put(`api/app`, payload).then(
            (response) => {
                toastr.success('Sucesso', 'Operação Realizada Com Sucesso!')
                dispatch(init())
            },
            (error) => {
                toastr.error('Error', error.response.data.message)
            }
        )
    }
}

export function remove(payload) {
    return dispatch => {
        axios.delete(`api/app/${payload.id}`, payload).then(
            (response) => {
                toastr.success('Sucesso', 'Operação Realizada Com Sucesso!')
                dispatch(init())
            },
            (error) => {
                toastr.error('Error', error.response.data.message)
            }
        )
    }
}

export function showUpdate(app) {

    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initializeForm('appsForm', app)
    ]

}

export function showDelete(app) {

    app.password = 'placeholder'

    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initializeForm('appsForm', app)
    ]

}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initializeForm('appsForm', INITIAL_VALUES)
    ]
}
