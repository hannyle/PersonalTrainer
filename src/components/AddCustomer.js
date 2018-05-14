import React, { Component } from 'react';
import SkyLight from 'react-skylight';

export class AddCustomer extends Component {
    constructor(props){
        super(props);
        this.state={
            fname: '',
            lname: '',
            address: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        };
    }
    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        let newCustomer = {
            firstname: this.state.firstname, 
            lastname: this.state.lastname, 
            streetaddress: this.state.address, 
            postcode: this.state.postcode, 
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        };
        this.props.addCustomer(newCustomer);    
        this.props.loadCustomers();
        this.refs.simpleDialog.hide();    
    }

    render() {
        const addCustomerDialog = {
            width: '60%',
            left: "45%",           
            top: "40%",
            backgroundColor: "#eee2e4",
            color: "#279dcd",
            borderRadius: "3px",
         };
        
    return (
      <div>
        <SkyLight dialogStyles={addCustomerDialog} hideOnOverlayClicked ref="simpleDialog">
            <div className="card" style={{"width": "95%"}} >
                <div className="card-body">
                    <h5 className="card-title">New Customer</h5>
                    <form>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="First name" name="firstname" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Last name" name="lastname" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Address" name="address" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Post code" name="postcode" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="City" name="city" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Email" name="email" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Phone" name="phone" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>   
                        </div>   
                    </form>
                </div>
            </div>
        </SkyLight>
        <div className="col-md-2">
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>New Customer</button>
        </div>
      </div>
    )
  }
};
