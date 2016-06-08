var trainInfo = new Firebase("https://jamesgreatapp.firebaseio.com/");
var currentTime;

$("#timeRightNow").html(moment().format('LTS'));

setInterval(function(){
	currentTime = moment().format('LTS');
	$("#timeRightNow").html(currentTime);	
}, 1000);




$("#addTrain").on("click", function(){
	var trainName = $("#trainName").val().trim();
	var destination = $("#destination").val().trim();
	var time = $("#firstTrainTime").val().trim();
	var frequency = $("#frequency").val().trim();

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

trainInfo.on("child_added", function(childSnapshot, prevChildKey){
	var trainName = childSnapshot.val().train;
	var destination = childSnapshot.val().destination;
	var time = childSnapshot.val().time;
	var frequency = childSnapshot.val().frequent;

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + "" + "</td><td>" + "" + "</td></tr>");
});


