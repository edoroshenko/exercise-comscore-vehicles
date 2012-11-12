/**
 * Vehicle Bus constructor
 *
 * @depends VehicleTransport
 */
var VehicleBus = function() {
	VehicleTransport.call(this, {
		consumtionFuel: 15,
		consumtionOil:  0.7,
		volumeUnits: 328
	});

	this.type  = 'bus';
	this.speed = 80;
};

extend(VehicleBus, VehicleTransport);