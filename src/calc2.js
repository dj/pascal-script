// Let’s Build A Simple Interpreter. Part 2. 
// https://ruslanspivak.com/lsbasi-part2/

// Improving upon part one, we implement a simple calculator,
// except now it allows for whitespace and integers of arbitrary length

// Valid expressions are one of:
// 	INT PLUS INT
// 	INT MINUS INT

const readline = require('readline')


// A token is an integer, a plus sign, a minus sign, or end-of-file
const INT = 'INT',
	PLUS = 'PLUS',
	MINUS = 'MINUS'
	EOF = 'EOF'


// A Token has a type and value
const Token = function (type, value) {
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


// A Simple Interpreter
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
		if (this.currentChar == ' ') {
			this.space()
			continue
		}

		if (isNumber(this.currentChar)) {
			return new Token(INT, this.integer())
		}

		if (this.currentChar === '+') {
			this.advance()
			return new Token(PLUS, '+')
		}

		if (this.currentChar === '-') {
			this.advance()
			return new Token(MINUS, '-')
		}

		// Unexpected character
		this.error(`Unexpected character: ${this.currentChar}`)
	}

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


// This is the real parser or interpreter
// Expressions are one of:
// 	INT PLUS INT
// 	INT MINUS INT
Interpreter.prototype.eval = function() {
    this.currentToken = this.getNextToken()

	const left = this.currentToken
	this.eat(INT)

	const op = this.currentToken
	this.eat(op.type)

    const right = this.currentToken
	this.eat(INT)

	switch (op.type) {
		case PLUS:
			return left.value + right.value
		case MINUS:
			return left.value - right.value
		default:
			this.error(`Unexpected operation ${op.value}`)
	}
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
        const result = interpreter.eval()
        console.log(result)
        rl.prompt()
    })
    // Exit 
    .on('close', () => {
        console.log('\nExiting CALC. Bye!')
        process.exit(0)
    })