import Point from './point';
import Vector from './vector';

class Molecule {
  constructor(point = new Point(), vector = new Vector(), radius = 1) {
    this.position = point;
    this.direction = vector;
    this.radius = radius;
  }

  move(distance) {
    let angel = this.direction.angleRadians();
    this.position.x += distance * Math.cos(angel);
    this.position.y += distance * Math.sin(angel);
  }
  /**
   * Collision detections of two molecules
   * @returns {Boolean}
   */
  static collision(a, b){
    let distance = Point.distance(a.position, b.position);
    return distance < a.radius + b.radius;
  }

  /**
   * Continuous collision detections of two molecules
   * @returns {Number|undefined} - distance
   */
  static continuousCollision(a, b){

  }
}


describe('Molecule class', function() {
  const assert = require('chai').assert;

  it('should create new molecule', function() {
    let molecule = new Molecule(new Point(0, 1), new Vector(-1, 0));
    molecule.move(5);
    assert.equal(parseInt(molecule.position.x), -5);
    assert.equal(parseInt(molecule.position.y), 1);
    assert.equal(molecule.direction.x, -1); // not changed
    assert.equal(molecule.direction.y, 0); // not changed

    let molecule2 = new Molecule(new Point(1, 1), new Vector(3, 4));
    molecule2.move(5);
    assert.equal(parseInt(molecule2.position.x), 4);
    assert.equal(parseInt(molecule2.position.y), 5);
  });

  it('should detect collision', function() {
    let m1 = new Molecule(new Point(1, 0));
    let m2 = new Molecule(new Point(2, 0));
    let m3 = new Molecule(new Point(5, 5), null, 5);
    assert.isTrue(Molecule.collision(m1, m2));
    assert.isFalse(Molecule.collision(m1, m3));
  });

  it('should detect continuous collision', function() {
    assert(false);
  });
})


export default Vector;
