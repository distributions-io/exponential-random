'use strict';

// MODULES //

var ctors = require( 'compute-array-constructors' ),
	partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( len, dt, lambda )
*	Creates a typed array of exponentially distributed random variates.
*
* @param {Number} len - array length
* @param {String} dt - data type
* @param {Number} lambda - rate parameter
* @returns {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} typed array filled with exponential random variates
*/
function random( len, dt, lambda ) {
	/* jshint newcap:false */
	var ctor,
		out,
		draw,
		i;

	draw = partial( lambda );
	ctor = ctors( dt );
	if ( ctor === null ) {
		throw new Error( 'random()::invalid value. Data type does not have a corresponding array constructor. Value: `' + dt + '`.' );
	}
	out = new ctor( len );
	for ( i = 0; i < len; i++ ) {
		out[ i ] = draw();
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
