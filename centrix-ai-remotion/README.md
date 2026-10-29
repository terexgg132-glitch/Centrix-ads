# Centrix AI — 30-second product film

A standalone Remotion/React/TypeScript motion graphics project. The Centrix interface is rebuilt from editable components inspired by the supplied reference image; the reference screenshot is not used as a flattened video layer. The logo mark is an SVG recreation for this film. No production application files are used.

## Deliverables

- `render/centrix-ai-landscape.mp4` — 1920 × 1080, 30 fps, 30 seconds
- `render/centrix-ai-portrait.mp4` — 1080 × 1920, 30 fps, 30 seconds; dedicated portrait layout
- `src/scenes/` — intro, product, and brand reveal scenes
- `src/components/` — animated interface, logo, and atmosphere

## Preview and render

Requires Node.js 20 or newer and npm.

```bash
npm install
npm run studio
```

Open the URL printed by Studio. Select `CentrixLandscape` or `CentrixPortrait`.

```bash
npm run render:landscape
npm run render:portrait
```

On a machine with system Chromium and restricted download access, append `--browser-executable=/usr/bin/chromium` to either render command. For example:

```bash
npm run render:landscape -- --browser-executable=/usr/bin/chromium
```

## Edit the film

- Dialogue, colors, and major conversation timings: `src/theme.ts`. `FLOW` uses frames relative to the product scene, which starts at 4 seconds.
- Interface components, demo cards, RTL typography, and composer interactions: `src/components/Interface.tsx`.
- Camera scale and scene title changes: `src/scenes/Product.tsx`.
- Intro and closing brand treatments: `src/scenes/Intro.tsx` and `src/scenes/Outro.tsx`.
- Compositions, size, duration, and scene sequences: `src/Root.tsx`.

The attendance and financial figures are **illustrative demo data** and are labeled as such in the film. The follow-up is a **draft awaiting user confirmation**. No message is sent by the animation.

## Optional audio

The supplied exports are intentionally silent because no licensed audio was provided. Put a licensed `music.mp3` and/or `click.wav` in `public/audio/`, then enable `music` and/or `ui` in `src/audio.tsx`. The click cue is aligned with the three on-screen send-button interactions. Check the licenses for the intended distribution channels before publishing with sound.

## Verification

Run `npm run typecheck` to verify the source. The `render/` directory contains the final H.264 files. Remotion renders all visuals from code and the installed Cairo font package; the silent version has no missing external media assets.
