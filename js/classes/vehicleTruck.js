/**
 * Vehicle Truck constructor
 *
 * @depends VehicleTransport
 */
var VehicleTruck = function() {
	VehicleTransport.call(this, {
		consumtionFuel: 25,
		consumtionOil:  1.2,
		volumeUnits: 4.8
	});

	this.type  = 'truck';
	this.speed = 90;
};

extend(VehicleTruck, VehicleTransport);