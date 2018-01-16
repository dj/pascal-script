const types = {
	INT: 'INT',
	PLUS: 'PLUS',
	MINUS: 'MINUS',
	MULT: 'MULT',
	DIV: 'DIV',
	EOF: 'EOF'
}


const Token = function (type, value) {
	if (value === undefined) {
		value = type
	}
	this.type = type
	this.value = value
}


Token.prototype.toString = function() {
	switch(this.type) {
		case types.INT:
			return `(${this.type}, ${this.value})`
		default:
			return this.type
	}
}


module.exports = { Token, types }