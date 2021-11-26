import React from 'react';
import Layout from '../components/layout.component';
import Modal from '../components/modal.component';
import $ from 'jquery';

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

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: userData,
            editData: {
                id: 0, //default data
                name: '',
                mail: ''
            },
            deleteMail: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render(){
        return (
            <Layout>
                <div className="row">
                    <h2 className="col-md-9">Users</h2>
                    <div className="col-md-3">
                        <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#modalAdd">+ Add new user</button>
                    </div>
                </div>
                <table className="table table-hover table-borderless">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Mail</th>
                            <th>Date Added</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((user, i) => (
                                <tr className="table-light" key={i}>
                                    <td><img src={getImg(i)} /> {user.name}</td>
                                    <td>{user.mail}</td>
                                    <td>{user.date}</td>
                                    <td><img onClick={() => this.displayEditModal(user, i)} src={editIcon} /></td>
                                    <td><img onClick={() => this.displayRemoveModal(user.mail)} src={delIcon} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {/*Add new user modal*/}
                <Modal 
                    modalId="modalAdd"  
                    title="Add new user" 
                    target="form-add" 
                    btnText="Submit" 
                >
                    <form onSubmit={this.handleSubmit} id="form-add">
                        <div className="form-group">
                            <label>Add name user</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Add user's email</label>
                            <input type="email" className="form-control" />
                        </div>
                    </form>
                </Modal>

                {/*Edit row modal*/}
                <Modal modalId="modalEdit"  
                    title="Edit user" 
                    target="form-edit" 
                    btnText="Submit" >
                    <form onSubmit={this.handleUpdate} id="form-edit">
                        <input type="hidden" value={this.state.editData.id} name="id" />
                        <div className="form-group">
                            <label>Edit name user</label>
                            <input type="text" className="form-control" name="name" value={this.state.editData.name} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Edit user's email</label>
                            <input className="form-control" type="email" name="mail" value={this.state.editData.mail} onChange={this.handleChange} />
                        </div>
                    </form>
                </Modal>

                {/*Delete row modal*/}
                <Modal modalId="modalDelete"  
                    title="Delete User" 
                    target="form-del" 
                    btnText="Remove" >
                    <p>
                        Are you sure you want to delete this user?<br />
                        <b>{this.state.deleteMail}</b>
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
        const newUser = {
            id: this.state.users.length+1,
            date: new Date().toISOString().split('.')[0],
            name: e.target[0].value,
            mail: e.target[1].value,
        };
        //add to state
        this.setState(state => ({
            users: state.users.concat(newUser),
        }));
        //close modal
        $('#modalAdd').modal('hide');
    }
    
    displayEditModal = (data, i) => {
        this.setState(state => ({
            editData: data,
        }))
        $('#modalEdit').modal('show');
    
    }

    displayRemoveModal = (id) => {
        this.setState(state => ({
            deleteMail: id,
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
        var data = this.state.users.slice();
        var index = data.findIndex((s) => s.id == e.target[0].value);
        //parse the data into an obj
        var updated = {
            id: e.target[0].value,
            date: new Date().toISOString().split('.')[0],
            name: e.target[1].value,
            mail: e.target[2].value,
        };
        
        //modify obj in array (copy of)
        data[index] = updated;

        //set into the state
        this.setState({users: data});

        //close the modal
        $('#modalEdit').modal('hide');
    }

    handleDelete(e){
        e.preventDefault();

        var data = this.state.users.slice();
        var index = data.findIndex((u) => u.mail === this.state.deleteMail);

        data.splice(index, 1);

        //set into the state
        this.setState({users: data});

        //close the modal
        $('#modalDelete').modal('hide');
    }
}

export default Users;