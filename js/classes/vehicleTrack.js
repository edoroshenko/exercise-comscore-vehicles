var VehicleTrack = function() {
	VehicleTransport.call(this, {
		consumtionFuel: 25,
		consumtionOil:  1.2,
		nameUnit: 'tons',
		volumeUnits: 4.8
	});

	this.speed = 80;
};

extend(VehicleTrack, VehicleTransport);