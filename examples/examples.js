import Render from './render.js'


function createButton(name) {
  let button = document.createElement("input");
  button.type = 'button';
  button.value = name;
  return button;
}

function createCheckbox(name) {
  let checkbox = document.createElement("input");
  checkbox.type = 'checkbox';
  checkbox.value = name;
  return checkbox;
}

function prepareViewport(id, example) {
  let container = document.querySelector(id);
  let resetButton = createButton('reset');
  let playButton = createButton('play');
  let pauseButton = createButton('pause');
  let logging = createCheckbox('logging');
  container.appendChild(resetButton);
  container.appendChild(playButton);
  container.appendChild(pauseButton);
  container.appendChild(logging);
  container.appendChild(document.createTextNode('logging'));
  container.appendChild(example.renderer.view);
  resetButton.onclick = function () {
    example.reset();
  }
  playButton.onclick = function () {
    example.play();
  }
  pauseButton.onclick = function () {
    example.pause();
  }
  logging.onclick = function () {
    example.loggingToggle();
  }
}

let example1 = new Render([
  [100, 100, 1, 0, 30],
  [300, 100, 0, 0, 30],
  [100, 200, 1, 0, 10],
  [300, 200, 0, 0, 30],
  [100, 300, 2, 0, 20],
  [200, 300, 1, 0, 20],
]);

prepareViewport('#example1', example1);


let example2 = new Render([
  [200, 200, 2, 0, 50],
  [350, 200, -1, .5, 50],
]);

prepareViewport('#example2', example2);
