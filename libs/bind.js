/**
 * a simple implemetnation of Funcion.prototype.bind
 */

if ('undefined' === typeof Function.prototype.bind) {
	Function.prototype.bind = function(context) {
		var func = this;
		return function() {
			func.apply(context, arguments);
		};
	};
}