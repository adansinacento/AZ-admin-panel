import React from 'react';
import Layout from '../components/layout.component';
import Badge from '../components/badge.component';
import Modal from '../components/modal.component';

import shipData from '../../assets/mocks/fec_shipments.json';
import userData from '../../assets/mocks/fec_users.json';
import delIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
//user images
import avatar from '../../assets/icons/avatar.svg';
import avatar2 from '../../assets/icons/avatar2.svg';
import avatar3 from '../../assets/icons/avatar3.svg';

let statusList = Array('Pending', 'Delivered', 'Draft');

const getImg = (i) =>{
    var arr = Array(avatar, avatar2, avatar3); //put everithing in an array

    //select a random elem from array
    return arr[i % arr.length];
}

class Shipments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {shipments: shipData};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return (
            <Layout>
                <div className="row">
                    <h2 className="col-md-9">Shipments</h2>
                    <div className="col-md-3">
                        <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#modalAdd">+ New Shipment</button>
                    </div>
                </div>
                <table className="table table-hover table-borderless">
                    <thead>
                        <tr>
                            <th>Shipment ID</th>
                            <th>Date</th>
                            <th>Owner</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.shipments.map((ship, i) => (
                                <tr className="table-light">
                                    <td>Shipment {ship.id}</td>
                                    <td>{ship.date}</td>
                                    <td><img src={getImg(i)} /> {ship.owner}</td>
                                    <td><Badge status={ship.status} /></td>
                                    <td><img src={editIcon} /></td>
                                    <td><img src={delIcon} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <Modal modalId="modalAdd" title="Add new shipment" target="form-add" btnText="Add" btnContext="btn-primary">
                    <form onSubmit={this.handleSubmit} id="form-add">
                        <div className="form-group">
                            <label>Add Shipment ID</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Select Shipment Owner</label>
                            <select className="form-control" >
                                {
                                    userData.map((usr) =>(
                                        <option>{usr.name}</option>
                                    ))
                                } 
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Select Shipment Status</label>
                            <select className="form-control" >
                                {
                                    statusList.map((sts) =>(
                                        <option>{sts}</option>
                                    ))
                                } 
                            </select>
                        </div>
                    </form>
                </Modal>
            </Layout>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const newShip = {
            id: e.target[0].value,
            date: new Date().toISOString().split('.')[0],
            owner: e.target[1].value,
            status: e.target[2].value,
        };

        this.setState(state => ({
            shipments: state.shipments.concat(newShip),
        }));
      }
    
}

export default Shipments;