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

  it('null vector', function() {
    let vector1 = new Vector(0, 0);
    let vector2 = new Vector(3, 4);
    assert.equal(vector1.nullVector(), true);
    assert.equal(vector2.nullVector(), false);
  });

  it('check collinearity', function() {
    let vector1 = new Vector(0, 0);
    let vector2 = new Vector(0, 5);
    let vector3 = new Vector(3, 0);
    let vector4 = new Vector(3, 1);
    let vector5 = new Vector(6, 2.0000001);
    let vector6 = new Vector(1, 0);

    assert.equal(Vector.collinear(vector1, vector4), true);
    assert.equal(Vector.collinear(vector2, vector3), false);
    assert.equal(Vector.collinear(vector3, vector4), false);
    assert.equal(Vector.collinear(vector4, vector5), true);
    assert.equal(Vector.collinear(vector1, vector6), true);
  });
})
