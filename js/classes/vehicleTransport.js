/**
 * Vehicle class declaration
 *
 * @depends vehicle
 * @depends extend
 */

var VehicleTransport = function(options) {
	Vehicle.apply(this, arguments);

	this.type = 'transport';

	// the name of carried units
	this.nameUnit       = options.nameUnit;
	// How much units does the vehice carry per 100 km
	this.volumeUnits    = options.volumeUnits;
};

extend(VehicleTransport, Vehicle);

VehicleTransport.prototype.resetCounters = function() {
	Vehicle.prototype.resetCounters.apply(this, arguments);
	this.carriedUnits = 0;
	this.distanceCarriedUnits = 0;
};

VehicleTransport.prototype.updateCounters = function(distance) {
	Vehicle.prototype.updateCounters.apply(this, arguments);

	this.distanceCarriedUnits += distance;

	// we'll update this value not more often than every 100 km
	if (this.distanceCarriedUnits >= 100) {
		this.carriedUnits += this.volumeUnits;
		this.distanceCarriedUnits = 0;
	}
};