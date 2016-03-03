var moment = require('moment');
var parsedJson = JSON.parse(require('fs').readFileSync('./geo.json', 'utf8'));
var roomIds = parsedJson.features.map(function(item){
    return item.properties.roomId;
});

exports.propertyList = [];



function generate() {
    var obj;
    var id = roomIds[exports.getRandomInt(0, roomIds.length - 1)];
    var type = Math.random();
    var rand = Math.random();
        if(type > 0.5) {
            var temp = 20;
                if(rand > 0.5) temp += (rand * 10);
                    else temp -= (rand*10);

            obj = { "roomId": id,
                    "data": {
                    "name": "temperature",
                    "value": temp,
                    "lastupdate": moment().format()}}

        }else {
            var humidity = 0.5;
                if(rand > 0.5) humidity += (rand);
                    else humidity -= (rand);


            obj = { "roomId": id,
                    "data": {
                        "name": "humidity",
                        "value": humidity,
                        "lastupdate": moment().format()
                    }
            }
        }
    exports.propertyList.push(obj);
}

exports.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.start = function() {
    for (var i = 0; i <= 40; i++) {
        generate();
    }
};




