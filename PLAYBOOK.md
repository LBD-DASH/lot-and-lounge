# PLAYBOOK: add one airport page

This is the exact routine for adding **one new airport page per night**. Follow it top to bottom. If a step can't be completed honestly, ship a smaller page or skip the airport. **Never guess.**

---

## 0. Pick the airport

Take the first airport in the [priority list](#priority-list) that doesn't yet have a file in `src/content/airports/`. Mark it done in this file in the same commit (change `[ ]` to `[x]`).

## 1. Gather sources (official first)

Collect these and save the URLs. You'll cite every one in `sources`.

| Need | Where to look (in order) |
|---|---|
| On-airport parking rates | Airport operator's official parking page or tariff PDF. Not aggregators, not "guide" sites. |
| Pre-book or reserved rates | The airport's own booking engine or page. Quote only what's published (e.g. "from $35/day"). |
| Taxes | Whether the operator says rates include tax. If it doesn't say, write that it doesn't say. |
| Shuttle or people-mover frequency | Airport page. Omit if not stated. |
| Authorized off-airport lots | Only if the airport names them. Otherwise describe generically ("private lots exist; compare final totals"). |
| Park-and-ride and transit | Transit agency official pages (fares, station parking, route names). |
| Lounges by terminal | Airport's official lounge or amenities directory, then the lounge operators' pages, then the Priority Pass airport page (`https://www.prioritypass.com/en-GB/lounges/<country>/<airport-slug>`; find the slug from the country page). |

**Fetching tips (on the box):** try WebFetch first. If a page is JS-rendered or blocked, use headless Chrome. `/workspace/mogul/pp/dump.js <url>` prints the rendered text and links (puppeteer-core plus `/usr/bin/google-chrome`). Add a "Load more" click loop if needed (see `/workspace/mogul/pp/jfk.js`). Some sites embed the data as JSON in the HTML, so grep the raw HTML for `$` amounts.

## 2. Sourcing rules (non-negotiable)

1. **Never fabricate** a price, hour, gate, lounge name, phone number or frequency. If it can't be verified on an official page, leave it out or write "check with the airport".
2. Every price must show its **source link** and the **"last checked" date** (the page's `lastChecked`).
3. When official sources **disagree**, say so and show both (see the JNB page's Parkade 2 South note).
4. **Lounge hours:** include only if the operator's own page lists them clearly. When in doubt, omit them and tell readers to check the operator.
5. **Total-cost tables are our arithmetic.** Say so, and show the formula (e.g. "7 × $20"). Use the published 24-hour maximum.
6. **No credit-card recommendations.** You may state factual access rules ("eligible Amex card members"), but never suggest getting a card.
7. **Partner links only via `src/data/partners.json`** (list keys in `partners:`; each partner has a plain `url` and an empty `affiliateUrl` that is filled in only after a program approves us). Never paste partner or affiliate URLs into Markdown. Never invent affiliate IDs. Links to airports, transit agencies and lounge operators are sources, not partners, and are fine inline.
8. Use dates in the form "19 Nov 2026". Use local currency with its symbol (`$`, `R`, `£`, `€`, `AED`).

## 3. Create the file

Path: `src/content/airports/<iata-lowercase>.md` (the filename becomes the URL: `/airports/<iata>/`).

### Required frontmatter (validated at build time; the build fails if wrong)

| Field | Rule |
|---|---|
| `iata` | 3 letters, uppercase |
| `airportName` | Official name |
| `city`, `country` | Strings |
| `title` | 20–70 chars, unique. Pattern: `"<IATA> Parking Rates & Lounges by Terminal (<Mon YYYY>)"` |
| `description` | 120 to 160 chars, unique. Include the cheapest official daily rate and "by terminal". |
| `lastUpdated` | `YYYY-MM-DD` |
| `lastChecked` | e.g. `"19 Nov 2026"` |
| `currency` | ISO code, e.g. `USD`, `ZAR` |
| `summary` | 2–3 sentences: cheapest official option vs the terminal garage, plus the one thing people get wrong |
| `cheapestOfficial` | `{ label, price, sourceUrl }` (shown as the callout and on the home page) |
| `partners` | Keys from `partners.json`. For US/Canada airports: `[airport-parking-reservations, parksleepfly, priority-pass, lounge-pass]`. Elsewhere: lounge partners only, unless a parking partner covers that country. |
| `sources` | At least 2 `{ label, url }`. Every URL you used. |
| `faq` | At least 3 `{ q, a }`, ideally 5. Real search questions (cheapest parking, a week's cost, lot X price, transit fare, Priority Pass lounges). Answers must repeat only facts in the body. These become FAQPage JSON-LD. |

### Body template (copy this)

```markdown
## Official <IATA> parking rates
From [<source>](<url>), last checked <date>. <Tax statement>.

| Lot | Drive-up rate | Max per 24 hours | Getting to the terminal |
|---|---|---|---|
| ... | ... | ... | ... |

<Clearances, EV charging, the 30-day rule, reservations: only if official.>

## Real total cost for a 7-day trip
Our arithmetic from official rates (7 × daily maximum).

| Option | 7 days |
|---|---|
| ... | ... |

The takeaway: <one sentence with the dollar difference>.

## Off-airport and park-and-ride alternatives
- <Authorized lots named by the airport, transit park-and-ride with official fees, or a generic "compare final totals" note>

## Public transport
- <Line names, station location, official fare>

## Lounges at <IATA> by terminal
From <official directory> and <Priority Pass>, checked <date>.

### Terminal X
- **Lounge name**, gate/location if official

### How you get in
- **Airline lounges:** ...
- **Priority Pass:** <exactly what PP lists today>
- **Bank-branded lounges:** access set by the issuer. We don't recommend cards.
```

## 4. Check it

```bash
cd /workspace/mogul/lot-and-lounge
npm ci        # first time only
npm run build # must pass; schema errors name the bad field
```

Then check:
- [ ] Every number in the body appears on a cited source page (re-open each source)
- [ ] The 7-day arithmetic is right
- [ ] FAQ answers match the body
- [ ] No partner URLs in Markdown; no credit-card suggestions
- [ ] Title and description are unique (grep the other files)
- [ ] `dist/sitemap.xml` includes the new URL

## 5. Publish

Push **only source files** (never `node_modules/` or `dist/`) to `main`. The GitHub Pages workflow builds and deploys automatically.

- With the GitHub MCP: `push_files` (owner `LBD-DASH`, repo `lot-and-lounge`, branch `main`) with the new `src/content/airports/<iata>.md` and the updated `PLAYBOOK.md`. Commit message: `Add <IATA> airport page`.
- Then check the latest Actions run (`actions_list` → workflow runs) and `curl -sI https://lotandlounge.com/airports/<iata>/` (expect 200).

## 6. Refresh old pages

Once a week, re-check the oldest `lastChecked` page against its sources, update the prices and dates, and push. Rates at big airports change several times a year.

---

## Priority list

Done: [x] ATL · [x] JFK · [x] LAX · [x] ORD · [x] JNB · [x] DFW · [x] DEN · [x] LAS · [x] MCO · [x] CLT · [x] MIA · [x] SEA · [x] SFO · [x] EWR · [x] PHX · [x] IAH · [x] BOS · [x] FLL · [x] MSP · [x] LGA · [x] DTW · [x] PHL · [x] SLC · [x] BWI · [x] DCA · [x] IAD · [x] SAN · [x] TPA · [x] BNA · [x] AUS · [x] MDW · [x] CPT · [x] DXB · [x] STL · [x] HNL · [x] OAK · [x] PDX

Next, in order. The top US airports by passengers come first; international hubs follow.

1. [x] DFW, Dallas/Fort Worth
2. [x] SEA, Seattle-Tacoma
3. [x] SFO, San Francisco
4. [x] EWR, Newark Liberty
5. [x] PHX, Phoenix Sky Harbor
6. [x] IAH, Houston Bush
7. [x] BOS, Boston Logan
8. [x] FLL, Fort Lauderdale
9. [x] MSP, Minneapolis–St Paul
10. [x] LGA, New York LaGuardia
11. [x] DTW, Detroit
12. [x] PHL, Philadelphia
13. [x] SLC, Salt Lake City
14. [x] BWI, Baltimore/Washington
15. [x] DCA, Washington Reagan National
16. [x] IAD, Washington Dulles
17. [x] SAN, San Diego
18. [x] TPA, Tampa
19. [x] BNA, Nashville
20. [x] AUS, Austin
21. [x] MDW, Chicago Midway
22. [x] CPT, Cape Town (ACSA tariff PDF also covers CTIA)
23. [ ] LHR, London Heathrow
24. [x] DXB, Dubai
25. [ ] SIN, Singapore Changi
26. [ ] CDG, Paris Charles de Gaulle
