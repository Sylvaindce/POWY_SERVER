
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
    console.log('Initializing advertising: ' + (error ? 'error ' + error : 'success'));
    
    if (!error) {
	bleno.setServices([primaryService], function(error){
	    console.log('Initializing services: '  + (error ? 'error ' + error : 'success'));
	});
    }
});

bleno.on('accept', function(clientAddress) {
  console.log('Client (' + clientAddress + ' ) connected.');
  bleno.updateRssi();
});

bleno.on('disconnect', function(clientAddress) {
  console.log('Client ( ' + clientAddress + ' ) disconnected.');
});
