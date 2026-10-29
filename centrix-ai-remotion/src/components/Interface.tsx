import React from 'react';
import {interpolate, spring} from 'remotion';
import {C, COPY, FLOW} from '../theme';
import {LogoMark} from './Brand';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const reveal = (f: number, start: number, end: number) => interpolate(f, [start, end], [0, 1], clamp);

export const Icon: React.FC<{name: string; size?: number; color?: string}> = ({name, size = 26, color = 'currentColor'}) => {
  const paths: Record<string, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 20c0-4 2.5-6 6-6s6 2 6 6"/><path d="M16 5a3 3 0 0 1 0 6m1 3c2.5 0 4 2 4 6"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18m-13 4h3m3 0h3m-9 3h3"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
    wallet: <><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 9h18m-5 5h3"/></>,
    chart: <><path d="M4 20h17M6 16v-5m5 5V7m5 9V4m5 12V9"/></>,
    robot: <><rect x="5" y="7" width="14" height="13" rx="3"/><path d="M12 3v4M9 3h6M2 12h3m14 0h3M9 12v2m6-2v2m-6 3h6"/></>,
    mic: <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0m-7 7v3m-4 0h8"/></>,
    send: <><path d="m3 12 18-8-5 17-4-7-9-2Z"/><path d="m12 14 9-10"/></>,
    bell: <><path d="M6 17h12l-2-3V9a4 4 0 0 0-8 0v5l-2 3Zm4 3h4"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.grid}</svg>;
};

const Sidebar: React.FC<{vertical: boolean; f: number}> = ({vertical, f}) => {
  const nav = [['grid','لوحة التحكم'], ['users','الطلاب'], ['calendar','الجدول'], ['check','الحضور'], ['wallet','المالية'], ['chart','التقارير'], ['robot','مساعد Centrix']];
  return <div dir="rtl" style={{width: vertical ? 180 : 265, height: '100%', background: `linear-gradient(145deg, ${C.emerald}, #0d3333)`, color: '#d3e9e2', borderRadius: vertical ? '0 24px 24px 0' : '0 28px 28px 0', padding: vertical ? '28px 12px' : '32px 17px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 45px #09282720', translate: `${interpolate(f, [0, 35], [vertical ? 185 : 280, 0], clamp)}px 0`}}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: vertical ? 6 : 9, marginBottom: vertical ? 48 : 42}}><LogoMark size={vertical ? 76 : 80} gold /><div style={{fontFamily:'Georgia,serif',fontSize:vertical ? 20 : 24,letterSpacing:2,color:C.white}}>CENTRIX</div><div style={{fontSize:vertical ? 11 : 13,color:C.mint}}>إدارة تعليمية ذكية</div></div>
    <div style={{display: 'flex', flexDirection: 'column', gap: vertical ? 17 : 13}}>{nav.map(([icon,label], i) => <div key={label} style={{height: vertical ? 70 : 64, border: `1px solid ${i===6 ? '#55cbb780' : '#84b7ad40'}`, borderRadius: 16, display:'flex', flexDirection: vertical ? 'column' : 'row', alignItems:'center', justifyContent:vertical?'center':'space-between', gap:vertical?1:14, padding:vertical?0:'0 18px', background:i===6 ? '#15524e' : '#0a313166', boxShadow:i===6?`inset 3px 0 ${C.gold}, 0 0 22px #70c7ad22`:'none', opacity: reveal(f, 12+i*3, 28+i*3)}}><Icon name={icon} size={vertical?23:24} color={i===6?C.mint:'#bfd4ce'}/><span style={{fontSize:vertical?14:17, fontWeight:i===6?700:600,whiteSpace:'nowrap'}}>{label}</span></div>)}</div>
    <div style={{marginTop:'auto',fontSize:vertical?12:13,textAlign:'center',color:'#9dbfba'}}>مركز المستقبل</div>
  </div>;
};

