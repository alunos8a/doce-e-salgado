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
      [
        {x:42, y:475}, {x:385, y:475}, {x:400, y:480}, {x:443, y:480}, {x:450, y:472}, {x:550, y:472}, {x:560, y:480}, {x:605, y:480},
        {x:615, y:472}, {x:670, y:472}, {x:670, y:431}, {x:680, y:421}, {x:688, y:440},
      ],
    ]
  },
];
export const DIRECTIONS = ['right', 'left'];
export const GRAVITY = 5;
export const TIME_GRAVITY = 1000/30;
export const JUMP_HEIGHT = 100;
export const JUMP_STEP = 5;
