import { GRAVITY, TIME_GRAVITY } from './../settings';
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
  player1 = {player: 1, direction: 'right', running: false, jumping: false} as Player;
  player2 = {player: 2, direction: 'left', running: false, jumping: false} as Player;
  play = false;
  positionsInterval: any;

  @HostListener('body:keydown.space', ['$event']) onKeyDownSpace = this.playPause

  @HostListener('body:keydown', ['$event']) onKeyDown = (e: any) => {
    let key = e.key.toLowerCase();
    if (this.play) {
      this.setDirection(key);
    }
    console.log('keydown', key);
  }

  @HostListener('body:keyup', ['$event']) onKeyUp = (e: any) => {
    let key = e.key.toLowerCase();
    if (this.play) {
      this.stopMovement(key);
    }
    console.log('keyup', key);
  }

  @HostListener('document:load') onLoad = () => {
    this.gravity();
    this.running();
    this.draw();
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
    this.context = this.game.nativeElement.getContext('2d');
    let maxX = this.game.nativeElement.width - PLAYER_DIMENSION.width;
    let maxY = this.game.nativeElement.height - PLAYER_DIMENSION.height;
    this.player1.position = {x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY)};
    this.player1.positionJump = this.player1.position;
    this.player2.position = {x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY)};
    this.player2.positionJump = this.player2.position;
  }


  playPause() {
    this.play = !this.play
    if (this.play){
      this.positionsInterval = setInterval(
        () => {
          this.gravity();
          this.running();
          this.draw()
        },
        TIME_GRAVITY
      )
    } else {
      clearInterval(this.positionsInterval)
    }
  }

  setDirection(key: string) {
    console.log('this.setDirection');
    console.log(this.player1);
    console.log(this.player2);
    if (key in this.movementKeysPlayer1) {
      this.player1.lastKeyPress = key;
      this.player1.running = true;
      if (key == 'w') {
        this.player1.positionJump = this.player1.position;
        this.player1.jumping = true;
      } else {
        this.player1.direction = this.movementKeysPlayer1[key]
      }
    } else if (key in this.movementKeysPlayer2) {
      this.player2.lastKeyPress = key;
      this.player2.running = true;
      if (key == 'arrowup') {
        this.player2.positionJump = this.player2.position;
        this.player2.jumping = true;
      } else {
        this.player2.direction = this.movementKeysPlayer2[key]
      }
    }
  }

  stopMovement(key: string) {
    if (key in this.movementKeysPlayer1) {
      this.player1.running = false;
      if (key == 'w') {
        this.player1.jumping = false;
      }
    } else if (key in this.movementKeysPlayer2) {
      this.player2.running = false;
      if (key == 'arrowup') {
        this.player2.jumping = false;
      }
    }
  }

  // gravity(player1: Player, player2: Player) {
  gravity() {
    if (this.player1.position.y < this.game.nativeElement.height - PLAYER_DIMENSION.height) {
      this.player1.position.y += GRAVITY;
    }
    if (this.player2.position.y < this.game.nativeElement.height  - PLAYER_DIMENSION.height) {
      this.player2.position.y += GRAVITY;
    }
    this.draw();
  }

  running() {
    this.setPosition(this.player1);
    this.setPosition(this.player2);
  }

  setPosition(player: Player){
    if (player.running) {
      let position = player.position.x;
      if (player.direction == 'right') {
        position += VELOCITY;
      } else {
        position -= VELOCITY;
      }

      if (0 <= position && position <= this.game.nativeElement.width - PLAYER_DIMENSION.width) {
        player.position.x = position;
      }
    }

    if (player.jumping){
      if (player.position.y > 0){
        player.position.y -= VELOCITY + GRAVITY;
      }

      if (player.position.y <= player.positionJump.y - PLAYER_DIMENSION.height){
        this.stopMovement(player.lastKeyPress)
      }
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.game.nativeElement.width, this.game.nativeElement.height);

    this.context.fillStyle = "rgb(200,0,0)";
    this.context.fillRect(this.player1.position.x, this.player1.position.y, PLAYER_DIMENSION.width, PLAYER_DIMENSION.height);

    this.context.fillStyle = "rgba(0, 0, 200, 0.5)";
    this.context.fillRect(this.player2.position.x, this.player2.position.y,  PLAYER_DIMENSION.width, PLAYER_DIMENSION.height);
  }
}
