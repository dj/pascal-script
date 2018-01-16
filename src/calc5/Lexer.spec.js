const assert = require('assert')
const {Lexer} = require('./Lexer')
const {types} = require('./Token')

describe('Lexer', function() {
	describe('advance', function() {
		it('should increment position and update currentChar', function() {
			const lexer = new Lexer("2+3")
			assert.equal(lexer.pos, 0)
			assert.equal(lexer.currentChar, "2")
			lexer.advance()
			lexer.advance()
			assert.equal(lexer.pos, 2)
			assert.equal(lexer.currentChar, "3")
		})
	})

	describe('skipWhitespace', function() {
		it('should skip all whitespace and not other characters', function() {
			const lexer = new Lexer("     dontskip")
			assert.equal(lexer.pos, 0)
			lexer.skipWhitespace()
			assert.equal(lexer.pos, 5)
			// Second call to skipWhitespace shouldn't update pos
			lexer.skipWhitespace()
			assert.equal(lexer.pos, 5)
		})
	})

	describe('int', function() {
		it('should read multi-digit ints', function() {
			const lexer = new Lexer('12345asdf')
			assert.equal(lexer.int(), 12345)
		})
	})

	describe('getNextToken', function() {
		it('should error on unexpected char', function() {
			const lexer = new Lexer('!')
			assert.throws(lexer.advance)
		})
		it('should tokenize valid characters', function() {
			const lexer = new Lexer('1 + 2')
			const one = lexer.getNextToken()
			assert.equal(one.type, types.INT)
			const plus = lexer.getNextToken()
			assert.equal(plus.type, types.PLUS)
			const two = lexer.getNextToken()
			assert.equal(two.type, types.INT)
		})
	})
})
