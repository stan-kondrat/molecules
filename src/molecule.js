import Point from './point';
import Vector from './vector';

class Molecule {
  constructor(point = new Point(), speed = new Vector(), radius = 0) {
    this.position = point;
    this.speed = speed;
    this.radius = radius;
  }

  moveByDistance(distance) {
    let angel = this.speed.angleRadians();
    this.position.x += distance * Math.cos(angel);
    this.position.y += distance * Math.sin(angel);
  }

  moveByTime(time) {
    this.position.x += time * this.speed.x;
    this.position.y += time * this.speed.y;
  }

  /**
   * Collision detections of two molecules
   * @returns {Boolean}
   */
  static detectCollision(a, b){
    let distance = Point.distance(a.position, b.position);
    return distance < a.radius + b.radius;
  }

  /**
   * Continuous collision detections of two molecules
   * @returns {Number|undefined} - distance
   */
  static detectContinuousCollision(a, b, centersOnly){
    var time1 = (b.position.x - a.position.x)/(a.speed.x - b.speed.x);
    var time2 = (b.position.y - a.position.y)/(a.speed.y - b.speed.y);

    if (centersOnly) {
      return time1 == time2 ? time1 : undefined;
    }
  }
}

describe('Molecule class', function() {
  const assert = require('chai').assert;

  it('should create new molecule', function() {
    let molecule = new Molecule(new Point(0, 1), new Vector(-1, 0));
    molecule.moveByDistance(5);
    assert.equal(parseInt(molecule.position.x), -5);
    assert.equal(parseInt(molecule.position.y), 1);
    assert.equal(molecule.speed.x, -1); // not changed
    assert.equal(molecule.speed.y, 0); // not changed

    let molecule2 = new Molecule(new Point(1, 1), new Vector(3, 4));
    molecule2.moveByDistance(5);
    assert.equal(parseInt(molecule2.position.x), 4);
    assert.equal(parseInt(molecule2.position.y), 5);

    let molecule3 = new Molecule(new Point(0, 1), new Vector(1, 1));
    molecule3.moveByTime(5);
    assert.equal(parseInt(molecule3.position.x), 5);
    assert.equal(parseInt(molecule3.position.y), 6);
  });

  it('should detect collision', function() {
    let m1 = new Molecule(new Point(1, 0));
    let m2 = new Molecule(new Point(2, 0), null, 1.1);
    let m3 = new Molecule(new Point(5, 5), null, 5);
    assert.isTrue(Molecule.detectCollision(m1, m2));
    assert.isFalse(Molecule.detectCollision(m1, m3));
  });

  it('detection continuous collision centers of molecules', function() {
    let m1 = new Molecule(new Point(2, 2), new Vector(1, 1), 0);
    let m2 = new Molecule(new Point(6, 0), new Vector(-1, 2), 0);
    let m3 = new Molecule(new Point(5, 3), new Vector(0, 0));
    assert.equal(Molecule.detectContinuousCollision(m1, m2, true), 2, 'collision should be in point {4,4}');
    assert.isUndefined(Molecule.detectContinuousCollision(m1, m3, true));
  });

  it('detection continuous collision consider radius of molecules', function() {
    let m1 = new Molecule(new Point(0, 0), new Vector(1, 0), 0);
    let m2 = new Molecule(new Point(0, 1), new Vector(1, 0), 0);
    let m3 = new Molecule(new Point(5, 0), new Vector(0, 0), 1);
    assert.equal(Molecule.detectContinuousCollision(m1, m3), 2, 'collision should be in point {4,0}');
    assert.equal(Molecule.detectContinuousCollision(m2, m3), 2, 'collision should be in point {5,1}');
  });
})


export default Molecule;
