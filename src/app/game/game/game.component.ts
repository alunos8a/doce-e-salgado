import { QUESTIONS } from './../questions';
import { Position } from './../models';
import {
  GRAVITY,
  FIGURE_DIMENSION,
  FIGURE_POSITIONS,
  JUMP_HEIGHT,
  FIGURE_STEP,
  FIGURE_QT,
} from './../settings';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Player } from '../models';
import { PLAYER_DIMENSION, VELOCITY } from '../settings';
import { CENARIO } from '../cenarios';

type MovementKeys = {
  [key: string]: string;
};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  spritesPersonagens = new Image();
  spritesFase1 = new Image();
  cenarios = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
  ]

  player1 = {
    name: '',
    player: 0,
    type: 'doce',
    direction: { horizontal : 'right', vertical: 'down' },
    running: false,
    jumping: false,
    spriteNumber: 0,
    position: { x: 0, y: 0 },
    positionJumpY: 0,
    lastKeyPress: '',
    life: 100,
    extraLife: 1,
  };

  player2 = {
    name: '',
    player: 1,
    type: 'salgado',
    direction: { horizontal: 'right', vertical: 'down' },
    running: false,
    jumping: false,
    spriteNumber: 0,
    position: { x: 0, y: 0 },
    positionJumpY: 0,
    lastKeyPress: '',
    life: 100,
    extraLife: 1,
  };



  @HostListener('body:keydown.space', ['$event']) onKeyDownSpace =
    this.playPause;

  @HostListener('body:keydown', ['$event']) onKeyDown = (e: any) => {
    let key = e.key.toLowerCase();
    if (this.play) {
      this.getDirection(key);
    }
  };

  @HostListener('body:keyup', ['$event']) onKeyUp = (e: any) => {
    let key = e.key.toLowerCase();
    if (this.play) {
      this.stopMovement(key);
    }
  };

  @HostListener('body:touchmove', ['$event']) onClick = (e: any) => {
    if (['control1', 'control2'].includes(e.target.id)) {
      let screen_height = window.screen.height;
      let screen_width = window.screen.width;
      console.log(screen_width, screen_height)
      console.log(screen_width / e.touches[0].clientX, screen_height/e.touches[0].clientY)
      //12.873239436619718 1.1942028985507247 | 1.0893921334922527 1.1907514450867052
      //13.950819672131148 1.1766467065868262 | 1.0854591836734695 1.205521472392638
    }
  };

  @ViewChild('game', { static: true })
  private game: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  private context: any;

  @ViewChild('control1', { static: true })
  private control1: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  private contextControl1: any;

  movementKeysPlayer1: MovementKeys = {
    a: 'left',
    d: 'right',
    w: 'up',
  };
  movementKeysPlayer2: MovementKeys = {
    arrowleft: 'left',
    arrowright: 'right',
    arrowup: 'up',
  };


  cookie = [
    {
      moving: false,
      direction: 1,
      position: {x:652, y: 100,},
      element: {xSprite: 693, ySprite: 0, spriteWidth: 176, spriteHeight: 202, positionX:652, positionY: 100, width: 58, height:68},
      points: [{x:652, y:153}, {x:710, y:153}, {x:710, y:165}, {x:652, y:165}, {x:652, y:153}]
    }
  ]

  buttons = [
    [
      {position: {x:216, y: 202,}},
      {position: {x:566, y: 119,}},
    ]
  ]

  questao = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
  question = false;
  play = true;
  debug = false;
  fase = 0;
  buttomPress = true;

  constructor() {}

  ngOnInit(): void {
    console.log(this.questao)
    this.spritesPersonagens.src = './assets/img/SPRITES.png';
    this.spritesFase1.src = './assets/img/cenarios/sprites_fase1.png';
    for (let fase = 0; fase < CENARIO.length; fase++) {
      this.cenarios[fase].src = CENARIO[fase].url;
    }
    this.context = this.game.nativeElement.getContext('2d');
    this.contextControl1 = this.control1.nativeElement.getContext('2d');
    this.player1.position = {x: 42, y: 400};
    this.player2.position = {x: 75, y: 400};
    this.loop();
  }

  playPause() {
    this.play = !this.play;
  }

  loop() {
    if (this.play) {
      this.refreshPositions();
      this.draw();
    }
    window.requestAnimationFrame(this.loop.bind(this));
  }

  getDirection(key: string) {
    if (key in this.movementKeysPlayer1) {
      let direction = this.movementKeysPlayer1[key];
      this.setDirection(this.player1, direction);
    } else if (key in this.movementKeysPlayer2) {
      let direction = this.movementKeysPlayer2[key];
      this.setDirection(this.player2, direction);
    } else if (key == 's') {
      for (let button in this.buttons) {
        this.pressButton(this.player1, this.buttons[this.fase][button].position)
      }
    } else if (key == 'arrowdown') {
      for (let button in this.buttons[this.fase]){
        this.pressButton(this.player2, this.buttons[this.fase][button].position)
      }
    }

  }

  setDirection(player: Player, direction: string) {
    if (direction == 'up') {
      if (!player.jumping) {
        player.direction.vertical = direction;
        player.positionJumpY = player.position.y;
        player.jumping = true;
      }
    } else {
      player.direction.horizontal  = direction;
    }

    player.running = true;
  }

  stopMovement(key: string) {
    if (key in this.movementKeysPlayer1) {
      this.player1.running = false;
      this.player1.direction.vertical = 'down';
    } else if (key in this.movementKeysPlayer2) {
      this.player2.running = false;
      this.player2.direction.vertical = 'down';
    }
  }

  collidedLine(player: Player, position1: Position, position2: Position, direction: string) {
    let p1 = {x: player.position.x, y: player.position.y};
    let p2 = {x: player.position.x + PLAYER_DIMENSION.width, y: player.position.y};
    let p3 = {x: player.position.x  + PLAYER_DIMENSION.width, y: player.position.y + PLAYER_DIMENSION.height};
    let p4 = {x: player.position.x, y: player.position.y + PLAYER_DIMENSION.height};
    let midpoint = {x: (p1.x + p2.x)/2, y: (p1.y + p4.y)/2};
    let playerPoints = [p1, p2, p3, p4];

    if (direction == 'vertical') {
      for (let i in playerPoints) {
        let point = playerPoints[i];


          let betweenPositions = (position1.x < point.x && point.x < position2.x) || (position1.x > point.x && point.x > position2.x);

          if (betweenPositions) {
            let y = position1.y + ((position2.y - position1.y) * (point.x - position1.x)) / (position2.x - position1.x);

            if ((p1.y < y && y < midpoint.y) || (p2.y < y && y < midpoint.y)) {
              player.direction.vertical = 'down';
              break
            } else if ((p4.y >= y && y > midpoint.y) || (p3.y >= y && y > midpoint.y)) {
              player.position.y = y - PLAYER_DIMENSION.height;
              return true
            }
          }
        }
    } else if (direction == 'horizontal' && position1.x == position2.x) {
      let betweenPositions = (position1.y < p1.y && p1.y < position2.y) || (position1.y > p1.y && p1.y > position2.y) ||
                             (position1.y < p4.y && p4.y < position2.y) || (position1.y >= p4.y && p4.y > position2.y);

      if (betweenPositions) {
        let x = position1.x;
        if ((p1.x < x && x < midpoint.x) || (p4.x < x && x < midpoint.x)) {
          player.position.x = x;
          return true
        } else if ((p2.x > x && x > midpoint.x) || (p3.x > x && x > midpoint.x)) {
          player.position.x = x - PLAYER_DIMENSION.width;
          return true
        }
      }
    }
    return false
  }

  collidedX(player: Player) {
    let collided = false;
    CENARIO[this.fase].elements.forEach((item) => {
      for (let i = 0; i < item.length - 1; i++) {
        let position1 = {x: item[i].x, y:  item[i].y};
        let position2 = {x: item[i+1].x, y:  item[i+1].y};

        if (this.collidedLine(player, position1, position2, 'horizontal')) {
          collided = true;
          break
        }
      }
    });
    return collided;
  }

  collidedY(player: Player) {
    let collided = false;
    CENARIO[this.fase].elements.forEach((item) => {
      for (let i = 0; i < item.length - 1; i++) {
        let position1 = {x: item[i].x, y:  item[i].y};
        let position2 = {x: item[i+1].x, y:  item[i+1].y};

        if (this.collidedLine(player, position1, position2, 'vertical')) {
          collided = true;
          break
        }
      }
    });

    if (this.cookie[this.fase]) {

      for (let i = 0; i < this.cookie[this.fase].points.length - 1; i++) {
        let position1 = {x: this.cookie[this.fase].points[i].x, y:  this.cookie[this.fase].points[i].y};
        let position2 = {x: this.cookie[this.fase].points[i+1].x, y:  this.cookie[this.fase].points[i+1].y};

        if (this.collidedLine(player, position1, position2, 'vertical')) {
          collided = true;
          break
        }
      }
    }
    return collided;
  }

  refreshPositions() {
    this.setPlayerPositionX(this.player1);
    this.setPlayerPositionY(this.player1);

    this.setPlayerPositionX(this.player2);
    this.setPlayerPositionY(this.player2);
    if (this.cookie[this.fase]) {
      this.moveCookie();
    }
    this.win();
  }

  setPlayerPositionX(player: Player) {
    if (player.running) {
      let position = player.position.x;
      if (player.direction.horizontal  == 'right') {
        position += VELOCITY;
      } else {
        position -= VELOCITY;
      }

      if (
        0 <= position &&
        position <= this.game.nativeElement.width - PLAYER_DIMENSION.width
      ) {
        player.position.x = position;
        player.spriteNumber =
          Math.floor(player.position.x / FIGURE_STEP) % FIGURE_QT;
      }
      this.collidedX(player)
    }
  }

  setPlayerPositionY(player: Player) {
    if (player.jumping) {
      if (player.direction.vertical == 'up') {
        player.position.y -= VELOCITY + GRAVITY;
        if (player.position.y <= player.positionJumpY - JUMP_HEIGHT) {
          player.direction.vertical = 'down';
        }
      }
    }

    if (player.position.y >= this.game.nativeElement.height - PLAYER_DIMENSION.height) {
      player.position.y = this.game.nativeElement.height - PLAYER_DIMENSION.height;
    } else {
      if (!this.collidedY(player)) {
        player.position.y += GRAVITY;
      } else {
        player.jumping = false;
      }
    }
  }

  draw() {
    this.context.clearRect(
      0,
      0,
      this.game.nativeElement.width,
      this.game.nativeElement.height
    );

    this.context.drawImage(
      this.cenarios[this.fase],
      0,
      0,
      CENARIO[this.fase].width,
      CENARIO[this.fase].height,
      0,
      0,
      this.game.nativeElement.width,
      this.game.nativeElement.height
    );

    this.drawPlayer(this.player1);
    this.drawPlayer(this.player2);

    if (this.debug) {

      CENARIO[this.fase].elements.forEach((item) => {
        this.context.moveTo(item[0].x, item[0].y);
        item.forEach((posicao) => {
          this.context.lineTo(posicao.x, posicao.y);
          this.context.stroke();
        });
      });
    }

    this.drawElements();
      for (let button in this.buttons[this.fase]){
        this.onButton(this.player1, this.buttons[this.fase][button].position);
        this.onButton(this.player2, this.buttons[this.fase][button].position);
      }
    }


  drawPlayer(player: Player) {
    this.context.drawImage(
      this.spritesPersonagens,
      FIGURE_POSITIONS[player.direction.horizontal ][player.spriteNumber],
      FIGURE_POSITIONS['y'][player.player],
      FIGURE_DIMENSION.width,
      FIGURE_DIMENSION.height,
      player.position.x,
      player.position.y,
      PLAYER_DIMENSION.width,
      PLAYER_DIMENSION.height
    );
  }

  drawElements() {
    CENARIO[this.fase].extraElements.forEach((element) => {
      this.context.drawImage(
        this.spritesFase1,
        element.xSprite,
        element.ySprite,
        element.spriteWidth,
        element.spriteHeight,
        element.positionX,
        element.positionY,
        element.width,
        element.height
      );
    });

    this.drawCookie();
  }

  pressButton(player: Player, button: Position) {
    if (this.cookie[this.fase]){
      let onTop = player.position.y <= button.y && button.y <= player.position.y  + PLAYER_DIMENSION.height ;
      let inFront = player.position.x <= button.x && button.x <= player.position.x + PLAYER_DIMENSION.width;
      if (onTop && inFront) {
        this.cookie[this.fase].moving = true;
      }
    }
  }

  onButton(player: Player, button: Position) {
    let onTop = player.position.y <= button.y && button.y <= player.position.y  + PLAYER_DIMENSION.height ;
    let inFront = player.position.x <= button.x && button.x <= player.position.x + PLAYER_DIMENSION.width;
    if (onTop && inFront) {
      this.context.font = '10px';
      this.context.fillStyle = 'red';
      if (player.player == 0){
        this.context.fillText('Aperte "s"', button.x - 15, button.y + 40);
      } else {
        this.context.fillText('Aperte "↓"', button.x - 15, button.y + 40);
      }
    }
  }

  moveCookie() {
    if (this.cookie[this.fase].moving) {
      let step = GRAVITY * this.cookie[this.fase].direction
      this.cookie[this.fase].position.y = this.cookie[this.fase].position.y + step;
      for (let i=0; i < this.cookie[this.fase].points.length; i++) {
        this.cookie[this.fase].points[i].y += step;
      }

      if (this.cookie[this.fase].position.y < 100) {
        this.cookie[this.fase].direction = 1;
        this.cookie[this.fase].moving = false;
      } else if (this.cookie[this.fase].position.y > 215) {
        this.cookie[this.fase].direction = -0.4;
      }
    }
  }

  drawCookie() {
    if (this.cookie[this.fase]) {
      this.context.drawImage(
        this.spritesFase1,
        this.cookie[this.fase].element.xSprite,
        this.cookie[this.fase].element.ySprite,
        this.cookie[this.fase].element.spriteWidth,
        this.cookie[this.fase].element.spriteHeight,
        this.cookie[this.fase].position.x,
        this.cookie[this.fase].position.y,
        this.cookie[this.fase].element.width,
        this.cookie[this.fase].element.height
      );
    }
  }

  correctAnswer(answer: any) {
    let userAnswer = answer.innerText;
    if (userAnswer == this.questao.resposta) {
      this.fase = (this.fase + 1) % CENARIO.length;
    }

    this.question = false
    this.resetGame()
  }

  win(){
    if (this.player1. position.x <= 42 && this.player1.position.y <= 60 && this.player2. position.x <= 42 && this.player2.position.y <= 60) {
      this.question = true;
    }
  }

  resetGame() {
    this.player1.position = {x: 42, y: 400};
    this.player2.position = {x: 75, y: 400};
  }
}
