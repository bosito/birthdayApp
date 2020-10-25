import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAT6lpw0Tplxkxf18BxDXNoZppm-3nOK-g",
    authDomain: "users-91306.firebaseapp.com",
    databaseURL: "https://users-91306.firebaseio.com",
    projectId: "users-91306",
    storageBucket: "users-91306.appspot.com",
    messagingSenderId: "539658777789",
    appId: "1:539658777789:web:07e729e9c538167d4bf3d4"
  };

export default firebase.initializeApp(firebaseConfig);
