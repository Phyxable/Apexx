import React, { Component } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import logo from "../../Pages/VideoChat/assets/icons/logo_webbanner.png";
import { withAuthorization } from "../../Components/Auth/Session";
import { Redirect } from "react-router";

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  componentDidUpdate() {
    if (this.props.userProfile !== undefined) {
      window.location.href = "/videochat";
    }
  }

  getStarted() {
    console.log("hit hua");
  }

  SignIn() {
    console.log("sign in hit hua");
  }

  render() {

    return (

      <div className="flex-column center">
        
        <div className="home-nav-bar">
        <div className="margin-top-12">
          <div className="center">
          <img src={logo} width="96px" ></img>
          </div>
          </div>
        </div>

    
        <div className="flex-1">
          <div>
            <Link
              to="/sign-in"
              style={{ textDecoration: "none", color: "white" }}
            >
              <button className="margin-top-64"
                onClick={e => {
                  e.stopPropagation();
                  this.getStarted();
                }}
              >
                PRACTITIONER
              </button>
            </Link>
          </div>
          <div className="flex-1 margin-top-16">
          <div>
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "white" }}
            >
              <button
                onClick={e => {
                  e.stopPropagation();
                  this.getStarted();
                }}
              >
                PATIENT
              </button>
            </Link>
          </div>
          </div>
        </div>
        </div>
    );
  }
}
export default Landing;
