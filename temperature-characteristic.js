var util = require('util');
var os = require('os');
var r = require('child_process');

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var TemperatureCharacteristic = function() {
    TemperatureCharacteristic.super_.call(this, {
	uuid: '2A1C',
	properties: ['read'],
	descriptors: [
	    new Descriptor({
		uuid: '2901',
		value: 'Temperature in Celsius'
	    }),
	    new Descriptor({
	    	uuid: '2904',
	    	value: new Buffer([0x0100, 0x0101, 0x0102, 0x0104, 0x0105, 0x110, 0x0111]) // maybe 12 0xC unsigned 8 bit
	    })
	]
    });
};

util.inherits(TemperatureCharacteristic, Characteristic);

TemperatureCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log("Client Request Temperature");
    if (os.platform() === 'linux') {
	var temp = r.spawnSync('cat', ['/sys/class/thermal/thermal_zone0/temp'], { encoding : 'utf8' });
	temp = temp.stdout.toString();
	temp = temp.split('\n')[0];
	temp = temp.substring(0,2);
	//temp = (temp).toFixed(2);
	console.log("Temperature: " + temp);
	temp = parseInt(temp, 10);
	var d = parseFloat(temp);
	//console.log(d.toString());
	//callback(this.RESULT_SUCCESS, new Buffer([d]));
	callback(this.RESULT_SUCCESS, new Buffer([parseFloat(d)]));
    } else {
	callback(this.RESULT_SUCCESS, new Buffer([parseFloat(18)]));
    }
};

module.exports = TemperatureCharacteristic;
