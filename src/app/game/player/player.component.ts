import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @HostListener('body:keydown', ['$event']) onKeyDown = (e: any) => {
    let key = e.key.toLowerCase();
    this.changeCharacter(key);
  };

  charactersDoce = [
    {name: 'Pão doce', url: '../../../assets/img/characters/0.png'},
    {name: 'Rosquinha', url: '../../../assets/img/characters/1.png'},
    {name: 'Brigadeiro', url: '../../../assets/img/characters/2.png'},
  ]

  charactersSalgado = [
    {name: 'Brigadeiro', url: '../../../assets/img/characters/3.png'},
  ]

  characterDocePosition = 0;
  characterDoce = this.charactersDoce[this.characterDocePosition];
  characterSalgadoPosition = 0;
  characterSalgado = this.charactersSalgado[this.characterSalgadoPosition];
  constructor() { }

  ngOnInit(): void {
  }

  changeCharacter(key: string) {
    if (key == 'a') {
      this.characterDocePosition = (this.characterDocePosition + this.charactersDoce.length - 1) % this.charactersDoce.length

    } else if (key == 'd') {
      this.characterDocePosition = (this.characterDocePosition + 1) % this.charactersDoce.length
    } else  if (key == 'arrowleft') {
      this.characterSalgadoPosition = (this.characterSalgadoPosition + this.charactersSalgado.length - 1) % this.charactersSalgado.length
    } else if (key == 'arrowright') {
      this.characterSalgadoPosition = (this.characterSalgadoPosition + 1) % this.charactersSalgado.length
    }

    this.characterDoce = this.charactersDoce[this.characterDocePosition];
    this.characterSalgado = this.charactersSalgado[this.characterSalgadoPosition];
  }

}
