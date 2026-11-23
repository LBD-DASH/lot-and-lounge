import type { CollectionEntry } from 'astro:content';

export const TOPIC_ICON: Record<string, string> = { Parking: 'car', Lounges: 'lounge', 'Budget travel': 'ticket' };
export const TOPIC_ORDER = ['Parking', 'Lounges', 'Budget travel'] as const;

export function topicSlug(t: string) {
  return t.toLowerCase().replace(/[^a-z]+/g, '-');
}
/** Rough reading time from the raw Markdown body. */
export function readMins(entry: CollectionEntry<'guides'>) {
  const words = (entry.body ?? '').replace(/[#*|>\-\[\]\(\)]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 220));
}
export function sortGuides(list: CollectionEntry<'guides'>[]) {
  return [...list].sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}
/** Guides that mention an airport, for the "Guides for this airport" block on airport pages. */
export function guidesFor(list: CollectionEntry<'guides'>[], airportId: string) {
  return sortGuides(list.filter((g) => g.data.airports.includes(airportId)));
}
