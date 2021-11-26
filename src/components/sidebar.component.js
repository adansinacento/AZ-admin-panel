import React from "react";
import { Link, withRouter } from "react-router-dom";

//icons for the menu
import ShipmentLogo from '../../assets/icons/shipments.svg';
import ShipmentActLogo from '../../assets/icons/shipments_active.svg';
import UsersLogo from '../../assets/icons/users.svg';
import UsersActLogo from '../../assets/icons/users_active.svg';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" }
    } else {
        return { color: "#FF00FF" }
    }
}

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
    return (
        <nav id="sidebar">
            <ul className="list-unstyled components">
                {
                    modules.map((module, i) => (
                        <li  key={i} style={{marginBottom: '8px'}}>
                            <div className="text-center">
                                <Link className="nav-link" to={module.url} style={isActive(history, module.url)}>
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