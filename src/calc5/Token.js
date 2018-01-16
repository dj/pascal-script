module.exports.types = {
	INT: 'INT',
	PLUS: 'PLUS',
	MINUS: 'MINUS',
	MULT: 'MULT',
	DIV: 'DIV',
	EOF: 'EOF'
}


module.exports.Token = function (type, value) {
	if (value === undefined) {
		value = type
	}
	this.type = type
	this.value = value
}


module.exports.Token.prototype.toString = function() {
	return `Token(${this.type}, ${this.value})`
}

