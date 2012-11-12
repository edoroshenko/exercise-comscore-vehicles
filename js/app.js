var indicator = new ViewIndicator(document.querySelector('.indicator'));
var panel = new ViewPanelControl(document.querySelector('.panel-control'));

events.bind('panel-control.start', function(e, params) {
	var vehicle = Vehicle.createInstance(params.type);
	vehicle.run(1000);

	var onStop = function() {
		vehicle.stop();
	};
	events.bind('panel-control.stop', function(e, params) {
		events.unbind('panel-control.stop', onStop);
		onStop();
	});
});

events.bind('vehicle.started', function(e, params) {
	panel.onRun();
});

events.bind('vehicle.stopped', function(e, params) {
	panel.reset();
});