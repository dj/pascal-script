const types = {
	INT: 'INT',
	PLUS: '+',
	MINUS: '-',
	MULT: '*',
	DIV: '/',
	LPAREN: '(',
	RPAREN: ')',
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