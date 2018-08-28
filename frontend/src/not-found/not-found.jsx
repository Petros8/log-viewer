import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '../common/layout/grid'

export default class NotFound extends Component {

    render() {
        return <div style={ {marginTop: '100px'} }>
            <Grid sizes='3'>
            </Grid>
            <Grid sizes='3'>
                <h4 style={ {marginTop: '100px'}}>Página não encontrada</h4>
                <Link to="/">Voltar para a página principal</Link>
            </Grid>
            <Grid sizes='6'>
                <img className="img-responsive" src="img/monkey-error.png"/>
            </Grid>
        </div>
    }

}