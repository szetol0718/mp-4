export type WeatherDay = {
    hours: any;
    datetime: string;
    temp: number;
    feelslike: number;
    humidity: number;
    windspeed: number;
    precipprob?: number;
    conditions: string;
    icon: string;
    sunrise?: string;
    sunset?: string;
    cloudcover?: number;
  };
  
export type ForecastData = {
    resolvedAddress: string;
    days: WeatherDay[];
  };
  
  export const weatherFactors = [
    { key: "temp", label: "Temperature (°F)", max: 120 },
    { key: "feelslike", label: "Feels Like (°F)", max: 120 },
    { key: "humidity", label: "Humidity (%)", max: 100 },
    { key: "windspeed", label: "Wind Speed (mph)", max: 50 },
    { key: "precipprob", label: "Precip Probability (%)", max: 100 },
  ] as const;  
  
  export type WeatherFactorKey = typeof weatherFactors[number]["key"];

  