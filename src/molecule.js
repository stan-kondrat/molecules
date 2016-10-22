import Point from './point';
import Vector from './vector';

const EPSILON = 1e-5;

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
   * Check intersection of two molecules
   * @returns {Boolean}
   */
  static intersect(a, b){
    let distance = Point.distance(a.position, b.position);
    return distance < a.radius + b.radius;
  }

  /**
   * Continuous collision detections of two molecules
   * @param {Boolean} centersOnly - ignore molecles radius
   * @returns {Number|undefined} - distance
   */
  static collision(a, b, centersOnly){
    // time when centerlines intersect
    var time1 = (b.position.x - a.position.x)/(a.speed.x - b.speed.x);
    var time2 = (b.position.y - a.position.y)/(a.speed.y - b.speed.y);

    // centerlines parallel or same line
    if (!isFinite(time1) && !isFinite(time2)) {
      return undefined;
    }

    if (centersOnly) {
      if (Math.abs(time1 - time2) < EPSILON) {
        return time1;
      }
      return undefined;
    }

    let R = a.radius + b.radius;
    let v = a.speed.x;
    let u = b.speed.x;
    let angle = Point.angleRadians(b.speed, a.speed);
    let Ax = R * v / Math.sqrt( - 2 * u * v * Math.cos(angle) + u * u + v * v );
    let timeAx = (Ax) / v;
    let timeCollision = time1 - timeAx;
    return timeCollision;
  }
}


describe('Molecule class should', function() {
  const assert = require('chai').assert;

  it('create new molecule', function() {
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

  it('check intersection', function() {
    let m1 = new Molecule(new Point(1, 0));
    let m2 = new Molecule(new Point(2, 0), null, 1.1);
    let m3 = new Molecule(new Point(5, 5), null, 5);
    assert.isTrue(Molecule.intersect(m1, m2));
    assert.isFalse(Molecule.intersect(m1, m3));
  });

  it('detect collision - centers of molecules', function() {
    let ignoreRadius = true;
    let m1 = new Molecule(new Point(2, 2), new Vector(1, 1), 0);
    let m2 = new Molecule(new Point(6, 0), new Vector(-1, 2), 0);
    let m3 = new Molecule(new Point(5, 3), new Vector(0, 0));
    assert.equal(Molecule.collision(m1, m2, ignoreRadius), 2, 'collision should be in point {4,4}');
    assert.isUndefined(Molecule.collision(m1, m3, ignoreRadius));

    // m4 and m5 on parallel lines
    let m4 = new Molecule(new Point(1, 1), new Vector(2, 1), 0);
    let m5 = new Molecule(new Point(3, 3), new Vector(-2, -1), 0);
    assert.isUndefined(Molecule.collision(m4, m5, ignoreRadius), 'should not be collision, molecules on parallel lines');

    // m6 and m7 on same line, but different direction
    let m6 = new Molecule(new Point(1, 1), new Vector(-1, -1), 0);
    let m7 = new Molecule(new Point(3, 3), new Vector(2, 2), 0);
    assert.isUndefined(Molecule.collision(m4, m5, ignoreRadius), 'should not be collision, molecules on different direcitons');
  });

  it('detect collision - considering radius of molecules', function() {
    let m1 = new Molecule(new Point(0, 0), new Vector(1, 0), 0);
    let m2 = new Molecule(new Point(0, 1), new Vector(1, 0), 0);
    let m3 = new Molecule(new Point(5, 0), new Vector(0, 0), 1);
    assert.equal(Molecule.collision(m1, m3), 4, 'collision should be in point {4,0}');
    // parallel centerlines
    // assert.equal(Molecule.collision(m2, m3), 5, 'collision should be in point {5,1}');
    let m4 = new Molecule(new Point(120, 110), new Vector(44, 5), 80);
    let m5 = new Molecule(new Point(340, 484), new Vector(28, -22), 30);
    assert.equal(Math.floor(Molecule.collision(m4, m5)), 10, 'collision should be in right time');

  });
})


export default Molecule;
