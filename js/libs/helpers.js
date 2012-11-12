/**
 * Adds a class to a node
 * @param Node node
 * @param String c
 */
function addClass(node, c) {
	var classes  = node.className.split(' ');
	if (-1 !== classes.indexOf(c)) {
		return;
	}
	classes.push(c);
	node.className = classes.join(' ');
}

/**
 * Removes a class from a node
 * @param Node node
 * @param String c
 */
function removeClass(node, c) {
	var classes  = node.className.split(' ');
	var index;
	if (-1 === (index = classes.indexOf(c))) {
		return;
	}
	classes.splice(index, 1);
	node.className = classes.join(' ');
}

/**
 * Inherits a subClass from a superClass
 * @param Object subClass
 * @param Object superClass
 */
function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
}

/**
 * Trims a string given
 * @param String str
 */
function trim(str) {
	return str.replace(/^\s*/, '').replace(/\s*$/, '');
}