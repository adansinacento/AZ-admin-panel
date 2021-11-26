import React from "react";
import { Link, withRouter } from "react-router-dom";

//icons for the menu
import ShipmentLogo from '../../assets/icons/shipments.svg';
import ShipmentActLogo from '../../assets/icons/shipments_active.svg';
import UsersLogo from '../../assets/icons/users.svg';
import UsersActLogo from '../../assets/icons/users_active.svg';

const getLogo = (history, elem) => {
    if (history.location.pathname === elem.url){
        return elem.logoActive;
    } else {
        return elem.logo;
    }
}

let modules = [
    {
        url: "/shipments",
        text: "Shipments",
        logo: ShipmentLogo,
        logoActive: ShipmentActLogo,
    },
    {
        url: "/users",
        text: "Users",
        logo: UsersLogo,
        logoActive: UsersActLogo
    }
];

const Sidebar = ({history}) => {
    const isActive = (history, path) => {
        return (history.location.pathname === path) ?
            'active' : 
            '';
    }

    return (
        <nav id="sidebar">
            <ul className="list-unstyled components">
                {
                    modules.map((module, i) => (
                        <li  key={i} style={{marginBottom: '8px'}} className={isActive(history, module.url)}>
                            <div className="text-center sidebar-menu">
                                <Link className="nav-link" to={module.url}>
                                    <img src={getLogo(history, module)} alt={module.text} className="img-fluid" />
                                </Link>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}

export default withRouter(Sidebar);