/**
 * Vehicle class declaration
 *
 * @depends events
 * @depends config
 */

var Vehicle = function(options) {

	this.type = 'vehicle';

	// fuel consumtion in liters per 100 km
	this.consumtionFuel = options.consumtionFuel;
	// oil consumtion in liters per 100 km
	this.consumtionOil  = options.consumtionOil;
	// The speed of the vehicle in km per hour
	this.speed = 100;
	// time interval between the check points in seconds
	this.timeoutStep = 0.1;

	this.pointerTimeout = null;

	this.resetCounters();

	this.distance = 0;
};

Vehicle.prototype.resetCounters = function() {
	this.distanceGone  = 0;
	this.usageFuel     = 0;
	this.usageOil      = 0;
};

Vehicle.prototype.run = function(distance) {
	if (this.pointerTimeout) {
		return;
	}

	this.distance = distance;

	events.trigger('vehicle.started', {
		distance: distance,
		type: this.type
	});

	this.pointerTimeout = window.setTimeout(this.updateState.bind(this), this.timeoutStep * 1000);
};

Vehicle.prototype.updateCounters = function(distance) {
	this.distanceGone += distance;
	// adding a fuel usage, that was spend during the timeout
	this.usageFuel += distance * (this.consumtionFuel / 100);
	// adding a oil usage, that was spend during the timeout
	this.usageOil += distance * (this.consumtionOil / 100);
};

Vehicle.prototype.updateState = function() {
	// a distance, that was gone during the timeout
	this.distanceStep = this.timeoutStep * config.scaleTime * (this.speed / 3600);

	// the journey is over
	if (this.distanceGone + this.distanceStep > this.distance) {
		this.updateCounters(this.distance - this.distanceGone);
		events.trigger('vehicle.gone-step', this.getState());
		this.stop();
	} else {
		this.updateCounters(this.distanceStep);
		events.trigger('vehicle.gone-step', this.getState());
		this.pointerTimeout = window.setTimeout(this.updateState.bind(this), this.timeoutStep * 1000);
	}
};

Vehicle.prototype.getState = function() {
	return {
		type:          this.type,
		distanceTotal: this.distanceGone,
		distanceStep:  this.distanceStep,
		usageFuel:     this.usageFuel,
		usageOil:      this.usageOil
	};
};

Vehicle.prototype.stop = function() {
	window.clearTimeout(this.pointerTimeout);
	this.resetCounters();
	this.pointerTimeout = null;
	events.trigger('vehicle.stopped', this.getState());
};

Vehicle.createInstance = function(type) {
	switch(type) {
		case 'car':
			return new VehicleCar();
		case 'bus':
			return new VehicleBus();
		case 'track':
			return new VehicleTrack();
		default:
			return null;
	}
};