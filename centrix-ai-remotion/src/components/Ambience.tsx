import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';

const dots = Array.from({length: 42}, (_, i) => ({x: (i * 73 + 19) % 100, y: (i * 41 + 13) % 100, r: 1 + (i % 4)}));

export const Ambience: React.FC<{dark?: boolean}> = ({dark = true}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{overflow: 'hidden', background: dark ? `radial-gradient(circle at 50% 40%, #164642 0%, ${C.deep} 54%, #021112 100%)` : `radial-gradient(circle at 48% 28%, #fffdfa, ${C.cream} 67%, #dcebe5 100%)`}}>
    <div style={{position: 'absolute', left: '-15%', top: '-30%', width: '90%', height: '85%', background: `radial-gradient(circle, ${dark ? '#2d806b55' : '#b2e8d155'}, transparent 68%)`, translate: `${Math.sin(frame / 90) * 45}px ${Math.cos(frame / 100) * 35}px`}} />
    <div style={{position: 'absolute', right: '-20%', bottom: '-35%', width: '90%', height: '90%', background: `radial-gradient(circle, ${dark ? '#a6894c22' : '#dcbd7933'}, transparent 68%)`, translate: `${Math.cos(frame / 100) * 35}px ${Math.sin(frame / 110) * 35}px`}} />
    {dots.map((d, i) => <div key={i} style={{position: 'absolute', left: `${d.x}%`, top: `${d.y}%`, width: d.r, height: d.r, borderRadius: 100, background: i % 5 === 0 ? C.gold : C.mint, opacity: dark ? .12 + .35 * (1 + Math.sin(frame / 19 + i)) / 2 : .08, boxShadow: dark ? `0 0 12px ${C.mint}` : 'none', translate: `0 ${Math.sin(frame / 32 + i) * 8}px`}} />)}
    {dark && <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .25}} viewBox="0 0 1920 1080" preserveAspectRatio="none">
      <path d="M-100 790 C380 600 510 730 910 460 S1440 300 2040 90" fill="none" stroke={C.mint} strokeWidth="1" strokeDasharray="10 24" strokeDashoffset={-frame * .8} />
      <path d="M-100 910 C380 720 740 800 1050 620 S1540 460 2040 290" fill="none" stroke={C.gold} strokeWidth="1" strokeDasharray="38 110" strokeDashoffset={-frame * .45} />
    </svg>}
    <div style={{position: 'absolute', inset: 0, background: `linear-gradient(90deg, transparent, ${dark ? '#ffffff0a' : '#ffffff35'}, transparent)`, translate: `${interpolate(frame % 180, [0, 180], [-120, 120])}% 0`}} />
  </AbsoluteFill>;
};
