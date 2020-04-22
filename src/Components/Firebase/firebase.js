import "@firebase/database";
import "@firebase/functions";
import FirebaseContext, { withFirebase } from "./context";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Constants/routes";
import { Redirect } from "react-router";
import app from "@firebase/app";
import "@firebase/auth";

var config = {
  apiKey: "AIzaSyA1K7neAnFpGJ8xBbGlkT-iakzV9OI0BOY",
  authDomain: "apexvideochat.firebaseapp.com",
  databaseURL: "https://apexvideochat.firebaseio.com",
  projectId: "apexvideochat",
  storageBucket: "apexvideochat.appspot.com",
  messagingSenderId: "376430197222",
  appId: "1:376430197222:web:f3156ada6e0415e57ebe27",
  measurementId: "G-PBXDB8NK9H"
};


class Firebase {
  constructor() {
    app.initializeApp(config);
    this.functions = app.functions();
    this.auth = app.auth();
    this.db = app.database();
    this.state = {};
    this.uid = "s";
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // *** Functions API ***

 // Adding subscription to stripe
 doAddStripeID(source, email, uid, planType, coupon) {
  //change to this.functions
  var addData = app.functions().httpsCallable("addStripeID");

  addData({ source: source, email: email, uid: uid, planType: planType, coupon: coupon })
    .then(function (result) {
      console.log("add stripe result is ", result);
      // this.doAddDataToUser(uid, result.key, result.value)
      if (result.data.success) {
        console.log("it works");

        //this can probably be fixed with a reload instead of a interval
        setInterval(() => { window.location.assign("/payment-success") }, 3000);
      } else {
        console.log("nope");
        setInterval(() => { 
          var r = window.confirm("Payment Failed");
          if (r == true) {
            window.location.reload();
          } else {
            window.location.reload();
          } }, 3000);
      }
    })
    .catch(err => {
      console.log(err.code);
    });
}

doAddPlusStripeID(source, email, uid, planType, coupon, trial_end) {
  //change to this.functions
  var addData = app.functions().httpsCallable("addStripeID");

  addData({ source: source, email: email, uid: uid, planType: planType, coupon: coupon, trial_end: trial_end })
    .then(function (result) {
      console.log("add stripe result is ", result);
      // this.doAddDataToUser(uid, result.key, result.value)
      if (result.data.success) {
        console.log("it works");

        //this can probably be fixed with a reload instead of a interval
        setInterval(() => { window.location.assign("/phyxable") }, 3000);
      } else {
        console.log("nope");
        setInterval(() => { window.location.assign("/payment-fail") }, 3000);
      }
    })
    .catch(err => {
      console.log(err.code);
    });
}

  // Cancels subscription
  doCancelStripeSubscription(uid, stripeSubscriptionId) {
    console.log("do cancel stripe subscription", stripeSubscriptionId);
    console.log(uid);
    
    var cancelSubscription = app.functions().httpsCallable("cancelStripeSubscription");

    cancelSubscription({ uid: uid, stripeSubscriptionId: stripeSubscriptionId })
      .then(function (result) {
        console.log("cancel subscription result ", result);

        // if (result.data.cancel_at_period_end) {
        //   console.log("subscription cancelled talke to firebase yo ");

        // } else {
        //   console.log("cancel subscription failed");
        // }
      })
      .catch(err => {
        console.log(err.code);
      });
  }
  // Modifies user profile
  doAddDataToUser(uid, key, value) {
    var addData = app.functions().httpsCallable("addDataToUser");
    addData({ uid: uid, key: key, value: value })
      .then(function (result) {
        console.log("and the result is ", result);
      })
      .catch(err => {
        console.log(err.code);
      });
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
  this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => 
  this.auth.signInWithPopup(this.facebookProvider);

  doSignOut = uid => {
    this.auth.signOut();
  };

  doAddUId = u => {
    this.uid = u;
    //  this.setState({ uid: uid });
  };
  doGetUId = () => {
    return this.uid;
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doGetUserProfile(uid) {

    const email = this.db
      .ref(`/users/${uid}/userProfile`)
      .once("value")
      .then(function (snapshot) {
        return snapshot.val();
      });
    return email;
  }
  
  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);

  writeData = (path, key, value) => {
    console.log("write data", path, key, value);
    this.db
      .ref(`/users/${path}`)
      .update({
        [key]: value
      })
      .then(() => {
        console.log("write data proim");
      });
  };
  pushData = (path, key, value) => {
    console.log("write data", path, key, value);
    this.db
      .ref(`/users/${path}`)
      .push({
        [key]: value
      })
      .then(() => {
        console.log("push data proim");
      });
  };

  users = () => this.db.ref("users");
}

export default Firebase;
export { FirebaseContext, withFirebase };