const Header: React.FC<{vertical:boolean; f:number}> = ({vertical,f}) => <div dir="rtl" style={{height:vertical?138:115,padding:vertical?'20px 26px':'18px 33px',boxSizing:'border-box',display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,background:'linear-gradient(100deg,#ffffff,#eef7f1)',borderBottom:`1px solid ${C.line}`,opacity:reveal(f,12,35)}}>
  <div><div style={{display:'flex',alignItems:'center',gap:9,color:C.teal,fontWeight:700,fontSize:vertical?16:16}}>CENTRIX <span style={{color:C.muted}}> / مركز المستقبل</span></div><div style={{fontSize:vertical?28:31,fontWeight:800,color:C.ink,lineHeight:1.5}}>مساعد Centrix <span style={{color:C.teal}}>AI</span></div><div style={{fontSize:vertical?14:16,color:C.muted}}>اسأل، راجع بيانات النظام، ونفّذ المهام بعد التأكيد.</div></div>
  {!vertical && <div style={{display:'flex',gap:10}}><span style={pill}>السنة الدراسية 2026/2027</span><span style={pill}>المدرس الرئيسي</span><span style={{...pill,background:C.white}}><Icon name="bell" size={19}/></span></div>}
</div>;

const pill: React.CSSProperties={border:`1px solid #bad8d2`,borderRadius:100,padding:'8px 16px',fontSize:14,fontWeight:700,color:C.teal,background:'#e5f3ed',whiteSpace:'nowrap'};

const History: React.FC<{vertical:boolean; f:number}> = ({vertical,f}) => <div dir="rtl" style={{width:vertical?'100%':272,height:vertical?76:'100%',boxSizing:'border-box',background:C.white,borderLeft:vertical?'none':`1px solid ${C.line}`,borderBottom:vertical?`1px solid ${C.line}`:'none',padding:vertical?'16px 24px':'26px 20px',opacity:reveal(f,23,46),display:'flex',flexDirection:vertical?'row':'column',alignItems:vertical?'center':'stretch',gap:vertical?18:15}}>
  <div style={{fontSize:vertical?17:20,fontWeight:800,color:C.ink,whiteSpace:'nowrap'}}>المحادثات</div>
  <div style={{fontSize:vertical?13:14,color:C.teal,border:`1px solid ${C.line}`,borderRadius:12,padding:vertical?'7px 12px':'9px 12px',background:'#f7fbf8',whiteSpace:'nowrap'}}>＋ محادثة جديدة</div>
  {!vertical && <div style={{fontSize:14,color:C.muted,textAlign:'center',marginTop:8}}>لا توجد محادثات محفوظة بعد.</div>}
  {vertical && <div style={{marginRight:'auto',fontSize:13,color:C.muted,whiteSpace:'nowrap'}}>سجل المحادثة</div>}
</div>;

const UserBubble:React.FC<{text:string; f:number; start:number; vertical:boolean}> = ({text,f,start,vertical}) => <div dir="rtl" style={{alignSelf:'flex-start',maxWidth:vertical?'94%':'75%',padding:vertical?'15px 19px':'14px 21px',borderRadius:'18px 18px 5px 18px',background:C.emerald,color:C.white,fontSize:vertical?22:22,fontWeight:700,lineHeight:1.6,boxShadow:'0 12px 24px #0e4b4330',opacity:reveal(f,start,start+13),translate:`0 ${interpolate(f,[start,start+13],[18,0],clamp)}px`}}>{text}</div>;

const Thinking:React.FC<{f:number;start:number;end:number;vertical:boolean}> = ({f,start,end,vertical}) => f>=start && f<end ? <div dir="rtl" style={{alignSelf:'flex-end',display:'flex',alignItems:'center',gap:8,color:C.teal,fontSize:vertical?16:15,opacity:reveal(f,start,start+6)}}><Icon name="robot" size={21}/><span>جاري التحليل</span><span style={{fontFamily:'Arial',letterSpacing:3,fontWeight:900}}>{'.'.repeat(1+Math.floor((f-start)/8)%3)}</span></div>:null;

const DemoLabel:React.FC<{vertical:boolean}> = ({vertical})=><span style={{fontSize:vertical?12:13,color:'#80642e',background:'#fff3d9',border:'1px solid #f0d49c',borderRadius:99,padding:'4px 11px',whiteSpace:'nowrap'}}>مثال توضيحي</span>;

