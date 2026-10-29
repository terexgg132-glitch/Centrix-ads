import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Ambience} from '../components/Ambience';
import {LogoMark, Wordmark} from '../components/Brand';
import {C, COPY} from '../theme';

export const Outro:React.FC<{vertical:boolean}> = ({vertical}) => {
  const f=useCurrentFrame(); const {fps}=useVideoConfig();
  const p=spring({frame:f-5,fps,config:{damping:23,stiffness:70}});
  const fade=interpolate(f,[0,19],[0,1],{extrapolateRight:'clamp',easing:Easing.bezier(.2,.8,.2,1)});
  return <AbsoluteFill style={{fontFamily:'Cairo',opacity:fade,color:C.white}}><Ambience/>
    {Array.from({length:28},(_,i)=><div key={i} style={{position:'absolute',left:`${10+(i*37)%80}%`,top:`${15+(i*43)%70}%`,width:i%3+2,height:i%3+2,borderRadius:99,background:i%5?C.mint:C.gold,boxShadow:`0 0 15px ${C.mint}`,opacity:interpolate(f,[i%9,40+i%11],[0,.55],{extrapolateRight:'clamp'}),translate:`${Math.sin(i*3)*f*.42}px ${Math.cos(i*7)*f*.35}px`}}/>)}
    <div style={{margin:'auto',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:vertical?30:16,opacity:p,translate:`0 ${(1-p)*80}px`}}>
      <div style={{filter:`drop-shadow(0 0 34px ${C.gold}55)`}}><LogoMark size={vertical?210:160} gold/></div>
      <Wordmark light size={vertical?97:88}/>
      <div style={{fontFamily:'Cairo',fontSize:vertical?90:76,fontWeight:800,color:C.mint,lineHeight:1}}>AI</div>
      <div style={{height:2,width:vertical?240:230,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`,margin:vertical?'30px 0 10px':'10px 0 5px'}}/>
      <div dir="rtl" style={{fontSize:vertical?66:65,fontWeight:800,lineHeight:1.7,whiteSpace:'nowrap'}}>{COPY.tagline}</div>
      <div dir="rtl" style={{fontSize:vertical?37:32,color:'#b8d5ca',fontWeight:600}}>{COPY.end}</div>
    </div>
    <div style={{position:'absolute',left:vertical?60:86,right:vertical?60:86,bottom:vertical?112:62,height:1,background:`linear-gradient(90deg,transparent,${C.gold},transparent)`}}/>
    <div style={{position:'absolute',bottom:vertical?53:25,left:0,right:0,textAlign:'center',fontSize:vertical?17:14,letterSpacing:3,color:C.gold}}>CENTRIX  /  CENTER MANAGEMENT</div>
  </AbsoluteFill>;
};
