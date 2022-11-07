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
    width:2130,
    height: 1420,
    elements: [
      [{x:42, y:323}, {x:232, y:323}, {x:232, y:360}, {x:42, y:356}, {x:42, y:323}],
      [{x:42, y:414}, {x:518, y:414}, {x:518, y:442}, {x:42, y:442}, {x:42, y:414}],
    ]
  },
];
export const DIRECTIONS = ['right', 'left'];
export const GRAVITY = 5;
export const TIME_GRAVITY = 1000/30;
export const JUMP_HEIGHT = 100;
export const JUMP_STEP = 5;
