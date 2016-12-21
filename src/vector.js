const EPSILON = 1e-5;

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  angleRadians() {
    return Math.atan2(this.y, this.x);
  }

  angleDegrees() {
    return Math.atan2(this.y, this.x) * 180 / Math.PI;
  }

  nullVector() {
    return this.x === 0 && this.y === 0;
  }

  getLength() {
    return Math.hypot(this.x, this.y);
  }

  multiply(m) {
    this.x *= m;
    this.y *= m;
    return this;
  }

  divide(m) {
    this.x /= m;
    this.y /= m;
    return this;
  }

  update(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /** Finding the Angle's cosine Between Two Vectors */
  static cossine(a, b) {
    return Vector.scalar(a, b) / (a.getLength() * b.getLength());
  }

  /** Calculate the scalar product of the two vectors */
  static scalar(a, b) {
    return a.x * b.x + a.y * b.y;
  }

  static normilize(v) {
    let len = v.getLength();
    return new Vector(v.x / len, v.y / len);
  }

  static clone(v) {
    return new Vector(v.x, v.y);
  }

  static concat(a, b) {
    return new Vector(a.x + b.x, a.y + b.y);
  }

  static collinear(a, b) {
    if (a.nullVector() || b.nullVector()) {
      return true;
    }

    if (Math.abs(a.x * b.y - a.y * b.x) < EPSILON) {
      return true;
    }

    return false;
  }
}

export default Vector;
