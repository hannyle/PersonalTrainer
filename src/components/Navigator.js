import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

export class Navigator extends React.Component{
    render(){
        return(
        <div>
            <nav className="navbar navbar-expand-lg  navbar-light bg-light">
                <button className="navbar-toggler navbar-toggler-right" type="button" 
                    data-toggle="collapse" data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to ="/">Personal Trainer</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/customers">Customers</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/trainings">All Trainings</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/calendar">Training Calendar</Link>
                    </li>
                 </ul >
                </div>
            </nav>
        </div>
        );
    }
}