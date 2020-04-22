import React, { Component } from 'react';
import logo from "./assets/icons/logo_webbanner.png";
import VirtualRehab from "./assets/icons/1on1_asset.svg";
import SignOutButton from "../../Components/Auth/SignOut";

class Lobby extends Component {
  constructor(props) {
    super(props);
  }
  
  render(){
  const {username, handleUsernameChange, roomName, handleRoomNameChange, handleSubmit} = this.props;
  return this.props ? (
    <div className="center">
    <div className="home-nav-bar">
        <div className="margin-top-12">
          <div className="center">
          <img src={logo} width="96px" ></img>
          </div>
          </div>
        </div>
    <form onSubmit={handleSubmit}>
    <div className="margin-top-64 futura-20-900 center">Virtual Rehab 1-on-1</div>
    <div className="inline-block">
    <center>
      <div className="margin-top-16">
        <input
          type="text"
          id="field"
          placeholder="Your Name"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <input
          type="text"
          id="room"
          placeholder="Room Name"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>
      </center>
  </div>
      <div className="margin-top-8 futura-14-300">* Enter the room name you were given from your confirmation email.</div>
      <center>
        <img src={VirtualRehab} style={{
          height:"25vh"
        }}></img>
      </center>
      <div className="margin-top-32 futura-14-300">
            <SignOutButton

              revert={() => {
                this.props.revert();
              }}
              uid={this.props.uid}
            />
          </div> 
      <div className="onboarding-bottom-nav-bar">
      <button style={ username === "" || roomName === "" ? {background: "#E1E2E3"} : null } className="green-button" type="submit">JOIN VIDEO CALL</button>
      </div>
    </form>
    </div>
  ): (<div></div>);
  }
}

export default Lobby;
