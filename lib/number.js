'use strict';

// FUNCTIONS //

var ln = Math.log;


// GENERATE EXPONENTIAL RANDOM VARIATES //

/**
* FUNCTION random( lambda[, rand] )
*	Generates a random draw from an exponential distribution with rate parameter `lambda`.
*
* @param {Number} lambda - rate parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number} random draw from the specified distribution
*/
function random( lambda, rand ) {
	var u;
	u = rand ? rand() : Math.random();
	return - ln( 1 - u ) / lambda;
}

module.exports = random;
