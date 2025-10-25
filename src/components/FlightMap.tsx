'use client';

import type { FlightData } from '@/lib/types';
import { MapContainer, TileLayer, Polyline, CircleMarker, Marker, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface FlightMapProps {
  flight: FlightData;
}

export function FlightMap({ flight }: FlightMapProps) {
  // Airport coordinates
  // KSLC: Salt Lake City
  const origin: [number, number] = [40.7884, -111.9778];
  // KCVG: Cincinnati
  const destination: [number, number] = [39.0488, -84.6678];
  
  // Current plane position
  const planePosition: [number, number] = [flight.latitude, flight.longitude];
  
  // Calculate center point between origin and destination
  const center: [number, number] = [
    (origin[0] + destination[0]) / 2,
    (origin[1] + destination[1]) / 2
  ];

  // Create airplane icon with rotation
  const planeIcon = divIcon({
    html: `
      <div style="transform: rotate(${flight.heading}deg); transform-origin: center;">
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5 L12 18 L10 18 L10 22 L12 22 L12 20 L18 20 L18 22 L20 22 L20 18 L18 18 L15 5Z" 
                fill="white" stroke="#60a5fa" stroke-width="1.5" 
                filter="drop-shadow(0 0 6px #60a5fa)"/>
        </svg>
      </div>
    `,
    className: 'plane-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold mb-4">Flight Path</h2>
      <div className="relative w-full h-96 rounded-xl overflow-hidden">
        <MapContainer
          center={center}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Flight path line */}
          <Polyline
            positions={[origin, destination]}
            pathOptions={{
              color: '#60a5fa',
              weight: 3,
              opacity: 0.6,
              dashArray: '10, 10'
            }}
          />
          
          {/* Origin airport marker */}
          <CircleMarker
            center={origin}
            radius={8}
            pathOptions={{
              fillColor: '#22c55e',
              fillOpacity: 1,
              color: 'white',
              weight: 2
            }}
          >
            <Tooltip permanent direction="bottom" offset={[0, 10]}>
              SLC (Origin)
            </Tooltip>
          </CircleMarker>
          
          {/* Destination airport marker */}
          <CircleMarker
            center={destination}
            radius={8}
            pathOptions={{
              fillColor: '#ef4444',
              fillOpacity: 1,
              color: 'white',
              weight: 2
            }}
          >
            <Tooltip permanent direction="bottom" offset={[0, 10]}>
              CVG (Destination)
            </Tooltip>
          </CircleMarker>
          
          {/* Airplane current position */}
          <Marker position={planePosition} icon={planeIcon}>
            <Tooltip direction="top" offset={[0, -15]}>
              {flight.latitude.toFixed(4)}°N, {Math.abs(flight.longitude).toFixed(4)}°W
              <br />
              Alt: {flight.altitude.toLocaleString()} ft
              <br />
              Speed: {flight.groundspeed} kts
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

