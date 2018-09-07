//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Delete from './Delete';
import Milestones from './Milestones';
import ImageUpload from './ImageUpload';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import GridList from '@material/grid-list';

import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  typography: {
    fontFamily: 
      'Itim',
    fontSize: 
      '20',
    fontWeightMedium: 500,
    subheader: {
      fontSize: 5,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});


class App extends React.Component {

constructor() {
    super();
    this.state = {selectedMonth:'All', selectedYear: 2018, data: [], activities:[], checked:[], filename: '', fileUrl: ''};
    this.getData = this.getData.bind(this);
    
  }

componentDidMount() {
    this.getData(this, '2018');
    this.setState({
        description: '',
        activities: [],
        checked:[],
        month: 'Jan',
        year: 2018,
        milestones: '',
        messageFromServer: ''
    })
  }
  componentWillReceiveProps(nextProps) {
    this.getData(this, '2018');
  }
    
getData(ev, year){
    axios.get('/getAll?month=All&year='+year)
      .then(function(response) {
        ev.setState({data: response.data});
        ev.setState({selectedYear: parseInt(year)})
      });
  }
    


render() {
    const data = {
        labels: [
            "Red",
            "Blue",
            //"Yellow"
        ],
        datasets: [
            {
                data: [80, 20],
                //data: Object.values(percentages);
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    //"#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    //"#FFCE56"
                ]
            }]
       };
    
const styles = {
        
      card: {
            //width:  250,
          height: 300,
          margin: '0 auto',
          backgroundColor: '#FFFFFF'
      },
    
      media: {
        height:0,
        paddingTop: '0%',
        maxWidth: 250,
        backgroundPosition: '50% 50%'
      }
},
      
    percentages=(completedMilestones)=>{
            return (completedMilestones.exp.milestones+", 100");
    }
    
    return(
    <MuiThemeProvider theme={theme}>
    <div>
        <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} activities={this.state.activities} checked={this.state.checked} filename={this.state.filename} fileUrl={this.state.fileUrl}/>
        <br/>
        <br/>
        <Grid container>
            <Grid item xs={12}>
              <Grid 
                container 
                spacing={24}
                justify='flex-start'>
                {this.state.data.map(exp => (
                  <Grid style={{maxWidth: '250px'}} sm={6} lg={4} md={4} item>
                    <Card key={exp._id} style={styles.card}>
                    <CardHeader
                      title={exp.description}
                      subheader={new Date().toDateString()+""}
                    />
                    <CardMedia style={styles.media} overlay-position="full"><img src={exp.fileUrl} alt="" style={{height:140, maxWidth: 250, marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '70%'}}/></CardMedia>

                    <CardContent>
                    </CardContent>
                        <CardActions>
                        <div style={{display:'flex', flexDirection: 'column', position: 'relative', top: 120, left : 5}}>
                            <Milestones id={exp._id} expense={exp} />
                        </div>
                        <div className="single-chart" style={{display:'flex', flexDirection: 'column', position: 'relative', top: 120, left: 30, marginRight: 'auto'}}>
                                            <svg viewBox="0 0 36 36" className="circular-chart blue">
                                              <path className="circle-bg"
                                                d="M18 2.0845
                                                  a 15.9155 15.9155 0 0 1 0 31.831
                                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                              />
                                              <path className="circle"
                                                strokeDasharray={percentages({exp})}
                                                d="M18 2.0845
                                                  a 15.9155 15.9155 0 0 1 0 31.831
                                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                              />
                                              <text x="18" y="20.35" className="percentage">{exp.milestones}%</text>
                                            </svg>
                        </div>
                        <div style={{display:'flex', flexDirection: 'column', position: 'relative', marginLeft : 'auto', top: 120, right: 5}}>
                            <Delete id={exp._id} expense={exp} />
                        </div>
                    </CardActions>
                  </Card>
                </Grid>
                ))}
                </Grid>           
            </Grid>
        </Grid> 
    </div>
    </MuiThemeProvider>
    )
  }
}

export default App;