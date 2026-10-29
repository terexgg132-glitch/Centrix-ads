import React from 'react';
import {AbsoluteFill, Composition, Sequence, useVideoConfig} from 'remotion';
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/600.css';
import '@fontsource/cairo/700.css';
import '@fontsource/cairo/800.css';
import {Intro} from './scenes/Intro';
import {Product} from './scenes/Product';
import {Outro} from './scenes/Outro';
import {DURATION, FPS} from './theme';
import {OptionalAudio} from './audio';

const Film:React.FC<{vertical:boolean}> = ({vertical}) => {
  const {fps}=useVideoConfig();
  return <AbsoluteFill style={{backgroundColor:'#061b1c'}}>
    <OptionalAudio/>
    <Sequence from={0} durationInFrames={4*fps+15} premountFor={fps}><Intro vertical={vertical}/></Sequence>
    <Sequence from={4*fps} durationInFrames={22*fps} premountFor={fps}><Product vertical={vertical}/></Sequence>
    <Sequence from={26*fps} durationInFrames={4*fps} premountFor={fps}><Outro vertical={vertical}/></Sequence>
  </AbsoluteFill>;
};

const Landscape:React.FC=()=> <Film vertical={false}/>;
const Portrait:React.FC=()=> <Film vertical={true}/>;

export const Root:React.FC=()=> <>
  <Composition id="CentrixLandscape" component={Landscape} durationInFrames={DURATION} fps={FPS} width={1920} height={1080}/>
  <Composition id="CentrixPortrait" component={Portrait} durationInFrames={DURATION} fps={FPS} width={1080} height={1920}/>
</>;
