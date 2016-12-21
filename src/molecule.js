import Point from './point';
import Vector from './vector';
import Line from './line';
import console from './logger';

const EPSILON = 1e-5;
let _id = 0;

class Molecule {
  constructor(point = new Point(), speed = new Vector(), radius = 0, weight) {
    this.id = _id++;
    this.position = point;
    this.speed = speed;
    this.radius = radius;
    this.weight = weight || radius;
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
    let R = a.radius + b.radius;
    return distance - R < EPSILON;
  }

  /**
   * Continuous collision detections of two molecules
   * @param {Molecule} a
   * @param {Molecule} b
   * @returns {Number|undefined} - distance
   */
  static collision(a, b){
    let R = a.radius + b.radius;
    let R2 = Math.pow(R, 2);
    console.info('\n Detect collision');
    console.log(a, b);

    // both not moving
    if (a.speed.nullVector() && b.speed.nullVector()) {
      console.log('Both not moving');
      console.log('result_1', undefined);
      return undefined;
    }

    // only one moving
    if (a.speed.nullVector() || b.speed.nullVector()) {
      // redefine molecules names - stop and move
      let Ms = a.speed.nullVector() ? a : b;
      let Mv = b.speed.nullVector() ? a : b;

      console.log('Only one moving, id', Mv.id);

      // Find the perpendicular distance from a center stop molecule Ms
      // to a line of the direction of movement molecule Mv

      let movementLine = Line.fromPointAndVector(Mv.position, Mv.speed);
      let distance = movementLine.distanceToPoint(Ms.position);

      console.log('Distance to line of the direction of movement', distance);

      if (distance > R) {
        console.log('result_2', undefined);
        return undefined;
      }

      // Mathics: Solve[(X + V * x) ^ 2 + (Y + U * x) ^ 2 == R ^ 2, x]
      let X = Mv.position.x - Ms.position.x;
      let Y = Mv.position.y - Ms.position.y;
      let V = Mv.speed.x;
      let U = Mv.speed.y;
      let X2 = X * X;
      let Y2 = Y * Y;
      let V2 = V * V;
      let U2 = U * U;

      let D = Math.sqrt(V2*R2 + U2*R2 + 2*X*Y*V*U - Y2*V2 - X2*U2);
      let time = (-U*Y - V*X - D) / (U2 + V2);

      console.log('result_3', time);
      return time;
    }

    // both moving
    if (!a.speed.nullVector() && !b.speed.nullVector()) {
      console.log('Both moving');

      if (Vector.collinear(a.speed, b.speed)) {
        console.log('Speed vectors collinear');
        // Find the perpendicular distance between two straight lines
        // of the directions of movement molecules
        let movementLineA = Line.fromPointAndVector(a.position, a.speed);
        let movementLineB = Line.fromPointAndVector(b.position, b.speed);
        let distance = movementLineA.distanceToPoint(b.position);

        console.log('Distance between lines of the direction of movement', distance);

        if (distance > R) {
          console.log('result_4', undefined);
          return undefined;
        }

        // get projection _b to movementLineA through perpendicular from b
        // position molecule a and point _b will on same movement line a
        let perpendicularB = movementLineA.perpendicularLine(b.position);
        let _b = Line.intersectionPoint(perpendicularB, movementLineA);

        let timeX = (_b.x - a.position.x)/(a.speed.x - b.speed.x);
        let timeY = (_b.y - a.position.y)/(a.speed.y - b.speed.y);

        let time = Number.isFinite(timeX) ? timeX : timeY;

        if (!Number.isFinite(time)){
          console.log('result_5', undefined);
          return undefined;
        }


        let speed;
        let speedA = a.speed.getLength();
        let speedB = b.speed.getLength();
        let sameDirection = Vector.scalar(a.speed, b.speed) > 0;
        if (sameDirection) {
          speed =  (speedA > speedB) ? speedA - speedB : speedB - speedA;
        } else {
          speed = speedA + speedB;
        }

        console.log({'speed a': a.speed.getLength(), 'speed b': b.speed.getLength(), sameDirection, speed})

        time -= Math.sqrt(R2 - distance * distance) / speed;

        console.log('result_6', time);
        return time;

      } else {
        // not collinear
        console.log('Speed vectors not collinear');

        // A, B - molecules start position
        // A', B' - collision position
        // t - collision time
        //
        // A'x = Ax + Vax * t;
        // A'y = Ay + Vay * t;
        // B'x = Bx + Vbx * t;
        // B'y = By + Vby * t;
        //
        // When collision distance between centers equal sum of radius (R)
        // (A'x - B'x)^2 + (A'y - B'y)^2 = R^2
        //
        // Solve and simplify:
        // ((Ax + Vax * t) - (Bx + Vbx * t))^2 + ((Ay + Vay * t) - (By + Vby * t))^2 = R^2
        // (Ax - Bx + Vax * t - Vbx * t)^2 + (Ay - By + Vay * t - Vby * t)^2 = R^2
        // (Ax - Bx + (Vax - Vbx) * t)^2 + (Ay - By + (Vay - Vby) * t)^2 = R^2
        //
        // Let: Cx = Ax - Bx; Cy = Ay - By; Vcx = Vax - Vbx; Vcy = Vay - Vby;
        // (Cx + cx * t)^2 + (Cy + Vcy * t)^2 = R^2
        let Cx = a.position.x - b.position.x;
        let Cy = a.position.y - b.position.y;
        let Vcx = a.speed.x - b.speed.x;
        let Vcy = a.speed.y - b.speed.y;
        let Cx2 = Cx * Cx;
        let Cy2 = Cy * Cy;
        let Vcx2 = Vcx * Vcx;
        let Vcy2 = Vcy * Vcy;

        // Mathics: Solve[(Cx + (Vcx)*t)^2 + (Cy + (Vcy)*t)^2== R^2, t]
        let time = (
          -Cx*Vcx-Cy*Vcy - Math.sqrt(-Cx2*Vcy2+2*Cx*Cy*Vcx*Vcy-Cy2*Vcx2+R2*Vcx2+R2*Vcy2)
        ) / (Vcx2+Vcy2);

        console.log('result_7', time);
        return time;
      }
    }
  }

