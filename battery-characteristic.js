var util = require('util');
var os = require('os');
var r = require('child_process');

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var BatteryCharacteristic = function() {
    BatteryCharacteristic.super_.call(this, {
	uuid: '2A19',
	properties: ['read'],
	descriptors: [
	    new Descriptor({
		uuid: '2901',
		value: 'Battery level between 0 and 100 percent'
	    }),
	    new Descriptor({
		uuid: '2904',
		value: new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00])
	    })
	]
    });
};

util.inherits(BatteryCharacteristic, Characteristic);

BatteryCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log("Client Request Battery Level");
    if (os.platform() === 'linux') {
	var lvl = r.spawnSync('cat', ['/sys/class/power_supply/BAT0/capacity'], { encoding : 'utf8' });
	lvl = lvl.stdout.toString();
	lvl = lvl.split('\n')[0];
	console.log("Battery level: " + lvl);
	lvl = parseInt(lvl, 10);
	callback(this.RESULT_SUCCESS, new Buffer([lvl]));
    } else {
	callback(this.RESULT_SUCCESS, new Buffer([98]));
    }
};

module.exports = BatteryCharacteristic;
