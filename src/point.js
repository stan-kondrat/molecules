class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  static angleRadians(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x);
  }

  static angleDegrees(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
  }
}

export default Point;
