// Let’s Build A Simple Interpreter. Part 1. 
// https://ruslanspivak.com/lsbasi-part1/

// We implement a simple calculator repl
// Only evaluates expressions of the form INT PLUS INT, ex: 1+1

// Usage:
// $ node src/calc.js
// CALC>1+1
// CALC>2

const readline = require('readline')

// A token is an integer, a plus sign or end-of-file
const [INT, PLUS, EOF] = ['INT', 'PLUS', 'EOF']

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
function isNumber(str) {
    return !isNaN(str)
}

// A Simple Interpreter
const Interpreter = function (text) {
    // the text of the program
    this.text = text
    // an index into the text of the program
    this.pos = 0
    // the token at the current position
    this.currentToken = null
}

Interpreter.prototype.error = function(msg) {
    throw `ERROR! ${msg}`
}

// Lexical analyzer / scanner / tokenizer
// Parse the program text to retrieve the next token
Interpreter.prototype.getNextToken = function() {
    // Check for EOF
    if (this.pos > this.text.length - 1) {
        return Token(EOF, null)
    }

    // Look at the first character and then turn it into a token
    // We can do this simply because we only have three very simple token types
    const currentChar = this.text[this.pos]
    let token

    // Check if the character is a digit
    if (isNumber(currentChar)) {
        token = new Token(INT, Number(currentChar))
        this.pos += 1
        return token
    } else if (currentChar === '+') {
        token = new Token(PLUS, currentChar)
        this.pos += 1
        return token
    }

    // Unexpected character
    this.error(`Unexpected character: ${currentChar}`)
}

// Compare the current token type with the passed token type
// If they match, eat the token and move on to the next
Interpreter.prototype.eat = function (type) {
    if (this.currentToken.type == type) {
        this.currentToken = this.getNextToken()
    } else {
        // Unexpected token
        this.error(`Unexpected token: ${this.currentToken.type}`)
    }
}


// Valid expressions are of the form: INT PLUS INT
// All other expressions are invalid. Sorry. 
// No one said this was a useful calculator.
Interpreter.prototype.eval = function() {
    this.currentToken = this.getNextToken()

    const left = this.currentToken
    this.eat(INT)
    const op = this.currentToken
    this.eat(PLUS)
    const right = this.currentToken
    this.eat(INT)

    return left.value + right.value
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