import { MOVEMENT_KEYS, DIRECTIONS } from './../settings';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Player } from '../models';
import { PLAYER_DIMENSION, VELOCITY } from '../settings';

type MovementKeys = {
  [key: string]: Function;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @HostListener('body:keydown', ['$event']) onKeyDown = (e: any) => {
    let key = e.key.toLowerCase();
    this.move(key)
  }

  @ViewChild('game', {static: true})
  private game: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  private context: any;

  player1 = {player: 1} as Player;
  player2 = {player: 2} as Player;

  movementKeysPlayer1: MovementKeys = {
    a: () => {this.setPositionX(this.player1, 'left')},
    d: () => {this.setPositionX(this.player1, 'right')},
  }
  movementKeysPlayer2: MovementKeys = {
    arrowleft: () => {this.setPositionX(this.player2, 'left')},
    arrowright: () => {this.setPositionX(this.player2, 'right')},
  }

  constructor() { }

  ngOnInit(): void {
    this.context = this.game.nativeElement.getContext('2d');
    this.start();
  }

  start() {
    let maxX = this.game.nativeElement.width - PLAYER_DIMENSION.width;
    let maxY = this.game.nativeElement.height - PLAYER_DIMENSION.width;
    this.player1.position = {x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY)};
    this.player2.position = {x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY)};
  }

  async move(key: string) {
    if (key in this.movementKeysPlayer1) {
      this.player1.lastKeyPress = key;
      this.movementKeysPlayer1[key]();
    } else if (key in this.movementKeysPlayer2) {
      this.player2.lastKeyPress = key;
      this.movementKeysPlayer2[key]();
    }
  }

  setPositionX(player: Player, direction: string){
    if (direction == 'right') {
      player.position.x += VELOCITY;
    } else {
      player.position.x -= VELOCITY;
    }
    console.log(player.player, player.lastKeyPress, player.position);
    this.draw()
  }

  draw() {
    this.context.clearRect(0, 0, this.game.nativeElement.width, this.game.nativeElement.height);

    this.context.fillStyle = "rgb(200,0,0)";
    this.context.fillRect(this.player1.position.x, this.player1.position.y, PLAYER_DIMENSION.width, PLAYER_DIMENSION.height);

    this.context.fillStyle = "rgba(0, 0, 200, 0.5)";
    this.context.fillRect(this.player2.position.x, this.player2.position.y,  PLAYER_DIMENSION.width, PLAYER_DIMENSION.height);
  }
}
