import React, {useContext} from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import {UserContext} from "../../App";
import {useHistory, useLocation} from "react-router-dom";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  
  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result =>{
      const {displayName, email} = result.user;  
      const SignedInUser = {name: displayName, email: email};
      setLoggedInUser(SignedInUser);
      storeAuthToken();
      history.replace(from); 
    })
    .catch(error => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }

  const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(true)
    .then(idToken => {
      sessionStorage.setItem('token', idToken);
    })
    .catch(error => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1 onClick={handleGoogleSignIn}>  
        Log in with <strong style={{border: '1px solid black', paddingLeft: '5px', paddingRight: '5px', cursor: "pointer"}}>Google</strong> to book the room.
      </h1>
    </div>
  );
};

export default Login;