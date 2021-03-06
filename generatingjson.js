var getRandomInt  = require('./randint');
var parsedJson = JSON.parse(require('fs').readFileSync('./geo.json', 'utf8'));
var roomids = parsedJson.features.map(function(item){
  return item.properties.roomid;
});

var humidityList = [100];
var tempList = [100];
var utilList = [100];

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate() {
  var date = new Date();
  var obj;
  var roomid = roomids[getRandomIntInclusive(0, roomids.length-1)];
  var type = Math.random();
  var rand = Math.random();
  if(type < 0.3) {
    var temp = 20;
    if(rand > 0.5) temp += (rand * 10);
    else           temp -= (rand * 10);

    obj = {
      "roomid": roomid,
      "data": {
        "name": "temperature",
        "value": temp,
        "lastupdate": date.toLocaleTimeString()
      }
    }
    tempList.push({"time": obj.data.lastupdate, "value": obj.data.value});
  } else {
    if (type > 0.3 && type < 0.6) {
      var maxUtil = parsedJson.features.filter(function (item) {
        return item.properties.roomid === roomid
      })[0].properties.data.filter(function (item) {
        return item.name === "maxutilization"
      })[0].value;

      obj = {
        "roomid": roomid,
        "data": {
          "name": "currentutilization",
          "value": getRandomIntInclusive(0, maxUtil),
          "lastupdate": date.toLocaleTimeString()
        }
      }
      utilList.push({"time": obj.data.lastupdate, "value": obj.data.value});
    }
  else {

      var humidity = 0.5;
      if (rand > 0.5) humidity += (rand);
      else           humidity -= (rand);

      obj = {
        "roomid": roomid,
        "data": {
          "name": "humidity",
          "value": humidity,
          "lastupdate": date.toLocaleTimeString()
        }
      }
      humidityList.push({"time": obj.data.lastupdate, "value": obj.data.value});
    }
  }
  return obj;
}

function historic() {
  var historicObj = {
    "labels": [],
    "datasets": [
      {
        "fillColor": "rgba(220,220,220,0.2)",
        "strokeColor": "rgba(220,220,220,1)",
        "pointColor": "rgba(220,220,220,1)",
        "pointStrokeColor": "#fff",
        "pointHighlightFill": "#fff",
        "pointHighlightStroke": "rgba(220,220,220,1)",

        "data": []
      }
    ]
  };

  if(tempList.length < 5) {
     return historicObj;
  }else {
   historicObj =
    {
      "labels": [
        tempList[tempList.length - 5].time,
        tempList[tempList.length - 4].time,
        tempList[tempList.length - 3].time,
        tempList[tempList.length - 2].time,
        tempList[tempList.length - 1].time
      ],
      "datasets": [
        {
          "fillColor": "rgba(220,220,220,0.2)",
          "strokeColor": "rgba(220,220,220,1)",
          "pointColor": "rgba(220,220,220,1)",
          "pointStrokeColor": "#fff",
          "pointHighlightFill": "#fff",
          "pointHighlightStroke": "rgba(220,220,220,1)",

          "data": [
            tempList[tempList.length - 5].value,
            tempList[tempList.length - 4].value,
            tempList[tempList.length - 3].value,
            tempList[tempList.length - 2].value,
            tempList[tempList.length - 1].value
          ]
        }
      ]
    }
    return historicObj;
  }

}

module.exports = {generate, historic}
