# Centrix AI — cinematic product film

A standalone, editable Remotion advertisement for the Centrix educational center platform. Both compositions run for 30 seconds at 30 fps with the same timed story and separately adapted landscape and portrait layouts. All interface elements are React/SVG components; no screenshot is used as a flat video layer.

## Deliverables

- `out/centrix-ai-landscape.mp4` — 1920 × 1080, H.264/AAC
- `out/centrix-ai-portrait.mp4` — 1080 × 1920, H.264/AAC
- `src/` — Remotion scenes, reusable UI, typography, style constants, timings
- `public/audio/` — original WAV music and synchronized effects
- `scripts/generate_audio.py` — reproducible sound generation

## Preview and render

```bash
npm install
npm run studio
```

Open the URL printed by Studio (normally `http://localhost:3000`). Choose `CentrixAI-Landscape` or `CentrixAI-Portrait` and scrub the timeline. In a machine with Chromium installed, render with:

```bash
npx remotion render CentrixAI-Landscape out/centrix-ai-landscape.mp4 --codec=h264 --crf=18 --audio-codec=aac --audio-bitrate=192k
npx remotion render CentrixAI-Portrait out/centrix-ai-portrait.mp4 --codec=h264 --crf=18 --audio-codec=aac --audio-bitrate=192k
```

For the supplied cloud environment, append `--browser-executable=/usr/bin/chromium --concurrency=2` to each render command. To regenerate the original sound design, run `python3 scripts/generate_audio.py` (requires NumPy).

## Edit the film

- `src/style.ts`: brand colors, font, dialogue, scene timing reference.
- `src/scenes.tsx`: six scene sections and their frame based animations. The three chat flows are in `Flow`; result cards are `AttendanceResult`, `FinanceResult`, and `FollowupResult`.
- `src/ui.tsx`: sidebar, navigation, top bar, history, chat input, icons, brand mark, and AI orb.
- `src/root.tsx`: compositions, `<Sequence>` timing, and the two audio layers.
- `scripts/generate_audio.py`: sound cue positions in seconds, musical bed, levels, and exported WAVs.

The interface is a visual reconstruction of the supplied Centrix screenshot. Attendance and finance cards say `بيانات توضيحية`; the follow-up stays a draft and explicitly says `لم تُرسل`. No customer data is implied. The SVG logo is a code-drawn interpretation of the supplied gold mark.

## Timeline

| Time | Content |
| --- | --- |
| 0–4 s | Centrix AI mark and Arabic introduction |
| 4–9 s | Dashboard perspective entrance, sidebar and assistant highlight |
| 9–15 s | Attendance question, thinking state and illustrative summary |
| 15–20 s | Finance question and illustrative overview |
| 20–26 s | Follow-up draft with review and approval step |
| 26–30 s | Final brand reveal and tagline |

## Sound design

`music.wav` contains an original restrained synth bed. `sfx.wav` contains the timed impact, shimmer, whooshes, varied keyboard clicks, send clicks, processing pulses, result pops, and final hit. Both are embedded in each MP4. The SFX layer is kept separate so levels or cues can be replaced without changing the visuals.

## Checks

`npm run typecheck` validates the source. Both compositions use locally installed Cairo font files from `@fontsource/cairo`, with no runtime remote assets. The MP4s are intended to have an H.264 video stream and 48 kHz stereo AAC audio stream.
