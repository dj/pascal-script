// Let’s Build A Simple Interpreter. Part 3. 
// https://ruslanspivak.com/lsbasi-part3/

// Improving upon part two, we implement a simple calculator.
// Previously, our caclulator only accepted expressions with two terms.
// Now, we allow for arbitrary terms.

// expression 	= number | expression operator number
// operator 	= + | -

const readline = require('readline')


// Token Types
const INT = 'INT',
	PLUS = '+',
	MINUS = '-',
	EOF = 'EOF'


// A Token has a type and optionally a value
// Usage:
// let plus = new Token('+')
// let int = new Token(INTEGER, 5)
const Token = function (type, value) {
	if (value === undefined) {
		// If value argument is not passed because the type has only one value
		// then use the type as the value
		value = type
	}
    this.type = type
    this.value = value
}


// String representation of Token instance
//
// Examples:
//     Token(INT, 3)
//     Token(PLUS, +)
Token.prototype.toString = function () {
    return `Token(${this.type}, ${this.value})`
}


// Helper function to check if string is a number
// Remember that isNaN(' ') == false
function isNumber(str) {
    return str !== null && !isNaN(str)
}


// Usage:
// const text = '1 + 1'
// const interpreter = new Interpreter(text)
// console.log(text.expr()) // 2
const Interpreter = function (text) {
    // the text of the program
    this.text = text
    // an index into the text of the program
    this.pos = 0
    // the token at the current position
	this.currentToken = null
	this.currentChar = this.text[this.pos]
}


Interpreter.prototype.error = function(msg) {
    throw `ERROR! ${msg}`
}


// Advance pos and set current character
Interpreter.prototype.advance = function() {
	this.pos += 1
	if (this.pos > this.text.length - 1) {
		this.currentChar = null
	} else {
		this.currentChar = this.text[this.pos]
	}
}


// Advance until past space or reached EOF
Interpreter.prototype.space = function () {
	while (this.currentChar == ' ') {
		this.advance()
	}
}


// Read integer from text and return value
Interpreter.prototype.integer = function () {
	let result = ''
	while (isNumber(this.currentChar)) {
		result += this.currentChar
		this.advance()
	}
	return Number(result)
}


// Lexical analyzer / scanner / tokenizer
// Parse the program text to retrieve the next token
Interpreter.prototype.getNextToken = function() {
	while (this.currentChar) {
		// Spaces
		if (this.currentChar == ' ') {
			this.space()
			continue
		}

		// Number
		if (isNumber(this.currentChar)) {
			return new Token(INT, this.integer())
		}

		// Operator
		switch (this.currentChar) {
			case PLUS:
				this.advance()
				return new Token(PLUS)
			case MINUS:
				this.advance()
				return new Token(MINUS)
		}

		// Unexpected character
		this.error(`Unexpected character: ${this.currentChar}`)
	}

	// EOF
	return new Token(EOF, null)
}


// Compare the current token type with the passed token type
// If they match, eat the token and move on to the next
Interpreter.prototype.eat = function (type) {
    if (this.currentToken.type === type) {
        this.currentToken = this.getNextToken()
    } else {
        // Unexpected token
        this.error(`Unexpected token: ${this.currentToken.type}`)
    }
}


// Returns an integer token value
Interpreter.prototype.term = function() {
	const token = this.currentToken
	this.eat(INT)
	return token.value
}


// Parser
Interpreter.prototype.expr = function() {
    this.currentToken = this.getNextToken()

	let result = this.term()
	while ([PLUS, MINUS].includes(this.currentToken.type)) {
		switch (this.currentToken.type) {
			case PLUS:
				this.eat(PLUS)
				result = result + this.term()
				continue
			case MINUS:
				this.eat(MINUS)
				result = result - this.term()
				continue
			default:
				this.error(`Unexpected operation ${op.value}`)
		}
	}

	return result
}


// Set up readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'CALC> '
})


// Print the first prompt to the screen
rl.prompt()


rl
    // Read lines
    .on('line', line => {
        const interpreter = new Interpreter(line)
        const result = interpreter.expr()
        console.log(result)
        rl.prompt()
    })
    // Exit 
    .on('close', () => {
        console.log('\nExiting CALC. Bye!')
        process.exit(0)
    })