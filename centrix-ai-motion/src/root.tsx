import React from 'react';
import {AbsoluteFill, Composition, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/600.css';
import '@fontsource/cairo/700.css';
import '@fontsource/cairo/800.css';
import {Dashboard,Intro,Outro} from './scenes';
import {C,SCENE} from './style';
const Film:React.FC<{vertical:boolean}>=({vertical})=>{const {fps}=useVideoConfig();return <AbsoluteFill style={{background:C.night}}>
 <Sequence from={SCENE.intro[0]*fps} durationInFrames={(SCENE.intro[1]-SCENE.intro[0])*fps} premountFor={fps}><Intro vertical={vertical}/></Sequence>
 <Sequence from={SCENE.dashboard[0]*fps} durationInFrames={(SCENE.dashboard[1]-SCENE.dashboard[0])*fps} premountFor={fps}><Dashboard vertical={vertical}/></Sequence>
 <Sequence from={SCENE.outro[0]*fps} durationInFrames={(SCENE.outro[1]-SCENE.outro[0])*fps} premountFor={fps}><Outro vertical={vertical}/></Sequence>
 <Audio src={staticFile('audio/music.wav')} volume={0.6} premountFor={fps}/>
 <Audio src={staticFile('audio/sfx.wav')} volume={1} premountFor={fps}/>
 </AbsoluteFill>};
export const Root:React.FC=()=> <>
 <Composition id="CentrixAI-Landscape" component={Film} defaultProps={{vertical:false}} durationInFrames={900} fps={30} width={1920} height={1080}/>
 <Composition id="CentrixAI-Portrait" component={Film} defaultProps={{vertical:true}} durationInFrames={900} fps={30} width={1080} height={1920}/>
 </>;
