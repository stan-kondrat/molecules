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

export default Molecule;
