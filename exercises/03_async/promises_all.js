
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

const exit = () => new Promise( () => {
	process.exit()
})

getInput('enter base currency')
	.then(checkValidCurrencyCode)
	.then( base => {
		this.base = base
		this.itemPromises = ['USD', 'HKD'].map( curr => new Promise((resolve, reject) => {
			const url = `http://api.fixer.io/latest?base=${this.base}&symbols=${curr}`
			request.get(url, (err, res, body) => {
				if (err) reject(new Error(`could not get conversion rate for ${base}`))
				resolve(body)
			})
		}))
	})
	.then( () => Promise.all(this.itemPromises))
	.then( results => results.forEach( item => console.log(item)))
	.then(exit)
	.catch( err => console.log(`error: ${err.message}`))
	.then(exit)

// const itemPromises = ['USD', 'GBP'].map( base => new Promise((resolve, reject) => {
// 	const url = `http://api.fixer.io/latest?symbols=${base}`
// 	request.get(url, (err, res, body) => {
// 		if (err) reject(new Error(`could not get conversion rate for ${base}`))
// 		resolve(body)
// 	})
// }))
