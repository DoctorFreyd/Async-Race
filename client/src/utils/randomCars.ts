import { CAR_CONSTANTS, MAKES, MODELS } from './constants';

export type CarCreateType = {
  name: string;
  color: string;
};

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomColorHex(): string {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(CAR_CONSTANTS.colorHexBase)
      .padStart(CAR_CONSTANTS.colorHexLength, '0')
  );
}

export function randomName(): string {
  const make = MAKES[randInt(0, MAKES.length - 1)];
  const model = MODELS[randInt(0, MODELS.length - 1)];
  return `${make} ${model}`;
}

export function generateRandomCars(count = CAR_CONSTANTS.defaultGenerateCount): CarCreateType[] {
  return Array.from({ length: count }, () => ({
    name: randomName(),
    color: randomColorHex(),
  }));
}
