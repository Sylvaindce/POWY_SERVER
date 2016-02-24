/*
NOTE: This example no longer works on OSX starting in 10.10 (Yosemite). Apple has apparently blacklisted the battery uuid.
*/

var bleno = require('bleno');
var BatteryService = require('./battery-service');

var primaryService = new BatteryService();

bleno.on('stateChange', function(state) {
    console.log('Server state: ' + state);
    
    if (state === 'poweredOn') {
	bleno.startAdvertising('POWY_SERVER', [primaryService.uuid]);
    } else {
	bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
    
    if (!error) {
	bleno.setServices([primaryService], function(error){
	    console.log('setServices: '  + (error ? 'error ' + error : 'success'));
	});
    }
});

bleno.on('accept', function(clientAddress) {
  console.log('Client (' + clientAddress + ') connected.');
  bleno.updateRssi();
});

bleno.on('disconnect', function(clientAddress) {
  console.log('Client ( ' + clientAddress + ') disconnected.');
});

bleno.on('rssiUpdate', function(rssi) {
  console.log('on -> rssiUpdate: ' + rssi);
});
