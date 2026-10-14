# CENTRIX production verification

The finished master is 27.000 seconds, 810 frames, H.264 yuv420p,
1080×1920, 30 fps, limited-range BT.709, AAC 48 kHz stereo.

The encoded master passes a complete FFmpeg decode with no errors.
Measured encoded audio: -15.07 LUFS integrated; -1.58 dBTP true peak.
The restrained level preserves speech dynamics and remains close to the
requested social loudness target. Music and SFX are original procedural
synthesis, with deterministic composition code and no outside samples.

The supplied 23.712-second MP3 is retained byte-for-byte and used without
rewriting, edits, time stretching, or regenerated speech. The supplied full
SVG logo is retained byte-for-byte and displayed intact. Final gain,
resampling and peak management are non-destructive mixing operations.

The nine requested actual MP4 frames were extracted at
0.5 / 3.5 / 6.8 / 9.2 / 12.5 / 16.2 / 19.8 / 22.8 / 26.2 seconds.
Arabic letters remain joined and RTL reads correctly. Additional frames at
13.4 and 17.2 seconds were inspected for the unified dashboard lock and
illustrative AI answer. Critical content remains inside the requested
safe region. No real student roster, amounts, revenue, or performance
metrics are shown. The AI example is marked illustrative and does not
depict any automatic message sending.

The logo, final Arabic tagline “سستم السنتر” and website remain stable
from 23.55 to 26.65 seconds. The decoded frame mean difference between
23.6 and 26.2 seconds is 0.00493 pixel levels, attributable to compression.
The image fades to black over the last 0.35 seconds.

The 8.000-second style test has 240 frames at the same master resolution
and includes the real score and SFX. Three style previews are delivered.
The small review copy is 540×960, 30 fps, H.264 yuv420p, AAC stereo.

A physical phone speaker is not available in this cloud environment.
A mono 180–6500 Hz proxy was generated for technical review. Actual handset
listening and subjective creative approval remain human review steps.

All deliverables are saved in the repository output/ folder. The host
/codex output folder could not be created because the cloud account has
no permission to create that root directory.
