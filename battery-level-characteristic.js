var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var BatteryLevelCharacteristic = function() {
    BatteryLevelCharacteristic.super_.call(this, {
	uuid: '2A19',
	properties: ['read'],
	descriptors: [
	    new Descriptor({
		uuid: '2901',
		value: 'Battery level between 0 and 100 percent'
	    }),
	    new Descriptor({
		uuid: '2904',
		value: new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00 ]) // maybe 12 0xC unsigned 8 bit
	    })
	]
    });
};

util.inherits(BatteryLevelCharacteristic, Characteristic);

BatteryLevelCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log("Client Request Battery Level");
    console.log(os.platform());
    if (os.platform() === 'linux') {
	exec('cat /sys/class/power_supply/BAT0/capacity', function (error, stdout, stderr) {
	    var data = stdout.toString();
	    //var percent = data.split('\t')[1].split(';')[0];
	    console.log(data);
	    percent = parseInt(data, 10);
	    //console.log(persent);
	    callback(this.RESULT_SUCCESS, new Buffer([percent]));
	});
    } else {
	// return hardcoded value
	callback(this.RESULT_SUCCESS, new Buffer([98]));
    }
};

module.exports = BatteryLevelCharacteristic;