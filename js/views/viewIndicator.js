/**
 * Indicator view constructor
 * @param Node node
 */
var ViewIndicator = function(node) {
	this.node  = node;
	this.line = this.node.querySelector('.bar-progress .bar-progress__line');

	this.valueDistance = this.node.querySelector('.bar-progress .bar-progress__distance');

	this.report = this.node.querySelector('.report');

	this.valueFuel = this.node.querySelector('.report .report__line-fuel .report__cell-value');
	this.valueOil  = this.node.querySelector('.report .report__line-oil  .report__cell-value');

	this.rowPassengers = this.node.querySelector('.report .report__line-passengers');
	this.valuePassengers = this.node.querySelector('.report .report__line-passengers .report__cell-value');

	this.rowLoad = this.node.querySelector('.report .report__line-load');
	this.valueLoad = this.node.querySelector('.report .report__line-load .report__cell-value');

	this.reset();
	this.bindAll();
};

/**
 * Binds some callbacks to a DOM events
 */
ViewIndicator.prototype.bindAll = function() {
	events.bind('vehicle.started',   this.init.bind(this));
	events.bind('vehicle.gone-step', this.update.bind(this));
};

/**
 * Sets the initial state of the view
 */
ViewIndicator.prototype.reset = function() {
	this.distance = 0;

	this.distanceFuel = 0;
	this.distanceOil  = 0;
	this.distanceLoad = 0;

	this.line.style.width = '0%';

	this.valueDistance.innerHTML = '0 km';
	this.valueFuel.innerHTML = '0 l';
	this.valueOil.innerHTML  = '0 l';
	this.valuePassengers.innerHTML = '0';
	this.valueLoad.innerHTML = '0 tons';

	addClass(this.report, 'hidden');
	addClass(this.rowPassengers, 'hidden');
	addClass(this.rowLoad, 'hidden');
};

/**
 * Sets the started state of the view
 */
ViewIndicator.prototype.init = function(e, params) {
	this.reset();

	this.distance = params.distance;

	if ('bus' === params.type) {
		removeClass(this.rowPassengers, 'hidden');
	}
	if ('truck' === params.type) {
		removeClass(this.rowLoad, 'hidden');
	}

	removeClass(this.report, 'hidden');
};

/**
 * Sets the current state of the view. Implements the report logic
 */
ViewIndicator.prototype.update = function(e, params) {
	this.distanceFuel += params.distanceStep;
	this.distanceOil  += params.distanceStep;
	this.distanceLoad += params.distanceStep;

	// setting a width of the line
	this.line.style.width = parseInt(params.distanceTotal / this.distance * 100, 10) + '%';

	// setting current distance
	this.valueDistance.innerHTML = parseInt(params.distanceTotal, 10) + ' km';

	// if it's time, updating a fuel counter
	if (Math.round(this.distanceFuel) >= 1000) {
		this.distanceFuel = this.distanceFuel - 1000;
		this.valueFuel.innerHTML = Math.round(params.usageFuel * 100) / 100 + ' l';
	}

	// if it's time, updating an oil counter
	if (Math.round(this.distanceOil) >= 3000) {
		this.distanceOil = this.distanceOil - 3000;
		this.valueOil.innerHTML  = Math.round(params.usageOil * 100) / 100 + ' l';
	}

	// if it's time, updating one load counters
	if (Math.round(this.distanceLoad) >= 5000) {
		this.distanceLoad = this.distanceLoad - 5000;
		if ('bus' === params.type) {
			this.valuePassengers.innerHTML = parseInt(params.carriedUnits, 10);
		}
		if ('truck' === params.type) {
			this.valueLoad.innerHTML = parseInt(params.carriedUnits, 10) + ' tons';
		}
	}
};