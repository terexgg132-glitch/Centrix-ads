import React from 'react';
import {Audio, Sequence, staticFile, useVideoConfig} from 'remotion';

// Add licensed audio to public/audio, then switch either flag on.
export const AUDIO = {
  music: false,
  ui: false,
  musicFile: 'audio/music.mp3',
  clickFile: 'audio/click.wav',
} as const;

export const OptionalAudio: React.FC = () => {
  const {fps}=useVideoConfig();
  return <>
    {AUDIO.music && <Audio src={staticFile(AUDIO.musicFile)} volume={0.28} />}
    {AUDIO.ui && [11, 16.8, 21.8].map((time) => <Sequence key={time} from={Math.round(time*fps)} durationInFrames={fps} premountFor={fps}><Audio src={staticFile(AUDIO.clickFile)} volume={0.36}/></Sequence>)}
  </>;
};
