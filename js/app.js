// the interface consists of two views
// an indicator
var indicator = new ViewIndicator(document.querySelector('.indicator'));
// and a control panel
var panel = new ViewPanelControl(document.querySelector('.panel-control'));

// when "start" is clicked
events.bind('panel-control.start', function(e, params) {
	// we'll create a new vehicle
	var vehicle = Vehicle.createInstance(params.type);

	// bind a callback to a stop event
	var onStop = function() {
		vehicle.stop();
	};
	events.bind('panel-control.stop', function(e, params) {
		events.unbind('panel-control.stop', onStop);
		onStop();
	});

	// and 'll run it
	vehicle.run(params.distance);
});

// when vehicle starts
events.bind('vehicle.started', function(e, params) {
	// the panel reacts
	panel.onRun();
});

// when vehicle stops
events.bind('vehicle.stopped', function(e, params) {
	// the panel reacts
	panel.reset();
});