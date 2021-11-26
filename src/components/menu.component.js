import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Icon from '../../assets/icons/app_icon.svg';
import Avatar from '../../assets/icons/avatar.svg';

const Menu = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                <img src={Icon} width="40" height="40" style={{margin: '8px'}} />
            </Link>
            <ul className="navbar-nav mr-auto"></ul>
            <span className="navbar-text" style={{padding: '20px', marginRight: '45px'}}>
                <div className="row">
                    <div className="text-right col-9">
                        <b>Jones, Human</b><br />
                        <small className="text-muted">Software Engineer</small>
                    </div>
                    <div className="col-3">
                        <img src={Avatar} className="img" width="50px" />
                    </div>
                    
                </div>
            </span>
        </nav>
    );
}

export default withRouter(Menu);