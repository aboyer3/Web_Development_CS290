// Created by Alex Boyer
// This file submits user info to http://httpbin.org/post
// gets a string of the post back and displays the info back to the screen


document.addEventListener('DOMContentLoaded', bindButtons);
function bindButtons(){

// event lsitener on submit button, one submit for all three input fields
document.getElementById('nameSubmit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    // payload is the object actually sent
    var payload = {name:null,addr:null,phone:null};
    event.preventDefault();

    //loading data entered by the user into the payload
    payload.name = document.getElementById('nameInput').value;
    payload.addr = document.getElementById('addrInput').value;
    payload.phone = document.getElementById('telInput').value;

    // open the post request to the server, and set type
    req.open('POST', 'http://httpbin.org/post', true);
    req.setRequestHeader('Content-Type', 'application/json');

    // asychronous call
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){

        // parse the response from the server, and store text in html fields
        var response = JSON.parse(req.responseText);
        document.getElementById('nameRet').textContent = response.json.name;
        document.getElementById('addrRet').textContent = response.json.addr;
        document.getElementById('telRet').textContent = response.json.phone;

      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    // send the payload request
    req.send(JSON.stringify(payload));
  });

}
