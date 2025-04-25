let GAME_ANMIATION_FRAME = 20;
let GAME_WIDTH = 400;
let GAME_HEIGHT = 600;
let PIPE_THRESHOLD = 200;
let GAP_THRESHOLD = 150;
let PIPE_WIDTH = 50;
let GAP_BETWEEN_PIPES = 200;

class Box {
  static applyStyle(element, style) {
    for (const key in style) {
      if (style.hasOwnProperty(key)) {
        element.style[key] = style[key];
      }
    }
  }

  constructor(parent, x, y, height, width, style) {
    this.parent = parent;
    this.element = document.createElement('div');
    this.parent.appendChild(this.element);
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.style = style;
    Box.applyStyle(this.element, {
      ...this.style,
      height: this.height + 'px',
      width: this.width + 'px',
      top: this.y + 'px',
      left: this.x + 'px'
    });
  }

  update(x, y) {
    this.x = x;
    this.y = y;
    Box.applyStyle(this.element, { top: this.y + 'px', left: this.x + 'px' });
  }
}

class Bird extends Box {
  gravity = 5;
  constructor(parent, x, y, height, width, style) {
    super(parent, x, y, height, width, style);
  }

  move = () => {
    let currentPosition = this.y;
    currentPosition += this.gravity;
    this.update(this.x, currentPosition);
  }
}

class Pipe extends Box {
  constructor(parent, x, y, height, width, style) {
    super(parent, x, y, height, width, style);
  }

  move = () => {
    let currentPosition = this.x;
    currentPosition -= 1;
    this.update(currentPosition, this.y);
  }
}

class Pipes {
  constructor(parent, x) {
    const { pipeTopHeight, pipeBottomHeight, pipeBottomPosition } = initialPipeParameter();

    this.pipeTop = new Pipe(parent, x, 0, pipeTopHeight, PIPE_WIDTH, {
      position: 'absolute',
      backgroundColor: '#ff6f61'
    });

    this.pipeBottom = new Pipe(parent, x, pipeBottomPosition, pipeBottomHeight, PIPE_WIDTH, {
      position: 'absolute',
      backgroundColor: '#ff6f61'
    });
  }
  move = () => {
    this.pipeTop.move();
    this.pipeBottom.move();
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initialPipeParameter() {
  let pipeTopHeight = getRandomNumber(PIPE_THRESHOLD, GAME_HEIGHT - PIPE_THRESHOLD);
  let pipeBottomHeight = GAME_HEIGHT - pipeTopHeight - GAP_THRESHOLD;
  let pipeBottomPosition = pipeTopHeight + GAP_THRESHOLD;
  return {
    pipeTopHeight, pipeBottomHeight, pipeBottomPosition
  };
}

function game() {
  let game = document.getElementsByClassName('game')[0];

  let bird = new Bird(game, 50, 200, 30, 30, {
    position: 'absolute',
    backgroundColor: '#ff6f61'
  });

  let pipes1 = new Pipes(game, GAME_WIDTH);
  let pipes2 = new Pipes(game, GAME_WIDTH + GAP_BETWEEN_PIPES);
  let pipes3 = new Pipes(game, GAME_WIDTH + GAP_BETWEEN_PIPES * 2);

  let pipes = [pipes1, pipes2, pipes3];

  let scoreElement = document.querySelector('.score');
  let score = 0;

  let interval = setInterval(() => {
    bird.move();
    pipes.forEach(pipe => {
      pipe.move();
      if (pipe.pipeTop.x + PIPE_WIDTH < 0) {
        let { pipeTopHeight, pipeBottomHeight, pipeBottomPosition } = initialPipeParameter();
        pipe.pipeTop.update(GAME_WIDTH, 0);
        pipe.pipeTop.element.style.height = pipeTopHeight + 'px';
        pipe.pipeBottom.update(GAME_WIDTH, pipeBottomPosition);
        pipe.pipeBottom.element.style.height = pipeBottomHeight + 'px';
        score++;
        scoreElement.textContent = `Score: ${score}`;
      }
    });
  }, GAME_ANMIATION_FRAME);
}

;(function () {
  game();
})();
