import React, { Component } from 'react';
import Lobby from './Lobby';
import Room from './Room';

class VideoChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      roomName: '',
      token: null
    }
  }
  
  handleUsernameChange = (event => {
    this.setState({username: event.target.value});
  });

  handleRoomNameChange = (event => {
    this.setState({roomName: event.target.value});
  });

  handleSubmit =  async event => {
      event.preventDefault();
      const data = await fetch('/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: this.state.username,
          room: this.state.roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      this.setState({  token: data.token })
    }
  
 handleLogout = (event => {
    this.setState({ token: null });
  });

  render(){
  let render;
  if (this.state.token) {
    render = (
      <Room roomName={this.state.roomName} token={this.state.token} handleLogout={this.handleLogout} />
    );
  } else {
    render = (
      <Lobby
        uid={this.props.uid}
        username={this.state.username}
        roomName={this.state.roomName}
        handleUsernameChange={this.handleUsernameChange}
        handleRoomNameChange={this.handleRoomNameChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
  return render;
}

}

export default VideoChats;
