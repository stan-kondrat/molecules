class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  static angleRadians(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x);
  }

  static angleDegrees(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
  }
}


describe('Class point', function() {
  const assert = require('chai').assert;

  it('should be default point position 0,0', function() {
    let point = new Point();
    assert.equal(point.x, 0);
  });

  it('should calculate distance between two points', function() {
    let point1 = new Point(0, 0);
    let point2 = new Point(3, 4);
    assert.equal(Point.distance(point1, point2), 5);
  });

  it('should calculate angle in radians between two points', function() {
    let point1 = new Point(1, 0);
    let point2 = new Point(-1, 0);
    assert.equal(Point.angleRadians(point1, point2), Math.PI);
  });

  it('should calculate angle in degrees between two points', function() {
    let point1 = new Point(0, 0);
    let point2 = new Point(1, 1);
    assert.equal(Point.angleDegrees(point1, point2), 45);
  });
})


export default Point;
