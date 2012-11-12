var VehicleTrack = function() {
	VehicleTransport.call(this, {
		consumtionFuel: 25,
		consumtionOil:  1.2,
		volumeUnits: 4.8
	});

	this.type  = 'track';
	this.speed = 90;
};

extend(VehicleTrack, VehicleTransport);