const {Token, types} = require('./Token')
const {INT, PLUS, MINUS, MULT, DIV, EOF} = types

function Interpreter(lexer) {
    this.lexer = lexer
    this.currentToken = lexer.getNextToken()
}


Interpreter.prototype.error = function(token) {
    throw new Error(`Unexpected token: ${token}`)
}


// Attempt to read a token of the passed type from the lexer
// Otherwise, raise an exception
Interpreter.prototype.eat = function(type) {
    if (this.currentToken.type === type) {
        this.currentToken = this.lexer.getNextToken()
    } else {
        return this.error(this.currentToken)
    }
}

// factor : INT
Interpreter.prototype.factor = function () {
    const int = this.currentToken
    this.eat(INT)
    return int.value
}


module.exports.Interpreter = Interpreter