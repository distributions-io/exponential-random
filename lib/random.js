'use strict';

// FUNCTIONS //

var ln = Math.log;


// GENERATE EXPONENTIAL RANDOM VARIATES //

/**
* FUNCTION random( lambda )
*	Generates draws from an exponential distribution with rate parameter `lambda`.
*
* @param {Number} lambda - rate parameter
* @returns {Number} random draw from the specified distribution
*/
function random( lambda ) {
	var u = Math.random();
	return - ln( 1 - u ) / lambda;
}

module.exports = random;
