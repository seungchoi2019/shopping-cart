import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAfMamQWDLN4-wYMDoBILFDQTRJBaBDOKQ",
    authDomain: "https://shopping-cart-a5447.firebaseapp.com",
    databaseURL: "https://shopping-cart-a5447.firebaseio.com",
    projectId: "shopping-cart-a5447",
    storageBucket: "shopping-cart-a5447.appspot.com",
    messagingSenderId: "...",
    appId: "..."
  
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export default db; 
