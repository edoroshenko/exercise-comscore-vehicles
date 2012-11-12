/**
 * Vehicle Transport constructor
 *
 * @depends Vehicle
 * @depends extend
 */
var VehicleTransport = function(options) {
	Vehicle.apply(this, arguments);

	this.type = 'transport';

	// How much units does the vehice carry per 100 km
	this.volumeUnits    = options.volumeUnits;
};

extend(VehicleTransport, Vehicle);

/**
 * Sets the initial values to all counters,
 * including the specific logic for the transport vehicles
 */
VehicleTransport.prototype.resetCounters = function() {
	Vehicle.prototype.resetCounters.apply(this, arguments);
	this.carriedUnits = 0;
	this.distanceCarriedUnits = 0;
};

/**
 * Sets the current values of the counters,
 * including the specific logic for the transport vehicles
 */
VehicleTransport.prototype.updateCounters = function(distance) {
	Vehicle.prototype.updateCounters.apply(this, arguments);

	this.distanceCarriedUnits += distance;

	// we'll update this value not more often than every 100 km
	if (this.distanceCarriedUnits >= 100) {
		this.carriedUnits += this.volumeUnits;
		this.distanceCarriedUnits = 0;
	}
};

/**
 * Returns the object representation of the vehicle state
 * including the specific data for the transport vehicles
 */
VehicleTransport.prototype.getState = function() {
	var state = Vehicle.prototype.getState.apply(this, arguments);
	state.carriedUnits = this.carriedUnits;

	return state;
};