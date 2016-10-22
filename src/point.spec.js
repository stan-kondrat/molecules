import Point from './point';
import { assert } from 'chai';

describe('Class point should', function() {

  it('be default point position 0,0', function() {
    let point = new Point();
    assert.equal(point.x, 0);
  });

  it('calculate distance between two points', function() {
    let point1 = new Point(0, 0);
    let point2 = new Point(3, 4);
    assert.equal(Point.distance(point1, point2), 5);
  });

  it('calculate angle in radians between two points', function() {
    let point1 = new Point(1, 0);
    let point2 = new Point(-1, 0);
    assert.equal(Point.angleRadians(point1, point2), Math.PI);
  });

  it('calculate angle in degrees between two points', function() {
    let point1 = new Point(0, 0);
    let point2 = new Point(1, 1);
    assert.equal(Point.angleDegrees(point1, point2), 45);
  });
});
