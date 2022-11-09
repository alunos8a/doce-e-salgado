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
  sprites = new Image();
  cenarios = new Image();
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

  play = true;
  positionsInterval: any;

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

  @ViewChild('game', { static: true })
  private game: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  private context: any;

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

  constructor() {}

  ngOnInit(): void {
    this.sprites.src = './assets/img/SPRITES.png';
    this.cenarios.src = './assets/img/cenarios/fase1.png';
    this.context = this.game.nativeElement.getContext('2d');
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
    CENARIO[0].elements.forEach((item) => {
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
    CENARIO[0].elements.forEach((item) => {
      for (let i = 0; i < item.length - 1; i++) {
        let position1 = {x: item[i].x, y:  item[i].y};
        let position2 = {x: item[i+1].x, y:  item[i+1].y};

        if (this.collidedLine(player, position1, position2, 'vertical')) {
          collided = true;
          break
        }
      }
    });
    return collided;
  }

  refreshPositions() {
    this.setPlayerPositionX(this.player1);
    this.setPlayerPositionY(this.player1);

    this.setPlayerPositionX(this.player2);
    this.setPlayerPositionY(this.player2);
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
      this.cenarios,
      0,
      0,
      CENARIO[0].width,
      CENARIO[0].height,
      0,
      0,
      this.game.nativeElement.width,
      this.game.nativeElement.height
    );

    this.drawPlayer(this.player1);
    this.drawPlayer(this.player2);
    CENARIO[0].elements.forEach((item) => {
      this.context.moveTo(item[0].x, item[0].y);
      item.forEach((posicao) => {
        this.context.lineTo(posicao.x, posicao.y);
        this.context.stroke();
      });
    });
  }

  drawPlayer(player: Player) {
    this.context.fillRect(
      player.position.x,
      player.position.y,
      PLAYER_DIMENSION.width,
      PLAYER_DIMENSION.height
    );
    this.context.drawImage(
      this.sprites,
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
}
