
'use strict'

const request = require('request')

getInput('enter base currency', (err, base) => {
	if (err) {
		console.log(err.message)
		process.exit()
	}
	base = base.trim()
	checkValidCurrencyCode(base, err => {
		if (err) {
			console.log(err.message)
			process.exit()
		}
		getData(`http://api.fixer.io/latest?base=${base}`, (err, data) => {
			if (err) {
				console.log(err.message)
				process.exit()
			}
			const obj = JSON.parse(data)
			printObject(obj)
			process.exit()
		})
	})
})

function getInput(prompt, callback) {
	try {
		process.stdin.resume()
		process.stdin.setEncoding('utf8')
		process.stdout.write(`${prompt}: `)
		process.stdin.on('data', text => callback(null, text))
	} catch(err) {
		callback(err)
	}
}

function checkValidCurrencyCode(code, callback) {
	code = code.trim()
	request('http://api.fixer.io/latest', (err, res, body) => {
		if (err) callback(new Error('invalid API call'))
		const rates = JSON.parse(body).rates
		if (!rates.hasOwnProperty(code)) callback(new Error(`invalid currency code ${code}`))
		callback(null, true)
	})
}

function getData(url, callback) {
	request(url, (err, res, body) => {
		if (err) callback(new Error('invalid API call'))
		callback(null, body)
	})
}

function printObject(data) {
	const indent = 2
	const str = JSON.stringify(data, null, indent)
	console.log(str)
}
