import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, SHADOW} from './style';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
export const appear=(f:number,start:number,duration=20)=>interpolate(f,[start,start+duration],[0,1],clamp);
export const rise=(f:number,start:number,dist=32,duration=24)=>interpolate(f,[start,start+duration],[dist,0],clamp);

export const Mark:React.FC<{size?:number;glow?:boolean}>=({size=76,glow=false})=><svg width={size} height={size} viewBox="0 0 120 120" fill="none" style={{filter:glow?'drop-shadow(0 0 18px rgba(215,173,91,.65))':undefined,flexShrink:0}}>
  <path d="M60 5 115 60 60 115 5 60Z" stroke={C.gold} strokeWidth="2.3"/>
  <path d="M75 32a32 32 0 1 0 0 56" stroke={C.gold} strokeWidth="6" strokeLinecap="round"/>
  <path d="M48 39h30L51 82h29M52 39l27 43" stroke={C.gold} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="60" cy="5" r="2.6" fill="#f5dfa7"/>
</svg>;
export const Icon:React.FC<{name:string;size?:number;color?:string}>=({name,size=24,color='currentColor'})=>{
 const paths:Record<string,React.ReactNode>={
  home:<><path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/></>,
  users:<><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2zM16 6a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5"/></>,
  calendar:<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-13 5h3m3 0h3"/></>,
  check:<><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
  wallet:<><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 9V6a2 2 0 0 1 2-2h13m-3 10h6"/></>,
  bars:<><path d="M4 20h16M7 16v-5m5 5V5m5 11V9"/></>,
  bot:<><rect x="4" y="6" width="16" height="14" rx="4"/><path d="M12 3v3m-4 6h.01M16 12h.01M9 16c2 1 4 1 6 0"/></>,
  box:<><path d="m12 2 9 5-9 5-9-5 9-5Zm-9 5v10l9 5 9-5V7M12 12v10"/></>,
  send:<><path d="M3 20 21 12 3 4l3 7 9 1-9 1z"/></>,
  mic:<><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0m-7 7v3m-4 0h8"/></>,
  spark:<><path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2Z"/></>,
  arrow:<><path d="M5 12h14m-6-6 6 6-6 6"/></>,
  lock:<><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  clock:<><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
 };
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>{paths[name]||paths.spark}</svg>;
};
export const Badge:React.FC<{children:React.ReactNode;dark?:boolean}>=({children,dark})=><span style={{display:'inline-flex',alignItems:'center',gap:7,padding:'7px 14px',borderRadius:100,fontSize:15,fontWeight:700,color:dark?C.mint:C.emerald,background:dark?'rgba(120,200,182,.09)':'#eaf6ef',border:`1px solid ${dark?'rgba(120,200,182,.28)':'#d0e8d9'}`}}>{children}</span>;
export const NavItem:React.FC<{icon:string;label:string;active?:boolean;vertical?:boolean;delay?:number}>=({icon,label,active,vertical=false,delay=0})=>{
 const f=useCurrentFrame();
 return <div style={{height:vertical?88:60,display:'flex',flexDirection:vertical?'column':'row',alignItems:'center',justifyContent:vertical?'center':'space-between',gap:vertical?2:12,padding:vertical?'5px':'0 16px',border:`1px solid ${active?'rgba(74,190,168,.5)':'rgba(180,230,219,.12)'}`,borderRadius:vertical?18:15,background:active?'linear-gradient(90deg,rgba(32,144,131,.28),rgba(17,89,85,.22))':'rgba(5,38,41,.32)',color:active?'#fff':'#b3cdca',fontSize:vertical?12:17,fontWeight:700,opacity:appear(f,delay,18),translate:`${rise(f,delay,12,18)}px 0`,boxShadow:active?'inset 3px 0 0 #5dbba9,0 0 22px rgba(44,176,149,.12)':undefined}}>
 <span style={{order:vertical?0:1,fontSize:vertical?11:17,whiteSpace:'nowrap'}}>{label}</span><span style={{order:vertical?1:0,width:vertical?24:34,height:vertical?24:34,borderRadius:12,border:'1px solid rgba(158,211,201,.25)',display:'grid',placeItems:'center'}}><Icon name={icon} size={vertical?17:18}/></span></div>
};
export const Sidebar:React.FC<{vertical:boolean;focus?:boolean}>=({vertical,focus})=>{
 const f=useCurrentFrame();
 const items=[['home','لوحة التحكم'],['users','الطلاب'],['calendar','الجدول'],['check','الحضور'],['wallet','المالية'],['box','المنتجات'],['bars','التقارير'],['bot','مساعد Centrix']];
 return <aside dir="rtl" style={{width:vertical?126:270,height:'100%',borderRadius:vertical?26:29,background:'linear-gradient(166deg,#104b4b,#0b3337 67%,#0c292d)',border:'2px solid rgba(171,219,207,.23)',padding:vertical?'20px 11px':'24px 17px',display:'flex',flexDirection:'column',gap:vertical?10:12,boxShadow:'0 25px 55px rgba(4,33,34,.24)',opacity:appear(f,0,28),translate:`${rise(f,0,80,30)}px 0`,overflow:'hidden'}}>
 <div style={{display:'flex',flexDirection:vertical?'column':'row',alignItems:'center',gap:11,justifyContent:'center',marginBottom:vertical?17:20}}><Mark size={vertical?55:60}/><div style={{color:'#fff',textAlign:vertical?'center':'right',lineHeight:1.1}}><div style={{fontSize:vertical?14:21,fontWeight:800,letterSpacing:1}}>Centrix</div>{!vertical&&<div style={{color:C.gold,fontSize:9,letterSpacing:3}}>CENTER MANAGEMENT</div>}</div></div>
 {!vertical&&<Badge dark>إدارة تعليمية ذكية</Badge>}
 <div style={{display:'flex',flexDirection:'column',gap:vertical?8:9,marginTop:vertical?4:24}}>{items.map(([icon,label],i)=><NavItem key={label} icon={icon} label={vertical&&i!==7?label.split(' ')[0]:label} active={i===7} vertical={vertical} delay={9+i*3}/>)}</div>
 {!vertical&&<div style={{marginTop:'auto',borderTop:'1px solid rgba(255,255,255,.12)',paddingTop:18,color:'#9ec5bf',fontSize:13}}>السنتر الحالي: سنتر المستقبل</div>}
 </aside>;
};
export const TopBar:React.FC<{vertical:boolean}>=({vertical})=>{
 const f=useCurrentFrame();
 return <header dir="rtl" style={{height:vertical?190:112,borderRadius:vertical?30:24,background:'linear-gradient(105deg,#fbfdfb,#f0f5f2)',border:'1px solid #e5eee8',display:'flex',alignItems:vertical?'flex-start':'center',justifyContent:'space-between',padding:vertical?'30px 38px':'21px 30px',boxShadow:SHADOW,opacity:appear(f,5,25),translate:`0 ${rise(f,5,24,25)}px`,flexDirection:vertical?'column':'row'}}>
 <div><div style={{fontSize:vertical?18:14,color:C.emerald,fontWeight:800,letterSpacing:1}}>CENTRIX <span style={{color:'#a7b2af'}}> / سنتر المستقبل</span></div><div style={{fontSize:vertical?35:29,fontWeight:800,color:C.ink,lineHeight:1.35}}>مساعد Centrix الذكي</div><div style={{fontSize:vertical?18:15,color:C.muted,fontWeight:600}}>اسأل عن شغلك، راجع المعلومات، ووافق قبل أي تنفيذ.</div></div>
 <div style={{display:'flex',gap:10,alignItems:'center'}}><Badge>بيئة عرض توضيحي</Badge>{!vertical&&<Badge>العام الدراسي ٢٠٢٦ / ٢٠٢٧</Badge>}</div>
 </header>
};
export const HistoryPanel:React.FC<{vertical:boolean;step:number}>=({vertical,step})=>{
 const labels=['ملخص الحضور','نظرة على المدفوعات','متابعة الطلاب'];const f=useCurrentFrame();
 return <div dir="rtl" style={{width:vertical?'100%':255,height:vertical?120:'100%',borderRadius:24,background:'#fff',border:'1px solid #e5eee8',boxShadow:SHADOW,padding:vertical?'17px 21px':'20px 17px',opacity:appear(f,12,20),translate:`0 ${rise(f,12,30,20)}px`,overflow:'hidden'}}>
 <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:vertical?10:18}}><b style={{fontSize:vertical?17:20,color:C.ink}}>المحادثات</b><span style={{fontSize:vertical?13:12,color:C.emerald,fontWeight:800}}>+ محادثة جديدة</span></div>
 <div style={{display:'flex',flexDirection:vertical?'row':'column',gap:8}}>{labels.slice(0,Math.max(1,step)).map((x,i)=><div key={x} style={{flex:vertical?1:undefined,borderRadius:12,padding:vertical?'6px 10px':'13px 12px',background:i===step-1?'#e8f5ef':'#f6f9f7',border:`1px solid ${i===step-1?'#c9e7d9':'#edf2ef'}`,fontSize:vertical?13:14,color:C.ink,fontWeight:700,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{x}</div>)}</div>
 </div>;
};
export const TypingInput:React.FC<{text:string;progress:number;sent:boolean;vertical:boolean}>=({text,progress,sent,vertical})=>{
 const f=useCurrentFrame();const n=Math.floor(text.length*Math.max(0,Math.min(progress,1)));
 const bounce=spring({frame:f-4,fps:30,config:{damping:12,stiffness:210}});
 return <div style={{height:vertical?138:105,display:'flex',gap:vertical?10:15,alignItems:'end',padding:vertical?'14px 17px':'14px 18px',borderRadius:20,background:'#fff',border:'1.5px solid #d9e8e1',boxShadow:'0 12px 32px rgba(11,58,54,.08)'}}>
 <button style={{height:vertical?56:55,width:vertical?56:104,border:0,borderRadius:14,display:'flex',gap:7,alignItems:'center',justifyContent:'center',fontFamily:FONT,fontWeight:800,fontSize:vertical?0:16,color:'#fff',background:sent?'#0f756a':'#70b4a8',scale:sent?1+Math.max(0,1-bounce)*.12:1,boxShadow:sent?'0 8px 23px rgba(28,139,119,.28)':undefined}}><Icon name="send" size={22} color="#fff"/>{!vertical&&'إرسال'}</button>
 <div style={{width:vertical?54:100,height:vertical?56:55,borderRadius:14,display:'grid',placeItems:'center',border:'1px solid #dfeae5',color:C.teal}}><Icon name="mic" size={24}/></div>
 <div dir="rtl" style={{flex:1,height:'100%',padding:'9px 12px',fontSize:vertical?20:21,color:n?C.ink:'#9baea9',fontWeight:700,lineHeight:1.6,overflow:'hidden'}}>{n?text.slice(0,n):'اكتب طلبك هنا...'}{progress>0&&progress<1&&<span style={{display:'inline-block',height:24,width:2,background:C.emerald,marginRight:3,opacity:Math.floor(f/7)%2?1:.25}}/>}</div>
 </div>;
};
export const AIOrb:React.FC<{size?:number;frame?:number}>=({size=56,frame=0})=><div style={{width:size,height:size,borderRadius:18,display:'grid',placeItems:'center',background:'linear-gradient(135deg,#e8f8f0,#c8ebdf)',border:'1px solid #bcdfd1',boxShadow:`0 0 ${18+Math.sin(frame/8)*8}px rgba(76,175,145,.22)`,flexShrink:0}}><Icon name="bot" size={size*.52} color={C.emerald}/></div>;
