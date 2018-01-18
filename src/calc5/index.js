const {Lexer} = require('./Lexer')
const {Interpreter} = require('./Interpreter')

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'CALC> '
})

rl.prompt()

rl
    .on('line', line => {
		const lexer = new Lexer(line)
        const interpreter = new Interpreter(lexer)
        const result = interpreter.expr()
        console.log(result)
        rl.prompt()
    })
    .on('close', () => {
        console.log('\nExiting CALC. Bye!')
        process.exit(0)
    })