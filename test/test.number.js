/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	random = require( './../lib/number.js' ),

	// Theoretical mean of exponential distribution
	expMean = require( 'distributions-exponential-mean' ),

	// Theoretical variance of exponential distribution
	expVar = require( 'distributions-exponential-variance' ),

	// Module to calculate the mean
	mean = require( 'compute-mean' ),

	// Kolmogorov-Smirnov test
	kstest = require( 'compute-kstest' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'random number', function tests() {

	this.timeout( 50000 );

	it( 'should export a function', function test() {
		expect( random ).to.be.a( 'function' );
	});

	it( 'should generate samples which pass mean test when λ = 1', function test() {
		var out,
			lambda = 1,
			sampleMean,
			n = 50000,
			iTotal = 400,
			s, m,
			ci,
			outside = 0,
			i, j;

		// Mean test
		s = Math.sqrt( expVar( lambda ) ) / Math.sqrt( n );
		m = expMean( lambda );

		// CI
		ci = [ m - 2 * s, m + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = new Array( n );
			for ( j = 0; j < 500; j++ ) {
				out[ j ] = random( lambda );
			}
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when λ = 1', function test() {
		var data,
			i, j,
			notpassed = 0,
			lambda = 1;

		for ( i = 0; i < 100; i++ ) {
			data = new Array( 500 );
			for ( j = 0; j < 500; j++ ) {
				data[ j ] = random( lambda );
			}
			if ( kstest( data, 'exponential' ).pValue < 0.05 ) {
				notpassed += 1;
			}
		}
		assert.isBelow( notpassed / 100, 0.15 );
	});

	it( 'should generate samples which pass mean test when λ = 0.5', function test() {
		var out,
			lambda = 0.5,
			sampleMean,
			n = 50000,
			iTotal = 400,
			s, m,
			ci,
			outside = 0,
			i, j;

		// Mean test
		s = Math.sqrt( expVar( lambda ) ) / Math.sqrt( n );
		m = expMean( lambda );

		// CI
		ci = [ m - 2 * s, m + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = new Array( n );
			for ( j = 0; j < 500; j++ ) {
				out[ j ] = random( lambda );
			}
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when λ = 0.1', function test() {
		var data,
			lambda = 0.1,
			pval,
			i, j,
			notpassed = 0;

		for ( i = 0; i < 100; i++ ) {
			data = new Array( 40 );
			for ( j = 0; j < 40; j++ ) {
				data[ j ] = random( lambda );
			}
			pval = kstest( data, 'exponential', {
				'lambda': lambda
			}).pValue;
			if ( pval < 0.05 ) {
				notpassed += 1;
			}
		}
		assert.isBelow( notpassed / 100, 0.15 );
	});

});
