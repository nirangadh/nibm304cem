
'use strict'

const apickli = require('apickli')

module.exports = function() {
	// cleanup before every scenario
	this.Before(function(scenario, callback) {
		this.apickli = new apickli.Apickli('http', 'httpbin.org')
		callback()
	})

	this.Given(/^I set (.*) header to (.*)$/, (headerName, headerValue, callback) => {
		this.apickli.addRequestHeader(headerName, headerValue)
		callback()
	})

	this.When(/^I GET (.*)$/, (resource, callback) => {
		this.apickli.get(resource, (error, response) => {
			if (error) {
				callback(new Error(error));
			}
			callback()
		})
	})

	this.Then(/^response code should be (.*)$/, (responseCode, callback) => {
		const assertion = this.apickli.assertResponseCode(responseCode)
		if (assertion.success) {
			callback()
		} else {
			callback(assertion)
		}
	})

}
