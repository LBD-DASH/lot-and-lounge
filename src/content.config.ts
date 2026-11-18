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

export const collections = { airports };
