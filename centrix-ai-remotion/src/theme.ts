export const C = {
  ink: '#092827',
  deep: '#061b1c',
  emerald: '#103c3b',
  teal: '#176761',
  mint: '#8ad8bd',
  mintPale: '#dff4e9',
  gold: '#d8ad58',
  cream: '#f4f5f0',
  white: '#fffefa',
  line: '#dbe6e0',
  muted: '#718a85',
} as const;

export const FPS = 30;
export const DURATION = 900;
export const COPY = {
  intro: 'مساعدك الذكي لإدارة شغلك',
  attendance: 'اعرضلي ملخص الغياب النهارده',
  payments: 'طب والمدفوعات أخبارها إيه؟',
  followup: 'جهزلي متابعة للطلاب اللي غابوا',
  tagline: 'اسأل. افهم. نفّذ.',
  end: 'إدارة أذكى لكل سنتر',
} as const;

export const T = {
  introEnd: 120,
  productEnd: 780,
  attendanceStart: 270,
  paymentsStart: 450,
  followupStart: 600,
} as const;

// Product scene frames, relative to its start at 4 seconds.
export const FLOW = {
  attendance: {start:150, typeStart:157, typeEnd:207, pressStart:211, pressEnd:222, bubble:217, think:228, card:265},
  payments: {start:330, typeStart:337, typeEnd:379, pressStart:383, pressEnd:394, bubble:391, think:397, card:417},
  followup: {start:480, typeStart:487, typeEnd:529, pressStart:533, pressEnd:544, bubble:541, think:545, card:568},
} as const;
