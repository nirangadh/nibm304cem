
'use strict'

const request = require('request')

const getInput = prompt => new Promise( (resolve) => {
	process.stdin.resume()
	process.stdin.setEncoding('utf8')
	process.stdout.write(`${prompt}: `)
	process.stdin.on('data', text => resolve(text))
})

const checkValidCurrencyCode = code => new Promise( (resolve, reject) => {
	code = code.trim()
	request('http://api.fixer.io/latest', (err, res, body) => {
		if (err) reject(new Error('invalid API call'))
		const rates = JSON.parse(body).rates
		if (!rates.hasOwnProperty(code)) reject(new Error(`invalid currency code ${code}`))
		resolve(code)
	})
})

const getData = code => new Promise( (resolve, reject) => {
	request(`http://api.fixer.io/latest?base=${code}`, (err, res, body) => {
		if (err) reject(new Error('invalid API call'))
		resolve(body)
	})
})

const printObject = data => new Promise( resolve => {
	const indent = 2
	data = JSON.parse(data)
	const str = JSON.stringify(data, null, indent)
	console.log(str)
	resolve()
})

const exit = () => new Promise( () => {
	process.exit()
})

getInput('enter base currency')
	.then(checkValidCurrencyCode)
	.then(getData)
	.then(printObject)
	.then(exit)
	.catch( err => console.error(`error: ${err.message}`))
	.then(exit)
