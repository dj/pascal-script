const assert = require('assert')
const {Interpreter} = require('./Interpreter')
const {Lexer} = require('./Lexer')
const {types} = require('./Token')

describe('Interpreter', function () {
    describe('eat', function() {
        it ('should error on wrong token type', function() {
            const plusLexer = new Lexer('+')
            let interpreter = new Interpreter(plusLexer)
            assert.throws(
                () => interpreter.eat(types.INT),
                /Unexpected token: PLUS/
            )

            const intLexer = new Lexer('12345')
            interpreter = new Interpreter(intLexer)
            assert.throws(
                () => interpreter.eat(types.DIV),
                /Error: Unexpected token: \(INT, 12345\)/
            )
        })
    })
})