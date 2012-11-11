/**
 * The simpliest implementation of the custom event engine
 * TODO: implement arguments check
 */
var events = {
	events: {},
	/**
	 * Binds a callback to a custom event
	 * @param String nameEvent
	 * @param Function callback
	 */
	bind: function(nameEvent, callback) {
		if ('undefined' === typeof this.events[nameEvent]) {
			this.events[nameEvent] = [];
		}
		this.events[nameEvent].push(callback);
	},
	/**
	 * Unbinds a given callback from a custom event
	 * Unbinds all callbacks from a custom event if second argument is empty
	 * @param String nameEvent
	 * @param Function callback
	 */
	unbind: function(nameEvent, callback) {
		var callbacks = this.events[nameEvent];
		if (!callbacks || !callbacks.length) {
			return;
		}
		var i;
		var found;
		for (i = 0; i < callbacks.length; i++) {
			found = false;
			if (callback === callbacks[i]) {
				found = true;
				callbacks.splice(i, 1);
				return;
			}
		}
		if ('undefined' === typeof callback) {
			delete this.events[nameEvent];
		}
	},
	/**
	 * Triggers a custom event
	 * @param String nameEvent
	 * @param Object params
	 */
	trigger: function(nameEvent, params) {
		var callbacks = this.events[nameEvent];
		if (!callbacks || !callbacks.length) {
			return;
		}
		var i;
		for (i = 0; i < callbacks.length; i++) {
			callbacks[i](nameEvent, params);
		}
	}
};