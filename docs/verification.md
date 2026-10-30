# Verification — 30 October 2026

The current 12-slide presentation was checked in Chromium at 1440 × 900, with every slide also checked at 320, 390, 768 and 1024 CSS pixels. The automated report is `browser-check.json`.

## Passed

- Exactly one slide visible in interactive mode; all 12 available without JavaScript and in print.
- All desktop slide content clears its footer. No document-level horizontal overflow at the four responsive widths. The cover deliberately crops the laptop; the workflow and timeline use their own scrolling regions on mobile.
- Workflow connectors reach the rendered nodes. All three sample paths end correctly: due-soon → draft and staff review; valid → no draft; missing expiry → manual exception. Restart and sample reset work. The example has no production connections.
- All seven opportunity groups and all 35 detail dialogs open. Closing a dialog returns focus to the originating item. Tab arrow keys wrap between groups. Arrow keys inside an open dialog do not advance the deck.
- Previous/Next, Arrow, Page Up/Down, Home/End, slide index, Escape and direct slide links work.
- All 35 register entries retain their original title, human boundary and acceptance fields. Phase counts are 5/15/5/10. Combined search/filter, expansion and no-match state work.
- All 35 map entries and native register disclosures remain accessible without JavaScript.
- Zero uncaught page errors, failed requests or missing assets during the browser run.
- All 35 titles independently match `ocd-brilliance-mvp-scope/docs/automation-opportunities-2026-10-24/opportunities.json`; both that source and the 25 October feasibility file contain 35 items.
- JavaScript syntax checks, Python generator compilation and `git diff --check` pass.
- PDF regenerated from the current deck; `pdfinfo` confirms 12 pages at 16:9. Export waits for print layout before capture so connectors are present.

## Visual inspection

Primary reference: `/tmp/ocd-product-demo-reference.png`. All 12 desktop captures were inspected through `/tmp/ocd-visual-contact-sheet.jpg`, with individual workflow, mobile and PDF views also inspected. The cover retains the Pitch Product Demo reference's oversized left title, right cropped laptop and muted taupe/charcoal palette. Product demonstrations use the reference's dark-screen emphasis.

Visual inspection found and corrected disconnected SVG paths, the mobile cover image overlapping its caption, small muted-text contrast and dark slides losing their backgrounds in print. The mobile cover now gives the image and caption separate vertical space. The workflow preserves readable node labels in a horizontal scrolling region rather than shrinking the full canvas to phone width.

Representative captures: `/tmp/ocd-visual-final-slide-01.png` through `12.png`, `/tmp/ocd-visual-final-mobile-1.png`, `/tmp/ocd-visual-final-mobile-6.png`, `/tmp/ocd-mobile-workflow.png` and `/tmp/ocd-export-final.png` (rendered PDF page 3).

Main measured contrast ratios: `#1b1b1b` on `#bdb5a5` = 8.46:1; `#f2f0e9` on `#292929` = 12.76:1. Small taupe-surface labels were darkened. These checks are not a full accessibility certification; the PDF is untagged and the accessible HTML is the preferred interactive version.

## Practical limits

The browser demonstration is a visual proposal, not a live n8n workflow. Source access, permissions, accepted rule thresholds, duplicate prevention, integration behavior and operational controls still need validation before production. Delivery timing and targets remain assumptions. Pricing and cost estimates have been removed at the user’s request. No owner usability study or real savings measurement was performed. The separately linked register provides the complete 35-item appendix; the slide PDF shows the overview, not all seven interactive map states.

## Pricing removal

Removed the pricing slide, all phase estimates, hourly rates, maintenance pricing and pricing-related approval language. The deck now has 12 slides. Delivery phases retain indicative timing and release gates. The register’s proposal notes and the regenerated PDF contain no pricing estimates. Full existing browser checks pass on this 12-slide version.
