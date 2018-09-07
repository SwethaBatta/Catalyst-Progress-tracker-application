import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
var querystring = require('querystring');

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {
        fileUrl: '',
        filename: '',
        imagePreviewUrl: '',
        messageFromServer: '',
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this.uploads = this.uploads.bind(this);
    this.getData = this.getData.bind(this);
  }

//  componentWillReceiveProps(nextProps) {
//    this.getData(this, '2018');
//  }
    
  getData(ev, year){
    axios.get('/getAll?month=All&year='+year)
      .then(function(response) {
        ev.setState({data: response.data});
        ev.setState({selectedYear: parseInt(year)})
      });
  }

  uploads(e){
      axios.post('/uploads',
        querystring.stringify({
           _id: e.state.id,
          filename: e.state.filename,
          fileUrl: e.state.fileUrl
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
    
  componentDidMount() {
    this.setState({
      id: this.props.expense._id,
      filename: this.props.expense.filename || '',
      fileUrl: this.props.expense.fileUrl || ''
    });
  }
    
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    this.uploads(this);
    this.getData(this, '2018');
    console.log('handle uploading-', this.state.filename);
    this.setState({
      messageFromServer: '',
      filename: '',
      fileUrl:''
    });
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
  }

  render() {
    let {fileUrl} = this.state;
    let $imagePreview = null;
    if (fileUrl) {
      $imagePreview = (<img src={fileUrl} style={{width: 200, height: 200, position: 'absolute', top: this.props.top, left: this.props.left}}/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
           <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
            </Link>
        </form>
        <div className="imgPreview">
        </div>
      </div>
    )
  }
}
 
export default ImageUpload;