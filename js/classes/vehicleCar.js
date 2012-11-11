var VehicleCar = function() {
	Vehicle.call(this, {
		consumtionFuel: 5,
		consumtionOil:  0.3
	});

	this.speed = 120;
};

extend(VehicleCar, Vehicle);