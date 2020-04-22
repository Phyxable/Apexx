import React, { Component } from "react";
import SignInPage from "../../Pages/SignInPage/index.jsx";
import SignUpPage from "../../Pages/SignUpPage/index.jsx";
import SignIn from "../../Pages/SignIn/index.jsx";
import SignUp from "../../Pages/SignUp/index.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import * as routes from "../../Constants/routes";
import "./styles.css";
import { withAuthentication } from "../Auth/Session";
import LandingPage from "../../Pages/LandingPage";
import VideoChat from "../../Pages/VideoChat";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  updateUserProfile = (key, value) => {
    const oldProfile = this.state.userProfile;
    oldProfile[key] = value;
    this.setState({ userProfile: oldProfile });
    const uid = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.writeData(`${uid}/userProfile/`, key, value);
  };

  updateAppState = (key, value) => {
    this.setState({ [key]: value });
  };


  componentDidUpdate() {
    if (   
           this.props.firebase.auth.currentUser 
        && this.props.firebase.auth.currentUser.userProfile 
        && !this.state.userProfile) {
      this.setState(
        {
          userProfile: this.props.firebase.auth.currentUser.userProfile.userProfile
        }
      );
    }
   }


  render() {
    return (
        <Router>
          <div>
            <Route
              exact
              path={routes.VIDEO_CHAT}
              render={props => (
                <VideoChat uid={this.props.firebase.auth.currentUser} userProfile={this.state.userProfile} appState={this.state} />
              )}
            />
            <Route
              exact
              path={routes.LANDING}
              render={props => (
                <LandingPage userProfile={this.state.userProfile} appState={this.state} />
              )}
            />
            <Route
              exact
              path={routes.SIGN_UP}
              render={props => (<SignUpPage userProfile={this.state.userProfile} updateUserProfile={this.updateUserProfile} updateAppState={this.updateAppState} />)}
            />

            <Route
              exact
              path={routes.SIGN_IN}
              render={props => (
                <SignInPage updateUserProfile={this.updateUserProfile} />
              )}
            />

            <Route
              exact
              path={routes.SIGNUP}
              render={props => (<SignUp userProfile={this.state.userProfile} updateUserProfile={this.updateUserProfile} updateAppState={this.updateAppState} />)}
            />

            <Route
              exact
              path={routes.SIGNIN}
              render={props => (
                <SignIn updateUserProfile={this.updateUserProfile} />
              )}
            />
          </div>
        </Router>
    );
  }
}
export default withAuthentication(App);
