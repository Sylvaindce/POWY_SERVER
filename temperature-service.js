var util = require('util');

var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var TemperatureCharacteristic = require('./temperature-characteristic');

function TemperatureService() {
    console.log("Launch Temperature Service");
    TemperatureService.super_.call(this, {
	uuid: '1809',
	characteristics: [
            new TemperatureCharacteristic()
	]
    });
}

util.inherits(TemperatureService, BlenoPrimaryService);

module.exports = TemperatureService;
