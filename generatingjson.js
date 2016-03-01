var moment = require('moment');


exports.propertyList = [];



function generate() {
    var obj;
    var type = Math.random();
    var rand = Math.random();
        if(type > 0.5) {
            var temp = 20;
                if(rand > 0.5) temp += (rand * 10);
                    else temp -= (rand*10);

            obj = { "name": "temperature",
                    "value": temp,
                    "lastupdate": moment().format()}

        }else {
            var humidity = 0.5;
                if(rand > 0.5) humidity += (rand);
                    else humidity -= (rand);


            obj = { "name": "humidity",
                "value": humidity,
                "lastupdate": moment().format()}
        }
    exports.propertyList.push(obj);
}

exports.start = function() {

    for (var i = 0; i <= 40; i++) {
        generate();
    }
};




