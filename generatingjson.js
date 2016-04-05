var moment        = require('moment');
var getRandomInt  = require('./randint');

var parsedJson = JSON.parse(require('fs').readFileSync('./geo.json', 'utf8'));
var roomids = parsedJson.features.map(function(item){
  return item.properties.roomid;
});

function generate() {
  var obj;
  var roomid = roomids[getRandomInt(0, roomids.length-1)];
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
  return obj;
}

module.exports = {generate}
