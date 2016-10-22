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

  static concat(a, b) {
    return new Vector(a.x + b.x, a.y + b.y);
  }
}

export default Vector;
