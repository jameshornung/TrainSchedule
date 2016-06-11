

var trainInfo = new Firebase("https://jamesgreatapp.firebaseio.com/");

//displays the current time immediately on page load
$("#timeRightNow").html(moment().format('LTS'));

//refreshes the current time every second
setInterval(function(){
	var currentTime = moment().format('LTS');
	$("#timeRightNow").html(currentTime);	
}, 1000);

//function to conver the user input to a 24 hour clock format with a ":" (for use with moment())
// function insertColon(s){
// 	var firstHalf = s.substring(0, 2);
// 	var secondHalf = s.substring(2, 4);
// 	var full = firstHalf + ":" + secondHalf;
// };

//adds a new train from the user input
$("#addTrain").on("click", function(){
	//collects user inputs
	var trainName = $("#trainName").val().trim();
	var destination = $("#destination").val().trim();
	var inputTime = $("#firstTrainTime").val().trim();
	var frequency = parseInt($("#frequency").val().trim());

	var firstHalf = inputTime.substring(0,2);
	var secondHalf = inputTime.substring(2,4);
	var time = firstHalf + ":" + secondHalf;

	var newTrain = {
		train: trainName,
		destination: destination,
		time: time,
		frequent: frequency
	}

	trainInfo.push(newTrain);

	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrainTime").val("");
	$("#frequency").val("");

	return false;
});

//displays the train info from firebase on the html 
trainInfo.on("child_added", function(childSnapshot){
	var trainName = childSnapshot.val().train;
	var destination = childSnapshot.val().destination;
	var time = childSnapshot.val().time;
	var frequency = childSnapshot.val().frequent;

	var firstTrain = moment('2016-06-10T' + time);
	var currentTime = moment().format('HHmm');
	
	var nextTrain = moment(firstTrain).add(frequency, 'minutes').format('HHmm');
	console.log(firstTrain);
	console.log(nextTrain);
	
	console.log(parseInt(currentTime));

	// while(parseInt(nextTrain) < parseInt(currentTime)){
	// 	var nextTrain = moment(nextTrain).add(frequency, 'minutes').format('HHmm')
	// }


	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + "" + "</td></tr>");
});

// var exampleTime = "09:15";
// var test = moment('2015-01-01T' + exampleTime);
// console.log(test);
// var exampleNextTrain = moment(test).add(5, 'minutes').format('HHmm');
// console.log(exampleNextTrain);



