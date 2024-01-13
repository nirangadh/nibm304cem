
Feature:
	As a novice I want to test my BDD framework.

	Scenario: Retrieving an empty list should return a 200 code.
	  Given I set Content-Type header to application-json
		When I GET https://api.github.com/users/marktyers/orgs
		Then response code should be 200
