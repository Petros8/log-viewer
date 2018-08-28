import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import dashboardReducer from '../dashboard/dashboard-reducer';
import dashboardFormReducer from '../dashboard/dashboard-form-reducer';
import tabReducer from '../common/tab/tab-reducer';
import appsReducer from '../apps/apps-reducer';

const ROOT_REDUCER = combineReducers({
    dashboard: dashboardReducer,
    dashboardForm: dashboardFormReducer,
    tab: tabReducer,
    apps: appsReducer,
    form: formReducer,
    toastr: toastrReducer
})

export default ROOT_REDUCER