import React, { Component } from 'react';
import '../App.css';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { ToastContainer, toast } from 'react-toastify';
import {AddCustomer} from './AddCustomer';


export class Customers extends Component {
    constructor(props){
        super(props);
        this.state={
            customers: [],
            isSelected: {},
            selectAll: 0,
               
        };
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

    addCustomer(customer) {
        fetch('https://customerrest.herokuapp.com/api/customers', 
        {   method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        })
        .then(res => this.loadCustomers())
        .catch(err => console.error(err))
      }

    updateCustomer(customer, link) {
        fetch(link, 
        { method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customer)
        })
        .then(
          toast.success("Changes saved", {
            position: toast.POSITION.BOTTOM_LEFT
          })         
        )
        .catch( err => console.error(err))
      }

    editValue = (cellInfo) => {
        return (
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.customers];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ customers: data });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.customers[cellInfo.index][cellInfo.column.id]
            }}                
          />
        );
    }

    onDelClick = (idLink) => {
        confirmAlert({
          title: '',
          message: 'Are you sure you want to delete this?',
          buttons: [
            {
              label: 'OK',
              onClick: () =>  {
              fetch(idLink, {method: 'DELETE'})
              .then(res => this.loadCustomers())
              .catch(err => console.error(err))
              toast.success("Delete succeed", {
                position: toast.POSITION.BOTTOM_LEFT
              });     
            }           
          },
            {
              label: 'CANCEL'
            }
          ]                        
        });  
      }
      
    toggleRow(firstName) {
		const newSelected = Object.assign({}, this.state.isSelected);
		newSelected[firstName] = !this.state.isSelected[firstName];
		this.setState({
			isSelected: newSelected,
			selectAll: 2
		});
    }
    toggleSelectAll() {
		let newSelected = {};
		if (this.state.selectAll === 0) {
			this.state.customers.forEach(x => {
				newSelected[x.firstname] = true;
			});
		}

		this.setState({
			isSelected: newSelected,
			selectAll: this.state.selectAll === 0 ? 1 : 0
		});
    }

    onDelete=() => {
        if(this.state.selectAll === 1){
            this.setState({
                customers: []
            })
        }
    }
    
    render() {
        return (
        <div className="App">
            <h1>Customers</h1>
            <div style={{borderWidth: 1}}>
                <AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers}/>
                <button className="btn btn-warning" style={{marginLeft: "-1050px", width: 140}} onClick={() => this.onDelete()}>Delete</button> 
            </div> 
                <ReactTable
                    data={this.state.customers}
                    columns = {[
                        {
                            accessor: "links[0].href",
                            show: false,
                        },                       
                                              
                        {
                            Header: "Name",
                            columns: [
                                {
                                    id: 'checkbox',
                                    sortable: false,
                                    filterable: false,
                                    width: 100,
                                    accessor: 'links[0].href',
                                    Cell: ({row}) => (
                                        <div className="radio">
                                            <label>
                                            <input className="checkbox" type="checkbox" checked={this.state.isSelected[row.firstname]=== true} 
                                                    onChange={() => this.toggleRow(row.firstname)} />
                                            </label>
                                        </div>
                                    ),
                                    Header: x => {
                                        return (
                                            <label>                                                 
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                checked={this.state.selectAll === 1}
                                                ref={input => {
                                                    if (input) {
                                                        input.indeterminate = this.state.selectAll === 2;
                                                    }
                                                }}
                                                onChange={() => this.toggleSelectAll()}
                                            />
                                            </label>
                                        );
                                    },
                                },

                                {
                                    Header: "Firstname",
                                    accessor: "firstname",
                                    Cell: this.editValue                                
                                },
                                {
                                    Header: "Lastname",
                                    accessor: "lastname",
                                    Cell: this.editValue 
                                }
                            ]
                        },
                        {
                            Header: "Location",
                            columns: [
                                {
                                    Header: "Address",
                                    accessor: "streetaddress",
                                    Cell: this.editValue 
                                },
                                {
                                    Header: "Post code",
                                    accessor: "postcode",
                                    Cell: this.editValue 
                                },
                                {
                                    Header: "City",
                                    accessor: "city",
                                    Cell: this.editValue 
                                }
                            ]
                        },
                        {
                            Header: "Contact",
                            columns: [
                                {
                                    Header: "Email",
                                    accessor: "email",
                                    Cell: this.editValue 
                                },
                                {
                                    Header: "Phone",
                                    accessor: "phone",
                                    Cell: this.editValue 
                                }
                            ]
                        },
                        {
                            id: 'save',
                            sortable: false,
                            filterable: false,
                            width: 100,
                            accessor: 'links[0].href',
                            Cell: ({value, row}) => (<button className="btn btn-default btn-link" onClick={()=>{this.updateCustomer(row, value)}}>Save</button>)
                          },     
                        {
                            id: 'delete',
                            sortable: false,
                            filterable: false,
                            width: 100,
                            accessor: 'links[0].href',
                            Cell: ({value}) => (<button className="btn btn-danger" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
                        }                      
                    ]}
                    filterable
                />           
        </div>
        )
    }
    };