const AttendanceCard:React.FC<{f:number;vertical:boolean}> = ({f,vertical}) => {
  const p=reveal(f,FLOW.attendance.card,FLOW.attendance.card+19);
  return <div dir="rtl" style={{alignSelf:'flex-end',width:vertical?'100%':'78%',background:C.white,border:`1px solid ${C.line}`,borderRadius:20,padding:vertical?'20px 22px':'23px 27px',boxSizing:'border-box',boxShadow:'0 17px 45px #194c3e17',opacity:p,translate:`0 ${(1-p)*24}px`}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}><div style={{display:'flex',alignItems:'center',gap:10,color:C.ink,fontSize:vertical?22:21,fontWeight:800}}><Icon name="calendar" color={C.teal}/> ملخص الغياب اليوم</div><DemoLabel vertical={vertical}/></div>
    <div style={{display:'flex',gap:10,marginTop:16}}>{[['٦','غائبون'],['٢','متأخرون'],['٨٧٪','نسبة الحضور']].map(([v,l],i)=><div key={l} style={{flex:1,background:i===0?'#e9f5ec':'#f4f7f3',borderRadius:13,padding:vertical?'9px 10px':'12px 14px',textAlign:'center'}}><div style={{fontSize:vertical?27:29,fontWeight:800,color:i===0?C.teal:C.ink}}>{v}</div><div style={{fontSize:vertical?13:14,color:C.muted}}>{l}</div></div>)}</div>
    <div style={{height:vertical?56:52,display:'flex',alignItems:'end',gap:8,marginTop:12,borderBottom:`1px solid ${C.line}`}}>{[32,52,40,64,50,75,60,79,66,89,77,93].map((h,i)=><div key={i} style={{flex:1,height:`${h*reveal(f,276+i*2,294+i*2)}%`,borderRadius:'4px 4px 0 0',background:i>9?C.gold:C.mint}}/>)}</div>
  </div>;
};

const FinanceCard:React.FC<{f:number;vertical:boolean}> = ({f,vertical}) => {
  const p=reveal(f,FLOW.payments.card,FLOW.payments.card+18);
  return <div dir="rtl" style={{alignSelf:'flex-end',width:vertical?'100%':'80%',background:C.white,border:`1px solid ${C.line}`,borderRadius:20,padding:vertical?'21px 22px':'24px 28px',boxSizing:'border-box',boxShadow:'0 17px 45px #194c3e17',opacity:p,translate:`0 ${(1-p)*24}px`}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{display:'flex',alignItems:'center',gap:10,fontSize:vertical?21:22,fontWeight:800,color:C.ink}}><Icon name="wallet" color={C.teal}/> نظرة على المدفوعات</div><DemoLabel vertical={vertical}/></div>
    <div style={{display:'flex',gap:10,marginTop:17}}><div style={{flex:1,background:'#e8f6ef',padding:vertical?'14px':'18px',borderRadius:13}}><div style={{fontSize:vertical?13:14,color:C.muted}}>المدفوعات</div><div style={{fontSize:vertical?26:30,fontWeight:800,color:C.teal,whiteSpace:'nowrap'}}>١٢٬٤٠٠ <small style={{fontSize:13}}>ج.م</small></div></div><div style={{flex:1,background:'#fbf5e9',padding:vertical?'14px':'18px',borderRadius:13}}><div style={{fontSize:vertical?13:14,color:C.muted}}>المتبقي</div><div style={{fontSize:vertical?26:30,fontWeight:800,color:C.ink,whiteSpace:'nowrap'}}>٣٬٢٠٠ <small style={{fontSize:13}}>ج.م</small></div></div></div>
    <div style={{marginTop:12,fontSize:vertical?12:14,color:C.muted}}>أرقام تجريبية للعرض فقط، وليست بيانات عميل.</div>
  </div>;
};

