/**
 * Vehicle class declaration
 *
 * @depends events
 * @depends config
 */

var Vehicle = function(options) {

	this.type = 'custom';

	// fuel consumtion in liters per 100 km
	this.consumtionFuel = options.consumtionFuel;
	// oil consumtion in liters per 100 km
	this.consumtionOil  = options.consumtionOil;
	// the name of carried units
	this.nameUnit       = options.nameUnit;
	// How much units does the vehice carry per 100 km
	this.volumeUnits    = options.volumeUnits;
	// The speed of the vehicle in km per hour
	this.speed = 100;
	// time interval between the chek points
	this.timeoutStep = 2;

	this.pointerTimeout = null;

	this.intervalReport = 1000;

	this.resetCounters();
};

Vehicle.prototype.resetCounters = function() {
	this.distanceGone  = 0;
	this.usageFuel     = 0;
	this.usageOil      = 0;
	this.carriedUnits  = 0;
	this.distanceCarriedUnits = 0;
	this.distanceAfterReport  = 0;
};

Vehicle.prototype.run = function(distance) {
	if (this.pointerTimeout) {
		return;
	}
	this.pointerTimeout = window.setTimeout(this.updateState.bind(this), this.timeoutStep * 1000);
};

Vehicle.prototype.updateState = function() {
	// a distance, that was gone during the timeout
	var distance = this.timeoutStep * config.scaleTime * (this.speed / 3600);

	this.distanceGone += distance;
	this.distanceCarriedUnits += distance;
	this.distanceAfterReport += distance;
	// adding a fuel usage, that was spend during the timeout
	this.usageFuel += distance * (this.consumtionFuel / 100);
	// adding a oil usage, that was spend during the timeout
	this.usageOil += distance * (this.usageOil / 100);

	// TODO: move this logic to the inheritor

	// we'll update this value not more often than every 100 km
	if (this.distanceCarriedUnits >= 100) {
		this.carriedUnits += this.volumeUnits;
		this.distanceCarriedUnits = 0;
	}

	events.trigger('vehicle.gone-step', this.getState());

	this.pointerTimeout = window.setTimeout(this.updateState.bind(this), this.timeoutStep * 1000);
};

Vehicle.prototype.getState = function() {
	return {
		type:         this.type,
		distanceGone: this.distanceGone,
		usageFuel:    this.usageFuel,
		usageOil:     this.usageOil,
		carriedUnits: this.carriedUnits
	};
};

Vehicle.prototype.stop = function() {
	window.clearTimeout(this.pointerTimeout);
	this.resetCounters();
	this.pointerTimeout = null;
};