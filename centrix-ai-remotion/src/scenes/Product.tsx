import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Ambience} from '../components/Ambience';
import {Dashboard} from '../components/Interface';
import {C, FLOW} from '../theme';

export const Product: React.FC<{vertical:boolean}> = ({vertical}) => {
  const f=useCurrentFrame(); const {fps}=useVideoConfig();
  const enter=spring({frame:f-3,fps,config:{damping:24,stiffness:67}});
  const fade=interpolate(f,[0,17,636,660],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const scale=interpolate(f,[0,45,240,600],[.88,1,1.025,1.04],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.2,.8,.2,1)});
  const active=f<FLOW.attendance.start?'01  /  لوحة واحدة لكل ما يهمك':f<FLOW.payments.start?'02  /  الغياب في لحظة':f<FLOW.followup.start?'03  /  صورة أوضح للمدفوعات':'04  /  خطوة جاهزة لتأكيدك';
  return <AbsoluteFill style={{fontFamily:'Cairo',opacity:fade,overflow:'hidden'}}><Ambience dark={false}/>
    <div style={{position:'absolute',left:vertical?55:104,top:vertical?85:47,color:C.teal,fontSize:vertical?25:20,fontWeight:800,letterSpacing:3}}>CENTRIX AI <span style={{color:C.gold}}>✦</span></div>
    <div dir="rtl" style={{position:'absolute',right:vertical?55:104,top:vertical?152:44,color:C.ink,fontSize:vertical?48:33,fontWeight:800}}>{active}</div>
    {vertical&&<div dir="rtl" style={{position:'absolute',right:55,left:55,top:240,color:C.muted,fontSize:25,lineHeight:1.7}}>مساعد ذكي يفهم السؤال، يلخّص البيانات، ويجهز الخطوة التالية.</div>}
    <div style={{position:'absolute',left:vertical?48:104,top:vertical?365:150,width:vertical?984:1712,height:vertical?1320:805,opacity:enter,transform:`perspective(1800px) rotateY(${(1-enter)*-7}deg) rotateX(${(1-enter)*5}deg) scale(${scale})`,transformOrigin:'center center',boxShadow:'0 35px 100px #073d3430'}}><Dashboard vertical={vertical} f={f}/></div>
    <div style={{position:'absolute',left:vertical?55:104,bottom:vertical?109:43,color:C.teal,fontSize:vertical?17:15,letterSpacing:3,fontWeight:800}}>UNDERSTAND  •  PREPARE  •  CONFIRM</div>
    {vertical&&<div dir="rtl" style={{position:'absolute',right:55,bottom:109,color:C.gold,fontSize:22}}>إدارة تعليمية ذكية</div>}
  </AbsoluteFill>;
};
