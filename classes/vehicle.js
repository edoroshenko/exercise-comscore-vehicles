var Vehicle = function(options) {

	this.consumtionFuel = options.consumtionFuel;
	this.consumtionOil  = options.consumtionOil;
	this.nameUnit       = options.nameUnit;
	// How much units does the vehice carry per 100 km
	this.volumeUnits    = options.volumeUnits;
	// The speed of the vehicle in km per hour
	this.speed = 60;
	// shows how often to change the state of the instance
	this.timeoutStep = 10;
};

Vehicle.prototype.resetCounters = function() {
	this.usageFuel     = 0;
	this.usageOil      = 0;
	this.carriedUnits  = 0;
};

Vehicle.prototype.run = function(distance) {

};

Vehicle.prototype.stop = function() {
	
};

Vehicle.prototype.report = function() {
	
};