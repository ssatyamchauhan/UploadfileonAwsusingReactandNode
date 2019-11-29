import React, { Component } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { Button } from '@material-ui/core'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  fileHandler = (files) => {
    this.setState({
      files: files
    })
  }

  uploadFile = () => {
    //formdata object to store the files So that it can be send to the server-side
    const formdata = new FormData();
    // push data in the formdata object.
    for (var i = 0; i < this.state.files.length; i++) {
      formdata.append("files", this.state.files[i]);
    }
    // console.log('credentials',ls.get('credentials'))
    console.log(...formdata);
    axios
      .post("http://localhost:2000/uploadFile", formdata)
      .then(response => {
        // Storing data in redux store
        // Serialize data in a react state list
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <DropzoneArea onChange={this.fileHandler} />
        <hr />
        <br />
        <Button onClick={this.uploadFile} color="primary">
          upload
        </Button>
      </div>
    )
  }
}


export default App;
