//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import Milestones from './Milestones';
import ImageUpload from './ImageUpload';
import {Doughnut as DoughnutChart} from 'react-chartjs-2';


//In td at the bottom
//<td className='progress-col'><DoughnutChart data={data} height={1} width={1} options={{ //maintainAspectRatio: false }}/></td>
//
//            <div id = "chooseBg" style="background-color:#FFF;width:200px;padding:10px;text-align:center;">
//                <a href="#" onclick="changeImage(1);"><img src="images/1.jpg" /></a>
//                <a href="#" onclick="changeImage(2);"><img src="images/2.jpg" /></a>
//                <a href="#" onclick="changeImage(3);"><img src="images/3.jpg" /></a><br />
//                <a href="#" onclick="clearImage();">Clear background image</a>
//            </div>

export default class App extends React.Component {

constructor() {
    super();
    this.state = {selectedMonth:'All', selectedYear: 2018, data: []};
    this.getData = this.getData.bind(this);
  }

componentDidMount() {
    this.getData(this, '2018');
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
     graphContainer: {
      border: '1px solid black',
      padding: '15px'
     }
    }
    
    function percentages(completedMilestones){
            return (completedMilestones+", 100");
    }

    return (
        
      <div>
        <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
        <table>
          <thead>
            <tr></tr>
            <tr></tr>
            <tr><th></th>
                <th className='desc-col'>Description</th>
                <th className='button-col'>Month</th>
                <th className='button-col'>Year</th>
                <th className='button-col'>Update</th>
                <th className='button-col'>Milestones</th>
                <th className='button-col'>Delete</th>
                <th className='button-col'>Progress</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function(exp){
                let mile = percentages(exp.milestones);
                return(  
                    <tr>
                    <td className='counterCell'></td>
                    <td className='desc-col'>{exp.description}</td>
                    <td className='button-col'>{exp.month}</td>
                    <td className='button-col'>{exp.year}</td>
                    <td className='button-col'><Update id={exp._id} expense={exp} /></td>
                    <td className='button-col'><Milestones id={exp._id} expense={exp} /></td>
                    <td className='button-col'><Delete id={exp._id} expense={exp} /></td>
                    <td className='progress-col'>
                        <div className="single-chart">
                            <svg viewBox="0 0 36 36" className="circular-chart blue">
                              <path className="circle-bg"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path className="circle"
                                strokeDasharray={mile}
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <text x="18" y="20.35" className="percentage">{exp.milestones}%</text>
                            </svg>
                        </div>
                    </td>
                </tr>
                )
              })
            }
            </tbody>
        </table>
      </div>
    );
  }
}