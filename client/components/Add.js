//client/components/Add.js
import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';

import  AddNewTask  from './AddNewTask';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

var querystring = require('querystring');

    
const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: 
      'Itim',
    fontSize: 
      '30',
    fontWeightMedium: 500,
    subheading: {
      fontSize: 12,
    },
    button: {
      fontStyle: 'italic'
    },
  },
});

class Add extends React.Component {
constructor() {
      super();
        this.state = {
        description: '',
        month: '',
        year: '',
        messageFromServer: '',
        modalIsOpen: false,
                  checked : [0],
                  activities : [],
                  tempVar : [],
                  milestones: '',
                    fileUrl: '',
                    filename: ''
      }
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.insertNewExpense = this.insertNewExpense.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
              this.updateList = this.updateList.bind(this);
              this.handleToggle = this.handleToggle.bind(this);
              this.show = this.show.bind(this);
              this._handleSubmit = this._handleSubmit.bind(this);
              this._handleImageChange = this._handleImageChange.bind(this);
    }



openModal() {
      this.setState({
        modalIsOpen: true
      });
    }
closeModal() {
      this.setState({
        modalIsOpen: false,
        description: '',
        month: 'Jan',
        year: 2018,
        messageFromServer: '',
        activities: [],
        checked: [],
        tempVar: []
      });
    }
componentDidMount() {
      this.setState({
        month: this.props.selectedMonth,
        year: this.props.selectedYear,
        activities: this.props.activities,
        checked: this.props.checked,
        tempVar: this.props.activities,
                fileUrl: this.props.fileUrl,
                filename: this.props.filename
      });
    }
    
componentWillMount() {
    Modal.setAppElement('body');
}
    
handleSelectChange(e) {
      if (e.target.name == 'month') {
        this.setState({
          month: e.target.value
        });
      }
      if (e.target.name == 'year') {
        this.setState({
          year: e.target.value
        });
      }
    }
    
onClick(e) {
      this.insertNewExpense(this);
    }
    
insertNewExpense(e) {
      axios.post('/insert',
        querystring.stringify({
          desc: e.state.description,
          month: e.state.month,
          year: e.state.year,
          activities: e.state.activities,
          checked: e.state.checked,
          milestones: e.state.milestones,
          fileUrl: e.state.fileUrl,
          filename: e.state.filename
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
    this.state.tempVar.push(text);
    this.setState({activities: this.state.tempVar })
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
}
    
 _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    //this.uploads(this);
    console.log('handle uploading-', this.state.filename);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        filename: file.name,
        fileUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
    e.preventDefault();
    // TODO: do something with -> this.state.file
    //this.uploads(this);
    console.log('handle uploading-', this.state.filename);
    console.log(new Date().toDateString());
  }

    
handleTextChange(e) {
      if (e.target.name == "description") {
        this.setState({
          description: e.target.value
        });
      }
    
if (e.target.name == "milestones") {
        this.setState({
          milestones: e.target.value
        });
      }
    }
    
show()
{       
    this.setState({
            activities: this.state.activities,
            checked: this.state.checked,
            milestones: Math.floor(((document.querySelectorAll('input[type="checkbox"]:checked').length)*100)/(document.querySelectorAll('input[type="checkbox"]').length))
    });    
}

render() {
   if(this.state.messageFromServer == ''){
      return (
          <MuiThemeProvider theme={theme}>
        <div>
      <Button bsStyle="info" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Expense"
       className="Modal">
     <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
       <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
      </Link><br/>
    <fieldset>
       <label htmlFor="description">Description:</label>
          <input htmlFor="description" id="description" name="description" value={this.state.description} onChange={this.handleTextChange}/>

       <label htmlFor="month">Month:</label>
          <select id="month" name="month" value={this.state.month} onChange={this.handleSelectChange}>
            <option value="Jan" id="Jan">January</option>
            <option value="Feb" id="Feb">Febrary</option>
            <option value="Mar" id="Mar">March</option>
            <option value="Apr" id="Apr">April</option>
            <option value="May" id="May">May</option>
            <option value="Jun" id="Jun">June</option>
            <option value="Jul" id="Jul">July</option>
            <option value="Aug" id="Aug">August</option>
            <option value="Sep" id="Sep">September</option>
            <option value="Oct" id="Oct">October</option>
            <option value="Nov" id="Nov">November</option>
            <option value="Dec" id="Dec">December</option>
         </select>
         <label htmlFor="year">Year:</label>
          <select id="year" name="year" value={this.state.year} onChange={this.handleSelectChange}>
            <option value="2016" id="16">2016</option>
            <option value="2017" id="17">2017</option>
            <option value="2018" id="18">2018</option>
            <option value="2019" id="19">2019</option>
            <option value="2020" id="20">2020</option>
         </select>
      </fieldset>
      
          <fieldset>
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
          <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                  <input className="fileInput" 
                    type="file" 
                    style={{fontFamily : 'Itim'}}
                    onChange={(e)=>this._handleImageChange(e)} />
                </form>
          </div>
                   
      <div className='button-center' onMouseOver={this.show}>
        <br/>
        <Button bsStyle="info" bsSize="small" onClick={this.onClick} progress={this.state.milestones}>Add New Activity</Button>
       </div>
          </Modal>
        </div>
        </MuiThemeProvider>
      )
   }
   else{
    return (
    <MuiThemeProvider theme={theme}>
     <div>
       <Button bsStyle="info" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
       <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Add Expense"
        className="Modal">
        <div className='button-center'>
            <h3>{this.state.messageFromServer}</h3>
            <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
             <Button bsStyle="success" bsSize="small" onClick={this.closeModal}>Close the Dialog</Button>
            </Link>
        </div>
      </Modal>
       </div>
        </MuiThemeProvider>
     )
    }
   }
}
export default Add;