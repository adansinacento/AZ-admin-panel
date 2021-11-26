import React from "react";

const Badge = (props) => {

    const contextualClass = () => {
        switch (props.status){
            case 'Pending':
                return 'badge badge-warning';
            case 'Delivered':
                return 'badge badge-success';
            default:
                return 'badge badge-secondary';
        }
    }

    return(
        <span className={contextualClass()} style={{width: '100%'}}>{props.status}</span>
    );
}

export default Badge;