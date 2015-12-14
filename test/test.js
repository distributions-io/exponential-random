/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	random = require( './../lib' ),
	randArr = require( './../lib/array.js' ),
	randTypedArray = require( './../lib/typedarray.js' ),
	lcg = require( 'compute-lcg' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'distributions-exponential-random', function tests() {

	it( 'should export a function', function test() {
		expect( random ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a positive integer or an array of positive integers', function test() {
		var values = [
			'5',
			0,
			Math.PI,
			-1,
			NaN,
			true,
			null,
			undefined,
			{},
			[1,0],
			[1,null],
			[1,Math.PI],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				random( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				random( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should return a matrix filled with exponential random variates', function test() {
		var matrix = random( [2,2], {
			'dtype': 'int32',
			'seed': 2
		});

		assert.deepEqual( matrix.shape, [2,2] );
		assert.strictEqual( matrix.dtype, 'int32' );
		assert.deepEqual( matrix.data, randTypedArray( 4, 'int32', 1, lcg( 2 ) ) );
	});

	it( 'should return a typed-array filled with exponential random variates', function test() {
		var actual, expected;

		actual = random( 5, {
			'dtype': 'float32',
			'seed': 2
		});
		expected = randTypedArray( 5, 'float32', 1, lcg( 2 ) );

		assert.deepEqual( actual, expected );

		actual = random( [10], {
			'dtype': 'uint8_clamped',
			'seed': 9
		});
		expected = randTypedArray( 10, 'uint8_clamped', 1, lcg( 9 ) );

		assert.deepEqual( actual, expected );
	});

	it( 'should return a generic array filled with exponential random variates', function test() {
		var actual, expected;

		actual = random( 5, {
			'seed': 7
		});
		expected = randArr( 5, 1, lcg( 7 ) );

		assert.deepEqual( actual, expected );
	});

	it( 'should, until ndarrays are supported, ignore the `dtype` option and return a generic multidimensional array for >2 dimensions', function test() {
		var actual, expected,
			generator = lcg( 6 );

		actual = random( [2,1,3], {
			'dtype': 'float32',
			'seed': 6
		});
		expected = [ [ randArr( 3, 1, generator ) ], [ randArr( 3, 1, generator ) ] ];

		assert.deepEqual( actual, expected );
	});

});
