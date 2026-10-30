# OCD Brilliance visual presentation

## Current design and primary reference

The current deliverable is a 12-slide presentation, with a separate searchable 35-item register. It replaces the rejected long report and text-heavy 21-slide version. Previous browser results and the PDF have been replaced with verification of this version.

The primary reference is [Pitch — Product Demo](https://pitch.com/templates/Product-Demo-6gXTPr2hMAM34ojxLE5vPKDg), visually inspected in Chromium on 30 October 2026. Capture: `/tmp/ocd-product-demo-reference.png`. Earlier gallery research is not the governing design direction.

| Reference composition | Implementation | Task-specific improvement |
| --- | --- | --- |
| Oversized upper-left display type and cropped laptop on a taupe cover | “n8n for OCD.” beside an original workflow illustration | The product is immediately visible; the screen shows the proposed OCD process rather than unrelated product imagery |
| Charcoal demonstration slides with large product screens | Full-width workflow canvas and interactive opportunity map | Three fictional records explain true, false and invalid-input outcomes |
| Thin-weight sans-serif type, generous empty space and small recurring metadata | Locally bundled DM Sans, consistent slide numbers and chapter labels | Larger node labels; keyboard navigation; readable mobile detail rather than scaling down the diagram |
| Taupe/charcoal alternation and restrained diagrams | System map, manual/proposed comparison, phase bars, metrics and access diagram | Content stays visual, with exhaustive explanation in the separate register |

Comparison: the cover preserves the reference's left type/right cropped screen silhouette, palette roles and scale contrast. Demonstration slides carry the same dark-screen emphasis. Supporting diagrams adapt the presentation grammar to OCD's operating questions. The laptop, UI illustrations and diagrams are original HTML/SVG; Pitch's text, logo and product artwork are not copied.

## Color and typography

Taupe `#bdb5a5` is a warm, low-saturation surface; charcoal `#292929` provides a cooler, much darker counterweight. Large light/dark areas carry hierarchy without a rainbow of semantic colors. Light slide text uses `#1b1b1b`; dark-slide text uses `#f2f0e9`. Pink identifies the proposed n8n automation; blue plus an explicit label identifies office action. Color never substitutes for the branch labels or the staff boundary.

The principal text pairs are approximately 8.46:1 (ink/taupe) and 12.76:1 (light/charcoal). Smaller labels are checked separately; selected contrast checks do not establish full WCAG conformance. Body and display text use DM Sans. The workflow retains a two-dimensional layout on mobile inside a labeled, keyboard-focusable horizontal scrolling region. The walkthrough brings the selected node into view. General slides reflow.

## Behavioral rationale and evidence

Audience: Adriana and Felician reviewing the proposed use of n8n for existing manual work. Flow: understand the systems → follow one real-shaped example → inspect pilot priorities and all 35 opportunities → compare delivery stages → understand success, maintenance and access → agree the next step. The actual meeting display, reading distance and participants' accessibility needs remain unknown.

| Evidence | Finding and limits | Design decision and falsifier |
| --- | --- | --- |
| [Cowan 2001, working memory review](https://doi.org/10.1017/S0140525X01003922) | Storage capacity depends on the task and chunking. Transfer from controlled memory research to this presentation is analogy-only; it does not prescribe a fixed slide item count. | Keep the selected workflow step and its result visible together. Revise if reviewers cannot explain the current branch without presenter rescue. |
| [Scheibehenne et al. 2010, choice overload meta-analysis](https://doi.org/10.1086/651235) | The aggregate choice-overload effect varies substantially; there is no universal maximum number of choices. This is a corrective finding, not a measured outcome for OCD. | Preserve all 35 entries, with seven named groups and consistent detail fields. Revise if reviewers cannot locate a known item or compare its staff boundary. |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Normative requirements cover contrast, focus, reflow and keyboard operation; they are not a complete usability theory. | Native selects, buttons and dialog; visible focus; focus return; no timed animation; independently scrolling diagram; no-JS register access. Verify through actual interactions and screenshots. |

`user-expi` defines these comprehension and accessibility constraints. `ui-design-index` supplies the reference-led workflow; `ui-design-systems` informs the product-screen states only. The Pitch presentation remains the primary composition source.

## Content and technical boundaries

The original 35 numbered opportunities and the broader 96-point pain register remain distinct. The five pilot selections are 3, 19, 21, 22 and 28; phase counts remain 5 pilot, 15 remaining core, 5 conditional and 10 later/native. Source data: `assets/workflows.json`, with original evidence IDs retained in the register.

Six client questions are mapped to: automation/tools (slides 2–3 and 6), priorities (5), delivery timing (7), success measures (8), maintenance (9) and data/offshore access (10).

The n8n canvas is an illustration of a proposed configuration, not an exported n8n workflow or a connected integration. The interactive sample runs entirely in the browser using fictional records. It makes no requests to Outlook, ShiftCare or Xero. The 30-day rule is illustrative. Missing expiry is an exception for office verification; production must validate the source before evaluating the date rule. Staff sending a message is explicitly outside n8n. A source API, credentials, permissions, accepted rules, duplicate controls and production exception handling still require validation.

Primary technical references checked on 30 October 2026:

- [n8n Outlook](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftoutlook/): draft creation and draft sending are separate operations.
- [n8n Xero](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.xero/): documented contacts and invoices; this does not establish payroll release support.
- [n8n HTTP Request](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/): calling an API still requires the actual endpoint, accepted operations and permissions. ShiftCare availability is unconfirmed for the account.
- [OAIC APP 8](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-8-app-8-cross-border-disclosure-of-personal-information), [APP 11](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-11-app-11-security-of-personal-information) and [NDIS information management](https://www.ndiscommission.gov.au/rules-and-standards/ndis-practice-standards/core-module-provider-governance-and-operational): the access slide describes proposed controls and assessment gates, not verified compliance.

Pricing and cost estimates are excluded at the user’s request. Durations and pilot targets are planning assumptions rather than measured outcomes. Offshore access and Australian hosting remain proposals subject to review. Private client screenshots and account credentials are not bundled.

## Verification

`docs/browser-check.json` records the current automated browser results. `docs/verification.md` records visual inspection and practical limits. The PDF is regenerated from this 12-slide deck. The 35-entry register is a separate appendix linked from the presentation and PDF. Reviewers should use its original titles and evidence rather than treating shortened map labels as full requirements.
