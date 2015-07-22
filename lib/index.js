'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var array = require( './array.js' ),
	typedarray = require( './typedarray.js' ),
	arrayarray = require( './arrayarray.js' ),
	matrix = require( './matrix.js' );


// EXPONENTIAL RANDOM VARIATES //

/**
* FUNCTION: random( dims[, opts] )
*	Creates a matrix or array filled with draws from an exponential distribution with rate parameter `lambda`.
*
* @param {Number|Number[]} dims - dimensions
* @param {Object} [opts] - function options
* @param {Number} [opts.lambda=1] - rate parameter
* @param {String} [opts.dtype="generic"] - output data type
* @returns {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} draws from an exponential distribution
*/
function random( dims, options ) {
	var opts = {},
		isArray,
		ndims,
		err,
		len,
		dt,
		lambda;

	isArray = isPositiveIntegerArray( dims );
	if ( !isArray && !isPositiveInteger( dims ) ) {
		throw new TypeError( 'random()::invalid input argument. Dimensions argument must be either a positive integer or a positive integer array. Value: `' + dims + '`.' );
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	lambda = opts.lambda || 1;
	dt = opts.dtype || 'generic';
	if ( isArray ) {
		ndims = dims.length;
		if ( ndims < 2 ) {
			len = dims[ 0 ];
		}
	} else {
		ndims = 1;
		len = dims;
	}
	// 1-dimensional data structures...
	if ( ndims === 1 ) {
		if ( dt === 'generic' ) {
			return array( len, lambda );
		}
		return typedarray( len, dt, lambda );
	}
	// Multidimensional data structures...
	if ( dt !== 'generic' ) {
		if ( ndims === 2 ) {
			return matrix( dims, dt, lambda );
		}
		// TODO: dstructs-ndarray support goes here. Until then, fall through to plain arrays...
	}
	return arrayarray( dims, lambda );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
