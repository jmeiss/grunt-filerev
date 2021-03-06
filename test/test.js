'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('assert');

var hashes = {
  'test/fixtures/file.png' : 'test/tmp/file.26365248.png',
  'test/fixtures/cfgfile.png' : 'test/tmp/cfgfile.da63.png',
  'test/fixtures/math.js' : 'test/tmp/withSourceMaps/math.2f56179e.js',
  'test/fixtures/math.js.map' : 'test/tmp/withSourceMaps/math.2f56179e.js.map',
  'test/fixtures/physics.js' : 'test/tmp/withSourceMaps/physics.14a0a482.js'
};

it('should revision files based on content', function () {
  var file = 'test/fixtures/file.png';
  var original = fs.statSync(file).size;
  var revisioned = fs.statSync(hashes[file]).size;
  assert(revisioned === original);
});

it('should accept options', function () {
  var file = 'test/fixtures/cfgfile.png';
  var original = fs.statSync(file).size;
  var revisioned = fs.statSync(hashes[file]).size;
  assert(revisioned === original);
});

it('should allow a dest directory option', function () {
  var file = 'test/fixtures/file.png';
  var original = fs.statSync(file).size;
  var revisioned = fs.statSync(hashes[file]).size;
  assert(revisioned === original);
});

it('should allow sources defined with expand', function () {
  var file = 'test/fixtures/file.png';
  var original = fs.statSync(file).size;
  var revisioned = fs.statSync(hashes[file]).size;
  assert(revisioned === original);
});

it('should use same revision as .js source for the .map', function () {
  var file = 'test/fixtures/math.js.map';
  var original = path.basename(hashes[file]);
  var revisioned = path.basename(hashes[file] + '.map', '.map');
  assert(revisioned === original);
});

it('should point the .js sourceMappingURL to the revisioned .map', function() {
  var file = 'test/fixtures/math.js';
  var map = 'math.2f56179e.js.map';
  var revisioned = fs.readFileSync(hashes[file], {encoding: 'utf8'});
  assert.notStrictEqual(revisioned.indexOf('//# sourceMappingURL=' + map), -1);
});

it('should revision .js file ok without any .map', function () {
  var file = 'test/fixtures/physics.js';
  var original = fs.statSync(file).size;
  var revisioned = fs.statSync(hashes[file]).size;
  assert(revisioned === original);
});

