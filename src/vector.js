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

  static concat(a, b) {
    return new Vector(a.x + b.x, a.y + b.y);
  }

  static collinear(a, b) {
    if (a.nullVector() || b.nullVector()) {
      return true;
    }

    let m = a.x / b.x;
    let n = a.y / b.y;

    if (Math.abs(m - n) < EPSILON) {
      return true;
    }

    return false;
  }
}

export default Vector;
