var config = {
    apiKey: "AIzaSyDLYKBrc2SiR1GxDWTHYL7SnT8MoImhOEA",
    authDomain: "train-scheduler-cny.firebaseapp.com",
    databaseURL: "https://train-scheduler-cny.firebaseio.com",
    projectId: "train-scheduler-cny",
    storageBucket: "train-scheduler-cny.appspot.com",
    messagingSenderId: "233158502815"
  };
  firebase.initializeApp(config);

  var database = firebase.database();




  const music = new Audio("/Users/cnyokoyama/Documents/UCLA/Homework/Train-Scheduler/assets/come on ride the train.mp3");
    $('#startButton').click(e => music.play());