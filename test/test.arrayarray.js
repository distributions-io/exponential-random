/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	random = require( './../lib/arrayarray.js' ),
	randArr = require( './../lib/array.js' ),
	lcg = require( 'compute-lcg' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'random multidimensional array', function tests() {

	it( 'should export a function', function test() {
		expect( random ).to.be.a( 'function' );
	});

	it( 'should return an array of arrays fillef with exponential random numbers', function test() {
		var expected,
			lambda = 2,
			actual,
			generator;

		generator = lcg( 10 );
		expected = [
			[
				randArr( 3, lambda, generator )
			],
			[
				randArr( 3, lambda, generator )
			]
		];

		generator = lcg( 10 );
		actual = random( [2,1,3], lambda, generator );

		assert.deepEqual( actual, expected );
	});

});
