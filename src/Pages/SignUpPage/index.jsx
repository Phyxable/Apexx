import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import PasswordMask from "react-password-mask";
import arrow_back from "../VideoChat/assets/icons/arrow_back.svg"
import {
  withFirebase,
  firebase,
  FirebaseContext,
  db
} from "../../Components/Firebase/firebase";
import * as ROUTES from "../../Constants/routes";
import moment from "moment";
import "./styles.css";
import { compose } from 'recompose';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
  }

  render(){
      return (
      <div className="center" style = {{overflowX : "hidden"}}>
        <div className="margin-top-16">
              <div className="flex-row width-100vw">
                <div className="flex-1" style={{ maxWidth: "5vw" }} />
                <div className="flex-1">
                  <div className="flex-row" style={{ width: "90vw" }}>
                    <div className="flex-1">
                      <div className="home-nav-bar-title  futura-20-300 center" style= {{width: "80vw"}}>
                      </div>
                      <div className="flex-1" style={{ textAlign: "left" }}>
                <a href="/">
                  <img
                    style= {{ width: "24px" }}
                    src={arrow_back}
                  />
                </a>
                </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        <div>
        <div className="lead-text margin-top-16">
        <div style={{ fontWeight: "bold" }}>
        APEX PATIENT SIGNUP 
        </div>
        </div>
        </div>
        <div className="center flex-1">
          <div className="inline-block" >
            <SignUpForm/>
          </div>
        </div>
        <div style={{ flex: 0.1 }} />
      </div>
    );

  }
}

const INITIAL_STATE = {
  username: "",
  lastname: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE, redirect: false, colorChange: "#E1E2E3" };
  }

  onSubmit = event => {

    const { username, lastname, email, passwordOne } = this.state;
  
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log("sign up submit called 2",localStorage.getItem("data4"));
        return this.props.firebase.user(authUser.uid).update({
          joinDate: moment().format("YYYY/MM/DD"),
          userProfile: {
            name: username,
            email: email,
            accountType: "PATIENT",
          }
        });
      })
      .then(authUser => {
        console.log("in on submit sign up", this.props);

        this.setState({ ...INITIAL_STATE });
        this.setState({ authRedirect: true });
      })
      .catch(error => {
        this.setState({ error });
        alert(error)
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if(this.state.passwordOne === "" || this.state.email === "" || this.state.username === ""){
      this.setState({ colorChange: "#E1E2E3" })
    }else{
      this.setState({ colorChange: "#FF5A66" })
    }
  };

  handleTryFirstClick = () => {
    this.setState({ redirect: true });
  };


  render() {
    if (this.state.redirect) {
      return <Redirect push to="/demo-page-one" />;
    }
    if (this.state.authRedirect) {
        window.location.href = "/videochat";
    }

    //const { signUpPageEvent } = this.props;
    
    const { username, lastname, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      // passwordOne !== passwordTwo ||
      passwordOne === "" || email === "" || username === "";

    return (
      <form >
        <div className="center margin-top-32">
          <div className="inline-block">
            <input
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name"
            />
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <PasswordMask
              id="password"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password (6+ characters)"
              inputStyles={{
                padding: "8px",
                fontSize: "16px"
              }}
              inputClassName="PasswordMaskInput"
              buttonStyles={{
                width: "61px"
              }}
            />
          </div>
        </div>
        <div className='margin-top-24'>
          <button
            id="noHover"
            onClick={event => {
              this.onSubmit(event);
            }}
            disabled={isInvalid}
            type="submit"
            style={{ backgroundColor: this.state.colorChange }}
          >
            SIGN UP
          </button>
        </div>
      </form>
    );
  }
}

const SignUpLink = () => (
  <p className="center margin-top-16 futura-14-300">
    Don't have an account? <Link to="/signup">Sign Up</Link>
  </p>
);


const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);
export default SignUpPage;
export { SignUpForm, SignUpLink };