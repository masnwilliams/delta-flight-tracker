# ✈️ Delta Flight Tracker

A real-time flight tracking dashboard that connects to Delta Air Lines' in-flight WiFi API to display live flight information, weather, and available services.

## Features

- **Live Flight Stats**: Real-time altitude, speed, heading, ETA, and more
- **Interactive Flight Map**: Canvas-based visualization of your flight path
- **Destination Weather**: Current conditions and 5-day forecast
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
- Canvas API for flight path visualization

### Available APIs

- `/api/flight` - Real-time flight position and stats
- `/api/weather` - Destination weather forecast
- `/api/services` - In-flight service availability

## Notes

- Not affiliated with Delta Air Lines
- Data is provided by Delta's in-flight entertainment system
- Only works while connected to Delta WiFi

## Screenshots

The dashboard shows:
- Flight number, phase, and aircraft details
- Current altitude, speed, and heading
- Distance and time remaining
- Interactive map with flight path
- Destination weather and forecast
- Available service status

Enjoy your flight! 🛫
