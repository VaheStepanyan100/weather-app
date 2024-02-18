'use client';

import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import { convertCelvinToCelsius } from '@/utils/convertCelvinToCelsius';
import axios from 'axios';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/parseISO';
import Image from 'next/image';
import { useQuery } from 'react-query';

interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface CloudInfo {
  all: number;
}

interface WindInfo {
  speed: number;
  deg: number;
  gust: number;
}

interface SystemInfo {
  pod: string;
}

interface ForecastItem {
  dt: number;
  main: MainInfo;
  weather: WeatherInfo[];
  clouds: CloudInfo;
  wind: WindInfo;
  visibility: number;
  pop: number;
  sys: SystemInfo;
  dt_txt: string;
}

interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: CityInfo;
}

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    'repoData',
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );

      return data;
    }
  );

  const firstData = data?.list[0];

  console.log('data', data);

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl max-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
              <p className="text-lg">
                ({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})
              </p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {convertCelvinToCelsius(firstData?.main.temp ?? 296.37)}˚
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>
                    {convertCelvinToCelsius(firstData?.main.temp ?? 0)}˚
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertCelvinToCelsius(firstData?.main.temp_min ?? 0)}
                    ˚↓{' '}
                  </span>
                  <span>
                    {convertCelvinToCelsius(firstData?.main.temp_max ?? 0)}
                    ˚↑{' '}
                  </span>
                </p>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), 'h:mm a')}
                    </p>
                    <p>{convertCelvinToCelsius(d?.main.temp ?? 0)}˚</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}
