import React, { Component } from 'react';
import ptrainer from './ptrainer.png';
import './App.css';
import {Customers} from './components/Customers';
import {AllTrainings} from './components/Trainings';
import {TrainingCalendar} from './components/Calendar';
import {Navigator} from './components/Navigator';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ptrainer} className="App-logo" alt="logo" />
         
        </header>
        <BrowserRouter>
        <div>
          <Navigator/>
          <Switch>
            <Route exact path="/" render={()=> <h1>This is Personal Trainer website</h1>}/>
            <Route path="/customers" component={Customers}/>
            <Route path="/trainings" component={AllTrainings}/>
            <Route path="/calendar" component={TrainingCalendar}/>
            <Route render={()=><h1>Page not found</h1>}/>
          </Switch>
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
