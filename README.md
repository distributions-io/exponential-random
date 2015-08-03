Exponential Random Variables
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a [matrix](https://github.com/dstructs/matrix) or array filled with draws from an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).


## Installation

``` bash
$ npm install distributions-exponential-random
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var generator = require( 'distributions-exponential-random' );
```

#### generator( lambda[, opts ] )

Initializes a random number generator for drawing random variates from an exponential distribution with rate parameter `lambda` (where `lambda > 0`).

```javascript
var random = generator( 1, {
	'seed': 22
});
```

The function accepts the following `option`:

*	__seed__: positive integer used as a seed to initialize the generator. If not supplied, uniformly distributed random numbers are generated via `Math.random`.

The generator returns a function `random` with the following API:

#### random( dims[, opts] )

Creates a [`matrix`](https://github.com/dstructs/matrix) or [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) filled with draws from the specified [exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution). The `dims` argument may either be a positive `integer` specifying a `length` or an `array` of positive `integers` specifying dimensions.

``` javascript
var out;

out = random( 5 );
// returns [ ~0.278, ~1.631, ~0.228, ~0.134, ~0.019 ];

out = random( [2,1,2] );
// returns [ [ [~4.3,~3.858] ], [ [~0.043,~0.349] ] ]
```

The function accepts the following `option`:

*	__dtype__: output data type (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types). Default: `generic`.

By default, the output data structure is a generic [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). To output a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), set the `dtype` option.

``` javascript
var out;

out = random( 5, {
	'dtype': 'float32'
});
// returns Float32Array( [~0.129,~1.08,~0.31,~0.0004,~0.466] );

out = random( [3,2], {
	'dtype': 'float64'
});
/*
	[ ~0.131 ~0.269
	  ~0.3   ~2.03
	  ~0.561 ~0.244 ]
*/
```

__Notes__:
*	Currently, for more than `2` dimensions, the function outputs a __generic__ `array` and ignores any specified `dtype`.

	``` javascript
	var out = random( [2,1,3], {
		'dtype': 'float32'
	});
	// example output:  [ [ [~0.536,~0.402,~1.032] ], [ [~1.157,~1.712,~1.974] ] ]
	```

## Examples

``` javascript
var generator = require( 'distributions-exponential-random' ),
	random = generator( 1 ),
	out;

// Plain arrays...

// 1x10:
out = random( 10 );

// Custom rate parameter:
out = random( 10, {
	'lambda': 0.1
})

// 2x1x3:
out = random( [2,1,3] );

// 5x5x5:
out = random( [5,5,5] );

// 10x5x10x20:
out = random( [10,5,10,20] );

// Typed arrays...
out = random( 10, {
	'dtype': 'float32'
});

// Matrices...
out = random( [3,2], {
	'dtype': 'float64'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-exponential-random.svg
[npm-url]: https://npmjs.org/package/distributions-exponential-random

[travis-image]: http://img.shields.io/travis/distributions-io/exponential-random/master.svg
[travis-url]: https://travis-ci.org/distributions-io/exponential-random

[codecov-image]: https://img.shields.io/codecov/c/githubdistributions-io/exponential-random/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/exponential-random?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/exponential-random.svg
[dependencies-url]: https://david-dm.org/distributions-io/exponential-random

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/exponential-random.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/exponential-random

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/exponential-random.svg
[github-issues-url]: https://github.com/distributions-io/exponential-random/issues
