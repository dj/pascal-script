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

    describe('factor', function() {
        it('should consume a factor', function() {
            const factorLexer = new Lexer('123')
            const interpreter = new Interpreter(factorLexer)
            const result = interpreter.factor()
            assert.equal(result, 123)
        })

        it('should fail to consume a non factor', function() {
            const factorLexer = new Lexer('+')
            const interpreter = new Interpreter(factorLexer)
            assert.throws(
                () => interpreter.factor(),
                /Error: Unexpected token: PLUS/
            )
        })
    })

    describe('term', function() {
        it('should consume a term', function() {
            const termLexer = new Lexer('2*3')
            const interpreter = new Interpreter(termLexer)
            const result = interpreter.term()
            assert.equal(result, 6)
        })

        it('should fail to consume a non term', function() {
            const lexer = new Lexer('+')
            const interpreter = new Interpreter(lexer)
            assert.throws(
                () => interpreter.factor(),
                /Error: Unexpected token: PLUS/
            )
        })
    })
})