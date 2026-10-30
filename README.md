# OCD Brilliance MVP Scope

Client-facing presentation and interactive frontend prototype for the proposed OCD Brilliance operations platform MVP.

- [Scope presentation](https://justrhey.github.io/ocd-brilliance-mvp-presentation/) — published presentation (local rebuild below).
- [Interactive prototype](https://justrhey.github.io/ocd-brilliance-mvp-presentation/prototype/) — office, worker, client and public views.

The local presentation in `index.html` is a 13-slide n8n proposal, with an interactive renewal walkthrough and a separate 35-item register in `register.html`. The workflow canvas is an illustration, not a connected n8n installation. Its sample records are fictional. Navigate with Previous/Next, keyboard arrow keys, Page Up/Down, Home or End; use Slides for the index. Print produces a landscape deck. `assets/ocd-automation-proposal.pdf` contains the current 13-slide export.

Preview with `python -m http.server 8048 --bind 127.0.0.1`, then open <http://localhost:8048/>. Regenerate the slide markup with `python scripts/build-deck.py`. The build uses `assets/workflows.json` and the bundled SVG icon definitions; it requires Python's standard library only. Visual rationale and verification are in `docs/`. GitHub Pages serves the published `main` branch.

The prototype is in `prototype/`. It uses fictional sample records and stores demo actions in the browser. See [prototype/README.md](prototype/README.md) for a suggested walkthrough and implementation limits.
