'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositive = require( 'validate.io-positive' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	lcg = require( 'compute-lcg' ),
	validate = require( './validate.js' ),
	validateGenerator = require( './validate_generator.js' );


// FUNCTIONS //

var array = require( './array.js' ),
	typedarray = require( './typedarray.js' ),
	arrayarray = require( './arrayarray.js' ),
	matrix = require( './matrix.js' ),
	number = require( './number.js' );


// EXPONENTIAL RANDOM VARIATES //


/**
* FUNCTION generator( lambda[, opts] )
*	Creates a random number generator for exponential random variates.
*
* @param {Number} lambda - rate parameter of the distribution
* @param {Object} [opts] - function options
* @param {Number} [opts.seed] - integer-valued seed
* @returns {Function} function to create exponential random variates
*/
function generator( lambda, options ) {
	var opts = {},
		rand,
		err;

	if ( !isPositive( lambda ) ) {
		throw new TypeError( 'generator()::invalid input argument. The rate parameter `lambda` must be a positive number.' );
	}
	if ( arguments.length > 1 ) {
		err = validateGenerator( opts, options );
		if ( err ) {
			throw err;
		}
	}

	if ( opts.seed ) {
		rand = lcg( opts.seed );
	}

	/**
	* FUNCTION: random( dims[, opts] )
	*	Creates a matrix or array filled with exponential random variables.
	*
	* @param {Number|Number[]} dims - dimensions
	* @param {Object} [opts] - function options
	* @param {String} [opts.dtype="generic"] - output data type
	* @returns {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} random variates
	*/
	return function random( dims, options ) {
		var opts = {},
			isArray,
			ndims,
			err,
			len,
			dt;

		if ( arguments.length === 0 ) {
			return number( lambda, rand );
		}
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
			if ( len === 1 ) {
				return number( lambda, rand );
			}
			if ( dt === 'generic' ) {
				return array( len, lambda, rand );
			}
			return typedarray( len, dt, lambda, rand );
		}
		// Multidimensional data structures...
		if ( dt !== 'generic' ) {
			if ( ndims === 2 ) {
				return matrix( dims, dt, lambda, rand );
			}
			// TODO: dstructs-ndarray support goes here. Until then, fall through to plain arrays...
		}
		return arrayarray( dims, lambda, rand );
	}; // end FUNCTION random()

}


// EXPORTS //

module.exports = generator;
