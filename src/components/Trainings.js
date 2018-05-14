import React, { Component } from 'react';
import '../App.css';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Moment from 'react-moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { ToastContainer, toast } from 'react-toastify';
import {AddTraining} from './AddTraining';
import moment from 'moment';

export class AllTrainings extends Component {
    constructor(props){
        super(props);
        this.state={trainings: []};
    }
    componentDidMount(){
        this.loadTrainings();
    }

    loadTrainings = async() => {
        try{
            const responseTraining = await fetch('https://customerrest.herokuapp.com/gettrainings');
            const responseTrainingData = await responseTraining.json();                     
            this.setState({
                trainings: responseTrainingData,
            });             
        }
        catch(err){
            console.error(err);
        }          
    }
   
    onDelClick = (idLink) => {
        confirmAlert({
          title: '',
          message: 'Are you sure you want to delete this?',
          buttons: [
            {
              label: 'OK',
              onClick: () =>  {
              fetch('https://customerrest.herokuapp.com/api/trainings/' + idLink, {method: 'DELETE'})
              .then(res => this.loadTrainings())
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
    addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(training)
          })
          .then(res =>
            this.loadTrainings())
    }
    render() {
        return (
        <div className="App">
            <h1>Customers' Trainings</h1>
            <AddTraining addTraining={this.addTraining} />
            <ReactTable
                data={this.state.trainings}
                columns={[
                    {
                        accessor: "id",
                        show: false,
                    },
                    {
                        Header: "Customer",
                        columns: [
                            {
                                Header: "Firstname",
                                accessor: "customer.firstname",
                            },
                            {
                                Header: "Lastname",
                                accessor: "customer.lastname",
                            }
                        ]
                    },
                    {
                        Header: "Training",
                        columns: [
                            {
                                Header: "Date",
                                accessor: "date",
                                Cell: props => <Moment format="YYYY-MM-DD">{props.value}</Moment>
                            },
                            {
                                Header: "Duration",
                                accessor: "duration",   
                            },
                            {
                                Header: "Activity",
                                accessor: "activity",   
                            },                          
                        ]
                    },                   
                    {
                        id: 'Delete',
                        sortable: false,
                        filterable: false,
                        width: 100,
                        accessor: 'id',
                        Cell: ({value}) => (<button className="btn btn-danger" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
                    }
                ]}
                filterable
                className="-striped"
            />
        </div>
        )
    }
};
