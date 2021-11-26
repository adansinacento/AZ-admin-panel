import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ShipmentLogo from '../../assets/icons/shipments.svg';
import UsersLogo from '../../assets/icons/users.svg';
import '../../styles/style.home.css'

const Home = () => {

    return (
        <div className="container" id="home-container">
            <div className="row align-middle">
                <Link to="/shipments" className="home-links">
                    <div className="col-md-6" >
                        <div className="link-container">
                            <img src={ShipmentLogo} />
                        </div>
                        <h3>Shipments</h3>
                    </div>
                </Link>
                
                <div className="vertical-line"></div>
                <Link to="/users" className="home-links">
                    <div className="col-md-5">
                        <div className="link-container">
                            <img src={UsersLogo} />
                        </div>
                        <h3>Users</h3>
                    </div>
                </Link>
                
            </div>
        </div>
        
    );
}

export default withRouter(Home);