var apiKey = 'http://search.worldbank.org/api/projects?format=json&fl=countryname,totalamt,countrycode,countryshortname&source=IBRD&rows=500&frmYear=2016&toYear=2017';
var CountryCodeApiKey = 'https://restcountries.eu/rest/v2/all?fields=name;numericCode';


// First api call to World bank
var response;
var WorldBankresponse;

function get() {
  // Return a new promise.
  return new Promise(function(resolve, reject) {

var req = new XMLHttpRequest();
req.open("GET", apiKey, true);
//req.setRequestHeader('Content-Type', 'application/json');
req.send(null);

req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){

      // parse the response from the server, and store text in html fields
      WorldBankresponse = JSON.parse(req.responseText);
      resolve(req.response);

    } else {
      reject(Error(req.statusText));
    //console.log("Error in network request: " + req.statusText);
  }
  //console.log(WorldBankresponse);

});
req.onerror = function() {
      reject(Error("Network Error"));
    };
});
}



async function getFetch() {
  try {
    const worldbank = JSON.parse(await get());
    const countries = JSON.parse(await get2());

console.log(worldbank);

var keys = worldbank.projects;
var temp = Object.getOwnPropertyNames(keys);

    for (var i in countries) {
      for(var j in worldbank.projects){
          var object = countries[i];
          var count = 0;
          var str = String(temp[count]);
          //console.log(str);
        //console.log("Object Name: " + object.name +" : World Bank Name " + worldbank.projects[j].countryshortname);
            if (countries[i].name == worldbank.projects[j].countryshortname) {
              console.log("Object Name: " + countries[i].name +" : World Bank Name " + worldbank.projects[j].countryshortname);
              console.log(parseInt(countries[i].totalamt));
              if ('totalamt' in countries[i]){
                //console.log(parseInt(countries[i].totalamt));

                if (typeof countries[i].totalamt === 'string' || countries[i].totalamt instanceof String){
                  var sum = countries[i].totalamt;
                  var newSum = parseInt(sum.replace(/[^0-9]/g, ''));
                  var sum2 = worldbank.projects[j].totalamt

                  newSum += parseInt(sum2.replace(/[^0-9]/g, ''));
                }
                else{
                    var sum = countries[i].totalamt;
                    sum += worldbank.projects[j].totalamt;
                    countries[i]["totalamt"] = sum;
                }

              }
              else{
                countries[i]["totalamt"] =  worldbank.projects[j].totalamt;
              }
            }}
              count++;
    }



    console.log(worldbank);
    console.log(countries);

  }
  catch (err) {
    console.log('get failed', err);
  }
}
getFetch();








function get2() {
  // Return a new promise.
  return new Promise(function(resolve, reject) {


var req2 = new XMLHttpRequest();
req2.open("GET", CountryCodeApiKey, true);
//req.setRequestHeader('Content-Type', 'application/json');
req2.send(null);
req2.addEventListener('load',function(){
    if(req2.status >= 200 && req2.status < 400){

      // parse the response from the server, and store text in html fields
      response = JSON.parse(req2.responseText);
      resolve(req2.response);

    } else {
      reject(Error(req2.statusText));
    //console.log("Error in network request: " + req2.statusText);
  }
  //console.log(response);
});
req2.onerror = function() {
      reject(Error("Network Error"));
    };
});
}

//doWork(response);


function doWork(response){
  firstFunction(function() {
        console.log('huzzah, I\'m done!');



    });


}

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var projection = d3.geoMercator()
    .scale((width - 3) / (2 * Math.PI))
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var graticule = d3.geoGraticule();

var color = d3.scaleOrdinal(d3.schemeCategory20);

svg.append("defs").append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);

svg.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");

svg.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

d3.json("https://unpkg.com/world-atlas@1/world/50m.json", function(error, world) {
  if (error) throw error;

  svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);

  svg.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);

    var countries = topojson.feature(world, world.objects.countries).features,
    neighbors = topojson.neighbors(world.objects.countries.geometries);

    for (var i in countries) {
      if (countries.hasOwnProperty(i)) {
          console.log(countries[i].id);
      }
    }

svg.selectAll(".country")
      .data(countries)
    .enter().insert("path", ".graticule")
      .attr("class", "country")
      .attr("d", path)
      .style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return countries[n].color; }) + 1 | 0); });
});
