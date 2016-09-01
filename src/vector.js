class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static concat(a, b) {
    return new Vector(a.x + b.x, a.y + b.y);
  }
}


describe('Vector class', function() {
  const assert = require('chai').assert;

  it('should create new vector', function() {
    let vector = new Vector();
    assert.equal(vector.x, 0);
  });

  it('should concatinat two vectors', function() {
    let vector1 = new Vector(1, 2);
    let vector2 = new Vector(3, 4);
    let vector3 = Vector.concat(vector1, vector2);
    assert.equal(vector3.x, 4);
    assert.equal(vector3.y, 6);
  });
})


export default Vector;
