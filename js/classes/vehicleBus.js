var VehicleBus = function() {
	VehicleTransport.call(this, {
		consumtionFuel: 15,
		consumtionOil:  0.7,
		nameUnit: 'passengers',
		volumeUnits: 328
	});

	this.speed = 80;
};

extend(VehicleBus, VehicleTransport);