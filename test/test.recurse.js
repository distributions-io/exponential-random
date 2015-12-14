/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	recurse = require( './../lib/recurse.js' ),
	partial = require( './../lib/partial.js' ),
	randArr = require( './../lib/array.js' ),
	lcg = require( 'compute-lcg' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'recursive creation', function tests() {

	it( 'should export a function', function test() {
		expect( recurse ).to.be.a( 'function' );
	});

	it( 'should create an array of exponential random variates', function test() {
		var expected,
			lambda = 2,
			actual,
			generator,
			random;

		generator = lcg( 10 );
		expected = randArr( 10, lambda, generator );

		generator = lcg( 10 );
		random = partial( lambda, generator );
		actual = recurse( [10], 0, random );

		assert.deepEqual( actual, expected );
	});

	it( 'should create a multidimensional array of exponential random variates', function test() {
		var expected,
			lambda = 2,
			actual,
			generator,
			random;

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
		random = partial( lambda, generator );
		actual = recurse( [2,1,3], 0, random );

		assert.deepEqual( actual, expected );
	});

});
