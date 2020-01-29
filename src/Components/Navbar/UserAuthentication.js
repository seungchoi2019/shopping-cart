import React from 'react';
import "rbx/index.css";
import { Button, Message } from 'rbx';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
};

const Welcome = ({user}) => (
    <Message color = "info">
        <Message.Header>
            Welcome, {user.displayName}
            <Button primary onClick = {() => firebase.auth().signOut()}>
                Log Out
            </Button>
        </Message.Header>
    </Message>
);

const Login = () => (
    <StyledFirebaseAuth
        uiConfig = {uiConfig}
        firebaseAuth = {firebase.auth()}
    />
);

const Signup = () => (
    <Button color = "danger">Sign Up</Button>
);

const UserAuthentication = ({user}) => (
    <React.Fragment>
        {user ? <Welcome user = {user} /> : <Login />}
        {user ? null : <Signup />}
    </React.Fragment>
);

export default UserAuthentication;