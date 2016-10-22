import Point from './point';
import Vector from './vector';
import Molecule from './molecule';
import { assert } from 'chai';

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
