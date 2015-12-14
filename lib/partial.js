'use strict';

// FUNCTIONS //

var ln = Math.log;


// PARTIAL //

/**
* FUNCTION: partial( lambda[, rand] )
*	Partially applies rate parameter `lambda` and returns a function to generate random variables from the exponential distribution.
*
* @param {Number} lambda - rate parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Function} function which generates random draws from the specified distribution
*/
function partial( lambda, rand ) {
	var random;
	if ( rand ) {
		random = rand;
	} else {
		random = Math.random;
	}
	/**
	* FUNCTION: draw()
	*	Generates a random draw for an exponential distribution with rate parameter `lambda`.
	*
	* @private
	* @returns {Number} random draw from the specified distribution
	*/
	return function draw() {
		var u = random();
		return - ln( 1 - u ) / lambda;
	}; // end FUNCTION draw()
} // end FUNCTION partial()

module.exports = partial;
