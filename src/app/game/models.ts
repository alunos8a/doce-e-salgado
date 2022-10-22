export interface Position {
  x: number;
  y: number;
}

interface Direction {
  x: string;
  y: string;
}

export interface Player {
  name: string;
  player: number;
  type: string;
  direction: Direction;
  running: boolean;
  jumping: boolean;
  spriteNumber: number;
  positionJumpY: number;
  lastKeyPress: string;
  life: number;
  extraLife: number;
  position: Position;
}
