var ViewPanelControl = function(node) {
	this.node = node;
	this.inputsType = node.querySelectorAll('.panel-control__input-type-vehicle');
	this.inputDistance = node.querySelector('.panel-control__input-distance');
	this.errorDistance = node.querySelector('.panel-control__error-distance');
	this.buttonStart = node.querySelector('.panel-control__button_start');
	this.buttonStop = node.querySelector('.panel-control__button_stop');

	this.reset();
	this.bindAll();
};

ViewPanelControl.prototype.bindAll = function() {
	this.buttonStart.addEventListener('click', function() {
		if (!this.isValid()) {
			removeClass(this.errorDistance, 'hidden');
			return;
		}
		events.trigger('panel-control.start', {type: this.getType(), distance: this.getDistance()});
	}.bind(this));

	this.buttonStop.addEventListener('click', function() {
		events.trigger('panel-control.stop');
	}.bind(this));
};

ViewPanelControl.prototype.isValid = function() {
	if (!this.getType()) {
		return false;
	}
	var distance = this.inputDistance.value;

	if (!distance || !distance.match(/^\s*\d+\s*$/g)) {
		return false;
	}
	return true;
};

ViewPanelControl.prototype.getDistance = function() {
	return parseInt(trim(this.inputDistance.value), 10);
};

ViewPanelControl.prototype.getType = function() {
	var i;
	var input;
	// I'm iterating the live collection,
	// but while I don't ad or delete nodes to it, I can do it this way
	for (i = 0; i < this.inputsType.length; i++) {
		input = this.inputsType[i];
		if (input.checked) {
			return input.getAttribute('value');
		}
	}
	return null;
};

ViewPanelControl.prototype.reset = function() {
	removeClass(this.buttonStart, 'hidden');

	addClass(this.buttonStop,     'hidden');
	addClass(this.errorDistance,  'hidden');

	var i;
	for (i = 0; i < this.inputsType.length; i++) {
		this.inputsType[i].removeAttribute('disabled');
	}
};

ViewPanelControl.prototype.onRun = function() {
	addClass(this.buttonStart, 'hidden');
	removeClass(this.buttonStop, 'hidden');
	addClass(this.errorDistance, 'hidden');

	var i;
	for (i = 0; i < this.inputsType.length; i++) {
		this.inputsType[i].setAttribute('disabled', 'disabled');
	}
};