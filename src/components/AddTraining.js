import React, { Component } from 'react';
import SkyLight from 'react-skylight';

export class AddTraining extends Component {
    constructor(props){
        super(props);
        this.state={
            date:'',
            duration: '',
            activity: '',
            customer: '', 
            customers: []                   
        }
    }
    componentDidMount(){
        this.loadCustomers();
    }
    loadCustomers = async() => {
        try{
           const response = await fetch('https://customerrest.herokuapp.com/api/customers');
           const responseData = await response.json();
           this.setState({
               customers: responseData.content,
           }); 
        }
        catch(err){
            console.error(err);
        }
    }
    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let newTraining = {
            date: this.state.date, 
            duration: this.state.duration, 
            activity: this.state.activity,
            customer: this.state.customer                      
        };
        this.props.addTraining(newTraining);
        
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
     let customerValues = this.state.customers.map((customer) =>
        <option key={customer.id} value={customer.links[0].href}>{customer.firstname} {customer.lastname}</option>
 );
    return (
      <div>
        <SkyLight dialogStyles={addCustomerDialog} hideOnOverlayClicked ref="simpleDialog">
            <div className="card" style={{"width": "95%"}} >
                <div className="card-body">
                    <h5 className="card-title">New Training</h5>
                    <form>
                        <div className="form-group" >
                            <input className="form-control" type="date" placeholder="Date" name="date" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="number" placeholder="Duration" name="duration" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Activity" name="activity" onChange={this.handleChange}/>
                        </div> 
                        <div className="form-group">
                            <select className="form-control" name="customer" onChange={this.handleChange}>
                                {customerValues}
                            </select>
                            </div>                       
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>   
                        </div>

                    </form>
                </div>
            </div>
        </SkyLight>
        <div className="col-md-2">
            <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>Add Training</button>
        </div>
      </div>
    )
  }
};
