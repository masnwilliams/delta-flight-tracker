'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FlightStats } from '@/components/FlightStats';
import { WeatherCard } from '@/components/WeatherCard';
import { ServicesPanel } from '@/components/ServicesPanel';
import type { FlightData, WeatherData, ServicesData } from '@/lib/types';

// Load FlightMap only on client side (Leaflet requires window object)
const FlightMap = dynamic(() => import('@/components/FlightMap').then(mod => ({ default: mod.FlightMap })), {
  ssr: false,
  loading: () => <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-96 flex items-center justify-center">Loading map...</div>
});

export default function Home() {
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      const [flightRes, weatherRes, servicesRes] = await Promise.all([
        fetch('/api/flight'),
        fetch('/api/weather'),
        fetch('/api/services'),
      ]);

      if (!flightRes.ok || !weatherRes.ok || !servicesRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [flight, weather, services] = await Promise.all([
        flightRes.json(),
        weatherRes.json(),
        servicesRes.json(),
      ]);

      setFlightData(flight as FlightData);
      setWeatherData(weather as WeatherData);
      setServicesData(services as ServicesData);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Refresh every 5 seconds
    const interval = setInterval(fetchData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✈️</div>
          <div className="text-xl font-semibold">Loading flight data...</div>
        </div>
      </div>
    );
  }

  if (error || !flightData || !weatherData || !servicesData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-500/20 border border-red-500/50 rounded-2xl p-8 max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <div className="text-xl font-semibold mb-2">Connection Error</div>
          <div className="text-white/60 mb-4">
            {error || 'Unable to connect to Delta WiFi. Make sure you are connected to the in-flight network.'}
          </div>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-5xl mb-4">✈️</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Delta Flight Tracker
          </h1>
          <p className="text-white/60">
            Real-time flight information • Updates every 5 seconds
          </p>
          <div className="mt-2 text-sm text-white/40">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Flight Stats */}
          <div className="lg:col-span-2 space-y-6">
            <FlightStats flight={flightData} />
            <FlightMap flight={flightData} />
          </div>

          {/* Right Column - Weather & Services */}
          <div className="space-y-6">
            <WeatherCard weather={weatherData} />
            <ServicesPanel services={servicesData} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-white/40 mt-8">
          <p>Data provided by Delta Air Lines in-flight WiFi system</p>
          <p className="mt-1">Built with Next.js • Not affiliated with Delta Air Lines</p>
        </div>
      </div>
    </main>
  );
}

