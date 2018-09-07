//client/components/Update.js
import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  AddNewTask  from './AddNewTask';
import  ToDoAppList  from './ToDoAppList';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateMilestones from '@material-ui/icons/TrackChanges';
import _ from 'lodash';


var querystring = require('querystring');
//<ToDoAppList tasks = {this.state.tasks} />
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class Milestones extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks : null,
      checked : [0],
      activities : [],
      tempVar : [],
      milestones: ''
    }
    this.onClick = this.onClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateList = this.updateList.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
      this.show = this.show.bind(this);
    this.milestone = this.milestone.bind(this);
    
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
    this.milestone(this);
  }
    
componentDidMount() {
    this.setState({
      id: this.props.expense._id,
      milestones: this.props.expense.milestones,
      activities: this.props.expense.activities,
      checked: this.props.expense.checked
    });
  }

milestone(e) {
    axios.post('/milestones',
      querystring.stringify({
         _id: e.state.id,
         activities: e.state.activities,
         milestones: e.state.milestones,
         checked: e.state.checked
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
    
milestoneDelete(e) {
    axios.post('/milestonesDelete',
      querystring.stringify({
         _id: e.state.id,
         activities: e.state.activities,
         milestones: e.state.milestones,
         checked: e.state.checked
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
    
milestoneDelete(e){
    axios.get('/delete?id='+e.state.id)
      .then(function(response) {
          
    });
}
    
updateList(text){
    //console.log(text);
    this.state.tempVar.push(text);
   // updatedTasks.push(text);
    this.setState({activities: this.state.tempVar })
    //console.log(this.state.activities);
}
    
handleToggle(event, value){
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
};

show()
{       
    this.setState({
            activities: this.state.activities,
            checked: this.state.checked,
            milestones: Math.floor(((document.querySelectorAll('input[type="checkbox"]:checked').length)*100)/(document.querySelectorAll('input[type="checkbox"]').length))
    });    
}

render() {
      return (
        <div>
          <UpdateMilestones onClick={this.openModal} style={{"cursor":"pointer"}}/>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Expense"
            className="Modal">

          <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
            <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
          </Link><br/>

          <fieldset>
                <h1>Milestones</h1>
                <AddNewTask updateList = {this.updateList}/>
          </fieldset>
          <List>
              {this.state.activities.map((item) => (
                        <ListItem
                          key={this.state.activities.indexOf(item)}
                          role={undefined}
                          dense
                          button
                          onClick={(event)=>this.handleToggle(event, this.state.activities.indexOf(item))}
                        >
                        <Checkbox
                            checked={this.state.checked.indexOf(this.state.activities.indexOf(item)) !== -1}
                            onChange={(event)=>this.handleToggle(event, this.state.activities.indexOf(item))}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={item} />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Comments">
                                    <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                        </ListItem>
                ))}
          </List>

          <div className='button-center' onMouseOver={this.show}>
              <br/>
              <Button bsStyle="warning" bsSize="small" onClick={this.onClick} progress={this.state.milestones}>Update</Button>
            </div>
        
          </Modal>
        </div>
      )
  }
  
}
export default Milestones;