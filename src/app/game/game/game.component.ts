import { Position } from './../models';
import { GRAVITY, TIME_GRAVITY, FIGURE_DIMENSION, FIGURE_POSITIONS, JUMP_HEIGHT, FIGURE_STEP, FIGURE_QT, CENARIO } from './../settings';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Player } from '../models';
import { PLAYER_DIMENSION, VELOCITY } from '../settings';

type MovementKeys = {
  [key: string]: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  sprites = new Image();
  cenarios = new Image();
  player1 = {
    name: '',
    player: 0,
    type: 'doce',
    direction: {x:'right', y:'down'},
    running: false,
    jumping: false,
    spriteNumber: 0,
    position:  {x: 0, y: 0},
    positionJumpY: 0,
    lastKeyPress: '',
    life: 100,
    extraLife: 1
  };

  player2 = {
    name: '',
    player: 1,
    type: 'salgado',
    direction: {x:'left', y:'down'},
    running: false,
    jumping: false,
    spriteNumber: 0,
    position:  {x: 0, y: 0},
    positionJumpY: 0,
    lastKeyPress: '',
    life: 100,
    extraLife: 1
  };

  play = false;
  positionsInterval: any;

  @HostListener('body:keydown.space', ['$event']) onKeyDownSpace = this.playPause

  @HostListener('body:keydown', ['$event']) onKeyDown = (e: any) => {
    let key = e.key.toLowerCase();
    if (this.play) {
      this.getDirection(key);
    }
  }

  @HostListener('body:keyup', ['$event']) onKeyUp = (e: any) => {
    let key = e.key.toLowerCase();
    if (this.play) {
      this.stopMovement(key);
    }
  }

  @ViewChild('game', {static: true})
  private game: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  private context: any;

  movementKeysPlayer1: MovementKeys = {
    a: 'left',
    d: 'right',
    w: 'up'
  }
  movementKeysPlayer2: MovementKeys = {
    arrowleft: 'left',
    arrowright: 'right',
    arrowup: 'up',
  }

  constructor() {}

  ngOnInit(): void {
    this.sprites.src = './assets/img/SPRITES.png';
    this.cenarios.src = './assets/img/CENARIOS.png';
    this.context = this.game.nativeElement.getContext('2d');
    let maxX = this.game.nativeElement.width - PLAYER_DIMENSION.width;
    let maxY = this.game.nativeElement.height - PLAYER_DIMENSION.height;
    this.player1.position = {x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY)};
    this.player2.position = {x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY)};
  }

  playPause() {
    this.play = !this.play
    if (this.play){
      this.positionsInterval = setInterval(() => this.loop(), TIME_GRAVITY);
    } else {
      clearInterval(this.positionsInterval);
    }
  }

  loop() {
    this.gravity();
    this.running();
    this.jumping();
    this.draw();
  }

  getDirection(key: string) {
    let player: Player;
    let direction: string;
    if (key in this.movementKeysPlayer1) {
      direction = this.movementKeysPlayer1[key];
      this.setDirection(this.player1, direction);
    } else if (key in this.movementKeysPlayer2) {
      direction = this.movementKeysPlayer2[key];
      this.setDirection(this.player2, direction);
    }
  }

  setDirection(player: Player, direction: string) {
    if (direction == 'up') {
      if (!player.jumping) {
        player.direction.y = direction;
        player.positionJumpY = player.position.y;
        player.jumping = true;
      }
    } else {
      player.direction.x = direction;
    }

    player.running = true;
  }

  stopMovement(key: string) {
    if (key in this.movementKeysPlayer1) {
      this.player1.running = false;
      this.player1.jumping = false;
    } else if (key in this.movementKeysPlayer2) {
      this.player2.running = false;
      this.player2.jumping = false;
    }
  }

  gravity() {
    if (this.player1.position.y < this.game.nativeElement.height - PLAYER_DIMENSION.height) {
      this.player1.position.y += GRAVITY;
    }
    if (this.player2.position.y < this.game.nativeElement.height  - PLAYER_DIMENSION.height) {
      this.player2.position.y += GRAVITY;
    }
  }

  running() {
    this.setPositionX(this.player1);
    this.setPositionX(this.player2);
  }

  jumping() {
    this.setPositionY(this.player1);
    this.setPositionY(this.player2);
  }

  setPositionX(player: Player){
    if (player.running || player.jumping) {
      let position = player.position.x;
      if (player.direction.x == 'right') {
        position += VELOCITY;
      } else {
        position -= VELOCITY;
      }

      if (0 <= position && position <= this.game.nativeElement.width - PLAYER_DIMENSION.width) {
        player.position.x = position;
        player.spriteNumber = Math.floor(player.position.x / FIGURE_STEP) % FIGURE_QT;
      }
    }
  }

  setPositionY(player: Player) {
    if (player.jumping) {
      if (player.direction.y == 'up') {
        player.position.y -= VELOCITY + 2*GRAVITY;
      }

      if (player.position.y <= player.positionJumpY - JUMP_HEIGHT) {
        player.direction.y = 'down';
      }

      if (player.position.y >= player.positionJumpY) {
        player.jumping = false;
      }
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.game.nativeElement.width, this.game.nativeElement.height);
    this.context.drawImage(
      this.cenarios,
      0, 0,
      CENARIO[0].width, CENARIO[0].height,
      0, 0,
      this.game.nativeElement.width, this.game.nativeElement.height,
    );

    CENARIO[0].elements.forEach((item) => {
      item.forEach(posicao => {
        // this.context.stroke(posicao.x, posicao.y);
      });
    });

    this.drawPlayer(this.player1)
    this.drawPlayer(this.player2)
  }

  drawPlayer(player: Player) {
    let y = 'y';
    this.context.drawImage(
      this.sprites,
      FIGURE_POSITIONS[player.direction.x][player.spriteNumber], FIGURE_POSITIONS['y'][player.player],
      FIGURE_DIMENSION.width, FIGURE_DIMENSION.height,
      player.position.x, player.position.y,
      PLAYER_DIMENSION.width, PLAYER_DIMENSION.height
    );
  }
}
