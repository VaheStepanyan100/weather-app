export function convertWindSpeed(speedInMetersPerSecond: number): string {
  const speedInKilometerPerHour = speedInMetersPerSecond * 3.6;
  return `${speedInKilometerPerHour.toFixed(0)}km/h`;
}
