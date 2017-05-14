// Created by Alex Boyer
// This file sends a GET request to http://api.openweathermap.org via an HTML form
// taken from examples CS 290


var apiKey = 'fa7d80c48643dfadde2cced1b1be6ca1';

document.addEventListener('DOMContentLoaded', bindButtons);
function bindButtons(){
  // event listener on the zipcode submit button
  document.getElementById('zipSubmit').addEventListener('click', function(event){
  var req = new XMLHttpRequest();

  // This loads the zipcode from the HTML form
  var zip = document.getElementById('zipCode').value;

  // creates the URL that is sent as a GET request
  req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + zip + ",us" + "&appid="+ apiKey, true);
  req.send(null);

  // asychronous call
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){

      // parse the response from the server, and store text in html fields
      var response = JSON.parse(req.responseText);
      document.getElementById('cityRet').textContent = response.name;
      document.getElementById('tempRet').textContent = response.main.temp;
      document.getElementById('humRet').textContent = response.main.humidity;
    } else {
    console.log("Error in network request: " + req.statusText);
  }});
  event.preventDefault();
});

// event listener on the city & state submit button
document.getElementById('citySubmit').addEventListener('click', function(event){
var req = new XMLHttpRequest();

// This loads the city & state from the HTML form
var city = document.getElementById('cityState').value;

// creates the URL that is sent as a GET request
req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey, true);
req.send(null);

// asychronous call
req.addEventListener('load',function(){
  if(req.status >= 200 && req.status < 400){
    
    // parse the response from the server, and store text in html fields
    var response = JSON.parse(req.responseText);
    document.getElementById('cityRet').textContent = response.name;
    document.getElementById('tempRet').textContent = response.main.temp;
    document.getElementById('humRet').textContent = response.main.humidity;
  } else {
  console.log("Error in network request: " + req.statusText);
}});
event.preventDefault();
});
}
