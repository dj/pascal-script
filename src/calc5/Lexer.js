const {Token, types} = require('./Token')
const {INT, PLUS, MINUS, MULT, DIV} = types


const Lexer = function(text) {
	this.text = text
	this.pos = 0
	this.currentChar = this.text[this.pos]
}


Lexer.prototype.error = function(char) {
	throw `Unexpected character ${char}`
}


// Increment pos and set currentChar
Lexer.prototype.advance = function() {
	this.pos += 1
	if (this.pos > this.text.length - 1) {
		this.currentChar = null
	} else {
		this.currentChar = this.text[this.pos]
	}
}

// Skip whitespace
Lexer.prototype.skipWhitespace = function() {
	while (this.currentChar === ' ')
		this.advance()
}

// Read one or many digits that make up an integer
Lexer.prototype.int = function() {
	let result = ''
	while (isNumber(this.currentChar)) {
		result += this.currentChar
		this.advance()
	}
	return Number(result)
}


// Lexical analysis
Lexer.prototype.getNextToken = function() {
	while (this.currentChar !== null) {
		if (this.currentChar === ' ') {
			this.skipWhitespace()
			continue
		}

		if (isNumber(this.currentChar)) {
			return new Token(INT, this.int())
		}

		if (this.currentChar === '+') {
			this.advance()
			return new Token(PLUS)
		}

		if (this.currentChar === '-') {
			this.advance()
			return new Token(MINUS)
		}

		if (this.currentChar === '*') {
			this.advance()
			return new Token(MULT)
		}

		if (this.currentChar === '/') {
			this.advance()
			return new Token(DIV)
		}

		this.error(this.currentChar)
	} 
}


// Helper function to check if string is a number
// Remember that isNaN(' ') == false
function isNumber(str) {
    return str !== null && !isNaN(str)
}


module.exports.Lexer = Lexer