import axios from 'axios'
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize as initializeForm} from 'redux-form';

export const getApps = () => {

  const request = axios.get('api/app')

  return {
    type: 'APPS_FETCHED',
    payload: request
  }

}

export const selectApp = (payload, tabId) => {
  return {
    type: 'APP_SELECTED',
    payload: {
      data: payload,
      tabId
    }
  }
}

export const cacheSelectedTab = (tabId) => {
  return {
    type: 'CACHE_SELECTED_TAB',
    payload: {
      tabId
    }
  }
}

export const clearApp = (tabId) => {
  return {
    type: 'CLEAR_REQUESTED',
    payload: {
      tabId
    }
  }
}

export const openModalInputLines = () => {
  return {
    type: 'TOGGLE_INPUT_LINES_MODAL',
    payload: {
      opened: true
    }
  }
}

export const closeModalInputLines = () => {
  return {
    type: 'TOGGLE_INPUT_LINES_MODAL',
    payload: {
      opened: false
    }
  }
}

export const openModalConfirmDelete = () => {
  return {
    type: 'TOGGLE_MODAL_CONFIRM_DELETE_MODAL',
    payload: {
      opened: true
    }
  }
}

export const closeModalConfirmDelete = () => {
  return {
    type: 'TOGGLE_MODAL_CONFIRM_DELETE_MODAL',
    payload: {
      opened: false
    }
  }
}

export const newLogTextChunk = (tabId, newText) => {
  return {
    type: 'NEW_LOG_TEXT_CHUNK',
    payload: {
      tabId,
      newText
    }
  }
}

export const clearLogText = (tabId) => {
  return {
    type: 'CLEAR_LOG_TEXT',
    payload: {
      tabId
    }
  }
}

export const deleteLogFile = (appId, tabId) => {
  return (dispatch) => {
    axios.post('api/clear-log', { appId }).then(
      response => {
        toastr.success('', 'Operação Realizada Com Sucesso!')
        dispatch(clearLogText(tabId))
      },
      error => {
        toastr.error('', error.response.data.message)
      }
    )
  }
}

export const fetchAppLines = (app, payload) => {
  return (dispatch) => {
      axios.get('api/fetch-lines', { params: { app, qtdLines: payload.qtdLines } }).then(
        (response) => {
          let blob = new Blob([response.data], { type: 'text/plain' })
          let filename = response.headers['content-disposition'].split('filename=')[1].replace(/\"/g, '')
          
          let a = document.createElement('a')
          let fileURL = URL.createObjectURL(blob);
          a.href = fileURL;
          a.download = filename
          a.click()
          a.remove()

        },
        (error) => {
          dispatch([
            openModalInputLines(),
            initializeForm('inputLinesForm', payload),
            toastr.error('', error.response.data.message)
          ])
        }
      )
  }

}