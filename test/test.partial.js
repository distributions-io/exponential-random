/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	partial = require( './../lib/partial.js' ),
	lcg = require( 'compute-lcg' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'random partial', function tests() {

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should generate an exponential random number generator for a custom uniform generator', function test() {
		var generator = lcg(),
			lambda = 2,
			random = partial( lambda, generator ),
			out;

		out = random();
		assert.isNumber( out );
	});

});
