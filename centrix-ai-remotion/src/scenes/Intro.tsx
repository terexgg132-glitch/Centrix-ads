import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Ambience} from '../components/Ambience';
import {LogoMark, Wordmark} from '../components/Brand';
import {C, COPY} from '../theme';

export const Intro: React.FC<{vertical: boolean}> = ({vertical}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const rise = spring({frame: f - 9, fps, config: {damping: 20, stiffness: 80}});
  const out = interpolate(f, [104, 120], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{fontFamily: 'Cairo', color: C.white, opacity: out}}>
    <Ambience />
    <div style={{position: 'absolute', left: vertical ? 70 : 90, top: vertical ? 100 : 70, color: C.gold, fontSize: vertical ? 22 : 18, letterSpacing: 5}}>CENTRIX / INTELLIGENCE</div>
    <div style={{position: 'absolute', left: vertical ? 70 : 90, right: vertical ? 70 : 90, bottom: vertical ? 112 : 62, height: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)`}} />
    <div style={{margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: vertical ? 38 : 23, opacity: rise, translate: `0 ${interpolate(rise, [0, 1], [70, 0])}px`, textAlign: 'center'}}>
      <div style={{filter: `drop-shadow(0 0 32px ${C.gold}55)`, scale: 1 + .025 * Math.sin(f / 14)}}><LogoMark size={vertical ? 220 : 168} gold /></div>
      <Wordmark light size={vertical ? 103 : 100} />
      <div style={{fontSize: vertical ? 100 : 78, fontWeight: 700, lineHeight: 1, color: C.mint, letterSpacing: -3}}>AI</div>
      <div style={{height: 2, width: vertical ? 210 : 160, background: C.gold, marginTop: 12, boxShadow: `0 0 18px ${C.gold}`}} />
      <div dir="rtl" style={{fontSize: vertical ? 50 : 37, fontWeight: 600, color: '#e6f4ed', opacity: interpolate(f, [24, 58], [0, 1], {extrapolateRight: 'clamp', easing: Easing.bezier(.2,.8,.2,1)})}}>{COPY.intro}</div>
    </div>
  </AbsoluteFill>;
};
