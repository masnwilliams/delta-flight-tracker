'use client';

import type { WeatherData } from '@/lib/types';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const getWeatherEmoji = (skyCode: string) => {
    const code = parseInt(skyCode);
    if (code >= 1 && code <= 4) return '⛈️';
    if (code >= 5 && code <= 12) return '🌧️';
    if (code >= 13 && code <= 16) return '🌨️';
    if (code >= 19 && code <= 22) return '🌫️';
    if (code >= 23 && code <= 24) return '🌬️';
    if (code >= 26 && code <= 28) return '☁️';
    if (code >= 29 && code <= 30) return '⛅';
    if (code >= 31 && code <= 34) return '☀️';
    return '🌤️';
  };

  // Convert Celsius to Fahrenheit
  const toFahrenheit = (celsius: string | null): string => {
    if (!celsius) return '--';
    const c = parseFloat(celsius);
    return Math.round((c * 9/5) + 32).toString();
  };

  const currentTempF = toFahrenheit(weather.observation.temperatureC);
  const currentTempC = weather.observation.temperatureC;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold mb-4">Destination Weather</h2>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="text-6xl">
          {getWeatherEmoji(weather.observation.skyCode)}
        </div>
        <div>
          <div className="text-4xl font-bold">{currentTempF}°F</div>
          <div className="text-white/60 text-sm">{currentTempC}°C</div>
          <div className="text-white/60 mt-1">{weather.cityName}, {weather.cityCode}</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-3">
          5-Day Forecast
        </h3>
        {weather.forecast.slice(0, 5).map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/60">
                {index === 0 ? 'Today' : `Day ${day.dayNumber}`}
              </span>
              <span className="text-sm">{day.fullPhrase}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-blue-300">{toFahrenheit(day.lowTemperatureC)}°F</span>
              <span className="text-white/40">/</span>
              <span className="text-red-300">{toFahrenheit(day.highTemperatureC)}°F</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

