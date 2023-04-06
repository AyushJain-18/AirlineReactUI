// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

import "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyBiB8GWtkaXNFFS0gbh5k6H9fiQsQz_G_k",
    authDomain: "braided-horizon-232311.firebaseapp.com",
    databaseURL: "https://braided-horizon-232311.firebaseio.com",
    projectId: "braided-horizon-232311",
    storageBucket: "braided-horizon-232311.appspot.com",
    messagingSenderId: "308990278244",
    appId: "1:308990278244:web:dd5e679da4e1f623527d71"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth(); // Authorization requst
  export default firebase;