const DraftCard:React.FC<{f:number;vertical:boolean}> = ({f,vertical}) => {
  const p=reveal(f,FLOW.followup.card,FLOW.followup.card+22);
  return <div dir="rtl" style={{alignSelf:'flex-end',width:vertical?'100%':'82%',background:C.white,border:`1px solid ${C.line}`,borderRadius:20,padding:vertical?'20px 22px':'23px 27px',boxSizing:'border-box',boxShadow:'0 17px 45px #194c3e17',opacity:p,translate:`0 ${(1-p)*25}px`}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{fontWeight:800,fontSize:vertical?22:22,color:C.ink}}>مسودة متابعة الغياب</div><span style={{fontSize:vertical?12:13,color:C.teal,background:'#e3f3e9',padding:'5px 12px',borderRadius:100}}>بانتظار تأكيدك</span></div>
    <div style={{background:'#f5f8f4',borderRight:`3px solid ${C.mint}`,borderRadius:10,padding:vertical?'15px 16px':'18px 20px',marginTop:15,fontSize:vertical?17:17,color:C.ink,lineHeight:1.7}}>مرحبًا، نود الاطمئنان على الطالب بعد غيابه اليوم. نرجو التواصل مع المركز عند الحاجة.</div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:17,gap:9}}><span style={{fontSize:vertical?13:14,color:C.muted}}>لم تُرسل أي رسائل.</span><div style={{background:C.emerald,color:C.white,borderRadius:9,padding:vertical?'9px 17px':'10px 20px',fontSize:vertical?15:16,fontWeight:700,opacity:.75}}>تأكيد الإرسال</div></div>
  </div>;
};

const typed=(s:string, f:number,start:number,end:number)=>Array.from(s).slice(0,Math.floor(Array.from(s).length*reveal(f,start,end))).join('');

