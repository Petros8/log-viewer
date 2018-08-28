import React, { Component } from 'react';
import ReactToastr from 'react-redux-toastr';

import 'modules/react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { reduxForm } from 'redux-form';

export default class Notificator extends Component {

    render() {
        return <ReactToastr 
                    timeOut={3000} 
                    newestOnTop={false}
                    preventDuplicates={true}
                    position='top-right'
                    transitionIn='fadeIn'
                    transitionOut='fadeOut'/>
    }

}