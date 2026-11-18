import partners from '../data/partners.json';

export type Partner = { key: string; name: string; url: string; kind: string; blurb: string; affiliate: boolean };

export function getPartner(key: string): Partner {
  const p = (partners as Record<string, any>)[key];
  if (!p || key.startsWith('_')) throw new Error(`Unknown partner key "${key}". Add it to src/data/partners.json first.`);
  return { key, ...p };
}
