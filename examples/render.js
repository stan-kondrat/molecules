import World from '../src/world';
import Molecule from '../src/molecule';
import Point from '../src/point';
import Vector from '../src/vector';
import logger from '../src/logger';
const PIXI = require('pixi.js');



export default class Render {
  constructor(molecules = []) {
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(600, 400, {
      transparent: true,
      antialias: true
    });
    this._molecules = molecules;
    this.init();
    this.draw();
  }

  init() {
    let _this = this;
    let molecules = [];
    for (let i = 0; i < this._molecules.length; i++) {
      let m = this._molecules[i];
      molecules.push(new Molecule(new Point(m[0], m[1]), new Vector(m[2], m[3]), m[4]));
    }
    this.playing = false;
    this.world = new World();
    this.world.molecules = molecules;
    this.world.molecules.forEach(function (molecule) {
      var _sprite = Render.sprite(molecule);
      _this.stage.addChild(_sprite);
    });
  }

  reset() {
    this.stage.removeChildren(0, this.stage.children.length);
    this.init();
    this.draw();
  }

  play() {
    if (!this.playing) {
      this.draw();
    }
    this.playing = true;
    this.draw();
  }

  pause() {
    this.playing = false;
  }

  loggingToggle() {
    logger.enabled = !logger.enabled;
  }

  draw() {
    if(this.playing && this.world.time < 400){
      this.world.live(1);
      this.world.molecules.forEach(Render.sprite);
      requestAnimationFrame(this.draw.bind(this));
    }
    this.renderer.render(this.stage);
  }

  /** create and update sprite position for molecule */
  static sprite(molecule) {
    if (!molecule.sprite) {
      var graphic = new PIXI.Graphics();
      graphic.lineStyle(1,0x586e75)
      graphic.beginFill(0xeee8d5);
      graphic.drawCircle(molecule.radius, molecule.radius, molecule.radius);
      graphic.endFill();
      graphic.boundsPadding = 0;
      var texture = graphic.generateTexture();
      var sprite = new PIXI.Sprite(texture);
      sprite.interactive = true;
      sprite.anchor.set(0.5, 0.5);
      molecule.sprite = sprite;
    }
    molecule.sprite.x = molecule.position.x;
    molecule.sprite.y = molecule.position.y;
    return molecule.sprite;
  }
}
