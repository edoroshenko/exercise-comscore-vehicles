var v = new Vehicle({
	consumtionFuel: 5,
	consumtionOil: 0.3,
	nameUnit: 'passenger',
	volumeUnits: 10
});

events.bind('vehicle.gone-step', function(e, state) {console.log(state);});