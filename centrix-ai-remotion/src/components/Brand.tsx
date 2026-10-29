import React from 'react';
import {C} from '../theme';

export const LogoMark: React.FC<{size?: number; gold?: boolean}> = ({size = 80, gold = false}) => {
  const stroke = gold ? C.gold : C.mint;
  return <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="Centrix mark">
    <path d="M50 5 95 50 50 95 5 50Z" stroke={stroke} strokeWidth="1.5" opacity=".8" />
    <path d="M65 25a31 31 0 1 0 0 50" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
    <path d="M46 31h28L49 50l25 19H46" stroke={stroke} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
};

export const Wordmark: React.FC<{light?: boolean; size?: number}> = ({light = false, size = 56}) =>
  <span style={{fontFamily: 'Georgia, serif', fontSize: size, letterSpacing: '.19em', color: light ? '#f5f4e9' : C.ink, whiteSpace: 'nowrap'}}>
    CENTR<span style={{color: C.gold}}>IX</span>
  </span>;
