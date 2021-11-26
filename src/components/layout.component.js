import React from 'react';
import Menu from "./menu.component";
import Sidebar from './sidebar.component';
import '../../styles/style.css'

const Layout = ({children }) => {
    return (
        <div>
            <Menu />
            <div className="wrapper">
                <Sidebar />
                <div className="container" style={{marginTop: '25px'}} color='#afa7b3'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;