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

  /**
   * Distance from point P to line AB, where line from to points A and B.
   * @param {Point} P - point
   * @param {Point} A - point from line
   * @param {Point} B - point from line
   * @returns {Number} - distance
   */
  static distanceToLine(P, A, B) {
    return Math.abs(
      (B.y - A.y) * P.x - (B.x - A.x) * P.y + B.x * A.y - B.y * A.x
    ) / Math.hypot(B.y-A.y, B.x-A.x);
  }
}

export default Point;
