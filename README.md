# ✈️ Delta Flight Tracker

A beautiful real-time flight tracking dashboard displaying live flight information, interactive maps, weather, and in-flight services.

> **⚠️ Important:** This app only works when connected to Delta WiFi during a flight. The APIs are only accessible from the in-flight network.

## Features

- **Live Flight Stats**: Real-time altitude, speed, heading, ETA, and more
- **Interactive Flight Map**: Leaflet-based map with flight path and live aircraft position
- **Destination Weather**: Current conditions and 5-day forecast with temperature conversion
- **Service Status**: Monitor available in-flight services
- **Auto-refresh**: Updates every 5 seconds automatically

## Usage

This app **only works when connected to Delta WiFi** on a flight. The APIs are only accessible from the in-flight network.

### Development

```bash
bun install
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
bun start
```

## Technical Details

The app uses Next.js 16 with:
- Server-side API routes to proxy Delta's WiFi APIs
- Client-side components for real-time updates
- Tailwind CSS for styling
- Leaflet & React Leaflet for interactive maps
- Dynamic imports for optimal client-side rendering

### Available APIs

- `/api/flight` - Real-time flight position and stats
- `/api/weather` - Destination weather forecast
- `/api/services` - In-flight service availability

## Notes

- Not affiliated with Delta Air Lines
- Data is provided by Delta's in-flight entertainment system
- Only works while connected to Delta WiFi

## What You'll See

The dashboard displays:
- Flight number, phase, and aircraft details
- Current altitude, speed, and heading
- Distance and time remaining
- Interactive Leaflet map with real flight path and aircraft position
- Destination weather with Celsius/Fahrenheit conversion
- Live in-flight service status

Enjoy your flight! 🛫
