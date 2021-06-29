import firebase from "firebase/app";
import 'firebase/auth'
import axios from 'axios'


const firebaseConfig = {
  apiKey: "AIzaSyBLtwijN9cR_x8XnzxGDZOhGwIkiJoEFJ4",
  authDomain: "sabina-app-e2141.firebaseapp.com",
  databaseURL: "https://sabina-app-e2141-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sabina-app-e2141",
  storageBucket: "sabina-app-e2141.appspot.com",
  messagingSenderId: "407134016746",
  appId: "1:407134016746:web:e34c5f70806bb10a7e3393"
};

firebase.initializeApp(firebaseConfig);

axios.defaults.baseURL = firebaseConfig.databaseURL;


const auth = firebase.auth();


export {
  auth
}


