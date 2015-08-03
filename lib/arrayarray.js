'use strict';

// MODULES //

var partial = require( './partial.js' ),
	recurse = require( './recurse.js' );


// RANDOM //

/**
* FUNCTION: random( dims, lambda[, rand] )
*	Creates a multidimensional array of exponentially distributed random variates.
*
* @param {Number[]} dims - dimensions
* @param {Number} lambda - rate parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Array} multidimensional array filled with exponential random variates
*/
function random( dims, lambda, rand ) {
	var draw = partial( lambda, rand );
	return recurse( dims, 0, draw );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
