// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDh0j9Ox8ScI-OLA6mwwlHZR2GbsQMev24",
    authDomain: "train-scheduler-cy.firebaseapp.com",
    databaseURL: "https://train-scheduler-cy.firebaseio.com",
    projectId: "train-scheduler-cy",
    storageBucket: "train-scheduler-cy.appspot.com",
    messagingSenderId: "426753515975"
  };
  firebase.initializeApp(config);

var database = firebase.database();

setInterval(function(startTime) {
$("#dateTime").html(moment().format('hh:mm a'))
}, 1000);

$("#addTrainBtn").on("click", function() {
event.preventDefault();

var train = $("#trainNameText").val().trim();
var destination = $("#destinationText").val().trim();
var frequency = $("#frequencyText").val().trim();
var firstTime = $("#firstTrainText").val().trim();

var trainInfo = {
  formtrain: train,
  formdestination: destination,
  formfrequency: frequency,
  formfirsttime: firstTime,
  dateAdded: firebase.database.ServerValue.TIMESTAMP
};

database.ref().push(trainInfo);

$("#trainNameText").val("");
$("#destinationText").val("");
$("#frequencyText").val("");
$("#firstTrainText").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
var train = childSnapshot.val().formtrain;
var destination = childSnapshot.val().formdestination;
var frequency = childSnapshot.val().formfrequency;
var firstTime = childSnapshot.val().formfirsttime;
var firstTimeConvert = moment(firstTime, "hh:mm").subtract(1, "years");
var currentTime = moment();
$("#dateTime").text(currentTime.format("hh:mm a"));

var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
var tRemainder = diffTime % frequency;
var minAway = frequency - tRemainder;
var nextArrival = moment().add(minAway, "minutes").format("hh:mm a");

$("#trainTable > tbody").append("<tr><td>" + '<i class="fa fa-trash" id="trashcan" aria-hidden="true"></i>' + "</td><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

}, function (errorObject) {
console.log(errorObject.code);
});

$("body").on("click", ".fa-trash", function() {
$(this).closest("tr").remove();
alert("Deleted!");
});

function timeUpdate() {
$("#trainTable > tbody").empty();
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var train = childSnapshot.val().formtrain;
  var destination = childSnapshot.val().formdestination;
  var frequency = childSnapshot.val().formfrequency;
  var firstTime = childSnapshot.val().formfirsttime;
  var firstTimeConvert = moment(firstTime, "hh:mm").subtract(1, "years");
  var currentTime = moment();

  $("#dateTime").text(currentTime.format("hh:mm a"));
  var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
  var tRemainder = diffTime % frequency;
  var minAway = frequency - tRemainder;
  var nextArrival = moment().add(minAway, "minutes").format("hh:mm a");

  $("#trainTable > tbody").append("<tr><td" + '<i class="fa fa-trash" aria-hidden="true"></i>' + "</td><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td><tr>");
})
};

setInterval(timeUpdate, 6000);