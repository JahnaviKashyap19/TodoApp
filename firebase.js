const firebaseConfig = {
    apiKey: "AIzaSyAP65esZdPeEsdR192nf9jwUCoJiiaJ2aI",
    authDomain: "todo-app-19f13.firebaseapp.com",
    projectId: "todo-app-19f13",
    storageBucket: "todo-app-19f13.appspot.com",
    messagingSenderId: "578721232256",
    appId: "1:578721232256:web:a59adc69c3bb9c40527d65",
    measurementId: "G-HRXSJN5V60"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();