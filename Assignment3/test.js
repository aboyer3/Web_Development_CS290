myTempFunct();																// This function call will work

function myTempFunct() {
	return console.log("This function does some stuff");
}


myTempFunct2();															// This function call will NOT work


var temp = function myTempFunct2(){
	return console.log("This function does some other stuff");
}