const Composer:React.FC<{f:number;vertical:boolean}> = ({f,vertical}) => {
  const active=f>=FLOW.attendance.start&&f<FLOW.attendance.pressEnd?typed(COPY.attendance,f,FLOW.attendance.typeStart,FLOW.attendance.typeEnd):f>=FLOW.payments.start&&f<FLOW.payments.pressEnd?typed(COPY.payments,f,FLOW.payments.typeStart,FLOW.payments.typeEnd):f>=FLOW.followup.start&&f<FLOW.followup.pressEnd?typed(COPY.followup,f,FLOW.followup.typeStart,FLOW.followup.typeEnd):'';
  const pressed=[FLOW.attendance,FLOW.payments,FLOW.followup].some((step)=>f>=step.pressStart&&f<step.pressEnd);
  const cursorStep=[FLOW.attendance,FLOW.payments,FLOW.followup].find((step)=>f>=step.pressStart-16&&f<step.pressEnd+4);
  const cursorP=cursorStep?reveal(f,cursorStep.pressStart-16,cursorStep.pressStart):0;
  return <div dir="rtl" style={{position:'relative',height:vertical?152:135,padding:vertical?'12px 20px 22px':'10px 25px 20px',boxSizing:'border-box',borderTop:`1px solid ${C.line}`,background:'#fbfdfb'}}><div style={{fontSize:vertical?15:14,fontWeight:700,color:C.ink,marginBottom:4}}>رسالتك</div><div style={{display:'flex',gap:9,height:vertical?92:80,alignItems:'stretch'}}><div style={{flex:1,border:`1px solid ${active?C.mint:C.line}`,borderRadius:14,background:C.white,padding:vertical?'17px 15px':'14px 17px',boxSizing:'border-box',fontSize:vertical?21:18,color:active?C.ink:'#a4b1ad',whiteSpace:'nowrap',overflow:'hidden'}}>{active || 'اكتب طلبك هنا...'}{active&&f%20<10&&<span style={{color:C.teal}}>|</span>}</div><div style={{width:vertical?68:75,border:`1px solid ${C.line}`,background:C.white,borderRadius:14,display:'grid',placeItems:'center',color:C.emerald}}><Icon name="mic" size={25}/></div><div style={{width:vertical?82:100,background:pressed?C.gold:C.teal,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',gap:7,color:C.white,fontSize:vertical?16:17,fontWeight:800,scale:pressed?.94:1,boxShadow:`0 5px 15px #26756835`}}><Icon name="send" size={20} color={C.white}/>إرسال</div></div>{cursorStep&&<svg width="35" height="42" viewBox="0 0 35 42" style={{position:'absolute',left:(vertical?160:200)-(vertical?100:135)*cursorP,bottom:vertical?43:36,filter:'drop-shadow(1px 3px 2px #0008)',opacity:reveal(f,cursorStep.pressStart-16,cursorStep.pressStart-10)}}><path d="M3 2 4 34 12 27 19 39 25 36 17 23 29 22Z" fill="#102d2b" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/></svg>}</div>;
};

const Chat:React.FC<{vertical:boolean;f:number}> = ({vertical,f}) => {
  const mode=f>=FLOW.followup.start?3:f>=FLOW.payments.start?2:f>=FLOW.attendance.start?1:0;
  return <div dir="rtl" style={{flex:1,background:'#f9fcfa',display:'flex',flexDirection:'column',minWidth:0}}><div style={{flex:1,position:'relative',padding:vertical?'23px 23px':'24px 34px',overflow:'hidden'}}>
    {mode===0 && <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:18,opacity:reveal(f,30,70)}}><div style={{background:'#e7f7ef',borderRadius:22,padding:18}}><Icon name="robot" size={52} color={C.teal}/></div><div style={{fontSize:vertical?32:27,fontWeight:800,color:C.ink}}>مرحبًا! أنا مساعدك الذكي</div><div style={{fontSize:vertical?18:18,color:C.muted,textAlign:'center',maxWidth:550}}>اسألني عن الطلاب والحضور والمدفوعات. أراجع لك المعلومات وأجهز المهام لتأكيدها.</div></div>}
    {mode>0 && <div style={{height:'100%',display:'flex',flexDirection:'column',gap:vertical?20:17}}>
      {mode>1 && <div style={{fontSize:vertical?14:14,color:C.muted,alignSelf:'center',border:`1px solid ${C.line}`,borderRadius:99,padding:'5px 15px',background:C.white}}>{mode===2?'سابقًا: ملخص الغياب':'سابقًا: ملخص الغياب والمدفوعات'}</div>}
      <UserBubble text={mode===1?COPY.attendance:mode===2?COPY.payments:COPY.followup} f={f} start={mode===1?FLOW.attendance.bubble:mode===2?FLOW.payments.bubble:FLOW.followup.bubble} vertical={vertical}/>
      {mode===1 && <><Thinking f={f} start={FLOW.attendance.think} end={FLOW.attendance.card+1} vertical={vertical}/>{f>=FLOW.attendance.card&&<AttendanceCard f={f} vertical={vertical}/>}</>}
      {mode===2 && <><Thinking f={f} start={FLOW.payments.think} end={FLOW.payments.card+1} vertical={vertical}/>{f>=FLOW.payments.card&&<FinanceCard f={f} vertical={vertical}/>}</>}
      {mode===3 && <><Thinking f={f} start={FLOW.followup.think} end={FLOW.followup.card+1} vertical={vertical}/>{f>=FLOW.followup.card&&<DraftCard f={f} vertical={vertical}/>}</>}
    </div>}
  </div><Composer f={f} vertical={vertical}/></div>;
};

export const Dashboard:React.FC<{vertical:boolean;f:number}> = ({vertical,f}) => <div style={{width:'100%',height:'100%',display:'flex',background:C.white,borderRadius:vertical?25:28,overflow:'hidden',border:'1px solid #d5e5dd',boxShadow:'0 38px 100px #06292340'}}>
  <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column'}}><Header vertical={vertical} f={f}/><div style={{flex:1,minHeight:0,display:'flex',flexDirection:vertical?'column':'row'}}>{vertical?<><History vertical={true} f={f}/><Chat vertical={true} f={f}/></>:<><Chat vertical={false} f={f}/><History vertical={false} f={f}/></>}</div></div><Sidebar vertical={vertical} f={f}/>
</div>;
