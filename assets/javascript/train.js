

var trainInfo = new Firebase("https://jamesgreatapp.firebaseio.com/");

//displays the current time immediately on page load
$("#timeRightNow").html(moment().format('LTS'));

//refreshes the current time every second
setInterval(function(){
	var currentTime = moment().format('LTS');
	$("#timeRightNow").html(currentTime);	
}, 1000);

//adds a new train from the user input
$("#addTrain").on("click", function(){
	//collects user inputs
	var trainName = $("#trainName").val().trim();
	var destination = $("#destination").val().trim();
	var inputTime = $("#firstTrainTime").val().trim();
	var frequency = parseInt($("#frequency").val().trim());

	//converts the input time to a format that can be passed to moment
	var firstHalf = inputTime.substring(0,2);
	var secondHalf = inputTime.substring(2,4);
	var time = firstHalf + ":" + secondHalf;

	//creates data object to push to firebase
	var newTrain = {
		train: trainName,
		destination: destination,
		time: time,
		frequent: frequency
	}

	//pushes the data to firebase
	trainInfo.push(newTrain);

	//clears the input fields
	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrainTime").val("");
	$("#frequency").val("");

	return false;
});

//displays the train info from firebase on the html 
trainInfo.on("child_added", function(childSnapshot){
	//collects the data from firebase
	var trainName = childSnapshot.val().train;
	var destination = childSnapshot.val().destination;
	var time = childSnapshot.val().time;
	var frequency = childSnapshot.val().frequent;

	//converst the first train time to a moment.js object
	var firstTrain = moment('2016-06-10T' + time);

	//captures the current time as a moment.js object
	var currentTime = moment().format('HHmm');

	//creates a data object to run through the loop
	var loopTrain = moment(firstTrain).add(frequency, 'minutes');

	//converst the above object to string displaying time in 24 hour format
	var nextTrain = moment(loopTrain).format('HHmm');

	//runs loop, adding frequency interval at every iteration until  the next train time is greater than the current time
	while(parseInt(nextTrain) < parseInt(currentTime)){
		//updates the loop train object
		loopTrain = moment(loopTrain).add(frequency, 'minutes');
		//updates the next train string 
		nextTrain = moment(loopTrain).format('HHmm');
	}

	//determines how many minutes away the next train is at the time the page is loaded
	var minutesAway = parseInt(nextTrain) - parseInt(currentTime);

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");
});





