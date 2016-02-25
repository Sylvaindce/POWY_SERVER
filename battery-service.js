var util = require('util');

var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var BatteryCharacteristic = require('./battery-characteristic');

function BatteryService() {
    console.log("Launch Battery Service");
    BatteryService.super_.call(this, {
	uuid: '180F',
	characteristics: [
            new BatteryCharacteristic()
	]
    });
}

util.inherits(BatteryService, BlenoPrimaryService);

module.exports = BatteryService;
