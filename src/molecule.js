import Point from './point';
import Vector from './vector';

const EPSILON = 1e-5;
let _id = 0;

class Molecule {
  constructor(point = new Point(), speed = new Vector(), radius = 0) {
    this.id = _id++;
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
    // both not moving
    if (a.speed.nullVector() && b.speed.nullVector()) {
      return undefined;
    }

    if (Vector.collinear(a.speed, b.speed)) {
      // set a position as origin
      let Px = b.position.x - a.position.x;
      let Py = b.position.y - a.position.y;
      let P = new Vector(Px, Py);

      let Vx;
      let Vy;

      if (!a.speed.nullVector()) {
        Vx = a.speed.x;
        Vy = a.speed.y;
      } else if (!b.speed.nullVector()) {
        Vx = b.speed.x;
        Vy = b.speed.y;
      }

      let V = new Vector(Vx, Vy);
      let angle = P.angleRadians() - V.angleRadians();

      let distanCecenterLines = Math.abs(Math.sin(angle) * P.getLength()) ;

      if ( distanCecenterLines > a.radius + b.radius) {
        // will not collision, because speed vectors parallel, and spacing more than size of molecules
        return undefined;
      } else {
        var time1 = (b.position.x - a.position.x)/(a.speed.x - b.speed.x);
        var time2 = (b.position.y - a.position.y)/(a.speed.y - b.speed.y);
        let centerTime;
        if(isFinite(time1) && isFinite(time2)){
          if (Math.abs(time1 - time2) < EPSILON) {
            centerTime = time1;
          }
        } else if(isFinite(time1) && !isFinite(time2)) {
          centerTime = time1;
        } else if(!isFinite(time1) && isFinite(time2)) {
          centerTime = time2;
        }
        if (centerTime > 0) {
          let deltaTime = Math.cos(angle)*(a.radius + b.radius) / Vector.concat(a.speed, b.speed).getLength();
          return centerTime - deltaTime;
        } else {
          return undefined;
        }
      }
    }

    if (!a.speed.x || !b.speed.x&& !a.speed.y && !b.speed.y) {
      return undefined;
    }

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

  static crash(a, b) {
    // U1 = (2 * m2 * V2 + (m1 - m2) * V1 ) / (m1 + m2);
    // U2 = (2 * m1 * V1 + (m2 - m1) * V2 ) / (m1 + m2);

    let m1 = a.radius;
    let m2 = b.radius;
    let V1x = a.speed.x;
    let V2x = b.speed.x;
    let V1y = a.speed.y;
    let V2y = b.speed.y;
    let U1x = (2 * m2 * V2x + (m1 - m2) * V1x ) / (m1 + m2);
    let U1y = (2 * m2 * V2y + (m1 - m2) * V1y ) / (m1 + m2);
    let U2x = (2 * m1 * V1x + (m2 - m1) * V2x ) / (m1 + m2);
    let U2y = (2 * m1 * V1y + (m2 - m1) * V2y ) / (m1 + m2);
    a.speed.x = U1x;
    a.speed.y = U1y;
    b.speed.x = U2x;
    b.speed.y = U2y;
  }
}

export default Molecule;
