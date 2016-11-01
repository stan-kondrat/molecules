import Molecule from './molecule';

class World {
  constructor() {
    this.molecules = [];
    this.time = 0;
    this.nextCollisions = [];
    this.nextCollisionsTime = null;
    this.nextCollisionsExist = true;
  }


  /**
   * Detect time for next molecules collision
   * @returns {Number|undefined} - time
   */
  calcNextCollision() {
    let minTime;
    for (let i = 0; i < this.molecules.length; i++) {
      for (let j = i + 1; j < this.molecules.length; j++) {
        let time = Molecule.collision(this.molecules[i], this.molecules[j]);
        if (time > 0) {
          if (!minTime || minTime > time){
            minTime = time;
            this.nextCollisions = [this.molecules[i], this.molecules[j]];
          }
        }
      }
    }
    return minTime + this.time;
  }

  moveMolecules(time) {
    for (let i = 0; i < this.molecules.length; i++) {
      this.molecules[i].moveByTime(time);
    }
  }

  proccessCollision() {
    Molecule.crash(this.nextCollisions[0], this.nextCollisions[1]);
  }

  live(time) {
    if (this.nextCollisionsExist && !this.nextCollisionsTime) {
      this.nextCollisionsTime = this.calcNextCollision();
      this.nextCollisionsExist = !!this.nextCollisionsTime;
    }

    if (!this.nextCollisionsTime || this.nextCollisionsTime > this.time + time) {
      this.time += time;
      this.moveMolecules(time);
    } else if(this.nextCollisionsTime == this.time + time) {
      this.time += time;
      this.moveMolecules(time);
      this.proccessCollision();
      this.nextCollisionsTime = this.calcNextCollision();
    } else if(this.nextCollisionsTime < this.time + time) {
      let timeToLive = this.nextCollisionsTime - this.time;
      this.time += timeToLive;
      this.moveMolecules(timeToLive);
      this.proccessCollision();
      this.nextCollisionsTime = this.calcNextCollision();
      this.live(time - timeToLive);
    }
  }
}

export default World;
