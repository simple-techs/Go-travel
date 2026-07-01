import { Country } from "./types";

export const countries: Country[] = [
  { code: "TH", name: "Thailand", lat: 15.87, lng: 100.99, continent: "Asia", popular: true },
  { code: "VN", name: "Vietnam", lat: 14.06, lng: 108.28, continent: "Asia", popular: true },
  { code: "ID", name: "Indonesia", lat: -0.79, lng: 113.92, continent: "Asia", popular: true },
  { code: "PH", name: "Philippines", lat: 12.88, lng: 121.77, continent: "Asia", popular: true },
  { code: "KH", name: "Cambodia", lat: 12.57, lng: 104.99, continent: "Asia", popular: true },
  { code: "LA", name: "Laos", lat: 19.86, lng: 102.50, continent: "Asia", popular: false },
  { code: "MM", name: "Myanmar", lat: 21.91, lng: 95.96, continent: "Asia", popular: false },
  { code: "MY", name: "Malaysia", lat: 4.21, lng: 101.98, continent: "Asia", popular: true },
  { code: "IN", name: "India", lat: 20.59, lng: 78.96, continent: "Asia", popular: true },
  { code: "NP", name: "Nepal", lat: 28.39, lng: 84.12, continent: "Asia", popular: true },
  { code: "LK", name: "Sri Lanka", lat: 7.87, lng: 80.77, continent: "Asia", popular: true },
  { code: "JP", name: "Japan", lat: 36.20, lng: 138.25, continent: "Asia", popular: true },
  { code: "KR", name: "South Korea", lat: 35.91, lng: 127.77, continent: "Asia", popular: false },
  { code: "PT", name: "Portugal", lat: 39.40, lng: -8.22, continent: "Europe", popular: true },
  { code: "ES", name: "Spain", lat: 40.46, lng: -3.75, continent: "Europe", popular: true },
  { code: "IT", name: "Italy", lat: 41.87, lng: 12.57, continent: "Europe", popular: true },
  { code: "GR", name: "Greece", lat: 39.07, lng: 21.82, continent: "Europe", popular: true },
  { code: "HR", name: "Croatia", lat: 45.10, lng: 15.20, continent: "Europe", popular: true },
  { code: "DE", name: "Germany", lat: 51.17, lng: 10.45, continent: "Europe", popular: false },
  { code: "FR", name: "France", lat: 46.23, lng: 2.21, continent: "Europe", popular: true },
  { code: "NL", name: "Netherlands", lat: 52.13, lng: 5.29, continent: "Europe", popular: false },
  { code: "CZ", name: "Czech Republic", lat: 49.82, lng: 15.47, continent: "Europe", popular: true },
  { code: "TR", name: "Turkey", lat: 38.96, lng: 35.24, continent: "Europe", popular: true },
  { code: "ME", name: "Montenegro", lat: 42.71, lng: 19.37, continent: "Europe", popular: false },
  { code: "AL", name: "Albania", lat: 41.15, lng: 20.17, continent: "Europe", popular: false },
  { code: "MX", name: "Mexico", lat: 23.63, lng: -102.55, continent: "North America", popular: true },
  { code: "CR", name: "Costa Rica", lat: 9.75, lng: -83.75, continent: "North America", popular: true },
  { code: "GT", name: "Guatemala", lat: 15.78, lng: -90.23, continent: "North America", popular: true },
  { code: "CU", name: "Cuba", lat: 21.52, lng: -77.78, continent: "North America", popular: true },
  { code: "PA", name: "Panama", lat: 8.54, lng: -80.78, continent: "North America", popular: false },
  { code: "CO", name: "Colombia", lat: 4.57, lng: -74.30, continent: "South America", popular: true },
  { code: "PE", name: "Peru", lat: -9.19, lng: -75.02, continent: "South America", popular: true },
  { code: "BR", name: "Brazil", lat: -14.24, lng: -51.93, continent: "South America", popular: true },
  { code: "AR", name: "Argentina", lat: -38.42, lng: -63.62, continent: "South America", popular: true },
  { code: "BO", name: "Bolivia", lat: -16.29, lng: -63.59, continent: "South America", popular: true },
  { code: "EC", name: "Ecuador", lat: -1.83, lng: -78.18, continent: "South America", popular: true },
  { code: "CL", name: "Chile", lat: -35.68, lng: -71.54, continent: "South America", popular: false },
  { code: "MA", name: "Morocco", lat: 31.79, lng: -7.09, continent: "Africa", popular: true },
  { code: "ZA", name: "South Africa", lat: -30.56, lng: 22.94, continent: "Africa", popular: true },
  { code: "EG", name: "Egypt", lat: 26.82, lng: 30.80, continent: "Africa", popular: true },
  { code: "KE", name: "Kenya", lat: -0.02, lng: 37.91, continent: "Africa", popular: true },
  { code: "TZ", name: "Tanzania", lat: -6.37, lng: 34.89, continent: "Africa", popular: true },
  { code: "ET", name: "Ethiopia", lat: 9.15, lng: 40.49, continent: "Africa", popular: false },
  { code: "GH", name: "Ghana", lat: 7.95, lng: -1.02, continent: "Africa", popular: false },
  { code: "AU", name: "Australia", lat: -25.27, lng: 133.78, continent: "Oceania", popular: true },
  { code: "NZ", name: "New Zealand", lat: -40.90, lng: 174.89, continent: "Oceania", popular: true },
  { code: "FJ", name: "Fiji", lat: -17.71, lng: 178.07, continent: "Oceania", popular: true },
];

export function getCountryByCode(code: string): Country | undefined {
  return countries.find((c) => c.code === code);
}

export function getPopularCountries(): Country[] {
  return countries.filter((c) => c.popular);
}

export function getCountriesByContinent(continent: string): Country[] {
  return countries.filter((c) => c.continent === continent);
}
