'use strict';

// MODULES //

var partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( len )
*	Creates an array of exponentially distributed random variates.
*
* @param {Number} len - array length
* @param {Number} lambda - rate parameter
* @returns {Number[]} array filled with exponential random variates
*/
function random( len, lambda ) {
	var out,
		draw,
		i;

	draw = partial( lambda );
	// Ensure fast elements...
	if ( len < 64000 ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = draw();
		}
	} else {
		out = [];
		for ( i = 0; i < len; i++ ) {
			out.push( draw() );
		}
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
