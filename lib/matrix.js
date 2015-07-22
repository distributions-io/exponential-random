'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' ),
	partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( dims, dt, lambda )
*	Creates a matrix of exponentially distributed random variates.
*
* @param {Number[]} dims - dimensions
* @param {String} dt - data type
* @param {Number} lambda - rate parameter
* @returns {Matrix} matrix filled with exponential random variates
*/
function random( dims, dt, lambda ) {
	var out,
		draw,
		i;

	draw = partial( lambda );
	out = matrix( dims, dt );
	for ( i = 0; i < out.length; i++ ) {
		out.data[ i ] = draw();
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
