import { Position } from './models';
type SpritePosition = {
  [key: string]: number[];
}


export const VELOCITY = 5;
export const PLAYER_DIMENSION = {width: 32.5, height: 55};
export const FIGURE_DIMENSION = {width: 200, height: 331};
export const FIGURE_QT = 6;
export const FIGURE_STEP = 30;
export const FIGURE_POSITIONS: SpritePosition = {
  right: [1, 200, 400, 600, 800, 1000],
  left: [1200, 1400, 1600, 1800, 2000, 2200],
  y: [1, 331]
};
export const CENARIO = [
  {
    width:3974,
    height: 2366,
    elements: [
      [{x:0, y:200}, {x:200, y:200}, {x:200, y:30}, {x:0, y:30}],
      [{x:0, y:0}, {x:200, y:0}, {x:200, y:30}, {x:0, y:30}],
    ]
  },
];
export const DIRECTIONS = ['right', 'left'];
export const GRAVITY = 5;
export const TIME_GRAVITY = 1000/30;
export const JUMP_HEIGHT = 100;

