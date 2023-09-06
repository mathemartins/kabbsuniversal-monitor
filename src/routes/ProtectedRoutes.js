import React from 'react';
import { Navigate } from 'react-router-dom';
import firebase from 'api/firebase.js';

const ProtectedRoute = (props) => {
  const user = firebase.auth().currentUser;
  const email = user?.multiFactor?.user?.email;
  localStorage.setItem('email', email);

  // console.log(email);

  // const email = user.multiFactor.user.email;
  // localStorage.setItem('email':)
  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/" />;
  }

  // Render the children components if the user is authenticated
  return props.children;
};

export default ProtectedRoute;
