// jQuery & JavaScript

// Firebase Code
	// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyAel1pntjXpUpWqL3Pfo7a2WWCL7b4z_h4",
	    authDomain: "fir-train-sched.firebaseapp.com",
	    databaseURL: "https://fir-train-sched.firebaseio.com",
	    projectId: "fir-train-sched",
	    storageBucket: "",
	    messagingSenderId: "617350066924"
	  };
	  firebase.initializeApp(config);

	  var database = firebase.database();

	// Button for adding Trains
	  $("#add-train-btn").on("click", function(event) {
	  	event.preventDefault();

	  	// Grabs user input
		var empName = $("#train-name-input").val().trim();
		var empPlace = $("#place-input").val().trim();
		var empStart = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
		var empFrequency = $("#frequency-input").val().trim();

		// Create local temp object for train data
		var newEmp = {
		  name: empName,
		  place: empPlace,
		  start: empStart,
		  frequency: empFrequency
		};

		// Upload this info to Firebase & console log it
		database.ref().push(newEmp);
		console.log(newEmp.name);
		console.log(newEmp.place);
		console.log(newEmp.start);
		console.log(newEmp.frequency);

		// Clear input boxes
		  $("#train-name-input").val("");
		  $("#place-input").val("");
		  $("#start-input").val("");
		  $("#frequency-input").val("");
	  });		


// Time Predictions Code
	// EDIT tFrequency & firstTime TO CORRECT #s
	// Use locale time: moment().format('LT'); 

	// Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));