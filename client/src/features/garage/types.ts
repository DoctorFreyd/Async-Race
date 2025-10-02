export interface CarDTO {
  id: number;
  name: string;
  color: string;
}

export interface CarRaceState {
  isMoving: boolean;
  position: number;
  durationMs: number;
}

export interface Car extends CarDTO {
  selected?: boolean;
  race?: CarRaceState;
}
