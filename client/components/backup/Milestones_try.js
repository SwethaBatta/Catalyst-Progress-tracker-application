//client/components/Update.js
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  AddNewTask  from './AddNewTask';
import  AddNewRow from './AddNewRow';
import  ToDoAppList  from './ToDoAppList';

var querystring = require('querystring');
var totalVec = [];
export default class Milestones extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks : ["Task1", "Task2", "Task3"]
    }

    this.onClick = this.onClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateList = this.updateList.bind(this);
    this.milestones = this.milestones.bind(this);
}

openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

closeModal() {
    this.setState({
      modalIsOpen: false,
      messageFromServer: ''
    });
  }

onClick(e) {
    this.milestones(this);
  }

milestones(e) {
    axios.post('/milestones',
      querystring.stringify({
         milestones: e.state.tasks
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
      e.setState({
        messageFromServer: response.data
      });

});
}
    
updateList(text){
    var updatedTasks = this.state.tasks;
    updatedTasks.push(text);
    this.setState({tasks : updatedTasks});
}

var ListItem = React.createClass({
    getInitialState: function(){
      return {name: this.props.value.name, costo: this.props.value.costo, serviceCheck: this.props.value.checked} 
    },
  
    render: function(){
    return(
      <tr>
        <td className="checkTd"><div className="flexcenter"><input type="checkbox" name="serviceCheck" id={"c" + this.props.value.id} checked={this.state.serviceCheck} onChange={this.handleChange}/><label htmlFor={"c" + this.props.value.id}><span></span></label></div></td>
        <td><input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Service name..."/></td>
        <td><input type="text" name="costo" value={this.state.costo} onChange={this.handleChange} placeholder="Service price..."/></td>
      </tr>
    )
  },
    
  handleChange: function(event){
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    this.setState({
      [name]: value
    }, this.calcoloTotale);
  },
  
  componentDidMount: function(){
    var finalValue = 0;
    
    if(this.state.serviceCheck){
       finalValue = this.state.costo * 1.0;   
    }else{
      finalValue = 0;
    }
    
    totalVec[this.props.value.id] = finalValue;
    this.props.updateGlobalTotal();
  },
  
  calcoloTotale: function(){
    var finalValue = 0;
    
    if(this.state.serviceCheck){
       finalValue = this.state.costo * 1.0;   
    }else{
      finalValue = 0;
    }
    
    totalVec[this.props.value.id] = finalValue;
    this.props.updateGlobalTotal();
  }
});
  
  
var Table = React.createClass({
  getInitialState: function(){
    return { totale: 0, checked: false} 
  },
  
  render: function(){
    return(
      <div>
        <table>
          <tr>
            <th className="checkTh"></th>
            <th>Good / Service</th>
            <th>Price €</th> 
          </tr>
          
          {this.props.items.map((prodotto) =>
            <ListItem key={prodotto.id} value={prodotto} updateGlobalTotal={this.updateGlobalTotal}/>
          )}
          
          <tr className="totalTr">
            <td></td>
            <td className="totalText">Total (ex VAT):</td>
            <td className="totalTR">{this.state.totale} €</td>
          </tr>
        </table>
      </div>
    )
  },
  
  updateGlobalTotal: function(){
    var total = 0;
    for(var i = 0; i < this.props.ids; i++){
      total += totalVec[i];
    }
    
    this.setState({totale: total});
  }
  
});

}