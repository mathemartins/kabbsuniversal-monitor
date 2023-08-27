// firebase.js

import firebase from 'firebase/compat/app'; // Import firebase using the compat version
import 'firebase/compat/auth'; // Import the auth module


const firebaseConfig = {
    apiKey: "AIzaSyCn2tSTHL6OuA81-nmSNBD_6UJ7vqfnmBI",
    authDomain: "kabbsuniversal-6efda.firebaseapp.com",
    databaseURL: "https://kabbsuniversal-6efda-default-rtdb.firebaseio.com",
    projectId: "kabbsuniversal-6efda",
    storageBucket: "kabbsuniversal-6efda.appspot.com",
    messagingSenderId: "149772945905",
    appId: "1:149772945905:web:b92b928062231bf263dc50",
    measurementId: "G-29JX5K8EVJ",
};


const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;