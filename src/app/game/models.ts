export interface Position {
  x: number;
  y: number;
}

export interface Player {
  name: string;
  player: number;
  type: number;
  direction: string;
  running: boolean;
  jumping: boolean;
  positionJump: Position
  lastKeyPress: string;
  life: number;
  extraLife: number;
  position: Position;
}
