import React, { Component } from 'react';
import Calendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import Moment from 'react-moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

export class TrainingCalendar extends Component {
    constructor(props){
        super(props);
        this.state={
            trainingList: [],
            trainingEvents: []
        };
    }

    componentDidMount(){
        this.loadTrainings();

    }
    loadTrainings = async() => {
        const resTraining = await fetch('https://customerrest.herokuapp.com/api/trainings/');
        const resTrainingData = await resTraining.json();
        this.setState({
            trainingList: resTrainingData.content,
        });
        let events = [];
        this.state.trainingList.forEach((training) => {
            let event = {
                title: training.activity,
                start: new Date(moment(training.date)), 
                end: new Date(moment(training.date).add(training.duration, "m")),
                duration: training.duration,
            }
            events.push(event);
        });
        this.setState({trainingEvents: events});
    }

    selectEvent = (event) => {
        confirmAlert({           
            customUI: ({ onClose}) => 
                <div style={{backgroundColor: "#279dcd", color: "#f6f5fb", padding: 20, width: 400, borderRadius: "3px", textAlign: "center", fontSize: 18}}>
                    <p>Activity: {event.title}</p>
                    <p>Date: <Moment format="YYYY-MM-DD">{event.start}</Moment></p>
                    <p>Duration: {event.duration} min</p>
                    <button onClick={()=> onClose()} style={{backgroundColor: "#f6f5fb", color: "#279dcd"}}>Close</button>
                </div>
        })      
    }
  render() {    
    return (
      <div>
        <h1>Training Calendar</h1>
        <Calendar
            defaultView="month"
            events={this.state.trainingEvents}
            style={{ height: "100vh"}}
            selectable={true}
            popup={true}
            onSelectEvent={this.selectEvent}
        />
      </div>
    )
  }
};
