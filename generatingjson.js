var moment = require('moment');

var getRandomInt = require('./randint');

var parsedJson = JSON.parse(require('fs').readFileSync('./geo.json', 'utf8'));
var roomids = parsedJson.features.map(function(item){
  return item.properties.roomid;
});

var propertyList = []

for (var i = 0; i <= 40; i++) {
  generate();
}

function generate() {
  var obj;
  var roomid = roomids[getRandomInt(0, roomids.length - 1)];
  console.log(roomid);
  var type = Math.random();
  var rand = Math.random();
  if(type > 0.5) {
    var temp = 20;
    if(rand > 0.5) temp += (rand * 10);
    else           temp -= (rand * 10);

    obj = {
      "roomid": roomid,
      "data": {
        "name": "temperature",
        "value": temp,
        "lastupdate": moment().format()
      }
    }

  } else {
    var humidity = 0.5;
    if(rand > 0.5) humidity += (rand);
    else           humidity -= (rand);

    obj = {
      "roomid": roomid,
      "data": {
          "name": "humidity",
          "value": humidity,
          "lastupdate": moment().format()
      }
    }
  }
  propertyList.push(obj);
}

module.exports = propertyList
