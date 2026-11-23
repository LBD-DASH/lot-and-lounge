import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const airports = defineCollection({
  // One Markdown file per airport: src/content/airports/<iata-lowercase>.md
  loader: glob({ pattern: '**/*.md', base: './src/content/airports' }),
  schema: z.object({
    iata: z.string().length(3),
    airportName: z.string(),
    city: z.string(),
    country: z.string(),
    title: z.string().min(20).max(70),
    description: z.string().min(70).max(160),
    lastUpdated: z.coerce.date(),
    lastChecked: z.string(), // human-readable, e.g. "19 Nov 2026"
    currency: z.string(),
    summary: z.string(),
    cheapestOfficial: z.object({
      label: z.string(),
      price: z.string(),
      sourceUrl: z.string().url(),
    }),
    partners: z.array(z.string()).default([]),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).min(2),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
  }),
});

const guides = defineCollection({
  // One Markdown file per guide: src/content/guides/<slug>.md
  // Every fact in a guide must come from the linked airport pages (same check dates) or an official source listed in `sources`.
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().min(20).max(70),
    description: z.string().min(70).max(160),
    keyword: z.string(), // the search query this guide targets
    topic: z.enum(['Parking', 'Lounges', 'Budget travel']),
    airports: z.array(z.string()).default([]), // airport collection ids, e.g. ["jfk"]
    answer: z.string(), // one-paragraph quick answer shown in the ticket at the top
    lastUpdated: z.coerce.date(),
    lastChecked: z.string(),
    order: z.number().default(100),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
  }),
});

export const collections = { airports, guides };
