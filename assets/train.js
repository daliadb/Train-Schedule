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
		var tName = $("#train-name-input").val().trim();
		var tPlace = $("#place-input").val().trim();
		var tStart = moment($("#start-input").val().trim(), 'hh:mm').format('HH:mm');
		var tFrequency = moment($("#frequency-input").val().trim(), 'mm').format("minutes");

		// Create local temp object for train data
		var newT = {
		  name: tName,
		  place: tPlace,
		  start: tStart,
		  frequency: tFrequency
		};

		// Upload this info to Firebase & console log it
		database.ref().push(newT);
		console.log(newT.name);
		console.log(newT.place);
		console.log(newT.start);
		console.log(newT.frequency);

		// Clear input boxes
		  $("#train-name-input").val("");
		  $("#place-input").val("");
		  $("#start-input").val("");
		  $("#frequency-input").val("");
	  });

	// Firebase Event/HTML Row Addition for Added Trains
	  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	  console.log(childSnapshot.val());

		// Create variables & console log it
		var tName = childSnapshot.val().name;
		var tPlace = childSnapshot.val().place;
		var tStart = childSnapshot.val().start;
		var tFrequency = childSnapshot.val().frequency;	

		console.log(tName);
  		console.log(tPlace);
  		console.log(tStart);
  		console.log(tFrequency);

  		// Calculate Train Time Info

	      // Start
	      var startConverted = moment(tStart, "HH:mm").subtract(1, "years");
	      console.log(startConverted);

	      // Current Time
	      var currentTime = moment();
	      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
	      
	      // Difference
	      var diffTime = moment().diff(moment(startConverted), "minutes");
	      console.log("DIFFERENCE IN TIME: " + diffTime);

	      // Time apart (remainder)
	      var tRemainder = diffTime % tFrequency;
	      console.log(tRemainder);

	      // Minutes Until Train
	      var tMinutesTillTrain = tFrequency - tRemainder;
	      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	      // Arrival Time
	      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

	    // Add each train's data into the table
		$("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tPlace + "</td><td>" +
		tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");
	  });