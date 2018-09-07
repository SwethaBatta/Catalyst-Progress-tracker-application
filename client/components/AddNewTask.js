//client/components/Update.js
import React from 'react';


export default class AddNewTask extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks : [""]
    }
    this.justSubmitted = this.justSubmitted.bind(this);
  }
    
  justSubmitted(event){
      event.preventDefault();
      var input = event.target.querySelector('input');
      var value = input.value;
      input.value='';
      this.props.updateList(value);
  }

  render() {
      return (
        <form onSubmit = {this.justSubmitted}>
          <label htmlFor="milestones">Milestones:</label>
          <input type="text" style={{fontSize : 20}}/>
        </form>
       );
}
}