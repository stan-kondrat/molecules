import Vector from './vector';
import { assert } from 'chai';

describe('Vector class should', function() {
  it('create new vector', function() {
    let vector = new Vector();
    assert.equal(vector.x, 0);
  });

  it('calc angles', function() {
    let vector = new Vector(-1, 0);
    assert.equal(vector.angleRadians(), Math.PI);
    vector.x = -100;
    assert.equal(vector.angleRadians(), Math.PI);
    assert.equal(vector.angleDegrees(), 180);
  });

  it('concatinat two vectors', function() {
    let vector1 = new Vector(1, 2);
    let vector2 = new Vector(3, 4);
    let vector3 = Vector.concat(vector1, vector2);
    assert.equal(vector3.x, 4);
    assert.equal(vector3.y, 6);
  });
})
