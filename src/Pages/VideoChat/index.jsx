import React, { useState, Component } from 'react';
import './styles.css'
import VideoChats from './VideoChats.js'
import { withAuthorization } from "../../Components/Auth/Session";

class VideoChat extends Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return this.props.userProfile ? (
      <div className="app">
        <main>
          <VideoChats uid={this.props.uid.uid} name={this.props.userProfile.name}/>
        </main>
      </div>
    ) : (<div></div>);
  }
  
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(VideoChat);