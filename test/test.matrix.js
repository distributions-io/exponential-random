/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	random = require( './../lib/matrix.js' ),

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

describe( 'random matrix', function tests() {

	this.timeout( 50000 );

	it( 'should export a function', function test() {
		expect( random ).to.be.a( 'function' );
	});

	it( 'should generate samples which pass mean test when λ = 1', function test() {
		var out,
			lambda = 1,
			sampleMean,
			M = 200,
			N = 200,
			iTotal = 400,
			s, m,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( expVar( lambda ) ) / Math.sqrt( M * N );
		m = expMean( lambda );

		// CI
		ci = [ m - 2 * s, m + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( [M,N], 'float64', lambda );
			sampleMean = mean( out.data );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when λ = 1', function test() {
		var data,
			mat,
			lambda = 1,
			pval,
			i,
			notpassed = 0;

		for ( i = 0; i < 100; i++ ) {
			mat = random( [20,20], 'float64', lambda );
			data = mat.data;
			pval = kstest( data, 'exponential' ).pValue;
			if ( pval < 0.05 ) {
				notpassed += 1;
			}
		}
		assert.isBelow( notpassed / 100, 0.15 );
	});

	it( 'should generate samples which pass mean test when λ = 4', function test() {
		var out,
			lambda = 4,
			sampleMean,
			M = 200,
			N = 200,
			iTotal = 400,
			s, m,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( expVar( lambda ) ) / Math.sqrt( M * N );
		m = expMean( lambda );

		// CI
		ci = [ m - 2 * s, m + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( [M,N], 'float64', lambda );
			sampleMean = mean( out.data );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when λ = 4', function test() {
		var data,
			mat,
			lambda = 4,
			pval,
			i,
			notpassed = 0;

		for ( i = 0; i < 100; i++ ) {
			mat = random( [20,20], 'float64', lambda );
			data = mat.data;
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
