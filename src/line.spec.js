import Line from './line';
import Point from './point';
import Vector from './vector';
import { assert } from 'chai';


describe('Line point should', function() {
  // А = С = 0, В ≠0 – line coincides with Ox
  let lineOX = new Line(0, 1, 0);

  // В = С = 0, А ≠0 – line coincides with Oy
  let lineOY = new Line(1, 0, 0);

  // А = 0, В ≠0, С ≠0 { By + C = 0} - line parallel to x-axis
  let lineOX1 = new Line(0, 1, -1);

  // В = 0, А ≠0, С ≠ 0 { Ax + C = 0} – line parallel to y-axis
  let lineOY1 = new Line(1, 0, -1);

  // C = 0, А ≠0, В ≠ 0 – line passes through the origin
  let lineXY = new Line(-1, 1, 0);

  let p0 = new Point(0, 0);
  let p11 = new Point(1, 1);
  let p01 = new Point(0, 1);
  let p10 = new Point(1, 0);

  it('create new line General form', function() {
    let [a, b, c] = [1, 2, 3];
    let line = new Line(a, b, c);
    assert.equal(line.a, a);
    assert.equal(line.b, b);
    assert.equal(line.c, c);
  });

  it('create new line from Two-Point Form', function() {
    let p1 = new Point(1, 0);
    let p2 = new Point(0, 2);
    let p3 = new Point(3, 3);
    let _lineOX = Line.fromTwoPointForm(p1, p0);
    let _lineOY = Line.fromTwoPointForm(p0, p2);
    let _lineXY = Line.fromTwoPointForm(p0, p3);

    assert.equal(_lineOX.a, 0);
    assert.notEqual(_lineOX.b, 0);
    assert.equal(_lineOX.c, 0);

    assert.notEqual(_lineOY.a, 0);
    assert.equal(_lineOY.b, 0);
    assert.equal(_lineOY.c, 0);

    assert.notEqual(_lineXY.a, 0);
    assert.notEqual(_lineXY.b, 0);
    assert.equal(_lineXY.c, 0);
  });

  it('create new line from Point and Vector', function() {
    let v1 = new Vector(4, 5);
    let v2 = new Vector(1, 0);
    let v3 = new Vector(0, -1);
    let line1 = Line.fromPointAndVector(p0, v1);
    let _lineOX = Line.fromTwoPointForm(p0, v2);
    let _lineOY = Line.fromTwoPointForm(p0, v3);

    assert.equal(line1.a, -5);
    assert.equal(line1.b, 4);
    assert.equal(line1.c, 0);

    assert.equal(_lineOX.a, lineOX.a);
    assert.equal(_lineOX.b, lineOX.b);
    assert.equal(_lineOX.c, lineOX.c);

    assert.equal(_lineOY.a, lineOY.a);
    assert.equal(_lineOY.b, lineOY.b);
    assert.equal(_lineOY.c, lineOY.c);
  });

  it('distanceToPoint', function() {
    let p1 = new Point(5, 5);
    assert.equal(lineOX.distanceToPoint(p1), 5);
    assert.equal(lineOY.distanceToPoint(p1), 5);
    assert.equal(lineOX1.distanceToPoint(p1), 4);
    assert.equal(lineOY1.distanceToPoint(p1), 4);
    assert.equal(lineXY.distanceToPoint(p1), 0);
  });

  it('perpendicularLine', function() {
    let lineOX_p0 = lineOX.perpendicularLine(p0);
    let lineOY_p0 = lineOY.perpendicularLine(p0);

    assert.isFalse(lineOX_p0.contain(p10));
    assert.isTrue(lineOX_p0.contain(p01));

    assert.isTrue(lineOY_p0.contain(p10));
    assert.isFalse(lineOY_p0.contain(p01));

    assert.equal(lineOY_p0.a, 0);
    assert.notEqual(lineOY_p0.b, 0);
    assert.equal(lineOY_p0.c, 0);

    assert.notEqual(lineOX_p0.a, 0);
    assert.equal(lineOX_p0.b, 0);
    assert.equal(lineOX_p0.c, 0);

    let line1 = lineXY.perpendicularLine(p11);
    assert.isTrue(line1.contain(new Point(3, -1)));
    assert.isTrue(line1.contain(new Point(0, 2)));
    assert.isFalse(line1.contain(p01));
  });

  it('contain point', function() {
    assert.isTrue(lineOX.contain(p0));
    assert.isTrue(lineOX.contain(p10));
    assert.isFalse(lineOX.contain(p01));
    assert.isFalse(lineOX.contain(p11));

    assert.isFalse(lineOX1.contain(p0));
    assert.isFalse(lineOX1.contain(p10));
    assert.isTrue(lineOX1.contain(p01));
    assert.isTrue(lineOX1.contain(p11));

    assert.isTrue(lineXY.contain(p0));
    assert.isFalse(lineXY.contain(p10));
    assert.isFalse(lineXY.contain(p01));
    assert.isTrue(lineXY.contain(p11));
  });

  it('intersectionPoint', function() {
    let p1 = Line.intersectionPoint(lineOX, lineOY);
    assert.equal(p1.x, 0, 'p1.x');
    assert.equal(p1.y, 0, 'p1.y');

    let p2 = Line.intersectionPoint(lineOY, lineOX);
    assert.equal(p2.x, 0, 'p2.x');
    assert.equal(p2.y, 0, 'p2.y');

    let p3 = Line.intersectionPoint(lineOX1, lineOY1);
    assert.equal(p3.x, 1, 'p3.x');
    assert.equal(p3.y, 1, 'p3.y');

    let p4 = Line.intersectionPoint(lineOX1, lineXY);
    assert.equal(p4.x, 1, 'p4.x');
    assert.equal(p4.y, 1, 'p4.y');

    let p5 = Line.intersectionPoint(
      Line.fromPointAndVector(new Point(0, 4), new Vector(-1, -2)),
      Line.fromPointAndVector(new Point(5, 0), new Vector(-100, 0))
    );
    assert.equal(p5.x, -2, 'p5.x');
    assert.equal(p5.y, 0, 'p5.y');
  });
});
