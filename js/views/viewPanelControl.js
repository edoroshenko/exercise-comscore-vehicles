var ViewPanelControl = function(node) {
	this.node = node;
	this.inputsType  = node.querySelectorAll('.panel-control__input-type-vehicle');
	this.buttonStart = node.querySelector('.panel-control__button_start');
	this.buttonStop  = node.querySelector('.panel-control__button_stop');

	this.reset();
	this.bindAll();
};

ViewPanelControl.prototype.bindAll = function() {
	this.buttonStart.addEventListener('click', function() {
		var type = this.getType();
		if (!type) {
			return;
		}
		events.trigger('panel-control.start', {type: type});
	}.bind(this));

	this.buttonStop.addEventListener('click', function() {
		events.trigger('panel-control.stop');
	}.bind(this));
};

ViewPanelControl.prototype.getType = function() {
	var i;
	var input;
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

	addClass(this.buttonStop, 'hidden');

	var i;
	for (i = 0; i < this.inputsType.length; i++) {
		this.inputsType[i].removeAttribute('disabled');
	}
};

ViewPanelControl.prototype.onRun = function() {
	addClass(this.buttonStart, 'hidden');

	removeClass(this.buttonStop, 'hidden');

	var i;
	for (i = 0; i < this.inputsType.length; i++) {
		this.inputsType[i].setAttribute('disabled', 'disabled');
	}
};