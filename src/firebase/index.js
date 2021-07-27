import firebase from "firebase/app";
import 'firebase/auth'
import axios from 'axios'


const firebaseConfig = {
  apiKey: "############################",
  authDomain: "############################",
  databaseURL: "############################",
  projectId: "############################",
  storageBucket: "############################",
  messagingSenderId: "############################",
  appId: "############################",

firebase.initializeApp(firebaseConfig);

axios.defaults.baseURL = firebaseConfig.databaseURL;


const auth = firebase.auth();


export {
  auth
}


