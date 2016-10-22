import Molecule from './molecule';

class World {
  constructor() {
    this.molecules = [];
    this.time = 0;
  }

  /**
   * Detect time for next molecules collision
   * @returns {Number|undefined} - time
   */
  nextCollisionTime() {
    let times = [];
    for (let i = 0; i < this.molecules.length; i++) {
      for (let j = 0; j < this.molecules.length; j++) {
        if (i == j) continue;
        let time = Molecule.collision(this.molecules[i], this.molecules[j], true);
        if (time) {
          times.push(time);
        }
      }
    }
    return times.length ? Math.min.apply(null, times) : undefined;
  }

  moveMolecules(time) {
    for (let i = 0; i < this.molecules.length; i++) {
      this.molecules[i].moveByTime(time);
    }
  }

  live(time) {
    var collTime = this.nextCollisionTime();
    if (collTime && collTime < time) {
      this.time += collTime;
      this.moveMolecules(collTime);
      this.live(time - collTime);
    } else {
      this.time += time;
      this.moveMolecules(time);
    }
  }
}

export default World;
