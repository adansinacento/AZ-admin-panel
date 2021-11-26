import React from 'react';

const Modal = ({modalId, title, target, btnText, btnContext, children}) => {
    return(
        <div id={modalId} className="modal fade">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-body" style={{padding: '30px 70px'}}>
                        <h4>{title}</h4>
                        {children}

                        <div className="row">
                            <button type="button" style={{margin: '0px 4px'}} className="btn btn-secondary col-sm-5" data-dismiss="modal">Close</button>
                            <button type="submit" form={target} style={{margin: '0px 4px'}} className={"col-sm-6 btn " + btnContext}>{btnText}</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );

    
}

export default Modal;