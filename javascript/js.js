 var config = {
    apiKey: "AIzaSyBUphR1mwSOOXtwPJa0rxKWqP4rAAnD-Ss",
    authDomain: "trainschedulemannn.firebaseapp.com",
    databaseURL: "https://trainschedulemannn.firebaseio.com",
    projectId: "trainschedulemannn",
    storageBucket: "",
    messagingSenderId: "502719388361"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
  		event.preventDefault();

	 
	  var Name = $("#name-input").val().trim();
	  var Destination = $("#destination-input").val().trim();
	  var FirstTrain = $("#firstTrain-input").val().trim();
	  var Frequency = $("#frequency-input").val().trim();

	 
	  var trainObject = {
	  	name: Name,
	  	destination: Destination,
	  	startTime: FirstTrain,
	  	frequency: Frequency
	  };

	  // Uploads train data to the database
  		database.ref().push(trainObject);


	   
  		alert("Train has been added");

	 
	  $("#tname-input").val("");
	  $("#destination-input").val("");
	  $("#firstTrain-input").val("");
	  $("#frequency-input").val("");
  	});

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  	  var NameofTrain = childSnapshot.val().name;
	  var DestinationofTrain = childSnapshot.val().destination;
	  var TimeofTrain = childSnapshot.val().start;
	  var FrequencyofTrain = childSnapshot.val().frequency;

	  var Time=0;

	  var TimeConverter = moment(Time, "HH:mm");

	  var currentTime = moment();

	  var differenceInTime = moment().diff(moment(TimeConverter), "minutes");
	  var timeRemainder = differenceInTime % FrequencyofTrain;
	  var minutesTillTrain = FrequencyofTrain - timeRemainder;
	  var nextTrain = moment().add(minutesTillTrain, "minutes");

	   $("#tableOfTrains > tbody").append("<tr><td>" + NameofTrain + "</td><td>" + DestinationofTrain + "</td><td>" + FrequencyofTrain + 
	   "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + minutesTillTrain + "</td></tr>");

	

	   });



