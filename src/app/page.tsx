'use client';

import Navbar from '@/components/Navbar';
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
      <main className="px-3 max-w-7px max-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
              <p className="text-lg">
                ({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})
              </p>
              <p></p>
            </h2>
            <div></div>
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}
