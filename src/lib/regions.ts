// Groups airports into regions for the homepage board and picker.
// Region is derived from each airport's `country`, so new airport pages need no extra field.
// Add a country here when a page for a new country is added (unknown countries fall back to "More airports").

export const REGION_ORDER = [
  'North America',
  'Europe',
  'Asia',
  'Middle East',
  'Africa',
  'Oceania',
  'Latin America',
  'More airports',
] as const;
export type Region = (typeof REGION_ORDER)[number];

const COUNTRY_REGION: Record<string, Region> = {
  // North America
  USA: 'North America', 'United States': 'North America', Canada: 'North America', Mexico: 'North America',
  // Europe
  'United Kingdom': 'Europe', UK: 'Europe', Ireland: 'Europe', France: 'Europe', Germany: 'Europe', Netherlands: 'Europe',
  Belgium: 'Europe', Luxembourg: 'Europe', Spain: 'Europe', Portugal: 'Europe', Italy: 'Europe', Switzerland: 'Europe',
  Austria: 'Europe', Denmark: 'Europe', Sweden: 'Europe', Norway: 'Europe', Finland: 'Europe', Iceland: 'Europe',
  Poland: 'Europe', Czechia: 'Europe', 'Czech Republic': 'Europe', Hungary: 'Europe', Greece: 'Europe', Türkiye: 'Europe',
  Turkey: 'Europe', Croatia: 'Europe', Romania: 'Europe', Malta: 'Europe', Cyprus: 'Europe',
  // Asia
  Singapore: 'Asia', 'Hong Kong': 'Asia', Japan: 'Asia', 'South Korea': 'Asia', Thailand: 'Asia', Taiwan: 'Asia',
  Malaysia: 'Asia', India: 'Asia', China: 'Asia', Philippines: 'Asia', Indonesia: 'Asia', Vietnam: 'Asia', Macau: 'Asia',
  // Middle East
  'United Arab Emirates': 'Middle East', UAE: 'Middle East', Qatar: 'Middle East', 'Saudi Arabia': 'Middle East',
  Israel: 'Middle East', Bahrain: 'Middle East', Oman: 'Middle East', Kuwait: 'Middle East',
  // Africa
  'South Africa': 'Africa', Kenya: 'Africa', Egypt: 'Africa', Morocco: 'Africa', Nigeria: 'Africa', Ethiopia: 'Africa',
  // Oceania
  Australia: 'Oceania', 'New Zealand': 'Oceania',
  // Latin America
  Brazil: 'Latin America', Argentina: 'Latin America', Chile: 'Latin America', Colombia: 'Latin America', Peru: 'Latin America',
};

export const regionOf = (country: string): Region => COUNTRY_REGION[country] ?? 'More airports';
export const regionSlug = (r: string) => r.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/** Group items by region in REGION_ORDER, dropping empty regions. */
export function groupByRegion<T>(items: T[], country: (t: T) => string) {
  return REGION_ORDER.map((region) => ({ region, slug: regionSlug(region), items: items.filter((i) => regionOf(country(i)) === region) }))
    .filter((g) => g.items.length > 0);
}
