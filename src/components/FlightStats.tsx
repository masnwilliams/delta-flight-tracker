'use client';

import type { FlightData } from '@/lib/types';

interface FlightStatsProps {
  flight: FlightData;
}

export function FlightStats({ flight }: FlightStatsProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Flight {flight.flightNumber}</h2>
        <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">
          {flight.flightPhase}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Altitude"
          value={flight.altitude.toLocaleString()}
          unit="ft"
          icon="✈️"
        />
        <StatCard
          label="Ground Speed"
          value={flight.groundspeed.toString()}
          unit="kts"
          icon="⚡"
        />
        <StatCard
          label="Distance to Go"
          value={flight.distanceToGo.toString()}
          unit="nm"
          icon="📍"
        />
        <StatCard
          label="ETA"
          value={flight.eta}
          unit=""
          icon="🕐"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <StatCard
          label="Heading"
          value={flight.heading.toString()}
          unit="°"
          icon="🧭"
        />
        <StatCard
          label="Outside Temp"
          value={flight.airTemperature.toString()}
          unit="°C"
          icon="🌡️"
        />
        <StatCard
          label="Time to Go"
          value={flight.timeToGo >= 60 ? `${Math.floor(flight.timeToGo / 60)}h ${flight.timeToGo % 60}m` : `${flight.timeToGo}m`}
          unit=""
          icon="⏱️"
        />
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-white/60">
        <span>{flight.origin} → {flight.destination}</span>
        <span>Aircraft: {flight.vehicleId}</span>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  icon: string;
}

function StatCard({ label, value, unit, icon }: StatCardProps) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs text-white/60 uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value}</span>
        {unit && <span className="text-sm text-white/60">{unit}</span>}
      </div>
    </div>
  );
}
