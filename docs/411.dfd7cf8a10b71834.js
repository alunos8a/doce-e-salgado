"use strict";(self.webpackChunkdoce_e_salgado=self.webpackChunkdoce_e_salgado||[]).push([[411],{411:(I,m,r)=>{r.r(m),r.d(m,{GameModule:()=>E});var p=r(895),g=r(322);const y={right:[1,200,400,600,800,1e3],left:[1200,1400,1600,1800,2e3,2200],y:[1,331]},d=[{width:3974,height:2366,elements:[[{x:0,y:200},{x:200,y:200},{x:200,y:30},{x:0,y:30}],[{x:0,y:0},{x:200,y:0},{x:200,y:30},{x:0,y:30}]]}];var e=r(256);const _=["game"];function P(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",9)(1,"div",10)(2,"div")(3,"h1"),e._uU(4,"DOCE E SALGADO"),e.qZA()(),e.TgZ(5,"div"),e._uU(6,"engrenagem"),e.qZA(),e.TgZ(7,"div")(8,"div",11),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.playPause())}),e._uU(9,"play"),e.qZA()(),e.TgZ(10,"div"),e._uU(11," ilustrac\xe7oes "),e.qZA()()()}}const C=[{path:"",component:(()=>{class n{constructor(){this.sprites=new Image,this.cenarios=new Image,this.player1={name:"",player:0,type:"doce",direction:{x:"right",y:"down"},running:!1,jumping:!1,spriteNumber:0,position:{x:0,y:0},positionJumpY:0,lastKeyPress:"",life:100,extraLife:1},this.player2={name:"",player:1,type:"salgado",direction:{x:"left",y:"down"},running:!1,jumping:!1,spriteNumber:0,position:{x:0,y:0},positionJumpY:0,lastKeyPress:"",life:100,extraLife:1},this.play=!1,this.onKeyDownSpace=this.playPause,this.onKeyDown=t=>{let i=t.key.toLowerCase();this.play&&this.getDirection(i)},this.onKeyUp=t=>{let i=t.key.toLowerCase();this.play&&this.stopMovement(i)},this.game={},this.movementKeysPlayer1={a:"left",d:"right",w:"up"},this.movementKeysPlayer2={arrowleft:"left",arrowright:"right",arrowup:"up"}}ngOnInit(){this.sprites.src="./assets/img/SPRITES.png",this.cenarios.src="./assets/img/CENARIOS.png",this.context=this.game.nativeElement.getContext("2d");let t=this.game.nativeElement.width-32.5,i=this.game.nativeElement.height-55;this.player1.position={x:Math.floor(Math.random()*t),y:Math.floor(Math.random()*i)},this.player2.position={x:Math.floor(Math.random()*t),y:Math.floor(Math.random()*i)}}playPause(){this.play=!this.play,this.play?this.positionsInterval=setInterval(()=>this.loop(),33.333333333333336):clearInterval(this.positionsInterval)}loop(){this.gravity(),this.running(),this.jumping(),this.draw()}getDirection(t){let o;t in this.movementKeysPlayer1?(o=this.movementKeysPlayer1[t],this.setDirection(this.player1,o)):t in this.movementKeysPlayer2&&(o=this.movementKeysPlayer2[t],this.setDirection(this.player2,o))}setDirection(t,i){"up"==i?t.jumping||(t.direction.y=i,t.positionJumpY=t.position.y,t.jumping=!0):t.direction.x=i,t.running=!0}stopMovement(t){t in this.movementKeysPlayer1?(this.player1.running=!1,this.player1.jumping=!1):t in this.movementKeysPlayer2&&(this.player2.running=!1,this.player2.jumping=!1)}gravity(){this.player1.position.y<this.game.nativeElement.height-55&&(this.player1.position.y+=5),this.player2.position.y<this.game.nativeElement.height-55&&(this.player2.position.y+=5)}running(){this.setPositionX(this.player1),this.setPositionX(this.player2)}jumping(){this.setPositionY(this.player1),this.setPositionY(this.player2)}setPositionX(t){if(t.running||t.jumping){let i=t.position.x;"right"==t.direction.x?i+=5:i-=5,0<=i&&i<=this.game.nativeElement.width-32.5&&(t.position.x=i,t.spriteNumber=Math.floor(t.position.x/30)%6)}}setPositionY(t){t.jumping&&("up"==t.direction.y&&(t.position.y-=15),t.position.y<=t.positionJumpY-100&&(t.direction.y="down"),t.position.y>=t.positionJumpY&&(t.jumping=!1))}draw(){this.context.clearRect(0,0,this.game.nativeElement.width,this.game.nativeElement.height),this.context.drawImage(this.cenarios,0,0,d[0].width,d[0].height,0,0,this.game.nativeElement.width,this.game.nativeElement.height),d[0].elements.forEach(t=>{t.forEach(i=>{})}),this.drawPlayer(this.player1),this.drawPlayer(this.player2)}drawPlayer(t){this.context.drawImage(this.sprites,y[t.direction.x][t.spriteNumber],y.y[t.player],200,331,t.position.x,t.position.y,32.5,55)}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-game"]],viewQuery:function(t,i){if(1&t&&e.Gf(_,7),2&t){let o;e.iGM(o=e.CRH())&&(i.game=o.first)}},hostBindings:function(t,i){1&t&&e.NdJ("keydown.space",function(l){return i.onKeyDownSpace(l)},!1,e.pYS)("keydown",function(l){return i.onKeyDown(l)},!1,e.pYS)("keyup",function(l){return i.onKeyUp(l)},!1,e.pYS)},decls:30,vars:1,consts:[[1,"container"],[1,"info"],[1,"teclas"],[1,"teclado"],[1,"tecla"],[1,"game"],["width","750","height","500",1,"canvas"],["game",""],["class","modal",4,"ngIf"],[1,"modal"],[1,"modal-content"],[1,"play",3,"click"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),e._uU(5,"W"),e.qZA()(),e.TgZ(6,"div",3)(7,"div",4),e._uU(8,"A"),e.qZA(),e.TgZ(9,"div",4),e._uU(10,"S"),e.qZA(),e.TgZ(11,"div",4),e._uU(12,"D"),e.qZA()()()(),e.TgZ(13,"div",5)(14,"div"),e._UZ(15,"canvas",6,7),e.qZA(),e.YNc(17,P,12,0,"div",8),e.qZA(),e.TgZ(18,"div",1)(19,"div",2)(20,"div",3)(21,"div",4),e._uU(22,"\u2191"),e.qZA()(),e.TgZ(23,"div",3)(24,"div",4),e._uU(25,"\u2190"),e.qZA(),e.TgZ(26,"div",4),e._uU(27,"\u2193"),e.qZA(),e.TgZ(28,"div",4),e._uU(29,"\u2192"),e.qZA()()()()()),2&t&&(e.xp6(17),e.Q6J("ngIf",!i.play))},dependencies:[p.O5],styles:[".container[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;justify-content:center;background-color:#000}.info[_ngcontent-%COMP%]{width:100px;height:100%;display:flex;flex-direction:column}.teclado[_ngcontent-%COMP%]{display:flex;justify-content:center}.tecla[_ngcontent-%COMP%]{width:30px;height:30px;align-items:center;border:solid .5px;background-color:#fff}.canvas[_ngcontent-%COMP%]{border:solid;background-color:#fff}.modal[_ngcontent-%COMP%]{display:block;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:#0006}.modal-content[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;flex-direction:column}.play[_ngcontent-%COMP%]{height:50px;width:150px;border:solid .5px;border-radius:5px;display:flex;align-items:center;justify-content:center}.play[_ngcontent-%COMP%]:hover{background-color:#00f;color:#fff}"]}),n})()}];let M=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[g.Bz.forChild(C),g.Bz]}),n})(),E=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[p.ez,M]}),n})()}}]);