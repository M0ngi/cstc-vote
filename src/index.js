import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBQH0riI5e09XX-pEcjvhCMAQEz2gvhDMY",
  authDomain: "cstc-2a071.firebaseapp.com",
  databaseURL: "https://cstc-2a071-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cstc-2a071",
  storageBucket: "cstc-2a071.appspot.com",
  messagingSenderId: "669579499696",
  appId: "1:669579499696:web:2ff2b08443ba76480b8375",
  measurementId: "G-JTQJT809R4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
