export interface FlightData {
  timestamp: string;
  eta: string;
  flightDuration: number;
  flightNumber: string;
  latitude: number;
  longitude: number;
  noseId: string;
  paState: boolean;
  vehicleId: string;
  destination: string;
  origin: string;
  flightId: string;
  airspeed: number | null;
  airTemperature: number;
  altitude: number;
  distanceToGo: number;
  doorState: string;
  groundspeed: number;
  heading: number;
  timeToGo: number;
  wheelWeightState: string;
  grossWeight: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  flightPhase: string;
}

export interface WeatherData {
  timestamp: string;
  cityName: string;
  cityCode: string;
  observation: {
    temperatureF: string;
    temperatureC: string;
    skyCode: string;
  };
  forecast: Array<{
    dayNumber: string;
    lowTemperatureF: string;
    lowTemperatureC: string;
    highTemperatureF: string | null;
    highTemperatureC: string | null;
    fullPhrase: string;
    skyCodeDay: string | null;
    skyCodeNight: string;
  }>;
}

export interface ServicesData {
  connectivity: boolean;
  iptv: boolean;
  other: {
    timestamp: string;
    serviceList: Array<{
      serviceName: string;
      serviceState: string;
      href: string | null;
    }>;
  };
}