  static crash(a, b) {
    // Speed vector is sum of two vectors: Vc - center, Vt- tangential
    // Va = V1 = V1c + V1t
    // Vb = V2 = V2c + V2t
    let V1 = a.speed;
    let V2 = b.speed;

    // Find Vc
    let AB = new Vector(b.position.x - a.position.x, b.position.y - a.position.y);
    let V1cLength = (V1.x * AB.x + V1.y * AB.y) / AB.getLength();
    let V1c= Vector.normilize(AB).multiply(V1cLength);

    let BA = new Vector(a.position.x - b.position.x, a.position.y - b.position.y);
    let V2cLength = (V2.x * BA.x + V2.y * BA.y) / BA.getLength();
    let V2c = Vector.normilize(BA).multiply(V2cLength);

    // Find Vt
    let V1t = V1.subtract(V1c);
    let V2t = V2.subtract(V2c);

    // Conservation of the total momentum kinetic energy only for Vc
    // U1 = (2 * M2 * V2 + (M1 - M2) * V1 ) / (M1 + M2);
    // U2 = (2 * M1 * V1 + (M2 - M1) * V2 ) / (M1 + M2);
    let M1 = a.weight;
    let M2 = b.weight;
    let M = M1 + M2;
    let U1cx = (2 * M2 * V2c.x + (M1 - M2) * V1c.x ) / M;
    let U1cy = (2 * M2 * V2c.y + (M1 - M2) * V1c.y ) / M;
    let U2cx = (2 * M1 * V1c.x + (M2 - M1) * V2c.x ) / M;
    let U2cy = (2 * M1 * V1c.y + (M2 - M1) * V2c.y ) / M;
    let U1c = new Vector(U1cx, U1cy);
    let U2c = new Vector(U2cx, U2cy);
    a.speed = Vector.concat(V1t, U1c);
    b.speed = Vector.concat(V2t, U2c);
  }
}

export default Molecule;
