import Point from './point';
import Vector from './vector';

const EPSILON = 1e-5;

class Line {
  /**
   * General form:  Ax + By + C = 0
   * @param {Number} a
   * @param {Number} b
   * @param {Number} c
   */
  constructor(a, b, c = 0) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  /**
   * Distance from point P to line
   * @param {Point} P - point
   * @returns {Number} - distance
   */
  distanceToPoint(p) {
    return Math.abs(this.a * p.x + this.b * p.y + this.c) / Math.hypot(this.a, this.b);
  }

  /**
   * Get perpendicular line through point
   * @param {Point} P - point
   * @returns {Line}
   */
  perpendicularLine(p) {
    let v = new Vector(this.a, this.b);
    return Line.fromPointAndVector(p, v);
  }

  /**
   * Check point on the line
   * @param {Point} P - point
   * @returns {Boolean}
   */
  contain(p) {
    return Math.abs(this.a * p.x + this.b * p.y + this.c) < EPSILON;
  }

  /**
   * Create new line from Two-point form:
   * (y₁ - y₂)x + (x₂ - x₁)y + (x₁y₂ - x₂y₁) = 0
   * @param {Point} p1
   * @param {Point} p2
   */
  static fromTwoPointForm(p1, p2) {
    let a = p1.y - p2.y;
    let b = p2.x - p1.x;
    let c = p1.x * p2.y - p2.x * p1.y;
    return new Line(a, b, c);
  }

  /**
   * Create new line using Point and Vector
   * @param {Point} p
   * @param {Vector} v
   */
  static fromPointAndVector(p, v) {
    let a = -v.y;
    let b = v.x;
    let c = p.x * v.y - v.x * p.y;
    return new Line(a, b, c);
  }

  /**
   * Get lines intersection point
   * @param {Line} l1
   * @param {Line} l2
   * @returns {Point}
   */
  static intersectionPoint(l1, l2) {
    let x = - (l1.b / l2.b * l2.c - l1.c) / (l1.b / l2.b * l2.a - l1.a);
    if (!Number.isFinite(x)) {
      x = - (l2.b / l1.b * l1.c - l2.c) / (l2.b / l1.b * l1.a - l2.a);
    }
    let y = - (l1.c + l1.a * x) / l1.b;
    if (!Number.isFinite(y)) {
      y = - (l2.c + l2.a * x) / l2.b;
    }
    return new Point(x, y);
  }
}

export default Line;
