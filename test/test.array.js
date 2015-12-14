/* global describe, it, require */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	random = require( './../lib/array.js' ),
	expMean = require( 'distributions-exponential-mean' ),
	expVar = require( 'distributions-exponential-variance' ),
	mean = require( 'compute-mean' ),
	kstest = require( 'compute-kstest' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'random array', function tests() {

	this.timeout( 50000 );

	it( 'should export a function', function test() {
		expect( random ).to.be.a( 'function' );
	});

	it( 'should grow array for more than 64,000 elements', function test() {
		var out = random( 64001 );
		assert.strictEqual( out.length, 64001 );
	});

	it( 'should generate samples which pass mean test when λ = 1', function test() {
		var out,
			lambda = 1,
			sampleMean,
			n = 10000,
			iTotal = 400,
			s, m,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( expVar( lambda ) ) / Math.sqrt( n );
		m = expMean( lambda );

		// CI
		ci = [ m - 2 * s, m + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( n, lambda );
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when λ = 1', function test() {
		var data,
			i,
			notpassed = 0,
			lambda = 1;

		for ( i = 0; i < 100; i++ ) {
			data = random( 500, lambda );
			if ( kstest( data, 'exponential' ).pValue < 0.05 ) {
				notpassed += 1;
			}
		}
		assert.isBelow( notpassed / 100, 0.15 );
	});

	it( 'should generate samples which pass mean test when λ = 4', function test() {
		var out,
			lambda = 4,
			sampleMean,
			n = 10000,
			iTotal = 400,
			s, m,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( expVar( lambda ) ) / Math.sqrt( n );
		m = expMean( lambda );

		// CI
		ci = [ m - 2 * s, m + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( n, lambda );
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when λ = 4', function test() {
		var data,
			lambda = 4,
			pval,
			i,
			notpassed = 0;

		for ( i = 0; i < 100; i++ ) {
			data = random( 500, lambda );
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
