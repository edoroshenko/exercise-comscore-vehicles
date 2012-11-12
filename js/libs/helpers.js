function addClass(node, c) {
	var classes  = node.className.split(' ');
	if (-1 !== classes.indexOf(c)) {
		return;
	}
	classes.push(c);
	node.className = classes.join(' ');
}

function removeClass(node, c) {
	var classes  = node.className.split(' ');
	var index;
	if (-1 === (index = classes.indexOf(c))) {
		return;
	}
	classes.splice(index, 1);
	node.className = classes.join(' ');
}

function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
}

function trim(str) {
	return str.replace(/^\s*/, '').replace(/\s*$/, '');
}