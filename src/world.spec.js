import World from './world';
import { assert } from 'chai';

describe('World class', function() {
  const assert = require('chai').assert;

  it('should create new world', function() {
    let world = new World();
    assert.isArray(world.molecules);
    assert.equal(world.molecules.length, 0);
    assert.equal(world.time, 0);
  });
});
