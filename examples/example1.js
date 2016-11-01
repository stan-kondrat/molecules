import World from '../src/world';
import Molecule from '../src/molecule';
import Point from '../src/point';
import Vector from '../src/vector';
const PIXI = require('pixi.js');

var playing = false;
var world = null;

const stage = new PIXI.Container();;
const renderer = PIXI.autoDetectRenderer(600, 400, {
  transparent: true,
  antialias: true
});

window.onload = play;
document.querySelector('#viewport').appendChild(renderer.view);
document.querySelector('#play').onclick = play;
document.querySelector('#pause').onclick = pause;

function play() {
  // prepare data
  world = new World();
  world.molecules = [
    new Molecule(new Point(100, 100), new Vector(1, 0), 30),
    new Molecule(new Point(300, 100), new Vector(0, 0), 30),
    new Molecule(new Point(100, 200), new Vector(1, 0), 10),
    new Molecule(new Point(300, 200), new Vector(0, 0), 30),
    new Molecule(new Point(100, 300), new Vector(2, 0), 20),
    new Molecule(new Point(200, 300), new Vector(1, 0), 20),
  ];

  // add data render container
  stage.removeChildren(0, stage.children.length);
  world.molecules.forEach(function(molecule){
    stage.addChild(sprite(molecule));
  });

  // start render animation
  playing = true;
  draw();
}

function pause() {
  playing = false;
}

function draw() {
  if(playing && world.time < 400){
    world.live(1);
    world.molecules.forEach(sprite);
    requestAnimationFrame(draw);
  }
  renderer.render(stage);
}

/** create and update sprite position for molecule */
function sprite(molecule) {
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
