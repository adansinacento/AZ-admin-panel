import React from 'react';
import Layout from '../components/layout.component';
import Badge from '../components/badge.component';
import Modal from '../components/modal.component';
import $ from 'jquery';

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

        this.state = {
            shipments: shipData,
            editData: {
                id: '', //default data
                owner: 'Watson, Annete',
                status: 'Pending'
            },
            editIndex: 0,
            deleteId: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
                                <tr className="table-light" key={i}>
                                    <td>Shipment {ship.id}</td>
                                    <td>{ship.date}</td>
                                    <td><img src={getImg(i)} /> {ship.owner}</td>
                                    <td><Badge status={ship.status} /></td>
                                    <td><img onClick={() => this.displayEditModal(ship, i)} src={editIcon} /></td>
                                    <td><img onClick={() => this.displayRemoveModal(ship.id)} src={delIcon} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {/*Add new shipment modal*/}
                <Modal 
                    modalId="modalAdd"  
                    title="Add new shipment" 
                    target="form-add" 
                    btnText="Submit" 
                >
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

                {/*Edit row modal*/}
                <Modal modalId="modalEdit"  
                    title="Edit shipment" 
                    target="form-edit" 
                    btnText="Submit" >
                    <form onSubmit={this.handleUpdate} id="form-edit">
                        <div className="form-group">
                            <label>Edit Shipment ID</label>
                            <input type="text" className="form-control" name="id" value={this.state.editData.id} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Select Shipment Owner</label>
                            <select className="form-control" name="owner" value={this.state.editData.owner} onChange={this.handleChange} >
                                {
                                    userData.map((usr) =>(
                                        <option>{usr.name}</option>
                                    ))
                                } 
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Select Shipment Status</label>
                            <select className="form-control" name="status" value={this.state.editData.status} onChange={this.handleChange} >
                                {
                                    statusList.map((sts) =>(
                                        <option>{sts}</option>
                                    ))
                                } 
                            </select>
                        </div>
                    </form>
                </Modal>

                {/*Delete row modal*/}
                <Modal modalId="modalDelete"  
                    title="Delete shipment" 
                    target="form-del" 
                    btnText="Remove" >
                    <p>
                        Are you sure you want to delete this shipment?<br />
                        <b>{this.state.deleteId}</b>
                    </p>
                    {/*this form is kinda just a trigger to handle de deletion*/}
                    <form id="form-del" onSubmit={this.handleDelete}></form>
                </Modal>
            </Layout>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        //create new obj
        const newShip = {
            id: e.target[0].value,
            date: new Date().toISOString().split('.')[0],
            owner: e.target[1].value,
            status: e.target[2].value,
        };
        //add to state
        this.setState(state => ({
            shipments: state.shipments.concat(newShip),
        }));
        //close modal
        $('#modalAdd').modal('hide');
    }
    
    displayEditModal = (data, i) => {
        this.setState(state => ({
            editData: data,
            editIndex: i,
        }))
        $('#modalEdit').modal('show');
    
    }

    displayRemoveModal = (id) => {
        this.setState(state => ({
            deleteId: id,
        }))
        $('#modalDelete').modal('show');
    }

    handleChange = (e) => {
        this.setState({
            editData: {
                ...this.state.editData,
                [e.target.name]: e.target.value,
            }
        });
    }

    handleUpdate(e){
        e.preventDefault();
        //get the index of the register we are going to edit
        var index = this.state.editIndex;
        //parse the data into an obj
        var updated = {
            id: e.target[0].value,
            date: new Date().toISOString().split('.')[0],
            owner: e.target[1].value,
            status: e.target[2].value,
        };
        
        //modify obj in array (copy of)
        let updShipments = this.state.shipments.slice();
        updShipments[index] = updated;

        //set into the state
        this.setState({shipments: updShipments});

        //close the modal
        $('#modalEdit').modal('hide');
    }

    handleDelete(e){
        e.preventDefault();

        var data = this.state.shipments.slice();
        var index = data.findIndex((s) => s.id === this.state.deleteId);

        data.splice(index, 1);

        //set into the state
        this.setState({shipments: data});

        //close the modal
        $('#modalDelete').modal('hide');
    }
}

export default Shipments;