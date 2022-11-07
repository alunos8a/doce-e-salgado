export interface Position {
  x: number;
  y: number;
}

interface Direction {
  horizontal : string;
  vertical: string;
}

export interface Player {
  name: string;
  player: number;
  type: string;
  running: boolean;
  jumping: boolean;
  spriteNumber: number;
  direction: Direction;
  position: Position;
  positionJumpY: number;
  lastKeyPress: string;
  life: number;
  extraLife: number;
}

export interface Character {
  name: string;
  url: string;
}
