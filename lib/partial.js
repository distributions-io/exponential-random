'use strict';

// FUNCTIONS //

var ln = Math.log;


// PARTIAL //

/**
* FUNCTION: partial( lambda )
*	Partially applies rate parameter `lambda` and returns a function to generate random variables from the exponential distribution.
*
* @param {Number} lambda - rate parameter
* @returns {Function} function which generates random draws from the specified distribution
*/
function partial( lambda ) {
	/**
	* FUNCTION: random( x )
	*	Generates random draws for an exponential distribution with rate parameter `lambda`.
	*
	* @private
	* @returns {Number} random draw from the specified distribution
	*/
	return function random() {
		var u = Math.random();
		return - ln( 1 - u ) / lambda;
	};
} // end FUNCTION partial()

module.exports = partial;
