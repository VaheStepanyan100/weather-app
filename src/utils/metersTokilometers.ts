export function metersToKilometers(visibilityInMetters: number): string {
  const visibilityInKilimeters = visibilityInMetters / 1000;
  return `${visibilityInKilimeters.toFixed(0)}km`;
}
